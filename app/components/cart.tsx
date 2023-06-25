import { Link } from "@remix-run/react"

import type { Order, Store } from "@prisma/client"

import type { FullOrderItem } from "~/utils/order.query.server"

import { Icon } from "./icon"

import { DEFAULT_CURRENCY } from "./../constants"

function toPersianDay(day: number) {
  switch (day) {
    case 0:
      return "یکشنبه"

    case 1:
      return "دوشنبه"

    case 2:
      return "سه شنبه"

    case 3:
      return "چهارشنبه"

    case 4:
      return "پنج شنبه"

    case 5:
      return "جمعه"

    default:
      return "شنبه"
  }
}

export type CartCompProps = {
  orders:
    | {
        items: FullOrderItem[]
        order: Order
        store: Store
      }[]
    | undefined

  dir?: "rtl" | "lrt"
}

export const CartComp = ({ orders, dir }: CartCompProps) => {
  return (
    <ol className="cart" dir={dir}>
      {orders ? orders.map((order, index) => (
        <Link to={`/store/${order.store.id}`} key={index}>
          <li className="_order">
            <div>
              <img
                src={order.store.avatarUrl ?? undefined}
                alt=""
                role="presentation"
              />

              <span>
                <p>
                  {" "}
                  <span className="nonvisual">store Name</span>
                  {order.store.name}
                </p>

                <time>
                  <Icon name="time" color="faded"></Icon>

                  <span className="nonvisual">Billed At</span>

                  {new Date(
                    order.order.billDate ?? order.order.createdAt,
                  ).toLocaleString("fa-IR")}
                  {"      "}

                  {toPersianDay(
                    new Date(
                      order.order.billDate ?? order.order.createdAt,
                    ).getDay(),
                  )}
                </time>
              </span>

              <p>
                <span className="nonvisual">Price</span>

                {order.order.totalPrice.toLocaleString("fa-IR") +
                  DEFAULT_CURRENCY}
              </p>
            </div>

            <ul>
              {order.items.map((item, index) => (
                <li key={index} className="_item">
                  <img src={item.avatarUrl ?? undefined} alt=""></img>

                  <span className="nonvisual">{item.name}</span>

                  <span aria-label="Count">{item.count}</span>
                </li>
              ))}
            </ul>
          </li>
        </Link>
      )) : null}
    </ol>
  )
}
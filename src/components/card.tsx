import { ReactNode } from "react"
import "./card.css"
import { StarIcon } from "./svg"

type CardProps = {
  img?: ReactNode
  title: string
  categories?: Array<string>
  score?: string
  scoreNumber?: string
  delivery?: string
  deliveryPrice?: string
  deliveryIcon?: ReactNode
  offer?: string
  icon?: ReactNode
}
export const Card = ({
  img,
  icon,
  title,
  delivery,
  deliveryIcon,
  deliveryPrice,
  categories,
  score,
  scoreNumber,
  offer,
}: CardProps) => {
  const categoriesString = categories?.join(", ")
  return (
    <article className="card">
      <div className="card-image">
        {img} {icon} <div>{offer}</div>
      </div>
      <h3>{title}</h3>
      <small>
        <StarIcon />
        {score}({scoreNumber}){" "}
      </small>
      <small>{categoriesString}</small>
      <p className="card-delivery">
        {deliveryIcon}
        {delivery} {deliveryPrice}
      </p>
    </article>
  )
}
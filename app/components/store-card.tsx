import { DEFAULT_CURRENCY } from "../constants"
import { Icon } from "./icon"

type VendorCardProps = {
  name: string
  image: string
  type?: string
  logo?: string
  ratingValue?: number | string
  ratingRange?: number
  ratingCount?: number | string
  discount?: number
  tags?: string[]
  deliveryMethod: string
  deliveryPrice: number
  dir?: "lrt" | "rtl"
}

export const VendorCard = ({
  name,
  logo,
  image,
  ratingRange,
  ratingValue = 1,
  ratingCount = "جدید",
  deliveryMethod,
  type,
  discount,
  tags,
  deliveryPrice,
  dir,
}: VendorCardProps) => {
  return name ? (
    <dl className="vendor-card" dir={dir}>
      <dt className="nonvisual">Name</dt>

      <dd className="_name">{name}</dd>

      {type ? (
        <>
          <dt className="nonvisual">Type</dt>

          <dd className="nonvisual">{type}</dd>
        </>
      ) : null}

      {tags ? (
        <>
          <dt className="nonvisual">Categories</dt>

          <dd>
            <ol className="_categories">
              {tags.map((tag, index, array) =>
                index === array.length - 1 ? (
                  <li key={index}>{tag}</li>
                ) : (
                  <li key={index}>{`${tag}, `}</li>
                ),
              )}
            </ol>
          </dd>
        </>
      ) : null}

      <div className="_images">
        {image && logo ? (
          <>
            <dt className="nonvisual">Image</dt>

            <dd className="_image">
              <img src={image} alt="" width={60} height={60} loading="lazy" />

              <span className="_logo" role="presentation">
                <img
                  src={logo}
                  alt=""
                  role="presentation"
                  loading="lazy"
                  width={40}
                  height={40}
                />
              </span>
            </dd>
          </>
        ) : null}

        {discount ? (
          <>
            <dt className="nonvisual">Discount</dt>

            <dd className="_discount">{` ${discount.toLocaleString(
              "fa",
            )}%`}</dd>
          </>
        ) : null}
      </div>

      <>
        <dt className="nonvisual">Rating</dt>

        <dd className="_rating">
          <dl>
            {ratingValue ? (
              <>
                <dt className="nonvisual">Value</dt>

                <dd aria-label="Stars">{ratingValue.toLocaleString("fa")}</dd>
              </>
            ) : null}

            <dt className="nonvisual">Stars</dt>

            <dd className="_star-icon">
              {<Icon name="star" role="presentation" />}
            </dd>

            {ratingRange ? (
              <>
                <dd className="nonvisual">Range</dd>

                <dt className="nonvisual">
                  / {ratingRange.toLocaleString("fa")}
                </dt>
              </>
            ) : null}

            {ratingCount && typeof ratingCount === "number" ? (
              <>
                <dt className="nonvisual">Count</dt>

                <dd className="_rating-count">
                  ( {ratingCount.toLocaleString("fa")} )
                </dd>
              </>
            ) : (
              <>
                <dt className="nonvisual">Count</dt>

                <dd className="_rating-count">جدید</dd>
              </>
            )}
          </dl>
        </dd>
      </>

      {deliveryMethod ? (
        <>
          <dt className="nonvisual">Delivery</dt>

          <dd>
            <dl>
              {deliveryMethod ? (
                <>
                  <dt className="nonvisual">Method / Price:</dt>

                  <dd className="_delivery">
                    <Icon name="delivery" role="presentation" />

                    <div>
                      <span>{deliveryMethod} </span>

                      {deliveryPrice ? (
                        <>
                          <span className="_price">
                            {deliveryPrice.toLocaleString("fa")}
                          </span>
                          <span>{DEFAULT_CURRENCY}</span>{" "}
                        </>
                      ) : (
                        <span className="_price">رایگان </span>
                      )}
                    </div>
                  </dd>

                  <dt className="nonvisual">Currency</dt>
                </>
              ) : (
                <>
                  <dt className="nonvisual">Method</dt>

                  <dd className="_delivery faded">
                    <Icon name="remainingTime" role="presentation" />

                    <span>{deliveryMethod ?? null}</span>
                  </dd>
                </>
              )}
            </dl>
          </dd>
        </>
      ) : null}
    </dl>
  ) : null
}

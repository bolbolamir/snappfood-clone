import { DEFAULT_IMG_PLACEHOLDER } from "../constants"

export type item = {
  name: string
  avatarUrl?: string
  href: string
}

type NavProps = {
  type?: string
  items: item[]
  dir?: "lrt" | "rtl"
}

export const CategoryNav = ({ items, type, dir }: NavProps) => {
  return (
    <nav className="nav" dir={dir}>
      <h1 className="nonvisual">Kinds</h1>

      <ul aria-label={type}>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href}>
              <span>
                <img
                  role="presentation"
                  src={item.avatarUrl ?? DEFAULT_IMG_PLACEHOLDER}
                  alt=""
                />

                <span className="_name">{item.name}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

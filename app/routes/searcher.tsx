import { useState } from "react"
import { Form, useRouteLoaderData, useSearchParams } from "@remix-run/react"

export default function SomeComponent() {

  let [searchParams, setSearchParams] = useSearchParams()

  const [state, setstate] = useState("")


  const x = useRouteLoaderData(`routes/x`)
  // console.log(`routes/search?search=${state}`)
  console.log(x)


  return (
    <Form
      replace={false}
      reloadDocument={false}
      // ref={setMarker}
      // onChange={e => handleChange(e)}
    >
      <input
        id="ddd"
        type="text"
        name="search"
        onChange={ e => {
          // setSearchParams({search: e.target.value})
          f()
          setstate(e.target.value)

        }}
      />
    </Form>
  )
}

async function f() {
  const data = await fetch("/x")
  console.log( await data.text());

}
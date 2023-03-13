import { Button } from "@mui/material";
import {
  Form,
  redirect,
  useLoaderData,
} from "react-router-dom";
import {
  backend,
} from "../../env"
import {
  authFetch,
  withAuth,
} from "../../request"
import "./index.css"

export function action({ request }) {
  return redirect("./new")
}

export const loader = withAuth(async ({ request, params }) => {
  const response = await authFetch(backend.items, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const items = await response.json()
  return { items: Array.from(items) }
})

export function ItemPanel(props) {
  const { items } = useLoaderData();
  let itemArea
  if (items.length === 0) {
    itemArea = <p>No item.</p>
  } else {
    itemArea = <ul className="item-grid">
      {
        items.map(item => <ItemCard key={item._id} item={item} />)
      }
    </ul>
  }
  return (
    <div>
      <br />
      {itemArea}
    </div>
  )
}

function ItemCard(props) {
  const { item } = props
  // placeholder images.
  return (
    <div className="card item-card">
      <img src="https://picsum.photos/200" />
      <h3>{item.name}</h3>
      <br />
      <a>{item.description}</a>
    </div>
  )
}

function Header(props) {
  return (
    <div className="app-bar">
      <Form method="post">
        <Button type="submit">New</Button>
      </Form>
    </div>
  )
}

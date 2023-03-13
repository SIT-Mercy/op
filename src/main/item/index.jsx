import { Button, Typography } from "@mui/material";
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
import { ResponsiveAppBar } from "../dashboard";
import "./index.css"
import Card from "@mui/material/Card"

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
    <>
      <ResponsiveAppBar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Items
        </Typography>
        <Form method="post">
          <Button type="submit">New</Button>
        </Form>
      </ResponsiveAppBar>
      <br />
      {itemArea}
    </>
  )
}

function ItemCard(props) {
  const { item } = props
  // placeholder images.
  return (
    <Card className="card item-card">
      <img src="https://picsum.photos/200" />
      <h3>{item.name}</h3>
      <br />
      <a>{item.description}</a>
    </Card>
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

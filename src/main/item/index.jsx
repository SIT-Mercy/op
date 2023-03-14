import { useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  backend, env, i18n,
} from "../../env"
import {
  authFetch,
  authScoped,
} from "../../request"
import { ResponsiveAppBar } from "../dashboard";
import { NewItemDialog } from "./new"
import "./index.css"

export const loader = authScoped(async ({ request, params }) => {
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
  const { items } = useLoaderData()
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false)
  const alterItems = env.loginInfo.permissions.includes("alterItems")
  let itemArea
  if (items.length === 0) {
    itemArea = <p>No item.</p>
  } else {
    itemArea = <ul className="item-grid">
      {
        items.map(item => <ItemCard alterItems={alterItems} key={item._id} item={item} />)
      }
    </ul>
  }
  return (
    <>
      <ResponsiveAppBar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {i18n.get("items.title")}
        </Typography>
        {alterItems &&
          <Button type="submit" onClick={() => {
            setIsNewItemDialogOpen(true)
          }}>
            {i18n.get("items.newBtn")}
          </Button>
        }
      </ResponsiveAppBar>
      {itemArea}
      <NewItemDialog
        open={isNewItemDialogOpen}
        onClose={() => {
          setIsNewItemDialogOpen(false)
        }}
      />
    </>
  )
}

function ItemCard(props) {
  const { item } = props
  const navigate = useNavigate()

  const deleteItem = authScoped(navigate, async () => {
    const response = await authFetch(backend.deleteItem, {
      method: "DELETE",
      body: JSON.stringify({
        _id: item._id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res = await response.json()
    navigate(".")
  })
  // TODO:placeholder images.
  return (
    <Card className="card item-card">
      <CardMedia>
        <img src="https://picsum.photos/200" />
      </CardMedia>
      <CardContent>
        <h3>{item.name}</h3>
        <h5>Price {item.price}</h5>
        <h5>Rent {item.rent}</h5>
        <a>{item.description}</a>
      </CardContent>
      <CardActions>
        {props.alterItems &&
          <Button size="small">
            Edit
          </Button>
        }
        {props.alterItems &&
          <Button size="small" color="error" onClick={deleteItem}>
            Delete
          </Button>}
      </CardActions>
    </Card>
  )
}


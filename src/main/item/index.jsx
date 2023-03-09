import {
  Form,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { backend } from "../../env"

export function newItemAction({ request }) {
  console.log(request)
  return redirect("new")
}

export async function loader({ request, params }) {
  const jwt = localStorage.getItem('jwt');
  const response = await fetch(backend.items, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  })
  const items = await response.json()
  return { items }
}

export function ItemList(props) {
  const { items } = useLoaderData();
  console.log(items)
  return (<div>
    <Header></Header>
  </div>)
}

function Header(props) {
  return (<div>
    <Form method="post">
      <button type="submit">New</button>
    </Form>
  </div>)
}

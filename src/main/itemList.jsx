import {
  useLoaderData,
} from "react-router-dom";
import { backend } from "../env"

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
  return "AAA"
}
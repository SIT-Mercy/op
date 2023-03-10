import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

import {
  backend,
} from "../../env"
import {
  authFetch, withAuth
} from "../../request"

export const action = withAuth(async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const response = await authFetch(backend.addItem, {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      description: data.description,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const res = await response.json()
  return redirect("../items")
})

export function NewItem() {
  const navigate = useNavigate();

  return (
    <Form method="post" id="new-item-form">
      <p>
        <span>Name</span>
        <input
          required
          placeholder="Item"
          aria-label="Item name"
          type="text"
          name="name"
        />
        <br />
        <span>Description</span>
        <textarea
          placeholder="Description"
          aria-label="Item description"
          type="text"
          name="description"
          rows={6}
        />
      </p>
      <br />
      <p>
        <button type="submit">Add</button>
        <button type="button"
          onClick={() => {
            navigate(-1);
          }}>
          Cancel
        </button>
      </p>
    </Form>
  );
}
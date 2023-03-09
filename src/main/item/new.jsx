import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates)
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function NewItem() {
  const navigate = useNavigate();

  return (
    <Form method="post" id="new-item-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Item"
          aria-label="Item name"
          type="text"
          name="name"
        />
        <span>Description</span>
        <input
          placeholder="Description"
          aria-label="Item description"
          type="text"
          name="description"
        />
      </p>
      <p>
        <button type="submit">Save</button>
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
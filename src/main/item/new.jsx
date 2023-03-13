import {
  Form,
  useSubmit,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import { Button, Typography } from "@mui/material";
import {
  backend,
} from "../../env"
import {
  authFetch, withAuth
} from "../../request"
import { ResponsiveAppBar } from "../dashboard"
import { useForm } from "react-hook-form";

export const action = withAuth(async ({ request }) => {
  console.log(request)
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

export function NewItemPanel() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const submit = useSubmit()
  const onSubmit = (data, event) => {
    submit(event.target)
    console.log(data, event)
  };

  const editingForm =
    <Form id="new-item-form" onSubmit={handleSubmit(onSubmit)} style={{ flexDirection: "column", display: "flex" }}>
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Name"
        {...register("name", { required: true })}
      />
      {/* include validation with required or other standard HTML validation rules */}
      <textarea
        style={{ resize: "none" }} rows={6} placeholder="Description"
        {...register("description", { required: true })} />
    </Form>
  return <>
    <ResponsiveAppBar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Add a New Item
      </Typography>
      <Form method="post">
        <Button Form="new-item-form" type="submit">
          Add
        </Button>
      </Form>
    </ResponsiveAppBar>
    {editingForm}
  </>
}
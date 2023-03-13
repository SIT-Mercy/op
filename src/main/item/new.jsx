import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, Typography } from "@mui/material"
import {
  backend,
} from "../../env"
import {
  authFetch
} from "../../request"
import { useForm } from "react-hook-form"

export function NewItemDialog(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data, event) => {
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
  }
  return <Dialog open={props.open} onClose={props.onClose}>
    <form id="new-item-form" onSubmit={handleSubmit(onSubmit)} style={{ flexDirection: "column", display: "flex" }}>
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="Name"
        {...register("name", { required: true })}
      />
      {/* include validation with required or other standard HTML validation rules */}
      <textarea
        style={{ resize: "none" }} rows={6} placeholder="Description"
        {...register("description", { required: true })} />
      <button type="submit">Add</button>
    </form>
  </Dialog>
}
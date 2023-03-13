import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import {
  backend,
} from "../../env"
import {
  authFetch, withAuth
} from "../../request"
import { useForm } from "react-hook-form"
import "./new.css"
export function NewItemDialog(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = withAuth(navigate, async (data, event) => {
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
    props.onClose()
  })
  return <Dialog className="new-item-dialog" open={props.open} onClose={props.onClose}>
    <form id="new-item-form" onSubmit={handleSubmit(onSubmit)} style={{ flexDirection: "column", display: "flex" }}>
      <input placeholder="Name"
        {...register("name", { required: true })}
      />
      <textarea
        style={{ resize: "none" }} rows={6} placeholder="Description"
        {...register("description", { required: true })} />
      <button type="submit">Add</button>
    </form>
  </Dialog>
}
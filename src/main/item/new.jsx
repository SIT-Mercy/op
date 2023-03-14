import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, TextField, Typography } from "@mui/material"
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
    navigate(".")
    props.onClose()
  })
  return <Dialog className="new-item-dialog" open={props.open} onClose={props.onClose}>
    <form id="new-item-form" onSubmit={handleSubmit(onSubmit)} style={{ flexDirection: "column", display: "flex"}}>
      <TextField label="Name"
        {...register("name", { required: true })}
      />
      <TextField multiline
        style={{ resize: "none" }} rows={6} label="Description"
        {...register("description", { required: true })} />
      <Button type="submit">Add</Button>
    </form>
  </Dialog>
}
import { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, FormControl, FormControlLabel, FormGroup, Switch, TextField, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import {
  backend, i18n,
} from "../../env"
import {
  authFetch, authScoped
} from "../../request"
import { Controller, useForm } from "react-hook-form"
import "./new.css"
export function NewItemDialog(props) {
  const { register, handleSubmit, watch, formState } = useForm();
  const { errors } = formState;
  const [purchasable, setPurchasable] = useState(true)
  const [rentable, setRentable] = useState(false)
  const navigate = useNavigate()
  const onSubmit = authScoped(navigate, async (data, event) => {
    const response = await authFetch(backend.addItem, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        price: data.price ? parseInt(data.price) : null,
        rent: data.rent ? parseInt(data.rent) : null,
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
    <DialogTitle>{i18n.get("items.new.title")}</DialogTitle>
    <form id="new-item-form" onSubmit={handleSubmit(onSubmit)} style={{ flexDirection: "column", display: "flex" }}>
      <TextField variant="filled" label={i18n.get("item.name")}
        {...register("name", { required: true })}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField variant="filled" {...register("price")} label={"Price"} disabled={!purchasable} />
        <Switch
          checked={purchasable}
          onChange={(e) => {
            setPurchasable(e.target.checked)
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField variant="filled" {...register("rent")} label={"Rent"} disabled={!rentable} />
        <Switch
          checked={rentable}
          onChange={(e) => {
            setRentable(e.target.checked)
          }}
        />
      </div>
      <TextField variant="filled" multiline
        style={{ resize: "none" }} rows={6} label={i18n.get("item.description")}
        {...register("description", { required: true })} />
      <Button type="submit">{i18n.get("items.new.addBtn")}</Button>
    </form>
  </Dialog>
}
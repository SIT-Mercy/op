import { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, Switch, TextField, Typography } from "@mui/material"
import { i18n } from "../../env"
import { useForm } from "react-hook-form"

export function ItemEditorDialog(props) {
  const { register, handleSubmit, watch, formState } = useForm();
  const { errors } = formState;
  const item = props.item;
  const [purchasable, setPurchasable] = useState(item !== undefined ? item.price !== undefined : true)
  
  const [rentable, setRentable] = useState(item !== undefined ? item.rent !== undefined : false)

  return <Dialog className="new-item-dialog" open={props.open} onClose={props.onClose}>
    <DialogTitle>{props.title}</DialogTitle>
    <form id="new-item-form" onSubmit={handleSubmit(props.onSubmit)} style={{ flexDirection: "column", display: "flex" }}>
      <TextField variant="filled"
        label={i18n.get("item.name")}
        defaultValue={props.item?.name}
        {...register("name", { required: true })}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField variant="filled"
          {...register("price")}
          label={"Price"} disabled={!purchasable}
          defaultValue={item?.price} />
        <Switch
          checked={purchasable}
          onChange={(e) => {
            setPurchasable(e.target.checked)
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField variant="filled"
          {...register("rent")}
          label={"Rent"}
          disabled={!rentable}
          defaultValue={item?.price}
        />
        <Switch
          checked={rentable}
          onChange={(e) => {
            setRentable(e.target.checked)
          }}
        />
      </div>
      <TextField variant="filled" multiline
        style={{ resize: "none" }} rows={6}
        label={i18n.get("item.description")}
        {...register("description", { required: true })}
        defaultValue={props.item?.description} />
      <Button type="submit">{props.button}</Button>
    </form>
  </Dialog>
}
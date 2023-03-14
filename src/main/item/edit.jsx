import { useNavigate } from 'react-router-dom'
import {
  backend, i18n,
} from "../../env"
import {
  authFetch, authScoped
} from "../../request"

import { ItemEditorDialog } from './item-editor'
export function EditItemDialog(props) {
  const navigate = useNavigate()

  const onSubmit = authScoped(navigate, async (data, event) => {
    const response = await authFetch(backend.updateItem, {
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
  return <ItemEditorDialog {...props}
    title={i18n.get("items.edit.title")}
    button={i18n.get("items.edit.updateBtn")}
    onSubmit={onSubmit}
  />
}
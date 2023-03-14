import { createI18n } from "./i18n"
const root = import.meta.env.VITE_BACKEND_URL
export const backend = {
  root,
  validate: `${root}/op/validate`,
  login: `${root}/op/login`,
  items: `${root}/op/items`,
  addItem: `${root}/op/item/add`,
  updateItem: `${root}/op/item/update`,
  deleteItem: `${root}/op/item/delete`,
  students: `${root}/op/students`,
}
import l10nEn from "./assets/l10n/en"
import l10nZh from "./assets/l10n/zh"
export const { i18n, i18nProxy } = createI18n({
  defaultLocale: "en-US",
  defaultL10n: l10nEn,
})
i18n.add("zh-CN", l10nZh)
i18n.currentLocale = navigator.language

export const env = {
  get loginInfo() {
    return JSON.parse(localStorage.getItem("loginInfo"))
  },
  set loginInfo(value) {
    if (value === null || value === undefined) {
      localStorage.removeItem("loginInfo")
    } else {
      localStorage.setItem("loginInfo", JSON.stringify(value))
    }
  }
}

const root = import.meta.env.VITE_BACKEND_URL
export const backend = {
  root,
  login: `${root}/op/login`,
  items: `${root}/op/items`,
}
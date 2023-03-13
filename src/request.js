import {
  redirect
} from "react-router-dom";
import { env } from "./env";

export function composeAuthHeader(jwt) {
  jwt = jwt;
  return `Bearer ${jwt}`
}

export class AuthError extends Error {
  constructor(message) {
    super(message)
  }
}

export async function authFetch(url, init) {
  init.headers["Authorization"] = composeAuthHeader(env.loginInfo.jwt)
  const response = await fetch(url, init)
  if (response.ok) {
    return response
  } else {
    const payload = await response.json()
    throw new AuthError(payload.error)
  }
}

export function withAuth(func) {
  return async (...args) => {
    try {
      return await func(...args)
    } catch (e) {
      console.error(e.message)
      return redirect("/")
    }
  }
}
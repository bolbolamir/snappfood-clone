import type { ActionArgs } from "@remix-run/node"

import { redirect } from "@remix-run/node"

import { logout } from "../utils/session.server"

import { routes } from "../routes"

export const action = async ({ request }: ActionArgs) => logout(request)

export const loader = async () => redirect(routes.index)

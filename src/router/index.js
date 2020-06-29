import Home from '../components/Home.svelte'
import AdminPanel from '../components/AdminPanel.svelte'

import { writable } from 'svelte/store'

const router = {
  '/': Home,
  '/#/admin': AdminPanel
}

export default router

export const curRoute = writable('/#/home')

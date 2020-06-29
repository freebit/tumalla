import { writable } from 'svelte/store'

export const authToken = writable(undefined)

export const user = writable({})
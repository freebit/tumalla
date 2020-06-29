import App from './App.svelte';
import { authToken } from './store/index.js'

const app = new App({
  target: document.body
});

document.addEventListener('DOMContentLoaded', () => {
  authToken.set(localStorage.getItem('token'))
})



export default app;
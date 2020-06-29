<template>
  <h3>Вход в панель</h3>
  {#if isLogin}

    <h2>Logged</h2>

  {:else}
    <form on:submit|preventDefault={handleSubmit} id="auth-form" >
      <div class="field">
        <label for="login">Login</label>
        <input id="login" type="text" bind:value={logname} name="logname">
      </div>
      <div class="field">
        <label for="pass">Password</label>
        <input id="pass" type="password" bind:value={password} name="password">
      </div>
      <div class="field">
        <button type="submit">Log In</button>
      </div>
    </form>
  {/if}
</template>

<script>
  import { onMount } from 'svelte'
  import { authToken } from '../store/index.js'
  import api from '../api'

  let logname = ''
  let password = ''
  let isLogin = false

  onMount(() => {
    logname = 'roman'
    password = 'roman&&chudoudo'

    me()
  })

  // authToken.subscribe((token) => {
  //   console.log('jwt token -', token)
  //   token && (isLogin = true)
  // })

  async function me() {
    const response = await api.auth.me();
    if(response.ok) {
      // isLogin = true
      const { data } = await response.json();
      console.log('me -', data, isLogin)
    } else {
      console.log('me -', 'no data')
    }
  }

  async function handleSubmit(evt) {
    const response = await api.auth.login(new FormData(evt.target));
    const { data } = await response.json();
    localStorage.setItem('token', data.jwt)
  }
</script>
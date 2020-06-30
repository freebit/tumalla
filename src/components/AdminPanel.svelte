<template>
  {#if isLoading}
    <h2>Loading...</h2>
  {/if}

  {#if isLogin && !isLoading}
    <h2>Logged</h2>
  {/if}

  {#if !isLogin && !isLoading}
    <LoginForm
      on:startLogin={startLoading}
      on:stopLogin={stopLoading}
      on:success={successLogin}
      on:fail={failLogin}
    />
  {/if}

</template>

<script>
  import { onMount } from 'svelte'
  import { authToken } from '../store/index.js'
  import api from '../api'

  import LoginForm from './LoginForm.svelte'

  let isLoading = false
  let isLogin = false

  onMount(() => {
    me()
  })

  // authToken.subscribe((token) => {
  //   console.log('jwt token -', token)
  //   token && (isLogin = true)
  // })

  function eventHandler(event) {
    alert(event.detail.payload)
  }

  const startLoading = () => isLoading = true
  const stopLoading = () => isLoading = false
  const successLogin = () => isLogin = true
  const failLogin = () => isLogin = false

  async function me() {
    isLoading = true
    const response = await api.auth.me();
    isLoading = false
    if(response.ok) {
      isLogin = true
      const { data } = await response.json();
      console.log('me -', data, isLogin)
    } else {
      isLogin = false
      console.log('me -', 'no data')
    }
  }

  async function handleSubmit(evt) {
    isLoading = true
    const response = await api.auth.login(new FormData(evt.target));
    isLoading = false
    if(response.ok) {
      isLogin = true
      const { data } = await response.json()
      localStorage.setItem('token', data.jwt)
    } else {
      isLogin = false
      errorMessage = 'Неверный логин или пароль'
    }
  }
</script>

<style lang="scss">

</style>
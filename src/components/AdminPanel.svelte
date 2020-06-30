<template>
  {#if isLogin}
    <h2>Logged</h2>
  {/if}

  {#if !isLogin && !isChecking}
    <LoginForm
      on:startLogin={startLoading}
      on:stopLogin={stopLoading}
      on:success={successLogin}
    />
  {/if}
</template>

<script>
  import { onMount } from 'svelte'
  import { authToken } from '../store/index.js'
  import api from '../api'

  import LoginForm from './LoginForm.svelte'

  let isChecking = true
  let isLogin = false

  onMount(async () => {
    await me()
    isChecking = false
  })

  const startLoading = () => isLoading = true
  const stopLoading = () => isLoading = false
  const successLogin = () => isLogin = true
  const failLogin = () => isLogin = false

  async function me() {
    const response = await api.auth.me();
    if(response.ok) {
      isLogin = true
      const { data } = await response.json();
      console.log('me -', data, isLogin)
    } else {
      isLogin = false
      console.log('me -', 'no data')
    }
  }

</script>

<style lang="scss">

</style>
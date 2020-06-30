<div class="login-form">
  {#if isLoading}
    <h2>Loading...</h2>
  {:else}
    <form on:submit|preventDefault={handleSubmit} id="auth-form" >
      <div class="field">
        <label for="login">Username</label>
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
  <div class="error-message">{ errorMessage }</div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import api from '../api'

  const dispatch = createEventDispatcher();

  let logname = 'roman'
  let password = 'roman&&chudoudo'

  let isLoading = false
  let errorMessage = ''

  async function handleSubmit(evt) {
    isLoading = true
    const response = await api.auth.login(new FormData(evt.target));
    isLoading = false
    if(response.ok) {
      const { data } = await response.json()
      localStorage.setItem('token', data.jwt)
      dispatch('success', { payload: 'success' })
    } else {
      errorMessage = 'Неверный логин или пароль'
      // dispatch('fail', { payload: 'fail' })
    }
  }
</script>


<style lang="scss">
  .login-form {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 50%;
    margin: 0 auto;
  }

  .error-message {
    font-family: monospace;
    color: darkmagenta;
  }
</style>
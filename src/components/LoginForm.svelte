<div class="login-form">
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
  <div>{ errorMessage }</div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import api from '../api'

  const dispatch = createEventDispatcher();

  let logname = 'roman'
  let password = 'roman&&chudoudo'
  let errorMessage = ''

  async function handleSubmit(evt) {
    dispatch('startLogin', { payload: 'startLogin' })
    const response = await api.auth.login(new FormData(evt.target));
    dispatch('stopLogin', { payload: 'stopLogin' })
    if(response.ok) {
      const { data } = await response.json()
      localStorage.setItem('token', data.jwt)
      dispatch('success', { payload: 'success' })
    } else {
      errorMessage = 'Неверный логин или пароль'
      dispatch('fail', { payload: 'fail' })
    }
  }
</script>


<style lang="scss">
  .login-form {
    position: relative;
    width: 25%;
    margin: 0 auto;
  }
</style>
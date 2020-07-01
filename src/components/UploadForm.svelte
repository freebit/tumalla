<div class="upload-form">
  <form on:submit|preventDefault={handleSubmit} id="upload-form" enctype="multipart/form-data">
    <div class="field">
      <label for="title">Заголовок изображения</label>
      <input id="title" type="text" bind:value={title} name="title">
    </div>
    <div class="field">
      <!-- <label for="file">Выберите файл</label> -->
      <input id="file" type="file" bind:value={file} name="file" accept="image/*" on:input={handleFileInput}>
    </div>
    <div class="field">
      <button type="submit">Upload</button>
    </div>
  </form>
  <div class="file-list">
    <img src="{fileSrc}" alt="">
  </div>
</div>

<script>
  import api from '../api'

  let title = ''
  let file = null
  let fileSrc = null

  function handleFileInput (evt) {
    URL.revokeObjectURL(fileSrc)
    fileSrc = URL.createObjectURL(evt.srcElement.files[0])
    console.log('file input -', fileSrc)
  }

  async function handleSubmit(evt) {
    const response = await api.upload(new FormData(evt.target))
    console.log('upload -', response)
  }
</script>

<style>

  .file-list {
    position: relative;
    height: 100px;
  }

  .file-list img {
    position: relative;
    max-height: 100%;
  }
</style>
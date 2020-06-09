<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Профиль</h3>
      </div>
      
      <form class="form">
        <div class="input-field">
          <input 
            id="description" 
            type="text" 
            v-model="profileName"
            
          />
          <label for="description">Имя</label>
          <span class="helper-text invalid" >name</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate'
export default {
  data() {
    return {
      profileName: ''
    }
  },

}
</script>
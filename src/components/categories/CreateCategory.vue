<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Створити</h4>
      </div>
      <form>
        <div class="input-field">
          <input id="name" type="text" v-model="title"/>
          <label for="name">Назва</label>
          <span class="helper-text invalid" v-if="!this.$v.title.required && this.$v.title.$dirty">Введіть назву категорії</span>
        </div>
        

        <div class="input-field">
          <input id="limit" type="number"  v-model.number="limit"/>
          <label for="limit">Ліміт</label>
          <span class="helper-text invalid" v-if="!this.$v.limit.required && !this.$v.limit.minValue">Мінімальне значення не меньше {{this.$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit" @click.prevent="buttonHandler">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
export default {
   data() {
      return {
         title: '',
         limit: 100,

      }
   },
   validations: {
      title: {
         required,
      },
      limit: {
         minValue: minValue(100)
      }

   },
   mounted(){
      M.updateTextFields()
   },
   methods: {
      async buttonHandler() {
         if(this.$v.$invalid) {
            console.log(this.$v)
            this.$v.$touch()
            return 
         }
         const newCategory = await this.$store.dispatch('CreateCategorie', {
            title: this.title,
            limit: this.limit
         } )
         this.title = ''
         this.limit = 100
         this.$v.$reset()
         this.$message('Категорія Створена :)')
         this.$emit('created',newCategory)

      }
   }
}
</script>

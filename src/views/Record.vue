<template>
  <div class="app-page">
    <Loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">
      Котегорій поки що немає. Щоб створити категорію перейдіть
      <router-link to="/categories">СЮДИ</router-link>
    </p>
    <div v-else>
      <div class="page-title">
        <h3>Новий запис</h3>
      </div>
      <form class="form" @submit.prevent="submitHundler">
        <div class="input-field">
          <select ref="select" v-model="category">
            <option
              v-for="elem of categories"
              :key="elem.id"
              :value="elem.id"
              >{{ elem.title }}</option
            >
          </select>
          <label>Виберіть категорію</label>
        </div>
        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
              
            />
            <span>Дохід</span>
          </label>
        </p>
        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>Витрати</span>
          </label>
        </p>
        <div class="input-field">
          <input 
            id="amount" 
            type="number" 
            v-model.number="count"
            :class="{invalid : (!this.$v.count.required && this.$v.count.$dirty) || (!this.$v.count.minValue && this.$v.count.$dirty)}"
          />
          <label for="amount">Сумма</label>
          <span class="helper-text invalid" v-if="!this.$v.count.required && this.$v.count.$dirty || !this.$v.count.minValue && this.$v.count.$dirty">Мінімальне значення не меньше {{this.$v.count.$params.minValue.min}}</span>
        </div>

        <div class="input-field">
          <input 
            id="description" 
            type="text" 
            v-model="description"
            :class="{invalid: !this.$v.description.required && this.$v.description.$dirty}"
          />
          <label for="description">Описание</label> 
          <span class="helper-text invalid" v-if="!this.$v.description.required && this.$v.description.$dirty">Завповніть будь-ласка це поле</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit" @click.prevent="submitHundler">
          Створити
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      isLoading: true,
      categories: [],
      select: "",
      category: null,
      type: "income",
      count: 0,
      description: "",
    };
  },
  validations: {  
    count: {required, minValue: minValue(10)},
    description: {required},
  },
  async mounted() {
    
    this.categories = await this.$store.dispatch("fetchCategory");
    this.isLoading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
    
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type === 'income') {
        return true
      }
      console.log('hqwe')
        return  this.count  <= this.info.account
    }
  },
  methods: {
    async submitHundler () {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return 
      }
      if(this.canCreateRecord) {
          await this.$store.dispatch('createRecord', {
          categoryId: this.category,
          count: this.count,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        })

          const account = this.type === 'income'
          ? this.info.account + this.count
          : this.info.account - this.count
          
          await this.$store.dispatch('updateCount', {account})
          this.$message('Запис успішно створено')
          this.$v.$reset()  
          this.count = 0
          this.description = ''
       
        
      } else {
        this.$message(`Не достатньо коштів на рахунку (${ this.count - this.info.account} UAH)`)
        console.log(this.count, this.info.account)
      }
    }
  }
  
};
</script>

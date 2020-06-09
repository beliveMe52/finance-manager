<template>
  <div>
    <form class="card auth-card"  >
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input id="email" type="text" v-model.trim="email" :class="{invalid: ( $v.email.$dirty && !$v.email.required ) || ($v.email.$dirty && !$v.email.email)}"/>
          <label for="email">Email</label>

          <small class="helper-text invalid"   v-if="$v.email.$dirty && !$v.email.email">Введіть будь-ласка коректний Email</small>
          <small class="helper-text invalid"   v-if="$v.email.$dirty && !$v.email.required">Введіть будь-ласка Email</small>

        </div>
        <div class="input-field">
          <input 
          id="password" 
          type="password" 
          :class="{
            invalid: ($v.password.$dirty && !$v.password.required) 
                  || ($v.password.$dirty && !$v.password.minLength)}"
          v-model.trim="password"        
                  />
          <label for="password">Пароль</label>
          <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введіть будь-ласка пароль</small>
          <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">
            Пароль повинен містити {{this.$v.password.$params.minLength.min}} символів
          </small>  
        </div>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            @click.prevent="hendlerSubmit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { required, minLength, between, email } from "vuelidate/lib/validators";
import messages from "@/common/messages";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  validations: {
    email: {
        required,
        email,
      },  
      password: {
        required,
        minLength: minLength(6),
      }
  },

  methods: {
      async hendlerSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        console.log(this.$v)
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        console.log(formData)
        await this.$store.dispatch('login',formData)
        this.$router.push('/')
      } catch (error) {}
    }
  },
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
}
</script>
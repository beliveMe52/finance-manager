<template>
  <div>
    <form class="card auth-card" @click.prevent="hendlerSubmit">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <label for="email">Email</label>

          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.email"
            >Введіть будь-ласка коректний Email</small
          >
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
            >Введіть будь-ласка Email</small
          >
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            :class="{
              invalid:
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength),
            }"
            v-model.trim="password"
          />
          <label for="password">Пароль</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
            >Введіть будь-ласка пароль</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
          >
            Пароль повинен містити
            {{ this.$v.password.$params.minLength.min }} символів
          </small>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{
              invalid:
                ($v.name.$dirty && !$v.name.required) ||
                ($v.name.$dirty && !$v.name.minLength),
            }"
          />
          <label for="name">Имя</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
            >Введіть ім`я</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.name.$dirty && !$v.name.minLength"
            >Ім`я повинне містити
            {{ this.$v.name.$params.minLength.min }} символів.
          </small>
        </div>
        <p @click.prevent="changeCheckbox">
          <label  >
            <input type="checkbox"  v-model="agree" />
            <span>Yellow</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
      minLength: minLength(4),
    },
    agree: { checked: (v) => v },
  },
  methods: {
     hendlerSubmit: async function() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
        this.$message("Ви успішно зареєструвались");
      } catch (error) {}
    },
    changeCheckbox: function() {
      this.agree = !this.agree
    }
  },
};
</script>

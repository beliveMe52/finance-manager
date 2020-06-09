<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редагувати</h4>
      </div>
      <form @submit="submitHundler">
        <div class="input-field">
          <select ref="select" v-model="current" :disabled="disabled" value="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{
              c.title
            }}</option>
          </select>
          <label>Виберіть категорію</label>
        </div>
        <div class="input-field">
          <input id="name" type="text" v-model="title" :disabled="disabled"/>
          <label for="name">Назва</label>
          <span
            class="helper-text invalid"
            v-if="!this.$v.title.required && this.$v.title.$dirty"
            >Введіть назву категорії</span
          >
        </div>
        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit" :disabled="disabled"/>
          <label for="limit">Ліміт</label>
          <span
            class="helper-text invalid"
            v-if="!this.$v.limit.required && !this.$v.limit.minValue"
            >Мінімальне значення не меньше
            {{ this.$v.limit.$params.minValue.min }}</span
          >
        </div>
        <button
          class="btn waves-effect waves-light"
          type="submit"
          @click.prevent="submitHundler"
        >
          Обновити
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      current: null,
      disabled: false,

    };
  },
  watch: {
    current(catId) {
      const { id, limit, title } = this.categories.find(
        (key) => key.id === catId
      );

      this.limit = limit;
      this.title = title;
    },
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  validations: {
    title: {
      required,
    },
    limit: {
      minValue: minValue(100),
    },
  },
  created() {
    if(!this.categories) {
      this.disabled = true
    }
    const { id, limit, title } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
    }, 0);
    M.updateTextFields();
  },
  methods: {
    async submitHundler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };
      console.log(categoryData);
      try {
        await this.$store.dispatch("updateCategories", categoryData);
        this.$message("Категория успешно обновлена");
        this.$emit("updated", categoryData);
      } catch (error) {}
    },
  },
  destroyed() {
      this.select.destroy();
    },
};
</script>

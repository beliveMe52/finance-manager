<template>
  <div class="app-main-layout">
    <Loader v-if="isLoading"/>
    <div v-else>
      <Navbar @toggleSidebar="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }" >
        <div class="app-page">
          <div>
            <router-view></router-view>
          </div>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link to="/record" class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import messages from "@/common/messages"
export default {
  name: "main-layout",
  data() {
    return {
      isOpen: true,
      isLoading: true,
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
      console.log("hello");
    }
    this.isLoading = false;
  },
  computed: {
      error() {
         return this.$store.getters.error
      }
   },
   watch: {
      error(fbError) {
         this.$error(messages[fbError.code] || `Невідома помилка`)
      }
   }
};
</script>

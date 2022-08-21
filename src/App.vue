<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="row">
      <div class="col-6" v-for="b in ads" :key="b.banner">
        <AdCard :banner="b" />

      </div>


    </div>

  </footer>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import AdCard from './components/AdCard.vue';
import { adsService } from './services/AdsService';
import { logger } from './utils/Logger';
import Pop from './utils/Pop';


export default {
  name: "App",
  setup() {
    onMounted(async () => {
      try {
        await adsService.getAds();
      } catch (error) {
        logger.error(error);
        Pop.error(error);

      }
    })
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.banners),

    };
  },
  components: { AdCard, AdCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>

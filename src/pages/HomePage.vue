<template>
  <div class="container">

    <div class="row">
      <div class="d-flex justify-content-around my-3">
        <button class="btn btn-info" @click="changePage(older)" :disabled="!older">
          older
        </button>
        <button v-if="newer" class="btn btn-info" @click="changePage(newer)">newer</button>
      </div>
      <div class="col-md-10 m-auto my-3">
        <PostForm />
      </div>
      <div class="col-md-10" v-for="p in post" :key="p.id">
        <PostCard :post="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    async function changePage(page) {
      try {
        await this.postsService.changePage(page)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message, 'error')

      }
    }



    async function getPost() {
      try {
        await postsService.getPost()
      } catch (error) {
        logger.error('Getting Post', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getPost()
      changePage()
    })

    return {

      post: computed(() => AppState.post),
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),

    }
  }
}
</script>

<style scoped lang="scss">
</style>

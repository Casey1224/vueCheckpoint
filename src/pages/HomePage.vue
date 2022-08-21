<template>
  <div class="container">

    <div class="row">
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
    })

    return {
      post: computed(() => AppState.post)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

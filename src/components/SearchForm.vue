<template>
    <div class="search-form">
        <form @submit.prevent="searchPost">
            <div class="input-group">
                <input class="form-control" type="text" required v-model="query" />
                <button class="btn btn-outline-success" type="submit">
                    <i class="mdi mdi-magnify"></i>
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
    setup() {
        const query = ref('')

        return {
            query,
            async searchPost() {
                try {
                    await postsService.getPostBySearch(query.value)
                    query.value = ''
                } catch (error) {
                    logger.error('[Searching Post]', error)
                    Pop.error(error)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped>
</style>

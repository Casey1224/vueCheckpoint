<template>
    <div class="post-card card selectable">
        <div class="card-body">
            <div class="card-title">
                <h6 class="text-uppercase text-light">
                    {{ post.body }} - {{ new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day:
                                'numeric'
                        })
                    }}
                </h6>



                <div class="post-creator" v-if="post.creator">
                    <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
                        <img :src="post.creator.picture" alt="" :title="post.creator.name"
                            class="selectable elevation-2">
                    </router-link>
                </div>

                <div v-if="post.creator.id == account.id">
                    <button @click="toggleEdit">Edit</button>
                    <PostForm v-if="editing" />
                    <button class="btn btn-danger" @click="deletePost(post)">delete</button>
                </div>
                <div class="text-light">
                    <button class="btn btn-info" @click="like(post.id)">👍</button>
                    {{ post.likes.length }}
                </div>



            </div>
        </div>
    </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop';
import { objectToString } from '@vue/shared';

export default {
    props: {
        post: { type: Post, required: true }
    },
    setup(props) {


        const editing = ref(false)

        return {

            editing,
            account: computed(() => AppState.account),
            cover: computed(() => `url(${props.post.imgUrl})`),
            toggleEdit() {
                AppState.activePost = props.post
                this.editing = !this.editing
            },
            async deletePost(post) {
                try {
                    const yes = await Pop.confirm('Delete the post?')
                    if (!yes) { return }
                    await postsService.deletePost(post.id)
                } catch (error) {
                    logger.error('[Deleting Post]', error)
                    Pop.error(error)
                }
            },
            async like() {
                try {
                    await postsService.like(props.post.id)
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, "error")

                }
            },

        }
    }
}
</script>


<style lang="scss" scoped>
.post-card {
    min-height: 300px;
    background-image: v-bind(cover) !important;
    background-size: cover;
    background-position: center;
    margin-bottom: 3rem;

    position: relative;
}

.post-creator {
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    img {
        transition: all .15s linear;
        border-radius: 50px;
        height: 45px;
        width: 45px;
        object-fit: cover;
        object-position: center;

        &:hover {
            transform: translateY(-3px);
        }
    }
}
</style>

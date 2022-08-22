import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger"
class PostsService {

    async getPost() {
        const res = await api.get('api/posts')

        AppState.post = res.data.posts.map(p => new Post(p))

        logger.log(res.data)
    }
    async getPostBySearch(searchTerm) {
        const res = await api.get('/api/posts', {
            params: {
                query: searchTerm
            }
        })
        AppState.post = res.data.posts.map(p => new Post(p))
    }

    async getPostByCreatorId(creatorId) {
        const res = await api.get('api/posts', {
            params: {
                creatorId
            }
        })
        AppState.profilePost = res.data.posts.map(p => new Post(p))
    }

    async createPost(postData) {
        const res = await api.post('/api/posts', postData)
        AppState.post.unshift(new Post(res.data))
    }

    async editPost(postData) {
        const res = await api.put(`api/posts/${postData.id}`, postData)

        const index = AppState.post.findIndex(p => p.id == postData.id)

        AppState.post.splice(index, 1, new Post(res.data))

    }
    async like(id) {
        const res = await api.post(`api/posts/${id}/like`)
        let post = AppState.post.find(p => p.id == id)
        post.likes = res.data.likes
    }


    async deletePost(postId) {
        let url = `api/posts/${postId}`
        await api.delete(url)
        AppState.post = AppState.post.filter(p => p.id != postId)
    }
    async changePage(page) {
        logger.log(page)
        const res = await api.get(page)
        AppState.post = res.data.posts
        AppState.newer = res.data.newer
        AppState.older = res.data.older
    }

}


export const postsService = new PostsService()

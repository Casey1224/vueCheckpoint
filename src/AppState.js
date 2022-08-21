import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},
  /**@type {import('./models/Post.js').Post[]} */
  post: [],
  /**@type {import('./models/Post.js').Post[]} */
  profilePost: [],
  /**@type {import('./models/Profile.js').Profile} */
  activeProfile: null,
  /**@type {import('./models/Ads.js').Ads[]} */
  banners: [],
})

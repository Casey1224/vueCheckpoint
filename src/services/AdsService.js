import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
class AdsService {

    async getAds() {
        const res = await api.get('api/ads')
        AppState.banners = res.data
    }
}

export const adsService = new AdsService()
<template>
    <div class="col-12 p-2">
        <img class="img-fluid" :src="banner.banner" alt="">

    </div>



</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { adsService } from "../services/AdsService.js";
import { AppState } from "../AppState";
export default {
    props: {
        banner: {
            type: Object, required: true,
        },
    },
    setup() {
        return {};
    }
}




</script>
<style lang="scss" scoped>
</style>
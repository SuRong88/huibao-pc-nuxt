<template>
    <div>
        <nuxt />
        <!-- <div v-show="show" @click="scrollTop" class="back-top-btn"></div> -->
    </div>
</template>
<script>
import URL from '~/plugins/url';
export default {
    components: {},

    head() {
        return {
            title: this.$store.state.webInfo.website_name,
            link: [
                {
                    rel: 'shortcut icon',
                    // type: 'image/x-icon',
                    href: this.$store.state.webInfo.website_icon
                }
            ]
        };
    },

    created() {
        this.$axios.get(URL.getWebInfo).then(res => {
            this.$store.commit('SET_WEBINFO', res.data);
        });
    },

    // mounted() {
    //     window.addEventListener('scroll',() => {
    //         this.show = document.documentElement.scrollTop > 500 ? true : false;
    //     })
    //     window.scroll();
    // },
    
    // data(){
    //     return{
    //         show:false
    //     }
    // },
    
    computed: {},

    methods: {
        scrollTop() {
            window.scroll(0, 0);
        }
    }
};
</script>

<style></style>

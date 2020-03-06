<template>
  <div>
    <h1>default-demo</h1>
    <nuxt />
  </div>
</template>
<script>
import URL from '~/plugins/url';
export default {
  name: 'default-demo',

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

  computed: {},

  methods: {}
};
</script>

<style></style>

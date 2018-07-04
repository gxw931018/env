<template>
  <div>
    <v-header :module='title'></v-header>
    <v-banner :listImg="listImg" :showLogin='true'></v-banner>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from '@/components/login/loginHeader.vue';
  import banner from '@/components/banner/banner.vue';
  import a from '@/components/banner/loginBanner.png';
  import footer from '@/components/footer/footer.vue';

  export default {
    name: 'App',
    data () {
      return {
        listImg: [{
          path: a
        }],
        title:'用户登录'
      }
    },
    components: {
      'v-header': header,
      'v-banner': banner,
      'v-footer': footer
    },
    created () {
      this.$util.goTop();
      this.bus.$on('change',function(title){
        console.log(title)
      })
    }
  }
</script>

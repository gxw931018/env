<template>
  <div>
    <v-header :module='title'></v-header>
    <v-register :csrxy="csrxy" :submit="submit"></v-register>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from '@/components/login/loginHeader.vue';
  import footer from '@/components/footer/footer.vue';
  import register from '@/components/register/registerContainer.vue';

  export default {
    name: 'App',
    data() {
      return {
        title:'用户注册',
        csrxy:true,
        submit:"注  册"
      }
    },
    components: {
      'v-header': header,
      'v-footer': footer,
      'v-register': register
    },
    created () {
      this.$util.goTop();
    }
  }
</script>

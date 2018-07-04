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
        title:'忘记密码',
        csrxy:false,
        submit:"确  认"
      }
    },
    components: {
      'v-header': header,
      'v-footer': footer,
      'v-register': register
    }
  }
</script>

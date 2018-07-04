<template>
  <div>
    <v-header :module='title'></v-header>
    <v-pwd :submit='submit'></v-pwd>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from '@/components/login/loginHeader.vue';
  import footer from '@/components/footer/footer.vue';
  import pwd from '@/components/pwdsuc/pwd.vue';

  export default {
    name: 'App',
    data() {
      return {
        title:this.$route.params.word=="注册"?"用户注册":"忘记密码",
        submit:this.$route.params.word
      }
    },
    components: {
      'v-header': header,
      'v-footer': footer,
      'v-pwd': pwd
    }
  }
</script>

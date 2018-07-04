<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="area">
        <div class="avatar">
          <img src='./logo.png' width="118" height="51" @click='goHome'>
          <div class="city">{{title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['module'],
    data () {
      return { title: this.module}
    },
    methods: {
      goHome () {
        this.$router.push({name:'home'});
      }
    }
  };
</script>
<style lang="less" src="@/common/less/login/loginHeader.less"></style>
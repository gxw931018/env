<template>
  <div class='tabItem'>
    <div class='header'></div>
    <div class='content'>
      <div class='first'></div>
      <div class='last'></div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['data'],
    created() {
    },
    methods: {
    }
  }
</script>

<style lang='less'>
  .tabItem{
    box-sizing:border-box;
    width:100%;
    div{
      box-sizing:border-box;
    }
    .header{
      margin-left:20px;
      border-bottom:1px solid #ddd;
      width:100%;
    }
  }
</style>

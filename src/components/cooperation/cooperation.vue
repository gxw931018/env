<template>
    <div class="cooperation">
      <p class="content">合作单位</p>
      <p class="english">Cooperative Unit</p>
      <div class="unit">
        <img src="./cooperation.png" alt="" width="808" height="">
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cooperation{
    width: 100%;
    min-width: 1366px;
    height: 820px;
    font-size: 24px;
    color: #f0871e;
    background: #fff;
    .content{
      margin: 0 0 24px;
      padding-top: 112px;
    }
    .english{
      margin-bottom: 95px;
    }
    .unit{
      width: 100%;
      min-width: 1366px;
      height: 540px;
      background: url("cooperation-bg.png") no-repeat;
      background-size: 100%;
      & > img{
        margin-top: 40px;
      }
    }
  }
</style>

<template>
    <div class="productContainer">
      <div class="productContent">
        <div class='title'>
          <span>产品说明</span>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="产品详情" name="1" v-html="xy.detail"></el-tab-pane>
          <el-tab-pane label="申请材料" name="2" v-html="xy.applyNeed"></el-tab-pane>
          <el-tab-pane label="贷款协议" name="3" v-html="xy.loadAgreement"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props:['xy'],
      data () {
        return {
          activeName: '1'
        };
      },
      created () {
        let me = this;
        let timer = setInterval(()=>{
          let tab_1= document.getElementById('tab-1');
          let tab_2= document.getElementById('tab-2');
          let tab_3= document.getElementById('tab-3');
          if(tab_1){
            tab_1.addEventListener('mouseenter',function(){
              tab_1.click();
            });
            tab_2.addEventListener('mouseenter',function(){
              tab_2.click();
            });
            tab_3.addEventListener('mouseenter',function(){
              tab_3.click();
            });
            clearInterval(timer);
          }
        },50);
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .productContainer{
    box-sizing:border-box;
    width:100%;
    min-width:1366px;
    padding:60px 0 0 0;
    .productContent{
      width:1000px;
      margin:0 auto;
      .title{
        width:100%;
        text-align:center;
        font-size:28px;
        margin-bottom:33px;
        color:#454545;
        font-weight:bold;
      }
      .content{
        width:100%;
        text-align:center;
        font-size:18px;
        margin-bottom:61px;
        color:#888;
      }
    }
  }
  .el-step__head.is-finish{
    color:#fff;
    border-color:rgba(240, 135, 30, 1);
  }
  .el-step__icon{
    background-color:rgba(240, 135, 30, 1);
    color:#fff;
  }
  .el-step__description.is-finish{
    color:#888;
  }
  .el-step__description{
    margin-top:20px;
  }
  .el-tabs__item{
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 30px;
      letter-spacing: 1.1px;
      color: #454545;
    &.is-active{
      color:#454545;
    }
    &:hover{
      color:#454545;
    }
  }
  .el-tabs__active-bar{
    background-color:rgba(240, 135, 30, 1);
    height:3px;
  }
  .el-tabs__content{
    text-align:left;
    height:300px;
  }
</style>

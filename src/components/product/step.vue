<template>
    <div class="stepContainer">
      <div class="step">
        <div class='title'>
          <span class='orange'>一周</span><span>之内确保资金到账</span>
        </div>
        <div class='content'>
          <span>我们向你承诺,除合同约定的利息以外,我们不收取任何费用</span>
        </div>
        <el-steps :active="active" align-center>
          <el-step description="选择产品"></el-step>
          <el-step description="填写申请资料"></el-step>
          <el-step description="平台初审"></el-step>
          <el-step description="银行授信"></el-step>
          <el-step description="贷款完成"></el-step>
        </el-steps>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          steps:[{title:'选择产品'},{title:'填写申请资料'},{title:'平台初审'},{title:'银行授信'},{title:'贷款完成'}],
          active:5
        };
      },
      created () {
      },
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .stepContainer{
    box-sizing:border-box;
    width:100%;
    min-width:1366px;
    height:336px;
    background-color:rgba(246, 246, 246, 1);
    padding:60px 0 0 0;
    .step{
      width:1000px;
      margin:0 auto;
      .title{
        width:100%;
        text-align:center;
        font-size:28px;
        margin-bottom:33px;
        .orange{
          color:#f0871e;
        }
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
</style>

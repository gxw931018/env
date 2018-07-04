<template>
  <div class="registerContainer">
    <div class="register">
      <div class="form">
        <div class="pwdSuc">
          <span class="el-icon-circle-check icon-large"></span><span>{{submit}}</span><span>成功,</span><span>{{sendMsg}}</span><span>s后返回登录页</span>
        </div>
        <div class="submit">
          <button @click="confirm">立即登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['submit'],
    data () {
      return {sendMsg:5};
    },
    methods : {
      confirm () {
        if(this.timer){
          clearInterval(this.timer);
        }
        this.$router.push("/login");
      },
      startTimer () {
        if (this.timer){
          clearInterval(this.timer);
        }
        let me = this;
        this.timer =setInterval(() => {
          me.sendMsg--;
          if(me.sendMsg==0){
            me.$router.push("/login");
          }
        },1000);
      }
    },
    mounted () {
      this.startTimer();
    },
    created () {
      this.$util.goTop();
    },
    destroyed () {
      clearInterval(this.timer);
    }
  };
</script>
<style lang="less" src="@/common/less/register/registerContainer.less"></style>
<style lang='less'>
  .pwdSuc{
    margin-bottom:20px;
    span{
      height:50px;
      line-height:50px;
      vertical-align:middle;
    }
    .icon-large{
      font-size:50px;
      background-color:#fff;
      color:#f0871e;
      margin-left:18px;
    }
  }
</style>
<template>
    <div class="top">
      <div class="top-content">
        <div class="customer">
          <div class="icon" @mouseenter="showTel" @mouseleave="hideTel"></div>
          <div class="tel" v-show="tel">
            <span class="triangle"></span>
            <div class="imgTel">
              <img src="./电话.png" width="24" height="24">
              <span>025-52857599</span>
            </div>
          </div>
        </div>
        <div class="up">
          <div class="icon" @click='goTop'></div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        tel: false,
      }
    },
    methods: {
      showTel () {
        this.tel = true;
      },
      hideTel () {
        this.tel = false;
      },
      goTop: function() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .top{
    position:fixed;
    top:70%;
    right: 32px;
    width:30px;
    z-index: 1000;
    zoom:1;
    .top-content{
      width: 48px;
      height: 113px;
      background-color: #fff;
      box-shadow: 0px 0px 23px 0px rgba(221, 221, 221, 0.5);
      border-radius: 23px;
      .customer{
        padding: 16px 12px;
        border-bottom: 1px solid #e4e4e4;
        .tel{
          width: 282px;
          height: 72px;
          line-height: 72px;
          position: absolute;
          right: 56px;
          font-size: 20px;
          background-color: #fff;
          box-shadow: 0px 0px 23px 0px rgba(221, 221, 221, 0.5);
          top: 0;
          color: #999;
          letter-spacing: 1px;
          .imgTel{
            & > img{
              margin: -4px;
              border-right: 1px solid #e8e8e8;
              padding-right: 12px;
            }
            & > span{
              padding-left: 12px;
            }
          }
          .triangle {
            width: 0;
            height: 0;
            border-top: 0 solid transparent;
            border-right: 10px solid transparent;
            border-left: 10px solid transparent;
            position: absolute;
            transform:rotate(90deg);
            top: 35px;
            left: 282px;
          }
          .triangle:after {
            content: "";
            border-top: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #fff;
            border-left: 8px solid transparent;
            position: absolute;
            top: -6px;
            left: -8px;
          }
        }
        .icon{
          width: 24px;
          height: 24px;
          background: url("./客服未选中.png") no-repeat;
          background-size: 24px;
        }
        .icon:hover{
          width: 24px;
          height: 24px;
          background: url("./客服选中.png") no-repeat;
          background-size: 24px;
        }
      }
      .up{
        padding: 16px 12px;
        .icon{
          width: 24px;
          height: 24px;
          background: url("./置顶.png") no-repeat;
          background-size: 24px;
        }
      }
    }
  }
</style>

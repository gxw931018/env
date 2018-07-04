<template>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-content-left">
          <div class="img">
            <img src="./footer.png" alt="" width="364" height="52">
          </div>
          <div class="menu">
            <ul>
              <li>关于我们</li>
              <li>加入我们</li>
              <li>新手指导</li>
            </ul>
          </div>
        </div>
        <div class="footer-content-right">
          <div class="contact">联系我们</div>
          <div class="tel">025-52857599</div>
          <div class="time">周一至周五&nbsp;&nbsp;9:00-18:00</div>
        </div>
      </div>
      <div class="copyright">
        <p>Copyright©2015&nbsp;苏ICP备16031479号&nbsp;南京辰阔网络科技有限公司&nbsp;版权所有</p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer{
    width: 100%;
    min-width: 1366px;
    height: 210px;
    background: #ffffff;
    .footer-content{
      margin: 0 auto;
      margin-top: 40px;
      height: 160px;
      width: 1000px;
      border-bottom: 1px solid #e8e8e8;
      .footer-content-left{
        float: left;
        text-align: left;
        width: 500px;
        .menu{
          padding: 35px 0 40px 0;
          & > ul > li{
            display: inline-block;
            vertical-align: top;
            padding-left: 10px;
            padding-right: 10px;
            cursor:pointer;
            box-sizing: border-box;
            border-right: 1px solid #999999;
            color: #999999;
            &:first-child {
               padding-left: 0;
            }
            &:last-child {
               border-right: none;
            }
          }
        }
      }
      .footer-content-right{
        float: left;
        width: 500px;
        text-align: left;
        .contact{
          margin-left: 200px;
          font-size: 20px;
          color: #666666;
        }
        .tel{
          margin-left: 200px;
          font-size: 34px;
          padding: 24px 0;
          color: #f0871e;
        }
        .time{
          margin-left: 200px;
          font-size: 16px;
          color: #999999;
          padding-bottom: 29px;
        }
      }
    }
    .copyright{
      font-size: 14px;
      line-height: 30px;
      color: #999999;
      padding: 12px 0;
    }
  }
</style>

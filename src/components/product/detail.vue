<template>
    <div class="productDetail">
      <div class="product-content">
        <div class="product-left">
          <ul>
            <li v-for='item in labelList'><label>{{item.label}}</label><span>{{item.content}}</span></li>
          </ul>
        </div>
        <div class="product-right">
          <img src="./sxd.png" alt="" width="440" height="252">
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          labelList:[{
            label:'最高额度',
            content:'1000万'
          },{
            label:'年利率',
            content:'9%-12.3%'
          },{
            label:'担保方式',
            content:'信用'
          },{
            label:'还款期限',
            content:'12个月'
          },{
            label:'还款方式',
            content:'等额本息、一次性还本付息'
          },{
            label:'开通地区',
            content:'南京、无锡、上海、广州'
          }],
          feature: [
            {
              type: 0
            },{
              type: 1
            },{
              type: 2
            },{
              type: 3
            }
          ],
        };
      },
      created () {
        this.classMap = ['fast', 'free', 'low', 'high'];
      },
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .productDetail{
    width: 100%;
    min-width: 1366px;
    height: 400px;
    background: url("product.png") no-repeat;
    background-size: 100%;
    .product-content{
      width: 1000px;
      margin: 0 auto;
      .product-left{
        padding-top:90px;
        width: 500px;
        float: right;
        text-align: left;
        display: inline-block;
        li{
          margin-bottom:30px;
          label{
            display:inline-block;
            min-width:70px;
            font-size: 14px;
            color: #454545;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
          }
          span{
            width: 51px;
            margin-left:40px;
            font-size: 14px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: 1.1px;
            color: #454545;
          }
        }
      }
      .product-right{
        width: 500px;
        float: left;
        display: inline-block;
        & > img{
          margin: 100px 60px 0 0;
        }
      }
    }
  }
</style>

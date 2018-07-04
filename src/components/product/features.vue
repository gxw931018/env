<template>
    <div class="features">
      <div class="feature">
          <ul>
            <li v-for="item in featureList">
              <img :src="item.path" alt="" width='80' height='80'>
              <span class='big'>{{item.name}}</span>
              <span>{{item.description}}</span>
            </li>
          </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props:['featureList'],
      data () {
        return {
        };
      },
      created () {
      },
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .features{
    width:100%;
    min-width:1366px;
    padding:45px 0;
    background:url("product.png") no-repeat;
    background-size: 100%;
    .feature{
      width:1000px;
      margin:0 auto;
      ul{
        width:100%;
        height:100%;
        overflow:hidden;
        text-align:center;
        li{
          width:25%;
          text-align:center;
          display:inline-block;
          .big{
            font-weight:bold;
          }
          img{
            display:inline-block;
            width:80px;
            height:80px
            margin-bottom:15px
          }
          span{
            margin-bottom:15px;
            width:100%;
            display:inline-block;
          }
        }
      }
    }
  }
</style>

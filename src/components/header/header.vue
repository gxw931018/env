<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="header">
    <div class="content-wrapper">
      <div class="area">
        <div class="avatar" v-if='isDetail'>
          <img src='./logo.png' width="118" height="51" @click='goHome'>
          <div class="area-content">
            <div class="city">{{choseCity}}</div>
          </div>
        </div>
        <div class="avatar" v-if='!isDetail'>
          <img src='./logo.png' width="118" height="51" @click='goHome'>
          <div class="area-content">
            <div class="city" @click="unfoldArea" v-bind:class="{'ci': ci}">{{city.choseCity}}<i></i></div>
          </div>
          <div class="areaShow" v-show="areaShowDetail">
            <span class="triangle"></span>
            <div class="recent">
              <p>定位/最近访问城市</p>
              <div class="recentCity">
                <ul>
                  <li v-for="(current, item) in city.currentCity" :key="item.index" class="city-item" @click="selectCity(current)">
                    {{current.regionName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="open">
              <p>已开通城市</p>
              <div class="openCity">
                <ul>
                  <li v-for="(openedCity, item) in city.openedCityList" :key="item" class="openCity-item" @click="selectCity(openedCity)">
                    {{openedCity.regionName}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <ul>
          <li @mouseenter="showHome" @mouseleave="hideHome">
            <router-link to="/" v-bind:class="{active: homeActive}">首页</router-link>
          </li>
          <li @mouseenter="showProduct" @mouseleave="hideProduct">
            <router-link to="/" @click="product" v-bind:class="{active: productActive, 'pia': pia}">产品中心<span class="product-icon"></span></router-link>
            <div class="productCenter" v-show="productContent">
              <ul>
                <li class="product-item" v-for="(productName, item) in productList" :key="item" :class='{proActive:productName.id==productId}'>
                  <router-link :to="{path:'/detail', query:{product_id:productName.id,productList:productList,choseCity:choseCity}}">{{productName.name}}</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li @mouseenter="showHelp" @mouseleave="hideHelp">
            <router-link to="/help" v-bind:class="{active: helpActive }">帮助中心</router-link>
          </li>
          <li @mouseenter="showAbout" @mouseleave="hideAbout">
            <router-link to="/about" v-bind:class="{active: aboutActive }">关于我们</router-link>
          </li>
        </ul>
      </div>
      <div class="auth" v-if='!isLogin'>
        <div class="btn">
          <div class="login">
            <router-link to="/login">登录</router-link>
          </div>
          <div class="register">
            <router-link to="/register">注册</router-link>
          </div>
        </div>
      </div>
      <div class="authed" v-if='isLogin' @mouseenter="showUser" @mouseleave="hideUser">
        <img src='./user.png'/><i></i>
        <div class='sb' v-show='user'></div>
        <div class="productCenter" v-show='user'>
          <span class="triangle"></span>
          <ul>
            <li class="product-item">
              <span class="userInfo">{{info.loginName}}</span>
              <span class="userInfo" v-if="info.authed">{{info.enterpriseName}}</span>
            </li>
            <li class="product-item userCenter"><div class="border"></div><span><router-link :to="{name:'center', params:{city:city,productList:productList,choseCity:choseCity}}">会员中心</router-link></span></li>
            <li class="product-item" @click="logout"><div class="border"></div><span class='logout'>退出登录</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['city','productList','isDetail','choseCity','productId'],
    data () {
      return {
        info:'',
        ci: false,
        homeActive: this.isDetail ? !this.isDetail : true,
        pia: this.isDetail,
        productActive: this.isDetail,
        helpActive: false,
        aboutActive: false,
        user:false,
        isLogin:false,
        cookieCity: [],
        regionCode: '',
        areaShowDetail: false,
        productContent: false,
      };
    },
    watch: {
      productList: {
        handler(newValue, oldValue) {
          for (let i = 0; i < newValue.length; i++) {
            if (oldValue[i] != newValue[i]) {
              this.productList[i]=newValue[i];
            }
          }
        },
        deep: true
      },
      info:{
        handler(newValue,oldValue) {
          if(newValue && newValue.token){
            this.isLogin=true;
          }else{
            this.isLogin=false;
          }
        }
      }
    },
    created() {
      let INFO;
      if((!sessionStorage.getItem("INFO") || sessionStorage.getItem("INFO")=='null')&&location.href.indexOf('center')!=-1){
        INFO = JSON.parse(localStorage.getItem("center")).user;
        sessionStorage.setItem("INFO",JSON.stringify(INFO));
      }else{
        INFO=JSON.parse(sessionStorage.getItem("INFO"));
      }
      this.info=INFO;
    },
    methods: {
      goHome () {
        this.$router.push({name:'home'});
      },
      logout () {
        sessionStorage.removeItem("INFO");
        this.info='';
        if(location.href.indexOf('center')!=-1){
          this.$router.push({name:'home'});
        }
      },
      showUser () {
        this.user=true;
      },
      hideUser () {
        this.user=false;
      },
      showHome () {
        this.homeActive = true;
        this.pia = false;
        this.productActive = false;
      },
      hideHome () {
        if (!this.isDetail) {
          this.homeActive = true;
        }
        if (this.isDetail) {
          this.homeActive = false;
          this.pia = true;
          this.productActive = true;
        }
      },
      showProduct () {
        this.homeActive = false;
        this.pia = true;
        this.productActive = true;
        this.productContent = true;
      },
      hideProduct () {
        if (!this.isDetail) {
          this.homeActive = true;
        }
        this.pia = false;
        this.productActive = false;
        this.productContent = false;
        if (this.isDetail) {
          this.pia = true;
          this.productActive = true;
        }
      },
      showHelp () {
        this.homeActive = false;
        this.helpActive = true;
        this.pia = false;
        this.productActive = false;
      },
      hideHelp () {
        if (!this.isDetail) {
          this.homeActive = true;
        }
        if (this.isDetail) {
          this.pia = true;
          this.productActive = true;
        }
        this.helpActive = false;
      },
      showAbout () {
        this.homeActive = false;
        this.aboutActive = true;
        this.pia = false;
        this.productActive = false;
      },
      hideAbout () {
        if (!this.isDetail) {
          this.homeActive = true;
        }
        if (this.isDetail) {
          this.pia = true;
          this.productActive = true;
        }
        this.aboutActive = false;
      },
      unfoldArea() {
        this.ci = !this.ci;
        this.areaShowDetail = !this.areaShowDetail;
      },
      selectCity(data) {
        this.ci = false;
        this.areaShowDetail = false;
        this.city.choseCity = data.regionName;
        this.$emit('myEvent', data);
      },
      productSuc(data) {
        this.productList = data;
      },
      productErr(data) {
        console.log(data);
      },
      product() {
        this.productContent = !this.productContent;
      }
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .proActive a{
    color: #f0871e;
  }
  .header {
    position: fixed;
    color: #333;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
    top: 0;
    width: 100%;
    min-width: 1366px;
    height: 80px;
    z-index: 1000;
    .content-wrapper {
      position: relative;
      width: 1000px;
      margin: 0 auto;
      font-size: 0
      .area {
        display: inline-block;
        float: left;
        vertical-align: top;
        font-size: 14px;
        .avatar{
          & > img {
            margin: 15px 16px 14px 0;
          }
          .area-content{
            vertical-align: top;
            display: inline-block;
            .city {
              vertical-align: top;
              line-height: 20px;
              margin: 30px 0;
              padding-left: 10px;
              box-sizing: border-box;
              cursor:pointer;
              border-left: 1px solid rgba(232, 232, 232, 1);
              color: rgb(35, 35, 35);
              &.active{
                color: #f0871e;
              }
              & > i{
                width: 8px;
                height: 8px;
                display: inline-block;
                background: url("./area.png") no-repeat;
                background-size: 8px;
                margin-left: 6px;
              }
            }
            .ci{
              color: #f0871e;
              & > i{
                background: url("./地区选择选中.png") no-repeat;
              }
            }
          }
        }
      }
      .menu {
        display: inline-block;
        float: left;
        margin: 32px 0 32px 51px;
        font-size: 14px;
        & > ul > li {
          display: inline-block;
          width: 108px;
          padding: 0 13px;
          line-height: 18px;
          color: rgb(69, 69, 69);
          .product-icon{
            background: url("./产品下拉未选中.png") no-repeat;
            background-size: 12px 8px;
            display: inline-block;
            width: 12px;
            height: 8px;
            margin-left: 12px;
          }
          .pia > span{
            background: url("./产品下拉选中.png") no-repeat;
            background-size: 12px 8px;
            width: 12px;
            height: 8px;
            margin-left: 12px;
          }
          & > i{
              width: 8px;
              height: 8px;
              display: inline-block;
              background: url("./area.png") no-repeat;
              background-size: 8px;
              margin-left: 6px;
          }
          & > .active {
            display: block;
            text-decoration: none;
            font-size: 14px;
            color: #f0871e;
            padding-bottom: 27px;
            border-bottom: 3px solid #f0871e;
          }
          .productCenter{
            position: fixed;
            width: 270px;
            min-height: 200px;
            margin-left: -81px;
            background: rgba(253, 252, 252, 0.95);
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
            opacity: 0.95;
            .product-item{
              font-size: 13px;
              padding-bottom: 33px;
              &:first-child {
                padding-top: 56px;
              }
              &:hover{
                a{color:#f0871e}
              }
            }
          }
        }
      }
      .auth {
        display: inline-block;
        float: right;
        font-size: 14px;
        .btn .login {
          display: inline-block;
          font-size: 14px;
          width: 70px;
          height: 36px;
          line-height: 36px;
          border-radius: 18px;
          margin: 22px 30px 22px 0;
          background: rgb(240, 130, 30);
          & > a {
            color: #fff;
            padding: 11px 20px;
          }
        }
        .btn .register {
          display: inline-block;
          font-size: 14px;
          width: 30px;
          height: 36px;
          margin: 33px 0;
          color: rgb(122, 122, 122);
        }
      }
      .authed{
        height:64px;
        display: inline-block;
        float: right;
        font-size: 14px;
        margin-top:16px;
        .sb{
          width:270px;
          position:fixed;
          height:8px;
          background:rgba(255,255,255,0);
          margin-top:12px;
          margin-left: -140px;
        }
        i{
            width: 8px;
            height: 8px;
            display: inline-block;
            background: url('./area.png') no-repeat;
            background-size: 8px;
            margin: 0 0 15px 6px;
        }
        .productCenter{
            position: fixed;
            width: 270px;
            min-height: 200px;
            margin-top:20px;
            margin-left: -140px;
            background: rgba(253, 252, 252, 0.95);
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
            opacity: 0.95;
            .triangle {
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-right: 10px solid transparent;
              border-left: 10px solid transparent;
              position: absolute;
              top: -20px;
              left: 160px;
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
            .product-item{
              font-size: 13px;
              height:55px;
              vertical-align:middle
              cursor:pointer;
              &:first-child {
                height:90px
                box-sizing:border-box;
                padding:15px 0;
                span{
                  width:100%;
                  margin-top:10px;
                  text-align:center;
                }
              }
              .userInfo{
                color: #454545;
              }
              .border{
                width: 271px;
                height: 1px;
                background-color: rgba(232, 232, 232, 1);
                opacity: 0.75;
              }
              span{
                display:inline-block;
                text-align:left !important;
                margin-top:12px;
                padding-left:60px;
                box-sizing:border-box;
                width: 100%;
                height: 13px;
                font-size: 13px;
                font-weight: normal;
                font-style: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 1px;
              }
              &.userCenter{
                color: #f0871e;
                &:hover{
                  a{
                    color:#f0871e;
                  }
                }
              }
              .logout{
                color: #454545;
              }
            }
        }
      }
    }
    .areaShow{
      position: fixed;
      z-index: 1000;
      width: 272px;
      min-height: 176px;
      margin-top: 5px;
      background: rgba(253, 252, 252, 0.75);
      opacity: 0.75;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.16);
      .triangle {
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        position: absolute;
        top: -20px;
        left: 160px;
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
      .recent{
        padding: 20px 48px 0;
        font-size: 14px;
        text-align: left;
        & > p{
          color: #7a7a7a;
        }
        .recentCity{
          padding-top: 20px;
          .city-item{
            color: #232323;
            cursor:pointer;
            display: inline-block;
            padding:0 40px 10px 0;
            &:hover{
              color: #f0871E;
            }
            &:last-child {
              padding: 0 0 10px 0;
            }
          }
        }
      }
      .open{
        padding: 20px 48px 0;
        font-size: 14px;
        text-align: left;
        & > p{
            color: #7a7a7a;
        }
        .openCity{
          color: #7a7a7a;
          padding-top: 20px;
          .openCity-item {
            color: #232323;
            cursor:pointer;
            display: inline-block;
            padding:0 40px 10px 0;
            &:hover{
              color: #f0871E;
            }
            &:last-child {
               padding:0 0 10px 0;
            }
          }
        }
      }
    }
  }
</style>

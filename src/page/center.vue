<template>
  <div>
    <v-header :city="city" :productList="productList" v-on:myEvent="doSomething" :choseCity="choseCity"></v-header>
    <v-content :info='info' :authInfo='authInfo' :city="city" :productList="productList" :choseCity="choseCity"></v-content>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from '@/components/header/header.vue';
  import footer from '@/components/footer/footer.vue';
  import content from '@/components/center/content.vue';

  export default {
    name: 'App',
    data() {
      return {
        authInfo:{"qymc": '',"sh": '',"authTime": ''},
        info:{},
        choseCity:'',
        city: {},
        productList: [],
        currentCityList: [],
        tabPosition: 'left',
        isAuthed:false,
        headers:{userId:'',token:'',client:'1'}
      }
    },
    components: {
      'v-header': header,
      'v-footer': footer,
      'v-content': content
    },
    created() {
        let INFO;
        if(!sessionStorage.getItem("INFO") || sessionStorage.getItem("INFO")=='null'){
          INFO = JSON.parse(localStorage.getItem("center")).user;
          sessionStorage.setItem("INFO",JSON.stringify(INFO));
        }else{
          INFO=JSON.parse(sessionStorage.getItem("INFO"));
        }
        this.info=INFO;
        this.headers.userId = INFO.userId;
        this.headers.token = INFO.token;
        //获取cookie的城市
        const chose = JSON.parse(this.$util.getCookie("choseCity"));
        this.currentCityList = chose||[];
        if(this.$route.params && this.$route.params.city){
            let params = this.$route.params;
            let user = JSON.parse(sessionStorage.getItem('INFO'));
            params.user = user;
            localStorage.setItem('center',JSON.stringify(this.$route.params));
            this.city = params.city;
            this.city.choseCity = params.choseCity;
            this.productList = params.productList;
            this.choseCity = params.choseCity;
            this.city.currentCity = this.currentCityList;
        }else{
            let center = JSON.parse(localStorage.getItem('center'));
            this.city = center.city;
            this.productList = center.productList;
            this.choseCity = center.choseCity;
            this.city.currentCity = this.currentCityList;
            if(this.$route.query.id){
              this.info = center.user;
              sessionStorage.setItem("INFO",JSON.stringify(center.user));
            }
        }
        if(this.$route.query.id){
          this.getAuthDetailById ();
        }
        if(this.info.authed && this.info.authed!=='0'){
          this.getAuthDetail();
        }
    },
    methods: {
      getAuthDetailById () {
        let data = {
          "service": "generalService",
          "method": "userAuth",
          "data": {
            "id": this.$route.query.id
          }
        }
        this.$api.post('',data,this.getAuthDetailByIdSuc,this.getAuthDetailByIdErr,this.headers);
      },
      getAuthDetailByIdSuc (data){
        data.authTime = this.$util.timeFormat(data.authTime);
        this.authInfo = data;
        this.info.authed = 1;
        this.info.enterpriseName = data.qymc;
        sessionStorage.setItem('INFO',JSON.stringify(this.info));
        location.href=location.href.split('?')[0];
      },
      getAuthDetailByIdErr (res){
        this.$message({
          message: res.returnMessage,
          type: 'error',
          center: true,
          duration: 2000
        });
      },
      getAuthDetail () {
        let data = {
          "service": "generalService",
          "method": "getAuthInfo",
          "data": {
          }
        };
        this.$api.post('',data,this.getAuthDetailSuc,this.getAuthDetailErr,this.headers);
      },
      getAuthDetailSuc (data){
        data.authTime = this.$util.timeFormat(data.authTime);
        this.authInfo = data;
      },
      getAuthDetailErr (res){
        this.$message({
          message: res.returnMessage,
          type: 'error',
          center: true,
          duration: 2000
        });
      },
      doSomething(data) {
        //城市显示
        data.choseCity = data.regionName;
        this.choseCity =data.regionName;
        //json -> Array
        var current = {};
        current.regionCode = data.regionCode;
        current.regionName = data.regionName;
        let flag = true;
        this.currentCityList.map((item,k)=>{
          if(item.regionCode == data.regionCode){
            flag = false;
            return false;
          }
        });
        if(flag){
          this.currentCityList.push(current);
        }
        this.city.currentCity = this.currentCityList;
        //存储cookie
        this.$util.setCookie("choseCity", JSON.stringify(this.currentCityList), 7);
        const chose_data = {
          "service": "configService",
          "method": "getProductList",
          "data": {
            "city": data.regionCode
          }
        };
        const headers = {
          "userId": this.info.userId,
          "client": "1",
          "token": this.info.token
        };
        this.$api.post('', chose_data, this.productSuc, this.productErr, headers);
      },
      productSuc(data) {
        this.productList = data;
      },
      productErr(data) {
        console.log(data);
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>

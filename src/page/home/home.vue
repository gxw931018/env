<template>
  <div>
    <v-header :city="city" :productList="productList" v-on:myEvent="doSomething" :choseCity="choseCity"></v-header>
    <v-banner :listImg="listImg"></v-banner>
    <v-start></v-start>
    <v-top></v-top>
    <v-product :productList="productList" :choseCity="choseCity"></v-product>
    <v-cooperation></v-cooperation>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from '@/components/header/header.vue';
  import banner from '@/components/banner/banner.vue';
  import start from '@/components/start/start.vue';
  import product from '@/components/product/product.vue';
  import cooperation from '@/components/cooperation/cooperation.vue';
  import top from '@/components/top/top.vue';
  import footer from '@/components/footer/footer.vue';

  export default {
    name: 'App',
    data() {
      return {
        choseCity:'',
        city: {},
        productList: {},
        currentCityList: [],
        listImg: {}
      }
    },
    components: {
      'v-header': header,
      'v-banner': banner,
      'v-start': start,
      'v-product': product,
      'v-cooperation': cooperation,
      'v-footer': footer,
      'v-top': top
    },
    created() {
      //首页城市定位和已开通城市
      const data = {
        "service":"locationService",
        "method":"getCurrentCity",
        "data":{}
      };
      const headers = {
        "userId": "1",
        "client": "1",
        "ip": "218.94.84.22",
        "token": ""
      };
      this.$api.post('', data, this.citySuc, this.cityErr, headers);

      /**
       * 获取图片资源
       * @type {{service: string, method: string, data: {role: string, pictureType: number}}}
       */
      const picture_headers = {
        "userId": "",
        "client": "1",
        "ip": "",
        "token": ""
      };
      //获取图片资源--banner
      const banner_data = {
        "service":"configService",
        "method":"getPictureConfig",
        "data":{
          "role": "C",
          "pictureType": 1
        },
      };
      this.$api.post('', banner_data, this.bannerSuc, this.bannerErr, picture_headers);

      //获取图片资源--公司logo
      const logo_data = {
        "service":"configService",
        "method":"getPictureConfig",
        "data":{
          "role": "C",
          "pictureType": 2
        },
      };
      this.$api.post('', logo_data, this.logoSuc, this.logoErr, picture_headers);

      //获取图片资源--合作伙伴
      const partner_data = {
        "service":"configService",
        "method":"getPictureConfig",
        "data":{
          "role": "C",
          "pictureType": 3
        },
      };

      this.$api.post('', partner_data, this.partnerSuc, this.partnerErr, picture_headers);
    },
    methods: {
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
          if(item.regionCode == data .regionCode){
            flag = false;
            return false;
          }
        });
        if(flag){
          this.currentCityList.push(current);
        }
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
          "userId": "",
          "client": "1",
          "ip": "",
          "token": ""
        };
        this.$api.post(' ', chose_data, this.productSuc, this.productErr, headers);
      },
      change () {
        this.bus.$emit('change',{title:'首页'})
      },
      citySuc(data) {
        //城市code
        let code = data.currentCity.regionCode;
        //城市IP定位
        data.choseCity = data.currentCity.regionName;
        this.choseCity = data.currentCity.regionName;
        //获取cookie的城市
        const chose = JSON.parse(this.$util.getCookie("choseCity"));
        //开通城市
        let currentArr = [];
        let current = {};
        current.regionName = data.currentCity.regionName;
        current.regionCode = data.currentCity.regionCode;
        currentArr.push(current);
        //开通城市+获取cookie的城市
        let temp = {},//用于id判断重复
          result = [];//最后的新数组
        if (chose != null) {
          let city = currentArr.concat(chose);//合并成一个数组
          //遍历city数组，将每个item.regionCode在temp中是否存在值做判断，
          city.map((item,index)=>{
            if(!temp[item.regionCode]){
              result.push(item);
              temp[item.regionCode] = true
            }
          });
        }

        this.currentCityList = chose != null ? result : currentArr;
        this.$util.setCookie("choseCity", JSON.stringify(this.currentCityList), 7);
        data.currentCity = this.currentCityList;
        this.city = data;

        const product_data = {
          "service": "configService",
          "method": "getProductList",
          "data": {
            "city": code
          }
        };
        const product_headers = {
          "userId": "",
          "client": "1",
          "ip": "",
          "token": ""
        };
        this.$api.post(' ', product_data, this.productSuc, this.productErr, product_headers);
      },
      cityErr(data) {
        console.log(data);
        //城市code
        let code = data.currentCity.regionCode;
        //城市IP定位
        data.choseCity = data.currentCity.regionName;
        this.choseCity = data.currentCity.regionName;
        //获取cookie的城市
        const chose = JSON.parse(this.$util.getCookie("choseCity"));
        //开通城市
        let currentArr = [];
        let current = {};
        current.regionName = data.currentCity.regionName;
        current.regionCode = data.currentCity.regionCode;
        currentArr.push(current);
        //开通城市+获取cookie的城市
        let temp = {},//用于id判断重复
          result = [];//最后的新数组
        if (chose != null) {
          let city = currentArr.concat(chose);//合并成一个数组
          //遍历city数组，将每个item.regionCode在temp中是否存在值做判断，
          city.map((item,index)=>{
            if(!temp[item.regionCode]){
              result.push(item);
              temp[item.regionCode] = true
            }
          });
        }

        this.currentCityList = chose != null ? result : currentArr;
        data.currentCity = this.currentCityList;
        this.city = data;

        const product_data = {
          "service": "configService",
          "method": "getProductList",
          "data": {
            "city": code
          }
        };
        const product_headers = {
          "userId": "",
          "client": "1",
          "ip": "",
          "token": ""
        };
        this.$api.post(' ', product_data, this.productSuc, this.productErr, product_headers);
      },

      //banner
      bannerSuc(data) {
        let bannerList = [];
        let bannerJson = {};
        for (let i = 0; i < data.length; i++) {
          bannerJson.name = data[i].name;
          bannerJson.path = this.$util.imgURL.img + data[i].path;
          bannerList.push(bannerJson);
        }
        this.listImg = bannerList;
      },
      bannerErr(data) {
        console.log(data);
      },

      //logo
      logoSuc(data) {
      },
      logoErr(data) {
        console.log(data);
      },

      //partner
      partnerSuc(data) {
        console.log(data);
      },
      partnerSuc(data) {
      },

      //product
      productSuc(data) {
        data.imgURL = this.$util.imgURL.img;

        data.map((res, i) =>{
          let str2='';
          let openedCity=res.openCity;
          let len2=openedCity.length;
          openedCity.map((item,index)=>{
            str2+=openedCity[index].cityName;
            if(index<len2-1){
              str2+='、';
            }
          });
          res.oc = str2;
        });
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

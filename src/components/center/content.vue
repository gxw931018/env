<template>
  <div class='contentContainer'>
    <div class='content'>
      <div class='menuContainer'>
        <div class='userImg'>
          <div class='img'>
            <img src="./user.png" alt="">
          </div>
          <div class='userName'>
            <span>{{info.loginName}}</span>
          </div>
          <div class='authed' v-if='info.authed'>
            <span>{{info.enterpriseName}}</span>
          </div>
          <div class='unAuthed' v-if='!info.authed'>
            <span>您还未认证,请立即认证!</span>
            <br/>
            <a :href='url'>立即认证</a>
          </div>
        </div>
        <div class='menu'>
          <ul>
            <li v-for='(item,k) in menu' :key='k' :class='{active:item.active}' @click='showUrl(item)'>{{item.content}} <i class='iconfont' :class='"icon-"+item.class'></i></li>
          </ul>
        </div>
      </div>
      <div class='memberCentre' v-show="memberCentre">
        <div v-if='info.authed'>
          <div class='title'>
            <span>爱税宝认证已完成</span>
          </div>
          <div class='img'>
            <img src="./user.png" alt=""><br/>
            <span>{{info.loginName}}</span>
          </div>
          <div class='table'>
            <div class='first'><span class='left'>公司名称:</span><span class='right'>{{authInfo.qymc}}</span></div>
            <div class='sec'><span class='left'>纳税人识别号:</span><span class='right'>{{authInfo.sh}}</span></div>
            <div class='th'><span class='left'>认证时间:</span><span class='right'>{{authInfo.authTime}}</span></div>
          </div>
          <div class='icon'>
            <ul>
              <li><img src="./safe.png" alt=""></li>
              <li><img src="./aw.png" alt=""></li>
              <li><img src="./fast.png" alt=""></li>
            </ul>
          </div>
        </div>
        <div v-if='!info.authed'>
          <div class='authImg'>
            <img src="./auth.png" alt="">
          </div>
          <div class='auth'>
            <a :href='url'>立即认证</a>
          </div>
        </div>
      </div>
      <div class="loanApplication" v-show="loanApplication" v-scroll="getMore">
        <div class='list' v-show='!showApplyDetail'>
          <div class='tHeader'>
            <span class='first'>申请详情</span>
            <span class='sec'>当前状态</span>
            <span class='operation'>操作</span>
          </div>
          <div class='tableContent'>
            <div class='tabItem' v-for='(data,k) in applyList' :key='k'>
              <div class='header'>
                <span class='num'>业务序列号:{{data.apply.serialNum}}</span>
                <span class='time'>申请时间:{{data.apply.applyTime}}</span>
              </div>
              <div class='tr'>
                <div class='first'>
                  <span class='pic'><img :src="$util.imgURL.img+data.product.logoPath" width=20 height=20></span>
                  <span class='productName'>{{data.product.name}}</span>
                  <span class='enterpriseName'>{{data.apply.enterpriseName}}</span>
                  <span class='sh'>{{data.apply.nsrsbh}}</span>
                </div>
                <div class='last'>
                  <span class='ed'>申请额度:{{data.product.maximum}}万</span>
                  <span class='time'>申请期限:{{data.product.repaymentTerm}}个月</span>
                  <span class='status'>{{data.apply.statusName}}</span>
                  <span class='operation'><span @click='showDetail(data)'>查看详情</span><span @click='operation(data,data.operate.method)'>{{data.operate.text}}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='detail' v-show='showApplyDetail'>
          <div class='back'>
            <span @click='back'>返回贷款申请列表>></span>
          </div>
          <div class='tabs'>
            <v-detail :detail='detail'></v-detail>
          </div>
        </div>
      </div>
      <div class="modifyPwd" v-show="modifyPwd">
        I am modifyPwd
      </div>
    </div>
  </div>
</template>

<script>
  import detail from './applyDetail.vue'
  import list from './list.vue'
  export default {
    props:['info','authInfo','city','productList','choseCity'],
    data() {
      let baseUrl = 'http://asbv3.i-xinnuo.com/DataAcquisition/asb/bindTelASR';
      let url = location.href.split('?')[0];
      baseUrl+='?tel='+this.info.loginName+'&url='+url;
      let INFO = JSON.parse(sessionStorage.getItem('INFO'));
      let query = this.$route.query;
      let center=true,apply=false,loanApplication=false,memberCentre=true;
      if(query && query.dk){
        center=false;
        apply=true;
        memberCentre=false;
        loanApplication=true;
      }
      return {
        showApplyDetail:false,
        pageNum:1,
        pageSize:10,
        memberCentre: memberCentre,
        loanApplication: loanApplication,
        modifyPwd: false,
        url:baseUrl,
        menu:[
          {
            content:'会员中心',
            active:center,
            url:'memberCentre',
            class:'center'
          },
          {
            content:'贷款申请',
            active:apply,
            url:'loanApplication',
            class:'dk'
          },
          {
            content:'密码修改',
            active:false,
            url:'modifyPwd',
            class:'reset'
          }
        ],
        dkListL:[{num:'20180812P000002',time:'2018-09-23 12:23:12',product:''}],
        tabs:[{url:'gz',content:'跟踪信息',active:true},{url:'gz',content:'基础信息',active:false}],
        headers:{token:INFO.token,client:'1',userId:INFO.userId},
        applyList:[],
        operate:{
          '1':{text:'编辑',method:'edit'},
          '2':{text:'重新申请',method:'applyAgain'},
          '3':{text:'撤销',method:'cancel'},
          '4':{text:'',method:''},
          '5':{text:'重新申请',method:'applyAgain'},
          '6':{text:'',method:''},
          '7':{text:'重新申请',method:'applyAgain'},
          '8':{text:'',method:''},
          '9':{text:'',method:''},
          '10':{text:'重新申请',method:'applyAgain'}
        },
        type:{'1':'法定代表人','2':'最大控股自然人'},
        guarantee:{1:'信用',2:'保证',3:'抵押',4:'质抵',5:'其他'},
        detail:{
          trackData:[],
          productProfile:{},
          apply:{},
          credit:{},
          status:'',
          active:0
        }
      }
    },
    created() {
      this.getUserApplyList();
    },
    methods: {
      addTabs () {
        this.tabs.push({url:'sx',content:'授信下款信息',active:false});
      },
      showUrl (item) {
        let me = this;
        this.menu.map((v,k)=>{
          if(item.content === v.content){
            v.active = true;
            me[v.url] = true;
          }else{
            v.active = false;
            me[v.url] = false;
          }
        });
        console.log(this.memberCentre);
        console.log(this.loanApplication);
        console.log(this.modifyPwd);
      },
      getUserApplyList () {
        let data = {
          "service":"applyService",
          "method":"getUserApplyList",
          "data":{}
        }
        this.$api.post('',data,this.getUserApplyListSuc,this.getUserApplyListErr,this.headers);
      },
      getUserApplyListSuc (data) {
        let me=this;
        data.map((item,k)=>{
          item.operate = me.operate[item.apply.statusCode];
        });
        this.applyList = data;
      },
      getUserApplyListErr (res) {
        console.log(res);
      },
      operation (data,operate) {
        this[operate](data);
      },
      applyAgain (data) {
        let serialNum = data.apply.serialNum;
        let id = data.apply.productId;
        this.$router.push({name:'detail', query:{product_id:id,productList:this.productList,choseCity:this.choseCity,serialNum:serialNum}});
      },
      edit (data) {
        let serialNum = data.apply.serialNum;
        let id = data.apply.productId;
        this.$router.push({name:'detail', query:{product_id:id,productList:this.productList,choseCity:this.choseCity,serialNum:serialNum}});
      },
      cancel (data) {
        let serialNum = data.apply.serialNum;
        let me = this;
        let formData = {
          "service":"applyService",
          "method":"userCancelApply",
          "data":{
            "serialNum": serialNum
          }
        }
        this.$confirm(' 是否取消申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          me.$api.post('',formData,me.cancelSuc,me.cancelErr,me.headers);
        }).catch(() => {
        });
      },
      cancelSuc (data) {
        this.$message({
          message: '撤销成功',
          type: 'success',
          duration:2000
        });
        this.getUserApplyList();
      },
      cancelErr (res) {
        this.$message({
          message: res.returnMessage,
          type: 'error',
          duration:2000
        });
      },
      showDetail (data) {
        let code = data.apply.statusCode;
        this.detail.status = code;
        let active = 0;
        switch (code)
        {
          case 1:
            active = 1;
            break;
          case 2:
            active = 0;
          case 3:
            active = 2;
            break;
          case 4:
            active = 3;
            break;
          case 5:
            active = 2;
            break;
          case 6:
            active = 1;
            break;
          case 7:
            active = 3;
            break;
          case 8:
            active = 3;
            break;
          case 9:
            active = 5;
            break;
          case 10:
            active = 3;
            break;
          default:
            break;
        }
        this.detail.active = active;
        let applySerial = data.apply.serialNum;
        let history = {
          "service": "applyService",
          "method": "getHandleHistory",
          "data": {
            "applySerial": applySerial
          }
        };
        let base = {
          "service": "applyService",
          "method": "getBaseData",
          "data": {
            "applySerial": applySerial
          }
        };
        if(code === 9){
          let credit = {
            "service": "applyService",
            "method": "getCreditInfo",
            "data": {
              "applySerial": applySerial
            }
          };
          this.$api.post('',credit,this.getCreditSuc,this.getCreditErr,this.headers);
        }
        this.$api.post('',history,this.getHistorySuc,this.getHistoryErr,this.headers);
        this.$api.post('',base,this.getBaseSuc,this.getBaseErr,this.headers)
        this.showApplyDetail=true;
        let timer = setInterval(function(){
          let step = document.getElementsByClassName('el-step__head');
          let suc = document.getElementsByClassName('el-step__head is-success');
          let len = suc.length;
          let l = step.length;
          if(l>0){
            for (let key=0;key<l;key++){
              step[key].childNodes[0].style.backgroundColor='#c0c4cc';
            }
            if(len == 0){
              clearInterval(timer);
            }
          }
          if(len>0){
            for (let key=0;key<len;key++){
              suc[key].childNodes[0].style.backgroundColor='#f0871e';
            }
            suc[len-1].childNodes[0].style.backgroundColor='#f56c6c';
            clearInterval(timer);
            return;
          }
        },10);
      },
      getCreditSuc (data){
        data.creditTime = this.$util.timeFormat(data.creditTime);
        data.loanedTime = this.$util.timeFormat(data.loanedTime);
        this.detail.credit = data;
      },
      getCreditErr (res){
        console.log(res);
      },
      getHistorySuc (data) {
        data.handleTime = this.$util.timeFormat(data.handleTime);
        this.detail.trackData = data;
      },
      getHistoryErr (res) {
        console.log(res);
      },
      getBaseSuc (data) {
        data.apply.applyTime = this.$util.timeFormat(data.apply.applyTime);
        data.apply.sxTime = this.$util.timeFormat(data.apply.sxTime);
        data.apply.sendToBankTime = this.$util.timeFormat(data.apply.sendToBankTime);
        data.apply.proposerType = this.type[data.apply.proposerType];
        let arr = data.productProfile.guarantee.split(',');
        let str='';
        let l = arr.length;
        let me = this;
        arr.map((item,k)=>{
          str+=me.guarantee[item];
          if(k<l-1){
            str+='、';
          }
        });
        data.productProfile.guarantee = str;
        this.detail.apply = data.apply;
        this.detail.productProfile = data.productProfile;
      },
      getBaseErr (res) {
        console.log(res)
      },
      back () {
        this.showApplyDetail=false;
        this.detail.trackData=[];
        this.detail.productProfile={};
        this.detail.apply={};;
        this.detail.credit={};
      },
      getMore ($event) {
        console.log($event.target);
      }
    },
    components: {
      'v-detail': detail,
      'v-list': list
    },
  }
</script>

<style lang='less'>
  .contentContainer{
    width:100%;
    margin-top:80px;
    background-color:#f7f5f5;
    padding:20px 0;
    .content{
      width:1000px;
      margin:0 auto;
      overflow:hidden;
      &>div{
        float:left;
      }
      .menuContainer{
        background-color:rgba(255,255,255,0.6);
        box-sizing:border-box;
        width:252px;
        height:412px;
        .userImg{
          width:100%;
          height:216px;
          text-align:center;
          .img{
            padding-top:30px;
            margin-bottom:15px;
          }
          .userName{
            margin-bottom:15px;
            font-size:14px;
          }
          .authed{
            font-size:14px;
          }
          .unAuthed{
            span{
              font-size:12px;
              color: #fc4343;
            }
            a{
              margin-top:15px;
              display:inline-block;
              width:120px;
              height:28px;
              line-height:28px;
              background-color:rgb(240,135,30);
              border-radius:14px;
              font-size:12px;
              color:#fff;
              cursor:pointer;
            }
          }
        }
        .menu{
          margin-top:18px;
          width:100%;
          ul{
            width:100%;
            li{
              cursor:pointer;
              padding-left:50px;
              position:relative;
              box-sizing:border-box;
              text-align:left;
              width:100%;
              height:60px;
              border-top:1px solid #ddd;
              line-height:60px;
              &:hover{
                padding-left:48px;
                color: #f0871e;
                border-left:2px solid #f0871e;
                i{
                  left:18px;
                }
              }
              i{
                position:absolute;
                left:20px;
                top:0;
              }
              &.active{
                padding-left:48px;
                color: #f0871e;
                border-left:2px solid #f0871e;
                i{
                  left:18px;
                }
              }
            }
          }
        }
      }
      .memberCentre{
        width:737px;
        margin-left:10px;
        height:645px;
        background-color:rgba(255,255,255,0.6);
        &>div{
          width:100%;
          height:100%;
        }
        .title{
          margin-top:80px;
          font-size:20px;
          color:#454545;
          margin-bottom:20px;
        }
        .table{
          box-sizing:border-box;
          border:1px solid rgba(242, 242, 242, 1);
          width:384px;
          height:187px;
          background-color:#fff;
          margin:15px auto 0 auto;
          div{
            box-sizing:border-box;
            height:61px;
            span{
              font-size:14px;
              float:left;
              height:61px;
              line-height:61px;
              display:inline-block;
              &.left{
                width:140px;
                text-align:center;
              }
              &.right{
                text-align:left;
              }
            }
          }
          .first,.sec{
            border-bottom:1px solid rgba(242, 242, 242, 1);
          }
        }
        .img{
          img{margin-bottom:10px}
          span{font-size:12px;}
        }
        .icon{
          margin-top:80px;
          overflow:hidden;
          ul{
            width:420px;
            overflow:hidden;
            margin:0 auto;
            li{
              text-align:center;
              width:140px;
              float:left;
            }
          }
        }
        .authImg{
          margin-top:140px;
        }
        .auth{
          margin-top:100px;
          a{
            width:200px;
            display:inline-block;
            line-height:40px;
            height:40px;
            background-color: rgba(240, 135, 30, 1);
            border-radius:20px;
            font-size:16px;
            color:#fff;
          }
        }
      }
      .loanApplication{
        overflow-y:auto;
        width:737px;
        margin-left:10px;
        height:645px;
        background-color:rgba(255,255,255,0.6);
        .detail{
          background-color:#fcfbfb;
          width:100%;
          height:100%;
          overflow-y:auto;
          .back{
            padding:20px 26px;
            text-align:right;
            span{
              cursor:pointer;
              color:#363f45;
              font-size:14px;
            }
          }
        }
        .list{
          .tHeader{
            width:100%;
            text-align:left;
            height: 55px;
            line-height:50px;
            background-color:#fcfbfb;
            box-shadow: inset 0px -1px 0px 0px
              rgba(230, 231, 237, 1);
            span{
              color: #363f45;
              font-size:14px;
              font-weight:600;
              &.first{
                margin-left:140px;
              }
              &.sec{
                margin-left:240px;
              }
              &.operation{
                float:right;
                width:170px;
                text-align:center;
                margin-right:8px;
              }
            }
          }
          .tableContent{
            .tabItem{
              font-size:14px;
              box-sizing:border-box;
              width:100%;
              &:hover{
                background-color:rgb(255, 245, 235);
              }
              div{
                box-sizing:border-box;
              }
              .header{
                text-align:left;
                line-height:40px;
                height:40px;
                border-bottom:1px solid #ddd;
                margin-left:20px;
                width:calc(100% - 20px);
                .num{
                  margin-left:10px;
                  margin-right:40px;
                }
              }
              .tr{
                width:calc(100% - 8px);
                height:105px;
                border-bottom:1px solid #ddd;
                .first{
                  padding-left:20px;
                  text-align:left;
                  margin-top:18px;
                  height:20px;
                  span{
                    height:20px;
                    line-height:24px;
                    display:inline-block;
                    vertical-align:text-top;
                    &.productName{
                      margin-right:40px;
                    }
                    &.enterpriseName{
                      margin-right:40px;
                    }
                  }
                  .pic{
                    display:inline-block;
                    width:20px;
                    height:20px;
                  }
                }
                .last{
                  padding-left:20px;
                  padding-top:40px;
                  text-align:left;
                  span{
                    &.ed{
                      margin-right:40px;
                    }
                    &.time{
                      margin-right:170px;
                    }
                    &.operation{
                      float:right;
                      width:170px;
                      text-align:center;
                      span{
                        padding:0 5px;
                        cursor:pointer;
                        text-decoration:underline;
                        &:hover{
                          color:#f0871e
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .modifyPwd{
        width:737px;
        margin-left:10px;
        height:645px;
        background-color:rgba(255,255,255,0.6);
      }
    }
  }
</style>

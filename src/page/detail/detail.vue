<template>
  <div class="pdetail">
    <v-header :productList="productList" :isDetail='true' :city='city' :choseCity='choseCity' :productId='product_id'></v-header>
    <div v-show='!isApply'>
      <v-banner :listImg="listImg" :isDetail="true"></v-banner>
      <v-detail :labelList='labelList' :logo='logo'></v-detail>
      <v-feature :featureList='featureList'></v-feature>
      <v-step></v-step>
      <v-product :xy='xy'></v-product>
      <div class="confirmBtn">
        <button @click='showTip'>提交贷款申请</button>
      </div>
    </div>
    <div v-show='isApply' class='applyProduct'>
      <div class="product" :style="product_two" v-if='!saveSuccess&&!applySuccess'>
        <div class="product-content">
          <div class="product-right-odd">
            <img :src="logo" alt="" width="440" height="252">
          </div>
          <div class="product-left-odd">
            <div class="title">
              <span class="product-name">{{product.name}}</span>
              <span class="product-bank">{{product.provider}}</span>
            </div>
            <p class="line"></p>
            <div class="product-info">{{product.indexTitle}}</div>
            <div class="product-item">
              <span class="rate">年利率：{{product.rateFrom}} %-{{product.rateTo}}%</span>
              <span class="limit">最高额度：{{product.maximum}}万</span>
              <span class="due-time">还款期限：{{product.repaymentTerm}}个月</span>
            </div>
            <div class="open-city">已开通城市：{{product.oc}}</div>
            <ul class="feature">
              <li class="feature-item" v-for="(item,index) in labelPictureList" :key="item.num">{{item}}
                <span class="icon" :style="{backgroundImage: 'url(' + item.path + ')' }"></span>
                <span class="icon-text">{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class='applyInfo' v-if='!saveSuccess&&!applySuccess'>
        <div></div>
        <p>基本信息</p>
      </div>
      <div class='form' v-if='!saveSuccess&&!applySuccess'>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>公司名称:</span>
          </div>
          <div class="right input">
            <input type="text" disabled="disabled" v-model='form.enterpriseName'>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>纳税人识别号:</span>
          </div>
          <div class="right input">
            <input type="text" disabled="disabled" v-model='form.nsrsbh'>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>申请人类型:</span>
          </div>
          <div class="right input">
            <el-select v-model="form.proposerType" placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>申请人姓名:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength="10" placeholder="请输入申请人姓名"  @compositionstart="start" @compositionend="end" @keydown='nameReplace' @keyup='nameReplace' @focus='removeTip("proposerName")' v-model='form.proposerName'>
            <span v-if='error.proposerName' class='red'>{{error.proposerNameTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>申请人身份证号:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength="18" placeholder="请输入申请人身份证号" @keyup='idReplace' @focus='removeTip("proposerId")' v-model='form.proposerId'>
            <span v-if='error.proposerId' class='red'>{{error.proposerIdTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>申请人手机号码:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=11 placeholder="请输入申请人手机号码" @keyup='phoneReplace' @focus='removeTip("proposerTelphone")' v-model='form.proposerTelphone'>
            <span v-if='error.proposerTelphone' class='red'>{{error.proposerTelphoneTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>申请贷款额度:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=5 placeholder="请输入申请贷款额度" class='wy' @keyup='edReplace($event)' @focus='removeTip("loanLimit")' v-model='form.loanLimit'>
            <span v-if='error.loanLimit' class='red'>{{error.loanLimitTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>申请贷款期限:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=3 placeholder="请输入申请贷款期限" class='gy' @keyup='timeReplace' @focus='removeTip("loanTerm")' v-model='form.loanTerm'>
            <span v-if='error.loanTerm' class='red'>{{error.loanTermTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span>营销推荐代码:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=20 @keyup='codeReplace'  @focus='removeTip("marketingCode")' v-model='form.marketingCode'>
            <span v-if='error.marketingCode' class='red'>{{error.marketingCodeTip}}</span>
          </div>
        </div>
      </div>
      <div class='applyInfo' v-if='!saveSuccess&&!applySuccess'>
        <div></div>
        <p>征信数据</p>
      </div>
      <div class='form' v-if='!saveSuccess&&!applySuccess'>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>他行贷款金额:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=8 placeholder="请输入他行贷款金额" class='wy' @keyup='dkReplace($event,"otherBankLoan")' @focus='removeTip("otherBankLoan")' v-model='form.otherBankLoan'>
            <span v-if='error.otherBankLoan' class='red'>{{error.otherBankLoanTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>我行贷款金额:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=8 placeholder="请输入我行贷款金额" class='wy' @keyup='dkReplace($event,"ourBankLoan")' @focus='removeTip("ourBankLoan")' v-model='form.ourBankLoan'>
            <span v-if='error.ourBankLoan' class='red'>{{error.ourBankLoanTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>对外担保余额:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=8 placeholder="请输入对外担保余额" class='wy' @keyup='dkReplace($event,"externalGuarantee")' @focus='removeTip("externalGuarantee")' v-model='form.externalGuarantee'>
            <span v-if='error.externalGuarantee' class='red'>{{error.externalGuaranteeTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>关联企业现有贷款余额:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=8 placeholder="请输入关联企业现有贷款余额" class='wy' @keyup='dkReplace($event,"affiliatedEnterpriseLoan")' @focus='removeTip("affiliatedEnterpriseLoan")' v-model='form.affiliatedEnterpriseLoan'>
            <span v-if='error.affiliatedEnterpriseLoan' class='red'>{{error.affiliatedEnterpriseLoanTip}}</span>
          </div>
        </div>
        <div class="formItem">
          <div class="left label">
            <span class='read'>*</span><span>个人经营性贷款余额:</span>
          </div>
          <div class="right input">
            <input type="text" maxlength=8 placeholder="请输入个人经营性贷款余额" class='wy' @keyup='dkReplace($event,"personalManagementLoan")' @focus='removeTip("personalManagementLoan")' v-model='form.personalManagementLoan'>
            <span v-if='error.personalManagementLoan' class='red'>{{error.personalManagementLoanTip}}</span>
            <span v-if='tip.personalManagementLoan'>{{tip.personalManagementLoanTip}}</span>
          </div>
        </div>
      </div>
      <div class="item" v-if='!saveSuccess&&!applySuccess'>
        <el-checkbox v-model="checked"></el-checkbox><span class="read">阅读并接受</span><span class="orange pointer" @click="openxy">《数据授权协议》</span>
      </div>
      <div class='item btn' v-if='!saveSuccess&&!applySuccess'>
        <button @click='submit' :disabled='!checked'>提&nbsp;&nbsp;交</button>
        <button @click='save'>资料保存</button>
      </div>
      <div class='success' v-if='saveSuccess||applySuccess'>
        <div class='apply' v-if='applySuccess'>
          <div class='first'>
            <span class="el-icon-circle-check icon-large"></span><span>申请资料提交成功</span>
          </div>
          <div class='sec'>
            <span>{{time}}秒后自动转到贷款申请页面,查看贷款申请进度;</span><span class='center' @click='goCenter'>立即进入贷款申请</span><span class='home' @click='goHome'>返回网站首页</span>
          </div>
          <div class='th'>
            <span>{{product.name}}-{{product.provider}}</span>
          </div>
          <div class='applyDetail'>
            <span>申请额度：{{form.loanLimit}}</span><span>申请贷款期限：{{form.loanTerm}}</span>
          </div>
        </div>
        <div class='saveInfo' v-if='saveSuccess'>
          <div class='first'>
            <span class="el-icon-circle-check icon-large"></span><span>贷款申请资料保存成功,请稍候完善</span>
          </div>
          <div class='sec'>
            <span>{{time}}秒后自动转到贷款申请页面</span><span class='center' @click='goCenter'>立即进入贷款申请</span><span class='home' @click='goHome'>返回网站首页</span>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
    <v-top></v-top>
  </div>
</template>

<script>
  import header from '@/components/header/header.vue';
  import banner from '@/components/banner/banner.vue';
  import detail from '@/components/product/productDetail.vue';
  import features from '@/components/product/features.vue';
  import step from '@/components/product/step.vue';
  import productContent from '@/components/product/productContent.vue';
  import footer from '@/components/footer/footer.vue';
  import top from '@/components/top/top.vue';

  import a from '@/components/banner/detailBanner.png'

  export default {
    name: 'App',
    data() {
      let enterpriseName='',nsrsbh='',userId='',token='';
      let INFO = JSON.parse(sessionStorage.getItem("INFO"));
      if(!(INFO == null || !INFO.authed || INFO.authed=='0')){
        enterpriseName = INFO.enterpriseName;
        nsrsbh = INFO.sh;
        userId = INFO.userId;
        token = INFO.token;
      }
      return {
        interval:null,
        saveSuccess:false,
        applySuccess:false,
        time:5,
        checked:false,
        pos:'b',
        product_two: {
          backgroundImage: "url(" + require("./product-one.png") + ")",
        },
        product:{name:'123',provider:'',indexTitle:'',rateFrom:'',rateTo:'',maximum:'',repaymentTerm:'',oc:''},
        typeList:[{value:1,label:'法定代表人'},{value:2,label:'最大控股自然人'}],
        isApply:false,
        xy:{
          detail:'',
          applyNeed:'',
          loadAgreement:''
        },
        labelList:[{
          label:'最高额度',
          content:''
        },{
          label:'年利率',
          content:''
        },{
          label:'担保方式',
          content:''
        },{
          label:'还款期限',
          content:''
        },{
          label:'还款方式',
          content:''
        },{
          label:'开通地区',
          content:''
        }],
        product_id:'',
        logo:'',
        choseCity:'',
        city:{},
        currentCity:{},
        productList:{},
        repaymentStyle:{1:"先息后本",2:'等额本息',3:'等额本金',4:'一次性还本付息',5:'等本还息',6:'随借随还'},
        guarantee:{1:'信用',2:'保证',3:'抵押',4:'质抵',5:'其他'},
        featureList:[{path:require('@/components/product/fast-o.png'),name:'下款快',description:'一周内可以拿到资金'},{path:require('@/components/product/low-o.png'),name:'下款快',description:'一周内可以拿到资金'},{path:require('@/components/product/free-o.png'),name:'下款快',description:'一周内可以拿到资金'},{path:require('@/components/product/high-o.png'),name:'下款快',description:'一周内可以拿到资金'}],
        listImg: [{
          path: a
        }],
        labelPictureList:[],
        headers:{
          client:'1',
          userId:userId,
          token:token
        },
        form:{
          productId:'',
          enterpriseName:enterpriseName,
          nsrsbh:nsrsbh,
          proposerName:'',
          proposerType:1,
          proposerId:'',
          proposerTelphone:'',
          loanLimit:'',
          loanTerm:'',
          otherBankLoan:'',
          ourBankLoan:'',
          externalGuarantee:'',
          affiliatedEnterpriseLoan:'',
          personalManagementLoan:'',
          marketingCode:''
        },
        error:{
          proposerName:false,
          proposerNameTip:'申请人姓名不能为空',
          proposerId:false,
          proposerIdTip:'申请人身份证号不能为空',
          proposerTelphone:false,
          proposerTelphoneTip:'申请人手机号码不能为空',
          loanLimit:false,
          loanLimitTip:'申请贷款额度不能为空',
          loanTerm:false,
          loanTermTip:'申请贷款期限不能为空',
          otherBankLoan:false,
          otherBankLoanTip:'他行贷款金额不能为空',
          ourBankLoan:false,
          ourBankLoanTip:'我行贷款金额不能为空',
          externalGuarantee:false,
          externalGuaranteeTip:'对外担保余额不能为空',
          affiliatedEnterpriseLoan:false,
          affiliatedEnterpriseLoanTip:'关联企业现有贷款余额不能为空',
          personalManagementLoan:false,
          personalManagementLoanTip:'个人经营性贷款余额不能为空',
          marketingCode:false,
          marketingCodeTip:'请输入6-20位字符'
        },
        err:{
          otherBankLoan:'他行贷款金额',
          ourBankLoan:'我行贷款金额',
          externalGuarantee:'对外担保余额',
          affiliatedEnterpriseLoan:'关联企业现有贷款余额',
          personalManagementLoan:'个人经营性贷款余额'
        },
        tip:{
          personalManagementLoan:false,
          personalManagementLoanTip:'法定代表人及实际控制人家庭经营性贷款余额'
        },
      }
    },
    components: {
      'v-header': header,
      'v-banner': banner,
      'v-detail': detail,
      'v-footer': footer,
      'v-feature': features,
      'v-step': step,
      'v-product':productContent,
      'v-top': top
    },
    methods: {
      start () {this.pos = 'a';},
      end () {
        this.pos = 'b';
      },
      getCurrentCity () {
        const data = {
          "service":"locationService",
          "method":"getCurrentCity",
          "data":{}
        };
        this.$api.post('', data, this.citySuc, this.cityErr, this.headers);
      },
      citySuc(data) {
        let code = data.currentCity.regionCode;
        data.choseCity = data.currentCity.regionName;
        this.currentCity = data.currentCity;
        let arr = [];
        arr.push(data.currentCity);
        data.currentCity=arr;
        this.city = data;
      },
      cityErr(data) {
        console.log(data);
      },
      change () {
        this.bus.$emit('change',{title:'首页'})
      },
      showTip () {
        let INFO=JSON.parse(sessionStorage.getItem("INFO"));
        let me = this ;
        if(INFO && INFO.token){
          if(this.currentCity.regionName!==this.choseCity){
            this.$confirm('您申请的产品不在您所处范围内销售,您可继续申请或切换所在地申请其他产品。我们将会对您的信息进行核实。', '提示', {
              confirmButtonText: '确认',
              confirmButtonClass:'sureBtn',
              cancelButtonText: '取消',
              cancelButtonClass:'cancelBtn',
              center: true,
              callback: action => {
                if(action == "confirm"){
                  me.isApply = true;
                }
              }
            });
            return;
          }else if(!INFO.authed||INFO.authed == '0'){
            this.$confirm('您尚未进行爱税宝认证,请认证后再申请。', '提示', {
              confirmButtonText: '确认',
              confirmButtonClass:'sureBtn',
              cancelButtonText: '取消',
              cancelButtonClass:'cancelBtn',
              center: true,
              callback: action => {
                if(action == "confirm"){
                  me.$router.push({name:'center', params:{city:me.city,productList:me.productList,choseCity:me.choseCity}});
                }
              }
            });
            return;
          }
          me.isApply = true;
        }else{
          this.$alert('您尚未登录,请登录后再申请产品!', '提示', {
            confirmButtonText: '去登录',
            center: true,
            callback: action => {
              if(action == "confirm"){
                me.$router.push({name:'login',params:{product_id:me.product_id,productList:me.productList,choseCity:me.choseCity}});
              }
            }
          });
        }
      },
      getProductDetail () {
        let data = {
          "service":"configService",
          "method":"getProductInfo",
          "data":{
            "productId":this.product_id
          }
        };
        this.$api.post('',data,this.getDetailSuc,this.getDetailErr,this.headers);
      },
      getDetailSuc (data) {
        let res = data[0];
        let me=this;
        this.labelList[0].content=(res.maximum||'0')+'万元';
        this.labelList[1].content=(res.rateFrom||'9')+'%'+(res.rateTo?'~'+res.rateTo+'%':'');
        let guarantee = res.guarantee.split(',');
        let str='';
        let len = guarantee.length;
        guarantee.map((item,index)=>{
          str+=me.guarantee[guarantee[index]];
          if(index<len-1){
            str+='、';
          }
        });
        this.labelList[2].content=str;
        this.labelList[3].content=res.repaymentTerm+'个月';
        let repaymentStyle = res.repaymentStyle.split(',');
        let str1='';
        let len1=repaymentStyle.length;
        repaymentStyle.map((item,index)=>{
          str1+=me.repaymentStyle[repaymentStyle[index]];
          if(index<len1-1){
            str1+='、';
          }
        });
        this.labelList[4].content=str1;
        let str2='';
        let openedCity=res.openCity;
        let len2=openedCity.length;
        openedCity.map((item,index)=>{
          str2+=openedCity[index].cityName;
          if(index<len2-1){
            str2+='、';
          }
        });
        this.labelList[5].content=str2;
        this.labelPictureList=res.labelPictureList;
        this.xy.detail=res.detail;
        this.xy.applyNeed=res.applyNeed;
        this.xy.loadAgreement=res.loadAgreement;
        res.labelPictureList.map((item,index)=>{
          item.path = me.$util.imgURL.img + item.path;
        })
        this.featureList=res.labelPictureList;
        this.logo = me.$util.imgURL.img + res.logo.path;
        this.product.name=res.name;
        this.product.provider=res.provider;
        this.product.indexTitle=res.indexTitle;
        this.product.rateFrom=res.rateFrom;
        this.product.rateTo=res.rateTo;
        this.product.maximum=res.maximum;
        this.product.repaymentTerm=res.repaymentTerm;
        this.product.oc=str2;
      },
      getDetailErr ( res ){
        console.log(res);
      },
      openxy () {
        let me = this;
        this.$alert(me.$util.dataxy, '数据授权协议', {
          dangerouslyUseHTMLString: true,
          confirmButtonClass:'sureBtn',
          confirmButtonText: '已阅读并同意协议',
          callback: action => {
            if(action == "confirm"){
              me.checked=true;
            }
          }
        });
      },
      nameReplace ($event) {
        if(this.pos === 'a'){
          return;
        }
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\u4E00-\u9FA5]/g,'');
        this.form.proposerName = dom.value;
      },
      idReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\dXx]/g,'');
        this.form.proposerId = dom.value;
      },
      phoneReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d]/g,'');
        this.form.proposerTelphone = dom.value;
      },
      edReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d]/g,'');
        this.form.loanLimit = dom.value;
      },
      dkReplace ($event,tag) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d.]/g,'');
        this.form[tag] = dom.value;
      },
      timeReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d]/g,'');
        this.form.loanTerm = dom.value;
      },
      codeReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\da-zA-Z]/g,'');
        this.form.marketingCode = dom.value;
      },
      checkName () {
        if(!this.form.proposerName||this.form.proposerName===''){
          this.error.proposerName=true;
          this.error.proposerNameTip='申请人姓名不能为空';
          return this.error.proposerName;
        }
        return this.error.proposerName;
      },
      checkId () {
        if(!this.form.proposerId||this.form.proposerId===''){
          this.error.proposerId=true;
          this.error.proposerIdTip='申请人身份证号不能为空';
          return this.error.proposerId;
        }
        if(!this.$util.vili.id(this.form.proposerId)){
          this.error.proposerId=true;
          this.error.proposerIdTip='请输入真实有效的身份证号';
          return this.error.proposerId;
        }
        return this.error.proposerId;
      },
      checkPhone () {
        if(!this.form.proposerTelphone||this.form.proposerTelphone===''){
          this.error.proposerTelphone=true;
          this.error.proposerTelphoneTip='申请人手机号码不能为空';
          return this.error.proposerTelphone;
        }
        if(!this.$util.vili.loginName(this.form.proposerTelphone)){
          this.error.proposerTelphone=true;
          this.error.proposerTelphoneTip='请输入有效的手机号码';
          return this.error.proposerTelphone;
        }
        return this.error.proposerTelphone;
      },
      checkEd () {
        let a = this.form.loanLimit;
        if(!this.form.loanLimit||this.form.loanLimit===''){
          this.error.loanLimit=true;
          this.error.loanLimitTip='申请贷款额度不能为空';
          return this.error.loanLimit;
        }
        let flag = false;
        a = String(a);
        let arr = a.split('');
        if(isNaN(arr[0])||parseInt(arr[0])==0){
          flag = true;
        }
        if(flag){
          this.error.loanLimit=true;
          this.error.loanLimitTip='请输入不超过5位正整数';
          return this.error.loanLimit;
        }
        if(parseInt(this.form.loanLimit)>parseInt(this.product.maximum)){
          this.error.loanLimit=true;
          this.error.loanLimitTip='不能超过产品最高额度';
          return this.error.loanLimit;
        }
        return this.error.loanLimit;
      },
      checkTime () {
        let a = this.form.loanTerm;
        if(!a||a===''){
          this.error.loanTerm=true;
          this.error.loanTermTip='申请贷款期限不能为空';
          return this.error.loanTerm;
        }
        let flag = false;
        a = String(a);
        let arr = a.split('');
        if(isNaN(arr[0])||parseInt(arr[0])==0){
          flag = true;
        }
        if(flag){
          this.error.loanTerm=true;
          this.error.loanTermTip='请输入不超过3位正整数';
          return this.error.loanTerm;
        }
        if(parseInt(this.form.loanTerm)>parseInt(this.product.repaymentTerm)){
          this.error.loanTerm=true;
          this.error.loanTermTip='不能超过产品还款期限';
          return this.error.loanTerm;
        }
        return this.error.loanTerm;
      },
      checkQk (tag) {
        let a = this.form[tag];
        if(!a || a===''){
          this.error[tag] = true;
          this.error[tag+'Tip'] = this.err[tag]+'不能为空';
          return this.error[tag];
        }
        a = String(a);
        let flag = false;
        let arr = a.split('');
        let count = 0,index=0,len=arr.length;
        if(isNaN(arr[0])){
          flag = true;
        }
        arr.map((item,k)=>{
          if(item == '.'){
            count++;
          }
        });
        if(count>=2){
          flag = true;
        }
        if(flag){
          this.error[tag]=true;
          this.error[tag+'Tip']='最多不超过10000万元，可保留两位小数';
          return this.error[tag];
        }
        arr.map((item,k)=>{
          if(item == '.'){
            index = k;
            return false;
          }
        });
        if((index!=0 && len-index>3)||(len>1&&len-index==1)||parseInt(a)>10000){
          flag = true;
        }
        if(flag){
          this.error[tag]=true;
          this.error[tag+'Tip']='最多不超过10000万元，可保留两位小数';
          return this.error[tag];
        }
        return this.error[tag];
      },
      checkCode () {
        this.tip.personalManagementLoan = false;
        if(!this.form.marketingCode || this.form.marketingCode ===''){
          return this.error.marketingCode;
        }
        if(!this.$util.vili.code(this.form.marketingCode)){
          this.error.marketingCode = true;
        }
        return this.error.marketingCode
      },
      removeTip (tag) {
        this.error[tag] = false;
        if(tag == 'personalManagementLoan'){
          this.tip.personalManagementLoan=true;
        }
      },
      save () {
        let data = {
          "service":"applyService",
          "method":"saveApplyInfo",
          "data":this.form
        };
        this.$api.post('',data,this.saveSuc,this.saveErr,this.headers);
      },
      submit () {
        let err = this.checkName()+this.checkId()+this.checkPhone()+this.checkEd()+this.checkTime()+this.checkCode()+
        this.checkQk('otherBankLoan')+this.checkQk('ourBankLoan')+this.checkQk('externalGuarantee')+this.checkQk('affiliatedEnterpriseLoan')+this.checkQk('personalManagementLoan');
        if(err){
          return;
        }
        let data = {
          "service":"applyService",
          "method":"commitApply",
          "data":this.form
        };
        this.$api.post('',data,this.applySuc,this.applyErr,this.headers);
      },
      applySuc(data){
        this.applySuccess = true;
        this.timer();
      },
      applyErr(res){
        if( this.$util.goLogin(res.returnCode)){
          this.goLogin();
          return;
        }
      },
      saveSuc (data) {
        this.saveSuccess = true;
        this.timer();
      },
      saveErr (res) {
        if( this.$util.goLogin(res.returnCode)){
          this.goLogin();
          return;
        }
      },
      getApplyInfoSuc (data) {
        this.form.productId = data.productId;
        this.form.enterpriseName = data.enterpriseName;
        this.form.nsrsbh = data.nsrsbh;
        this.form.proposerName = data.proposerName;
        this.form.proposerType = data.proposerType;
        this.form.proposerId = data.proposerId;
        this.form.proposerTelphone = data.proposerTelphone;
        this.form.loanLimit = data.loanLimit;
        this.form.loanTerm = data.loanTerm;
        this.form.otherBankLoan = data.otherBankLoan;
        this.form.ourBankLoan = data.ourBankLoan;
        this.form.externalGuarantee = data.externalGuarantee;
        this.form.affiliatedEnterpriseLoan = data.affiliatedEnterpriseLoan;
        this.form.personalManagementLoan = data.personalManagementLoan;
        this.form.marketingCode = data.marketingCode;
      },
      getApplyInfoErr (res) {
        if( this.$util.goLogin(res.returnCode)){
          this.goLogin();
          return;
        }
      },
      timer () {
        let time = 5;
        this.time = time;
        let me = this;
        this.interval = setInterval(()=>{
          me.time--;
          if(me.time<=0){
            clearInterval(me.interval);
            me.goCenter();
          }
        },1000);

      },
      goHome () {
        if(this.interval){
          clearInterval(this.interval);
        }
        this.$router.push({name:'home'});
      },
      goCenter () {
        if(this.interval){
          clearInterval(this.interval);
        }
        this.$router.push({name:'center', params:{city:this.city,productList:this.productList,choseCity:this.choseCity},query:{dk:true}})
      }
    },
    created () {
      if(typeof(this.$route.query.productList[0])=='object'){
        sessionStorage.setItem('productList',JSON.stringify(this.$route.query.productList));
        this.productList=this.$route.query.productList;
      }else{
        this.productList=JSON.parse(sessionStorage.getItem('productList'));
      }
      this.$util.goTop();
      this.product_id=this.$route.query.product_id;
      this.form.productId=this.$route.query.product_id;
      this.choseCity=this.$route.query.choseCity;
      this.getCurrentCity();
      this.getProductDetail();
      if(this.$route.query.serialNum && this.$route.query.serialNum!=''){
        let data ={
          "service":"applyService",
          "method":"getApplyInfo",
          "data":{
            "serialNum": this.$route.query.serialNum
          }
        }
        this.$api.post('',data,this.getApplyInfoSuc,this.ApplyInfoErr,this.headers);
        this.isApply = true;
      }
    },
    watch: {
      '$route' (to, from) {
        this.product_id=this.$route.query.product_id;
        this.form.productId=this.$route.query.product_id;
        this.getProductDetail();
      }
    }
  }
</script>

<style lang="less">
  .orange{color:orange !important;}
  .pointer{cursor:pointer !important;}
  .read{margin-left:3px;}
  .el-message-box__headerbtn .el-message-box__close:hover{
    color:#f0871e !important;
  }
  .el-message-box__title{
    text-align:center;
  }
  .el-message-box__btns{
    text-align:center;
  }
  .el-message-box__message{
    max-height:500px;
    overflow-y:auto;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color:#f0871e !important;
    border-color:#f0871e !important;
  }
  .el-checkbox__inner{
    border-color:#f0871e !important;
  }
  .el-checkbox__inner:hover{
    border-color:#f0871e !important;
  }
  .el-checkbox__inner:focus{
    border-color:#f0871e !important;
  }
  .el-step__description{
    font-size:18px;
  }
  .el-tab-pane{
    font-family: ﻿MicrosoftYaHei;
    font-size:14px;
  }
  .sureBtn{
    background:#f0871e;
    border-color:#f0871e;
    &:hover{
      background:#f0871e;
      border-color:#f0871e;
    }
  }
  .el-message-box__btns .cancelBtn{
    background:#fff !important;
    border-color:#ddd !important;
    color:#000 !important;
    &:hover{
      background:#ccc !important;
      border-color:#ddd !important;
      color:#fff !important;
    }
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
  .confirmBtn {
    margin-top:50px;
    button{
      border:0;
      font-size: 16px;
      color:#fff;
      width:240px;
      height:40px;
      background-color: rgba(240, 135, 30, 1);
      border-radius: 20px;
      cursor: pointer;
      outline:none;
    }
  }
  .pdetail{
    .footer{
      padding-top:20px;
      background-color:#fff;
    }
    .copyright{
      background-color:#fff;
    }
  }
  .el-message-box__btns{
    button{
      background: rgb(240, 130, 30) !important;
      border-color: rgb(240, 130, 30) !important;
      &:hover{
        background: rgb(240, 130, 30) !important;
        border-color: rgb(240, 130, 30) !important;
      }
      &.cancelBtn{
        background-color:#fff;
      }
    }
  }
  .applyProduct{
    margin-top:80px;
    background-color: rgba(247, 245, 245, 1);
    .applyInfo{
      position:relative;
      border-bottom:1px solid #ddd;
      width:1000px;
      background-color:#fff;
      margin:30px auto 0 auto;
      div{
        width: 2px;
        height: 20px;
        background-color: rgba(240, 135, 30, 1);
        position:absolute;
        top:15px;
        left:15px;
      }
      p{
        width:1000px;
        height:50px;
        line-height:50px;
        text-align:left;
        padding-left:35px;
        font-size:20px;
        font-weight:600;
      }
    }
    .product{
      width: 100%;
      min-width: 1366px;
      height: 400px;
      background-repeat: no-repeat;
      background-size: 100%;
      .product-content{
        width: 1000px;
        margin: 0 auto;
        .product-left{
          width: 500px;
          float: left;
          text-align: left;
          display: inline-block;
          .title{
            padding: 41px 0 12px 0;
            font-size: 24px;
            .product-name{
              color: rgb(240, 135, 30);
            }
            .product-bank{
              color: rgb(122, 122, 122);
            }
          }
          .line{
            border-bottom: 2px solid rgb(240, 135, 30);
            width: 20px ;
          }
          .product-info{
            color: #999999;
            padding-top: 40px;
          }
          .product-item{
            color: #999999;
            padding-top: 14px;
            & > span{
              padding-right: 24px;
            }
          }
          .open-city{
            font-size: 14px;
            color: #999999;
            padding: 15px 0 20px 0;
          }
          .details{
            width: 136px;
            height: 30px;
            border:1px solid rgb(240, 135, 30);
            border-radius: 15px;
            & > a{
              font-size: 14px;
              color: rgb(240, 135, 30);
              line-height: 30px;
              padding: 8px 26px 8px 36px;
              }
          }
          .feature{
            display: inline-block;
            width: 400px;
            margin: 33px 0 0 20px;
            .feature-item{
              padding: 0 12px;
              float: left;
              font-size: 0;
              &:last-child {
                 margin-right: 0;
              }
              .icon {
                display: inline-block;
                width: 52px;
                height: 52px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 52px 52px;
                background-repeat: no-repeat;
              }
              .icon-text{
                display: block;
                margin-top: 20px;
                font-size: 14px;
                color: #231916;
                line-height: 30px;
                letter-spacing: 1px;
              }
            }
          }
        }
        .product-right{
          width: 500px;
          float: left;
          display: inline-block;
          & > img{
            margin: 100px 0 0 60px;
          }
        }
        .product-left-odd{
          width: 500px;
          float: left;
          text-align: left;
          display: inline-block;
          .title{
            padding: 41px 0 12px 0;
            font-size: 24px;
            .product-name{
              color: rgb(240, 135, 30);
            }
            .product-bank{
              color: rgb(122, 122, 122);
            }
          }
          .line{
            border-bottom: 2px solid rgb(240, 135, 30);
            width: 20px ;
          }
          .product-info{
            color: #999999;
            padding-top: 40px;
          }
          .product-item{
            color: #999999;
            padding-top: 14px;
          & > span{
              padding-right: 24px;
            }
          }
          .open-city{
            font-size: 14px;
            color: #999999;
            padding: 15px 0 20px 0;
          }
          .details{
            width: 136px;
            height: 30px;
            border:1px solid rgb(240, 135, 30);
            border-radius: 15px;
          & > a{
              font-size: 14px;
              color: rgb(240, 135, 30);
              line-height: 30px;
              padding: 8px 26px 8px 36px;
            }
          }
          .feature{
            display: inline-block;
            width: 400px;
            margin: 33px 0 0 20px;
            .feature-item{
              padding: 0 12px;
              float: left;
              font-size: 0;
              &:last-child {
               margin-right: 0;
              }
              .icon {
                display: inline-block;
                width: 52px;
                height: 52px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 52px 52px;
                background-repeat: no-repeat;
              }
              .icon-text{
                display: block;
                margin-top: 20px;
                font-size: 14px;
                color: #231916;
                line-height: 30px;
                letter-spacing: 1px;
              }
            }
          }
        }
        .product-right-odd{
          width: 500px;
          float: left;
          display: inline-block;
          & > img{
            margin: 100px 60px 0 0;
          }
        }
      }
    }
    .form{
      padding:40px 0;
      overflow:hidden;
      margin:0 auto;
      background-color:#fff;
      width:1000px;
      .formItem{
        height:40px;
        width:1000px;
        margin:9px auto;
        font-size:14px;
        .left{
          height:100%;
          float:left;
          text-align:right;
          width:350px;
          .read{
            color:red;
          }
          span{
            display:inline-block;
            line-height:40px;
          }
        }
        .right{
          box-sizing:border-box;
          padding-left:100px;
          height:100%;
          line-height:40px;
          float:right;
          text-align:left;
          width:650px;
          input{
            box-sizing:border-box;
            height:30px;
            width:240px;
            line-height:30px;
            border:1px solid #ddd;
            padding:0 36px 0 6px;
            &:disabled{
              background-color:#fff;
              border:none;
              padding:0;
            }
            &.wy{
              background:url(./wy.png) right center no-repeat;
            }
            &.gy{
              background:url(./gy.png) right center no-repeat;
            }
          }
          span{
            dispaly:inline-block;
            line-height:40px;
            height:40px;
            margin-left:10px;
            &.red{
              color:red;
            }
          }
        }
      }
    }
    .item{
      text-align:left;
      width:1000px;
      margin:0 auto;
      height:60px;
      line-height:40px;
      &.btn{
        text-align:center;
        padding-bottom:30px;
      }
      span{
        font-size:13px;
        &.read{
          color:#999;
        }
      }
      button{
        height:40px;
        width:100px;
        line-height:40px;
        background:rgb(240,135,30);
        border:1px solid #ddd;
        border-radius:20px;
        color:#fff;
        cursor:pointer;
        margin:10px;
        &:hover{
          background:rgb(240,135,30);
        }
        &:focus{
          outline:none;
        }
        &:disabled{
          cursor:not-allowed;
        }
      }
    }
    .success{
      height:calc(100vh - 415px);
      background:#fff;
      .apply{
        div{
          width:1000px;
          margin:0 auto;
          text-align:left;
        }
        .first{
          padding-top:30px;
          span{
            vertical-align:text-top;
            height:50px;
            display:inline-block;
            line-height:50px;
            font-size:24px;
          }
          .icon-large{
            font-size:50px;
            background-color:#fff;
            color:#f0871e;
            margin-right:20px;
          }
        }
        .sec{
          margin-top:30px;
          span{
            margin-right:20px;
            &.center{
              color:blue;
              cursor:pointer;
            }
            &.home{
              color:blue;
              cursor:pointer;
            }
          }
        }
        .th{
          margin-top:30px;
          span{
            font-weight:600;
          }
        }
        .applyDetail{
          margin-top:30px;
          span{
            margin-right:30px;
          }
        }
      }
      .saveInfo{
        div{
          width:1000px;
          margin:0 auto;
          text-align:left;
        }
        .first{
          padding-top:50px;
          span{
            vertical-align:text-top;
            height:50px;
            display:inline-block;
            line-height:50px;
            font-size:24px;
          }
          .icon-large{
            font-size:50px;
            background-color:#fff;
            color:#f0871e;
            margin-right:20px;
          }
        }
        .sec{
          margin-top:30px;
          span{
            margin-right:20px;
            &.center{
              color:blue;
              cursor:pointer;
            }
            &.home{
              color:blue;
              cursor:pointer;
            }
          }
        }
      }
    }
  }
</style>

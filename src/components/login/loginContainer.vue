-<template>
  <div class="loginContainer">
    <input style="display:none" type="text" name="loginName"/>
    <input style="display:none" type="password" name="password"/>
  	<div class="topImage">
      <img src="./protect.png">
	  </div>
    <div class="content" v-if="contents">
      <div class="title">会员登录</div>
      <div class="formContainer">
        <div class="phoneiItem">
          <input type="text" placeholder="请输入有效手机号" name="loginName" autocomplete="off" @focus="removeTip('phone')" @keyup='nameReplace($event)' maxlength="11" :class='{errorinput:input.phone}'/>
        </div>
        <div class="pwditem">
          <input :type="type" placeholder="请输入密码" name="password" autocomplete="off" @focus="removeTip('pwd')" @keyup="pwdReplace($event)" maxlength="20" :class='{errorinput:input.pwd}'/>
          <i class='iconfont' @click='changeType' :class='{"icon-eye":type!=="text","icon-see":type=="text"}'></i>
        </div>
        <div class="verifyItem">
          <input type="text" placeholder="请输入验证码" name="validateCode" class="validateCode" v-model="form.validateCode" @focus="removeTip('vili')" :class='{errorinput:input.vili}'/>
          <div class="right imgContainer" @click="getViliImg"><img :src="validateImg" alt="" width="100" height="40"></div>
        </div>
        <div class="showErrorMsg">
        		<span v-if="form.tipShow">{{form.tip}}</span>
        </div>
        <div class="pwdItem">
          <a class="forgetPwd" @click="resetPwd">忘记密码？</a>
          <a class="msgLogin" @click='msgFastLogin'>短信快捷登录</a>
        </div>
        <div class="loginBtn">
          <button @click="submit" :disabled="reg">登录</button>
        </div>
        <div class="noCount">
          <span class="nomsg">没有账号？</span><router-link to="/register">注册</router-link>
        </div>
      </div>

    </div>

  	<div class="mem_Content" v-if="mem_Contents">
  		<div class="mem_title">会员登录</div>
      	<input style="display:none" type="text" name="loginName"/>
      	<input style="display:none" type="password" name="password"/>
      	<div class="mem_formContainer">
      		<div class="mem_phoneItem">
      			<input type="tel" placeholder="请输入有效手机号" name="loginName" id="loginName" v-model="phoneForm.loginName" @keyup='phoneNameReplace($event)' autocomplete="off" @focus='removePhoneErrtip("loginName")' maxlength="11" :class='{errorinput:input.loginName}'/>
      		</div>
      		<div class="mem_verify">
      			<input type="text" placeholder="" name="validateCode" class="validateCode" v-model="phoneForm.viliCode" @focus='removePhoneErrtip("verCode")' :class='{errorinput:input.verCode}'/>
          		<button class="mem_sendCode" @click="getVerifyCode" :class="{orange:!send}" :disabled="send">{{sendMsg}}</button>
      		</div>
      		<div class="mem_errorMsg" v-if="phoneForm.tipShow">{{phoneForm.tip}}</div>
          <div class="mem_agreement">
            <a class="mem_pwdLogin" @click="pwdLogin">账号密码登录</a>
          </div>
      		<div class="mem_loginBtn">
      			<button @click="mem_submit" :disabled="reg">登 录</button>
      		</div>
          <div class="noCount">
            <span class="nomsg">没有账号？</span><router-link to="/register">注册</router-link>
          </div>

      	</div>
  	</div>

  </div>
</template>

<script>
  export default {
    data () {
      let form={
        loginName:'',
        password:'',
        validateCode:'',
        tip:'',
        tipShow:false
      };
      let phoneForm={
        loginName:'',
        viliCode:'',
        tip:'',
        tipShow:false
      };
      let reg=false;
      let btnDisabled=true;
      let validateImg='';
      return {
        input:{
          phone:false,
          pwd:false,
          vili:false,
          loginName:false,
          verCode:false,
        },
        type:'password',
        reg:false,
        send:false,
        sendMsg:"发送验证码",
        phoneForm:phoneForm,
      	form:form,
      	validateImg:validateImg,
      	btnDisabled:btnDisabled,
      	uuid:'',
      	contents: true,
      	mem_Contents: false,
        headers:{
          client:"1",
          userId:"",
          token:""
        }
      };
    },
    methods:{
      changeType () {
        this.type = this.type == 'password'?'text':'password';
      },
    	pwdLogin(){
        this.reg=false;
    		this.contents = true;
    		this.mem_Contents = false;
        this.form.loginName='';
        this.form.password='';
        this.form.validateCode='',
        this.form.tip='',
        this.form.tipShow=false;
        this.input.phone = false;
        this.input.pwd = false;
        this.input.vili = false;
        this.input.loginName = false;
        this.input.verCode = false;
    	},
      msgFastLogin(){
        this.reg=false;
        this.contents = false;
        this.mem_Contents = true;
        this.phoneForm.loginName='';
        this.phoneForm.viliCode='',
        this.phoneForm.tip='',
        this.phoneForm.tipShow=false;
        this.send=false;
        this.sendMsg="发送验证码";
      },
      nameReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d]/g,'');
        this.form.loginName = dom.value;
      },
      phoneNameReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d]/g,'');
        this.phoneForm.loginName = dom.value;
      },
      pwdReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[\W]/g,'');
        this.form.password = dom.value;
      },
      getViliImg () {
        let data = {
          "service": "generalService",
          "method": "getValidateImg",
          "data": {
            "uuid": this.uuid
          }
        };
        this.$api.post('',data,this.getImgSuc,this.getImgErr,this.headers);
      },
      getImgSuc (data) {
        this.validateImg=data.image;
      },
      getImgErr (res) {
        console.log(res);
      },
      renderUuid () {
        let uuid="";
        for(var i=0;i<32;i++){
            uuid+=Math.floor(Math.random()*16).toString(16);
        }
        return uuid;
      },
      getVerifyCode () {
        this.phoneForm.tipShow=!this.$util.vili.loginName(this.phoneForm.loginName);
        if(this.phoneForm.tipShow){
          this.phoneForm.tip="请输入有效的手机号码";
          return;
        }
        let data={
          "service":"generalService",
          "method":"getValidateCode",
          "data":{
            "loginName":this.phoneForm.loginName,
            "type":"L"
          }
        }
        this.$api.post('',data,this.getVerifyCodeSuc,this.getVerifyCodeErr,this.headers);
      },
      getVerifyCodeSuc (data) {
        this.startTimer();
      },
      getVerifyCodeErr (res) {
        if(res.returnCode == this.$util.ajaxCode.exist){
          this.phoneForm.tipShow=true;
          this.phoneForm.tip="手机号未注册";
        }else{
          this.phoneForm.tipShow=true;
          this.phoneForm.tip=res.returnMessage;
        }
      },
      startTimer () {
        if (timer){
          clearInterval(timer);
        }
        this.send = true;
        let time = 60;
        let me = this;
        let timer =setInterval(() => {
          if(time==0){
            me.sendMsg = "发送验证码";
            me.send = false;
            clearInterval(timer);
            return;
          }
          me.sendMsg = time + "s后重新发送";
          me.send = true;
          time--;
        },1000);
      },
      removePhoneErrtip (tag) {
        this.phoneForm.tip="";
        this.input[tag] = false;
        this.phoneForm.tipShow=false;
      },
      mem_submit () {
        if(!this.phoneForm.loginName){
          this.input.loginName = true;
          this.phoneForm.tipShow = true;
          this.phoneForm.tip="手机号不能为空";
          return;
        }
        this.phoneForm.tipShow=!this.$util.vili.loginName(this.phoneForm.loginName);
        if(this.phoneForm.tipShow){
          this.input.loginName = true;
          this.phoneForm.tip="请输入有效的手机号码";
          return;
        }
        this.phoneForm.tipShow=!this.phoneForm.viliCode;
        if(this.phoneForm.tipShow){
          this.input.verCode = true;
          this.phoneForm.tip="验证码不能为空";
          return;
        }
        this.reg=true;
        let data={
          "service": "generalService",
          "method": "login",
          "data":{
            "loginName":this.phoneForm.loginName,
            "password":'',
            "loginType":"V",
            "validateCode":this.phoneForm.viliCode,
            "uuid":''
          }
        }
        this.$api.post('',data,this.loginSuc,this.loginErr,this.headers);
      },
      loginSuc (data) {
        this.reg=false;
        sessionStorage.setItem("INFO",JSON.stringify(data));
        let params=this.$route.params;
        if( params && params.product_id ){
          this.$router.push({name:'detail',query:params});
          return;
        }
        this.$router.push({name:'home'});
      },
      loginErr (res) {
        this.reg=false;
        this.phoneForm.tipShow=true;
        let ajaxCode=this.$util.ajaxCode;
        let returnCode=res.returnCode;
        this.phoneForm.tip=res.returnMessage;
      },
      pwdLoginErr (res) {
        this.reg=false;
        this.form.tipShow=true;
        let ajaxCode=this.$util.ajaxCode;
        let returnCode=res.returnCode;
        this.form.tip=res.returnMessage;
      },
      removeTip (tag) {
        this.form.tip='';
        this.input[tag] = false;
        this.form.tipShow=false;
      },
      resetPwd () {
        this.$router.push('/resetPwd');
      },
      submit () {
        if(!this.form.loginName){
          this.input.phone = true;
          this.form.tipShow = true;
          this.form.tip="手机号不能为空";
          return;
        }
        let name = !this.$util.vili.loginName(this.form.loginName);
        if (name){
          this.input.phone = true;
          this.form.tip="手机号/密码错误";
          this.form.tipShow=true;
          return;
        }
        if(!this.form.password){
          this.input.pwd = true;
          this.form.tipShow = true;
          this.form.tip="密码不能为空";
          return;
        }
        let pwd = !this.$util.vili.password(this.form.password);
        let str=this.form.password;
        let d=/\d/.test(str);
        let A=/[A-Z]/.test(str);
        let a=/[a-z]/.test(str);
        if(pwd || !(d && ( A || a) ) ){
          this.input.pwd = true;
          this.form.tip="手机号/密码错误";
          this.form.tipShow=true;
          return;
        }
        if(!this.form.validateCode){
          this.input.vili = true;
          this.form.tip="验证码不能为空";
          this.form.tipShow=true;
          return;
        }
        this.reg=true;
        let data = {
          "service": "generalService",
          "method": "login",
          "data": {
            "loginName": this.form.loginName,
            "password": this.form.password,
            "validateCode": this.form.validateCode,
            "loginType": "P",
            "uuid":this.uuid
          }
        };
        this.$api.post('',data,this.loginSuc,this.pwdLoginErr,this.headers);
      }
    },
    mounted () {
      this.uuid=this.renderUuid();
      this.getViliImg();
    }
  };
</script>
<style lang="less" src="@/common/less/login/loginContainer.less"></style>
<style>
  .blue{
    color:#3185ff;
  }
  .orange{
    color:#f0871e !important;
  }
  button:disabled{
    cursor:not-allowed !important;
  }
</style>
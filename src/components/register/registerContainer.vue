<template>
  <div class="registerContainer">
    <div class="register">
      <div class="form">
        <div class="item">
          <input type="text" id='aaa' placeholder="请输入手机号" @focus='showNameTip' @blur='checkName'  @keyup="nameReplace($event)" maxlength="11" :class='{errorinput:tip.nameErr}'>
          <span class="tip" v-if="tip.name">{{tip.loginName}}</span>
          <span class="tip itemError" v-if="tip.nameErr">{{tip.loginNameErr}}</span>
        </div>
        <div class="item">
          <input type="password" placeholder="请输入新密码" @focus="showPwdTip" @input="pwdReplace($event)"  @blur='checkPwd' @keyup='changeLevel($event)' maxlength="20" :class='{errorinput:tip.pwdErr}'>
          <span class="tip" v-if="tip.pwd">{{tip.password}}</span>
          <span class="tip itemError" v-if="tip.pwdErr">{{tip.passwordErr}}</span>
          <ul>
            <li :class="{low:pwdLevel=='low'}">低</li>
            <li :class="{mid:pwdLevel=='mid'}">中</li>
            <li :class="{high:pwdLevel=='high'}">高</li>
          </ul>
        </div>
        <div class="item">
          <input type="password" placeholder="再次确认密码" v-model='form.confirm_password' @focus='removeCpwdTip' maxlength="20" :class='{errorinput:tip.cpwd}'>
          <span class="tip itemError" v-if='tip.cpwd'>{{tip.cpassword}}</span>
        </div>
        <div class="item">
          <input type="text" class="vili" placeholder="请输入验证码" v-model="form.validateCode" @focus='removeViliTip' :class='{errorinput:tip.viliErr}'>
          <button class="send" :class="{orange:!send}" :disabled="send" @click="getValidateCode">{{sendMsg}}</button>
          <span class="tip" v-if="tip.vili">{{tip.viliTip}}</span>
          <span class="tip itemError" v-if="tip.viliErr">{{tip.viliErrTip}}</span>
        </div>
        <div class="item" v-if = 'csrxy'>
          <el-checkbox v-model="form.checked"></el-checkbox><span class="read">阅读并接受</span><span class="orange pointer" @click="openxy">《诚税融用户协议》</span>
          <span class="tip"></span>
        </div>
        <div class="submit">
          <button @click="confirm" :disabled='csrxy&&reg'>{{submit}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:['csrxy','submit'],
    data () {
      return {
        reg:true,
        headers:{client:'1',token:'',userId:''},
        mm:'',
        sendMsg:"发送验证码",
        pwdLevel:'',
        form:{
          loginName:'',
          password:'',
          confirm_password:'',
          validateCode:'',
          checked:false
        },
        send:false,
        tip:{
          nameErr:false,
          pwdErr:false,
          cpwdErr:false,
          viliErr:false,
          name:false,
          pwd:false,
          cpwd:false,
          vili:false,
          loginName:"请输入有效的手机号码",
          password:"密码需由6-20位数字及字母组成",
          passwordErr:"密码不能为空",
          cpassword:'两次密码不一致,请重新输入',
          loginNameErr:"请输入有效的手机号码",
          viliTip:"验证码已发送到你的手机,5分钟内输入有效",
          viliErrTip:"验证码不能为空"
        }
      }
    },
    watch:{
      'form.checked':{
          handler:function(val,oldval){
            if(val == true){
              this.reg = false;
            }else{
              this.reg = true;
            }
          },
          deep:true//对象内部的属性监听，也叫深度监听
      }
    },
    methods : {
      messageErr (str) {
        this.$message({message:str,duration:3000,type:'error'});
      },
      checkName () {
        this.tip.name = false;
        this.tip.nameErr = !this.$util.vili.loginName(this.form.loginName);
        return this.tip.nameErr;
      },
      checkPwd () {
        this.tip.pwd = false;
        if(!this.form.password){
          this.tip.pwdErr=true;
          this.tip.passwordErr = '密码不能为空';
          return this.tip.pwdErr;
        }
        this.tip.passwordErr = '密码不符合要求，请重新设置';
        this.tip.pwdErr = !this.$util.vili.password(this.form.password);
        return this.tip.pwdErr;
      },
      checkCpwd () {
        if(!this.form.confirm_password){
          this.tip.cpwd=true;
          this.tip.cpassword = '密码不能为空';
          return this.tip.cpwd;
        }
        this.tip.cpassword = '两次密码不一致,请重新输入';
        this.tip.cpwd = !(this.form.password===this.form.confirm_password);
        return this.tip.cpwd;
      },
      checkValiCode () {
        this.tip.vili = false;
        this.tip.viliErr = (this.form.validateCode==="");
        return this.tip.viliErr;
      },
      showNameTip () {
        this.tip.name = true;
        this.tip.nameErr = false;
        this.tip.loginNameErr="请输入有效的手机号码";
        this.tip.password="密码需由6-20位数字及字母组成";
      },
      showPwdTip () {
        this.tip.password = '密码需由6-20位数字及字母组成';
        this.tip.pwd = true;
        this.tip.pwdErr= false;
      },
      nameReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[^\d]/g,'');
        this.form.loginName = dom.value;
      },
      pwdReplace ($event) {
        let dom = $event.target;
        this.replaceAndSetPos(dom,/[\W]/g,'');
        this.form.password = dom.value;
      },
      changeLevel ($event) {
        this.pwdReplace($event);
        let len = this.form.password.length;
        if(len>20){
          this.form.password=this.form.password.substring(0,20);
        }
        let str = this.form.password;
        if(str.length<6){
          this.pwdLevel='';
          return;
        }
        let d=/\d/.test(str);
        let A=/[A-Z]/.test(str);
        let a=/[a-z]/.test(str);
        if(str.length>11){
          if(a && A && d){
            this.pwdLevel='high';
          }else if(d && (a || A)){
            this.pwdLevel='mid';
          }else{
            this.pwdLevel='';
          }
          return;
        }
        if( a && A && d){
          this.pwdLevel='mid';
        }else if (d && (a || A)){
          this.pwdLevel = 'low';
        }else{
          this.pwdLevel='';
        }
      },
      removeNameTip () {
        this.tip.name = false;
      },
      removePwdTip () {
        this.tip.pwdErr = false;
      },
      removeCpwdTip () {
        this.tip.cpwd = false;
      },
      removeViliTip () {
        this.tip.vili = false;
        this.tip.viliErr = false;
      },
      confirm () {
        if(this.tip.nameErr+this.tip.pwdErr+this.tip.cpwdErr+this.tip.viliErr){
          return;
        }
        let err = this.checkName()+this.checkPwd()+this.checkCpwd()+this.checkValiCode();
        if(this.csrxy){
          err+=this.xy();
        }
        if(err){
          return;
        }
        if(this.checkPwdLevel ()){
          return;
        }
        let data = {
          "data": {
            "loginName": this.form.loginName,
            "password": this.form.password,
            "confirm_password":this.form.confirm_password,
            "validateCode": this.form.validateCode
          }
        };
        data.service = "generalService";
        if(this.csrxy){
          data.method = "userRegister";
          data.data.type="C";
        }else{
          data.method = "resetPassword";
        }
        this.reg=true;
        this.$api.post('',data,this.registerSuc,this.registerErr,this.headers);
      },
      registerSuc (data) {
        this.reg=false;
        this.$router.push({name:'pwdsuc',params:{word:this.csrxy?"注册":"重置密码"}});
      },
      registerErr (res) {
        this.reg=false;
        this.messageErr(res.returnMessage);
      },
      openxy () {
        let me = this;
        this.$alert(me.$util.csrxy, '诚税融用户注册协议', {
          dangerouslyUseHTMLString: true,
          confirmButtonClass:'sureBtn',
          confirmButtonText: '已阅读并同意协议',
          callback: action => {
            if(action == "confirm"){
              me.form.checked=true;
            }
          }
        });
      },
      xy () {
        if(!this.form.checked){
          this.$message({
            message: '请阅读并勾选《诚税融用户协议》',
            duration: 3000,
            type: 'warning'
          });
        }
        return !this.form.checked;
      },
      checkPwdLevel () {
        if(!this.pwdLevel){
          this.tip.password="密码不符合安全规则";
          this.tip.pwdErr = true;
          return true;
        }
      },
      checkRegisterName () {
        if(this.checkName()){
          return;
        }
        let data = {
          "service": "registryService",
          "method": "checkRegistered",
          "data": {
            "loginName": this.form.loginName
          }
        };
        this.$api.post('',data,this.checkRegisterNameSuc,this.checkRegisterNameErr);
      },
      checkRegisterNameSuc (data) {
        this.getValidateCode();
      },
      checkRegisterNameErr(res){
        if(res.returnCode == this.$util.ajaxCode.nameErr){
          this.tip.loginNameErr="手机号码已注册,请直接登录";
          this.top.nameErr=true;
        }
      },
      getValidateCode () {
        if(this.checkName ()){
          return;
        }
        let data = {
          "service":"generalService",
          "method":"getValidateCode",
          "data":{
            "loginName":this.form.loginName
          }
        };
        if(this.csrxy){
          data.data.type="R";
        }else{
          data.data.type="M";
        }
        this.send=true;
        this.$api.post('',data,this.getValidateCodeSuc,this.getValidateCodeErr,this.headers);
      },
      getValidateCodeSuc (data) {
        this.tip.vili=true;
        this.startTimer();
      },
      getValidateCodeErr (res) {
        this.tip.loginNameErr=res.returnMessage;
        this.tip.nameErr=true;
        this.send=false;
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
            me.sendMsg = "请发送验证码";
            me.tip.vili=false;
            me.send = false;
            clearInterval(timer);
            return;
          }
          me.sendMsg = time + "s后重新发送";
          me.send = true;
          time--;
        },1000);
      }
    },
    created () {
      this.$util.goTop();
    }
  };
</script>
<style lang="less" src="@/common/less/register/registerContainer.less"></style>
<style lang='less'>
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
</style>
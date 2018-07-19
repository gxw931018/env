<template>
  <div class="customerContent">
    <div class="customerInfo">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="跟踪信息" name="first">
          <div class='status'>
            <div class='title'>
              <span>申请状态</span>
            </div>
            <el-steps :space="200" :active='detail.active' align-center :process-status='detail.process' finish-status='success'>
              <el-step title="选择产品"></el-step>
              <el-step title="填写申请资料"></el-step>
              <el-step title="平台初审"></el-step>
              <el-step title="银行授信"></el-step>
              <el-step title="贷款完成"></el-step>
            </el-steps>
          </div>
          <div class="track">
            <div class='title'>
              <span>状态跟踪</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th style='width:160px;'>时间</th>
                  <th style='width:100px;'>当前状态</th>
                  <th style='width:120px;'>处理机构</th>
                  <th style='width:90px;'>处理人</th>
                  <th>处理详情</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='(item,k) in detail.trackData' :key='k'>
                  <td>{{item.handleTime}}</td>
                  <td>{{item.handleDesc}}</td>
                  <td><div :title='item.organName'>{{item.organName}}</div></td>
                  <td>{{item.handlerName}}</td>
                  <td><div :title='item.handleText'>{{item.handleText}}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基础信息" name="second">
          <div class="basis">
            <div class="productInfo">
              <div class='title'>
                <span>产品信息</span>
              </div>
              <div class="info">
                <div class='first'>
                  <span class='even'>产品名称:{{detail.productProfile.name}}</span>
                  <span class='odd'>所属银行:{{detail.productProfile.provider}}</span>
                </div>
                <div class='sec'>
                  <span class='even'>最高额度:{{detail.productProfile.maximum}}万元</span>
                  <span class='odd'>还款期限:{{detail.productProfile.repaymentTerm}}个月</span>
                  <span>年利率:{{detail.productProfile.rateFrom}}%~{{detail.productProfile.rateTo}}%</span>
                  <span class='last'>担保方式:{{detail.productProfile.guarantee}}</span>
                </div>
              </div>
            </div>
            <div class="apply">
              <div class='title'>
                <span>申请信息</span>
              </div>
              <div class="info">
                <ul>
                  <li>业务序列号:{{detail.apply.serialNum}}</li>
                  <li>提交时间:{{detail.apply.applyTime}}</li>
                  <li>贷款金额:{{detail.apply.loanLimit}}万元</li>
                  <li>贷款期限:{{detail.apply.loanTerm}}个月</li>
                  <li>企业名称:{{detail.apply.enterpriseName}}</li>
                  <li>税号:{{detail.apply.nsrsbh}}</li>
                  <li>申请人姓名:{{detail.apply.proposerName}}</li>
                  <li>申请人手机号:{{detail.apply.proposerTelphone}}</li>
                  <li>申请人身份证号:{{detail.apply.proposerId}}</li>
                  <li>申请人类型:{{detail.apply.proposerType}}</li>
                  <li>他行贷款金额:{{detail.apply.otherBankLoan}}万元</li>
                  <li>我行贷款金额:{{detail.apply.ourBankLoan}}万元</li>
                  <li>对外担保金额:{{detail.apply.externalGuarantee}}万元</li>
                  <li>关联企业现有贷款金额:{{detail.apply.affiliatedEnterpriseLoan}}万元</li>
                  <li>个人经营性贷款金额:{{detail.apply.personalManagementLoan}}万元</li>
                  <li>营销推荐代码:{{detail.apply.marketingCode}}</li>
                </ul>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="授信下款信息" name="third" v-if='detail.credit.creditQuota'>
          <div class="credit">
            <div class="product">
              <div class='title'>
                <span>授信下款信息</span>
              </div>
              <div class="info">
                <div class='first'>
                  <span class='even'>授信额度:{{detail.credit.creditQuota}}万元</span>
                  <span class='odd'>授信期限:{{detail.credit.creditTerm}}个月</span>
                  <span>授信时间:{{detail.credit.creditTime}}</span>
                </div>
                <div class='sec' v-if='detail.credit.loanedQuota'>
                  <span class='even'>下款金额:{{detail.credit.loanedQuota}}万元</span>
                  <span class='odd'>最近下款时间:{{detail.credit.loanedTime}}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    props:['detail','tip','first'],
    data() {
      return {
        active:0,
        activeName:'first'
      };
    },
    methods: {
      handleClick(tab, event) {
      }
    },
    mounted () {
    },
    created () {
      this.activeName='first';
    },
    watch:{
      'first': function (newVal,oldVal) {
        this.activeName = 'first';
      }
    }
  }
</script>

<style lang="less">
  .is-wait{
    .el-step__icon{
      background-color:#fff;
      color:#c0c4cc;
    }
  }
  .is-error{
    .el-step__icon{
      background-color:#fff;
      color:rgb(245, 108, 108);
    }
  }
  .el-tabs__nav-scroll {
    background: #ffffff;
    padding-left: 30px;
  }
  .customerContent{
    .dh{
      padding-left:24px;
      width:100%;
      height: 47px;
      background-color: rgba(240, 241, 248, 1);
      .cancel{
        cursor:pointer;
      }
      span{
        height:47px;
        line-height:47px;
        font-size:14px;
        color:#ddd;
      }
    }
    .title{
      height:55px;
      padding-left:24px;
      div{
        margin-top:20px;
        width: 3px;
        height: 13px;
        background-color: rgba(49, 133, 255, 1);
        float:left;
      }
      span{
        margin:0;
        display:inline-block;
        line-height:55px;
        font-size:13px;
        color: #ddd;
      }
    }
    .customerInfo{
      margin: 0;
      .el-tabs__content{
        overflow:visible;
        min-height:535px;
      }
      .el-tabs__item{
        &.is-active{
          color:#f0871e;
        }
        &:hover{
          color:#f0871e;
        }
      }
      .el-step__head{
        &.is-finish{
          color:#f0871e;
          border-color:#f0871e;
        }
        &.is-success{
          color:#f0871e;
          border-color:#f0871e;
          .el-step__icon{
            &.is-text{
              background-color:#f0871e;
            }
            i{
              color:#fff;
            }
          }
        }
      }
      .el-step__title{
        color:#888;
        font-size:12px;
        &.is-finish{
          color:#888;
        }
      }
      .el-tabs__active-bar{
        background-color:#f0871e;
      }
      .status{
        .el-steps{
          height:60px;
        }
        .title{
          border-bottom:1px solid #ddd;
          text-align:left;
          margin-bottom:15px;
          span{
            color:#363f45;
            font-size:14px;
            font-weight:600;
          }
        }
      }
      .track{
        border-top:1px solid #ddd;
        .title{
          border-bottom:1px solid #ddd;
          text-align:left;
          span{
            color:#363f45;
            font-size:14px;
            font-weight:600;
          }
        }
        table{
          font-size:14px;
          width:100%;
          thead{
            height:55px;
            line-height:55px;
            color: #363f45;
            text-align:center;
            tr{
              border-bottom:1px solid #ddd;
              th{
                font-weight:600;
                text-align:center;
              }
            }
          }
          tbody{
            tr{
              border-bottom:1px solid #ddd;
              box-sizing:border-box;
              td{
                box-sizing:border-box;
                height:40px;
                line-height:40px;
                text-align:center;
                &:last-child{
                  width:230px;
                  div{
                    width:230px;
                    height:40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
                &:nth-child(3){
                  width:120px;
                  div{
                    width:120px;
                    height:40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
      }
    }
    .basis{
      background: #fff;
      .report{
        padding: 10px 30px;
        border-bottom: 1px solid #eaeaea;
        text-align: right;
        .trial{
          display: inline-block;
          text-align: center;
          width: 100px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #fff;
          background: #3185ff;
        }
        .cret{
          display: inline-block;
          text-align: center;
          width: 100px;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #fff;
          background: #3185ff;
          margin-left: 20px;
        }
      }
      .productInfo{
        width: 100%;
        .title{
          border-bottom:1px solid #ddd;
          text-align:left;
          span{
            color:#363f45;
            font-size:14px;
            font-weight:600;
          }
        }
        .productInfo{
          padding: 12px 30px 19px;
          font-size: 14px;
          color: #363f45;
          border-bottom: 1px solid #eaeaea;
        }
        .info{
          padding:14px 25px;
          font-size:14px;
          color: #363f45;
          border-bottom: 1px solid #eaeaea;
          div{
            width:100%;
            box-sizing:border-box;
            text-align:left;
            &.first{
              padding-bottom:14px;
            }
            &.sec{
              padding-top:14px;
              span{
                &.odd{
                  width:150px;
                }
              }
            }
            span{
              display:inline-block;
              &.even{
                width:175px;
              }
              &.odd{
                width:200px;
              }
              &.last{
                margin-right:40px;
                float:right;
              }
            }
          }
        }
      }
      .apply{
        width: 100%;
        .title{
          border-bottom:1px solid #ddd;
          text-align:left;
          span{
            color:#363f45;
            font-size:14px;
            font-weight:600;
          }
        }
        .applyInfo{
          padding: 12px 30px 19px;
          font-size: 14px;
          color: #363f45;
          border-bottom:1px solid #eaeaea;
        }
        .info{
          font-size:14px;
          color: #363f45;
          overflow:hidden;
          border-bottom:1px solid #ddd;
          ul{
            width:100%;
            padding-left:25px;
            li{
              width:50%;
              height:40px;
              text-align:left;
              line-height:40px;
              float:left;
            }
          }
        }
      }
    }
    .credit{
      .title{
        border-bottom:1px solid #ddd;
        text-align:left;
        margin-bottom:15px;
        span{
          color:#363f45;
          font-size:14px;
          font-weight:600;
        }
      }
      .info{
        border-bottom:1px solid #ddd;
        div{
          padding-left:25px;
          text-align:left;
          font-size:14px;
          height:40px;
          line-heihgt:40px;
          span{
            display:inline-block;
            &.even{
              width:180px;
            }
            &.odd{
              margin-right:60px;
            }
          }
        }
      }
    }
  }

</style>

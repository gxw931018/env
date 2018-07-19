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
						<span class='operation'>操作</span>
						<span class='sec'>当前状态</span>
					</div>
					<div class='tableContent'>
						<div class='tabItem' v-for='(data,k) in applyList' :key='k'>
							<div class='head'>
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
									<span class='ed'>申请额度:{{data.apply.loanLimit||''}}万</span>
									<span class='time'>申请期限:{{data.apply.loanTerm||''}}个月</span>
									<span class='operation'><span @click='showDetail(data)'>查看详情</span><span @click='operation(data,data.operate.method)'>{{data.operate.text}}</span></span>
									<span class='status'>{{data.apply.statusName}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class='tip'><span>{{tip}}</span></div>
				</div>
				<div class='detail' v-show='showApplyDetail'>
					<div class='back'>
						<span @click='back'>返回贷款申请列表>></span>
					</div>
					<div class='tabs'>
						<v-detail :detail='detail' :tip='tip' :first='first'></v-detail>
					</div>
				</div>
			</div>
			<div class='applyInfo' v-show="applyInfo">
				<div class="applyTip">*请按照要求上传企业信息，要求图片内容清晰可见无遮挡，图片支持jpg、jpeg、png格式，文档支持word、excel、PDF格式，大小不超过4M</div>
				<div class="applyContent">
					<div class="applyli">
						<div class="applytitle">企业三证合一的营业执照副本（带二维码页）</div>
						<div class="applyList">
							<div class="mblicence clearfix">
								<div class="mblicenceLeft" data-index="0">
									<img src="./mblicenceIcon.png" v-if="handleFileList(1).length<=0" style="cursor: default;" />
									<img v-bind:src="handleFileList(1)[0].url" :onerror="errormblicenceImg" v-if="handleFileList(1).length>0" @click="openImage($event,handleFileList(1)[0].url)" />
									<div class="remove_icon" @click="removeFile(1,handleFileList(1)[0].id)" v-if="handleFileList(1).length>0"></div>
								</div>
								<div class="mblicenceRight">
									<div class="mblicenceTip">
										<div>请上传营业执照副本清晰彩色原价扫描件或数码照</div>
										<div>由中国大陆工商局或市场监督管理局颁发且在有效期内</div>
										<div>支持jpg、jpeg、png格式照片、大小不超过4M</div>
									</div>
									<el-upload class="applyUploadContent" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,1)" :show-file-list="false">
										<el-button size="small" type="primary" class="upload_btn" v-if="handleFileList(1).length<=0">点击上传</el-button>
										<el-button type="primary" @click="newSubmitMblicence()" class="yes-btn" style="display:none">
											确 定
										</el-button>
									</el-upload>
									<!--<div class="upload_btn">立即上传</div>-->
								</div>
							</div>
						</div>
					</div>
					<div class="applyli">
						<div class="applytitle">法定代表人及配偶身份证</div>
						<div class="applyList">
							<div class="legalPerson clearfix">
								<div class="legalPersonli">
									<!--:http-request="uploadLegalFrontFile" -->
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,2)" :show-file-list="false" v-if="handleFileList(2).length<=0">
										<img src="./idCardFace.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>

									<div class="img_div" v-if="handleFileList(2).length>0" data-index="0">
										<img v-bind:src="handleFileList(2)[0].url" v-if="handleFileList(2).length>0" @click="openImage($event,handleFileList(2)[0].url)" />
									</div>

									<div class="remove_icon" @click="removeFile(2,handleFileList(2)[0].id)" v-if="handleFileList(2).length>0"></div>

									<div class="legalPersonTip">法人身份证（头像面）</div>
								</div>
								<div class="legalPersonli">
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,3)" :show-file-list="false" v-if="handleFileList(3).length<=0">
										<img src="./idCardSide.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>

									<div class="img_div" v-if="handleFileList(3).length>0" data-index="0">
										<img v-bind:src="handleFileList(3)[0].url" v-if="handleFileList(3).length>0" @click="openImage($event,handleFileList(3)[0].url)" />
									</div>

									<div class="remove_icon" @click="removeFile(3,handleFileList(3)[0].id)" v-if="handleFileList(3).length>0"></div>

									<div class="legalPersonTip">法人身份证（国徽面）</div>
								</div>
								<div class="legalPersonli">
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,4)" :show-file-list="false" v-if="handleFileList(4).length<=0">
										<img src="./idCardFace.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>
									<div class="img_div" v-if="handleFileList(4).length>0" data-index="0">
										<img v-bind:src="handleFileList(4)[0].url" v-if="handleFileList(4).length>0"  @click="openImage($event,handleFileList(4)[0].url)" />
									</div>

									<div class="remove_icon" @click="removeFile(4,handleFileList(4)[0].id)" v-if="handleFileList(4).length>0"></div>
									<div class="legalPersonTip">法人配偶身份证（头像面）</div>
								</div>
								<div class="legalPersonli">
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,5)" :show-file-list="false" v-if="handleFileList(5).length<=0">
										<img src="./idCardSide.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>

									<div class="img_div" v-if="handleFileList(5).length>0" data-index="0">
										<img v-bind:src="handleFileList(5)[0].url" v-if="handleFileList(5).length>0" @click="openImage($event,handleFileList(5)[0].url)" />
									</div>

									<div class="remove_icon" @click="removeFile(5,handleFileList(5)[0].id)" v-if="handleFileList(5).length>0"></div>
									<div class="legalPersonTip">法人配偶身份证（国徽面）</div>
								</div>
							</div>
						</div>
					</div>
					<div class="applyli">
						<div class="applytitle">实际控制人及配偶身份证</div>
						<div class="applyList">
							<div class="legalPerson clearfix">
								<div class="legalPersonli">
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,6)" :show-file-list="false" v-if="handleFileList(6).length<=0">
										<img src="./idCardFace.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>

									<div class="img_div" v-if="handleFileList(6).length>0" data-index="0">
										<img v-bind:src="handleFileList(6)[0].url" v-if="handleFileList(6).length>0" @click="openImage($event,handleFileList(6)[0].url)" />
									</div>

									<div class="remove_icon" @click="removeFile(6,handleFileList(6)[0].id)" v-if="handleFileList(6).length>0"></div>

									<div class="legalPersonTip">实际控制人身份证（头像面）</div>
								</div>
								<div class="legalPersonli">
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,7)" :show-file-list="false" v-if="handleFileList(7).length<=0">
										<img src="./idCardSide.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>

									<div class="img_div" v-if="handleFileList(7).length>0" data-index="0">
										<img v-bind:src="handleFileList(7)[0].url" v-if="handleFileList(7).length>0"  @click="openImage($event,handleFileList(7)[0].url)" />
									</div>

									<div class="remove_icon" @click="removeFile(7,handleFileList(7)[0].id)" v-if="handleFileList(7).length>0"></div>

									<div class="legalPersonTip">实际控制人身份证（国徽面）</div>
								</div>
								<div class="legalPersonli">
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,8)" :show-file-list="false" v-if="handleFileList(8).length<=0">
										<img src="./idCardFace.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>

									<div class="img_div" v-if="handleFileList(8).length>0" data-index="0">
										<img v-bind:src="handleFileList(8)[0].url" v-if="handleFileList(8).length>0"  @click="openImage($event,handleFileList(8)[0].url)" />
									</div>

									<div class="remove_icon" @click="removeFile(8,handleFileList(8)[0].id)" v-if="handleFileList(8).length>0"></div>

									<div class="legalPersonTip">实际控制人配偶身份证（头像面）</div>
								</div>
								<div class="legalPersonli">
									<el-upload class="img_div" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" :action="uploadUrl" :beforeUpload="beforeSectionUpload" :http-request="(file)=>uploadSectionFile(file,9)" :show-file-list="false" v-if="handleFileList(9).length<=0">
										<img src="./idCardSide.png" />
										<a href="#">
											<div class="mask">
												<div tabindex="0" class="avatar-uploader">
													<i class="el-icon-plus avatar-uploader-icon"></i>
												</div>
											</div>
										</a>
									</el-upload>

									<div class="img_div" v-if="handleFileList(9).length>0" data-index="0">
										<img v-bind:src="handleFileList(9)[0].url" v-if="handleFileList(9).length>0"  @click="openImage($event,handleFileList(9)[0].url)"/>
									</div>

									<div class="remove_icon" @click="removeFile(9,handleFileList(9)[0].id)" v-if="handleFileList(9).length>0"></div>

									<div class="legalPersonTip">实际控制人配偶身份证（国徽面）</div>
								</div>
							</div>
						</div>
					</div>
					<div class="applyli">
						<div class="applytitle">企业2年内的报表（资产负债表、企业利润表）</div>
						<div class="applyList">
							<div class="applyUploadList">
								<div class="applyUploadLi clearfix">
									<div class="applyUploadTip">企业今年年度资产负债表</div>
									<el-upload class="applyUploadContent" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,10)" :on-remove="(file,fileList)=>removeXMLFile(file,fileList,10)" :file-list="handleFileList(10)" :on-preview="previewFile">
										<el-button size="small" type="primary" class="upload_btn" v-if="handleFileList(10).length<=0">点击上传</el-button>
									</el-upload>
								</div>
								<div class="applyUploadLi clearfix">
									<div class="applyUploadTip">企业今年年度企业利润表</div>
									<el-upload class="applyUploadContent" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,11)" :on-remove="(file,fileList)=>removeXMLFile(file,fileList,11)" :file-list="handleFileList(11)" :on-preview="previewFile">
										<el-button size="small" type="primary" class="upload_btn" v-if="handleFileList(11).length<=0">点击上传</el-button>
									</el-upload>
								</div>

								<div class="applyUploadLi clearfix">
									<div class="applyUploadTip">企业去年年度资产负债表</div>
									<el-upload class="applyUploadContent" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,12)" :on-remove="(file,fileList)=>removeXMLFile(file,fileList,12)" :file-list="handleFileList(12)" :on-preview="previewFile">
										<el-button size="small" type="primary" class="upload_btn" v-if="handleFileList(12).length<=0">点击上传</el-button>
									</el-upload>
								</div>
								<div class="applyUploadLi clearfix">
									<div class="applyUploadTip">企业去年年度企业利润表</div>
									<el-upload class="applyUploadContent" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,13)" :on-remove="(file,fileList)=>removeXMLFile(file,fileList,13)" :file-list="handleFileList(13)" :on-preview="previewFile">
										<el-button size="small" type="primary" class="upload_btn" v-if="handleFileList(13).length<=0">点击上传</el-button>
									</el-upload>
								</div>

							</div>
						</div>
					</div>
					<div class="applyli">
						<div class="applytitle">企业征信报告</div>
						<div class="applyList">
							<div class="applyUploadList">
								<div class="applyUploadLi clearfix">
									<div class="applyUploadTip">企业征信报告</div>
									<el-upload class="applyUploadContent" accept=".wps,.WPS,.xls,.XLS,.xlsx,.XLSX,.doc,.DOC,.docx,.DOCX.pdf,.PDF" :action="uploadUrl" :beforeUpload="beforeXMLUpload" :http-request="(file)=>uploadSectionFile(file,14)" :on-remove="(file,fileList)=>removeXMLFile(file,fileList,14)" :file-list="handleFileList(14)" :on-preview="previewFile">
										<el-button size="small" type="primary" class="upload_btn" v-if="handleFileList(14).length<=0">点击上传</el-button>
									</el-upload>
								</div>

							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="modifyPwd" v-show="modifyPwd">
				I am modifyPwd
			</div>
		</div>
		<!--<iframe v-bind:src="xmlUrl" width="100%" v-bind:height="getHeight()" v-if="xmlUrl!=''"></iframe>-->
		<!--<iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls' width='100%' height='100%' frameborder='1'>
       </iframe>-->
	</div>

</template>

<script>
	import detail from './applyDetail.vue'
	import list from './list.vue'
	import fancyBox from 'vue-fancybox';
	import { Loading } from 'element-ui';
	let Base64 = require('js-base64').Base64
	let axios = require('axios')
	export default {
		props: ['info', 'authInfo', 'city', 'productList', 'choseCity'],
		data() {
			let baseUrl = 'http://asbv3.i-xinnuo.com/DataAcquisition/asb/bindTelASR';
			let url = location.href.split('?')[0];
			baseUrl += '?tel=' + this.info.loginName + '&url=' + url;
			let INFO = JSON.parse(sessionStorage.getItem('INFO'));
			let query = this.$route.query;
			let center = true,
				apply = false,
				loanApplication = false,
				memberCentre = true,
				applyInfo = false,
				modifyPwd = false;
			if(query && query.dk) {
				center = false;
				apply = false;
				memberCentre = false;
				loanApplication = true;
				modifyPwd = false;
				applyInfo = false;
			}
			return {
				first: false,
				tip: '滚动加载更多',
				showApplyDetail: false,
				pageNum: 1,
				pageSize: 10,
				memberCentre: memberCentre,
				loanApplication: loanApplication,
				applyInfo: false,
				modifyPwd: false,
				url: baseUrl,
				menu: [{
						content: '会员中心',
						active: center,
						url: 'memberCentre',
						class: 'center'
					},
					{
						content: '贷款申请',
						active: apply,
						url: 'loanApplication',
						class: 'dk'
					},
					{
						content: '申请资料',
						active: applyInfo,
						url: 'applyInfo',
						class: 'dk'
					},
					{
						content: '密码修改',
						active: modifyPwd,
						url: 'modifyPwd',
						class: 'reset'
					}
				],
				dkListL: [{
					num: '20180812P000002',
					time: '2018-09-23 12:23:12',
					product: ''
				}],
				tabs: [{
					url: 'gz',
					content: '跟踪信息',
					active: true
				}, {
					url: 'gz',
					content: '基础信息',
					active: false
				}],
				headers: {
					token: INFO.token,
					client: '1',
					userId: INFO.userId
				},
				applyList: [],
				operate: {
					'1': {
						text: '编辑',
						method: 'edit'
					},
					'2': {
						text: '重新申请',
						method: 'applyAgain'
					},
					'3': {
						text: '撤销',
						method: 'cancel'
					},
					'4': {
						text: '',
						method: ''
					},
					'5': {
						text: '重新申请',
						method: 'applyAgain'
					},
					'6': {
						text: '',
						method: ''
					},
					'7': {
						text: '重新申请',
						method: 'applyAgain'
					},
					'8': {
						text: '',
						method: ''
					},
					'9': {
						text: '',
						method: ''
					},
					'10': {
						text: '重新申请',
						method: 'applyAgain'
					}
				},
				type: {
					'1': '法定代表人',
					'2': '最大控股自然人'
				},
				guarantee: {
					1: '信用',
					2: '保证',
					3: '抵押',
					4: '质抵',
					5: '其他'
				},
				detail: {
					trackData: [],
					productProfile: {},
					apply: {},
					credit: {},
					status: '',
					active: 0
				},
				uploadUrl: this.$api.getRootUrl() + "/fileController/upload",
				downloadUrl: this.$api.getRootUrl() + "/fileController/download",
				getApplyFilesUrl: this.$api.getRootUrl() + "/fileController/getApplyFiles",
				deleteUrl: this.$api.getRootUrl() + "/fileController/delete",
				allFileList: [],
				errormblicenceImg: 'this.src="' + require('./mblicenceIcon.png') + '"',
				xmlUrl:""
			}
		},
		created() {
			this.getUserApplyList();
			//this.getBaiduToken();
		},
		methods: {
			 getHeight(){
		    	return window.innerHeight;
		    },
			handleFileList(fileType) {
				//获取上传文件
				var that = this;
				var s = [];
				for(var i in that.allFileList) {
					if(that.allFileList[i].type == fileType) {
						s.push(that.allFileList[i]);
					}
				}
				return s;
			},
			removeFileList(fileType) {
				//删除上传文件
				var that = this;
				for(var i in that.allFileList) {
					if(that.allFileList[i].type == fileType) {
						that.allFileList.splice(i, 1);
					}
				}
			},
			addTabs() {
				this.tabs.push({
					url: 'sx',
					content: '授信下款信息',
					active: false
				});
			},
			showUrl(item) {
				let me = this;
				this.menu.map((v, k) => {
					if(item.content === v.content) {
						v.active = true;
						me[v.url] = true;
					} else {
						v.active = false;
						me[v.url] = false;
					}
				});

				if(item.content == "申请资料") {
					me.getApplyFiles(); //获取申请资料详情
				}
				console.log(this.memberCentre);
				console.log(this.loanApplication);
				console.log(this.modifyPwd);
			},
			getUserApplyList() {
				if(this.pageNum == 1) {
					this.applyList = [];
				}
				let data = {
					"service": "applyService",
					"method": "getUserApplyList",
					"data": {
						pageSize: this.pageSize,
						pageNum: this.pageNum
					}
				}
				this.$api.post('', data, this.getUserApplyListSuc, this.getUserApplyListErr, this.headers);
			},
			getUserApplyListSuc(data) {
				let me = this;
				if(data.length == 0) {
					this.tip = '没有更多了';
					return;
				}
				data.map((item, k) => {
					item.operate = me.operate[item.apply.statusCode];
					me.applyList.push(item);
				});
			},
			getUserApplyListErr(res) {
				if(this.$util.goLogin(res.returnCode)) {
					this.goLogin();
					return;
				}
				this.tip = '加载失败';
				console.log(res);
			},
			operation(data, operate) {
				this[operate](data);
			},
			applyAgain(data) {
				let serialNum = data.apply.serialNum;
				let id = data.apply.productId;
				this.$router.push({
					name: 'detail',
					query: {
						product_id: id,
						productList: this.productList,
						choseCity: this.choseCity,
						serialNum: serialNum
					}
				});
			},
			edit(data) {
				let serialNum = data.apply.serialNum;
				let id = data.apply.productId;
				this.$router.push({
					name: 'detail',
					query: {
						product_id: id,
						productList: this.productList,
						choseCity: this.choseCity,
						serialNum: serialNum
					}
				});
			},
			cancel(data) {
				let serialNum = data.apply.serialNum;
				let me = this;
				let formData = {
					"service": "applyService",
					"method": "userCancelApply",
					"data": {
						"serialNum": serialNum
					}
				}
				this.$confirm(' 是否确认撤销此申请？撤销后您仍可重新申请?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					me.$api.post('', formData, me.cancelSuc, me.cancelErr, me.headers);
				}).catch(() => {});
			},
			cancelSuc(data) {
				this.$message({
					message: '撤销成功',
					type: 'success',
					duration: 2000
				});
				this.tip = '下拉加载更多';
				this.pageNum = 1;
				this.getUserApplyList();
			},
			cancelErr(res) {
				if(this.$util.goLogin(res.returnCode)) {
					this.goLogin();
					return;
				}
				this.$message({
					message: res.returnMessage,
					type: 'error',
					duration: 2000
				});
			},
			showDetail(data) {
				let code = data.apply.statusCode;
				this.detail.status = code;
				let active = 0,process='wait';
				switch(code) {
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
						process='error';
						break;
					case 6:
						active = 1;
						break;
					case 7:
						active = 3;
						process='error';
						break;
					case 8:
						active = 3;
						break;
					case 9:
						active = 5;
						break;
					case 10:
						active = 3;
						process='error';
						break;
					default:
						break;
				}
				this.detail.active = active;
				this.detail.process = process;
				this.first = true;
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
				if(code === 9) {
					let credit = {
						"service": "applyService",
						"method": "getCreditInfo",
						"data": {
							"applySerial": applySerial
						}
					};
					this.$api.post('', credit, this.getCreditSuc, this.getCreditErr, this.headers);
				}
				this.$api.post('', history, this.getHistorySuc, this.getHistoryErr, this.headers);
				this.$api.post('', base, this.getBaseSuc, this.getBaseErr, this.headers)
				this.showApplyDetail = true;
				if(process === 'error'){
					let timer = setInterval(function() {
						let step = document.getElementsByClassName('el-step__head');
						let suc = document.getElementsByClassName('el-step__head is-success');
						let len = suc.length;
						let l = step.length;
						if(l > 0) {
							for(let key = 0; key < l; key++) {
								step[key].childNodes[0].style.backgroundColor = '#c0c4cc';
							}
							if(len == 0) {
								clearInterval(timer);
							}
						}
						if(len > 0) {
							for(let key = 0; key < len; key++) {
								suc[key].childNodes[0].style.backgroundColor = '#f0871e';
							}
							suc[len - 1].childNodes[0].style.backgroundColor = '#f56c6c';
							clearInterval(timer);
							return;
						}
					}, 10);
				}
			},
			getCreditSuc(data) {
				data.creditTime = this.$util.timeFormat(data.creditTime);
				data.loanedTime = this.$util.timeFormat(data.loanedTime,'day');
				this.detail.credit = data;
			},
			getCreditErr(res) {
				if(this.$util.goLogin(res.returnCode)) {
					this.goLogin();
					return;
				}
				console.log(res);
			},
			getHistorySuc(data) {
				let me = this;
				data.map((item,k)=>{item.handleTime = me.$util.timeFormat(item.handleTime)});
				this.detail.trackData = data;
			},
			getHistoryErr(res) {
				if(this.$util.goLogin(res.returnCode)) {
					this.goLogin();
					return;
				}
				console.log(res);
			},
			getBaseSuc(data) {
				data.apply.applyTime = this.$util.timeFormat(data.apply.applyTime,'min');
				data.apply.sxTime = this.$util.timeFormat(data.apply.sxTime);
				data.apply.sendToBankTime = this.$util.timeFormat(data.apply.sendToBankTime);
				data.apply.proposerType = this.type[data.apply.proposerType];
				let arr = data.productProfile.guarantee.split(',');
				let str = '';
				let l = arr.length;
				let me = this;
				arr.map((item, k) => {
					str += me.guarantee[item];
					if(k < l - 1) {
						str += '、';
					}
				});
				data.productProfile.guarantee = str;
				this.detail.apply = data.apply;
				this.detail.productProfile = data.productProfile;
			},
			getBaseErr(res) {
				if(this.$util.goLogin(res.returnCode)) {
					this.goLogin();
					return;
				}
				console.log(res)
			},
			back() {
				this.showApplyDetail = false;
				this.first = false;
				this.detail.trackData = [];
				this.detail.productProfile = {};
				this.detail.apply = {};;
				this.detail.credit = {};
			},
			getMore($event) {
				if(this.tip == '没有更多了') {
					return;
				}
				let dom = $event.target;
				let scrollHeight = dom.scrollHeight,
					clientHeight = dom.clientHeight,
					scrollTop = dom.scrollTop;
				if(scrollHeight == clientHeight + scrollTop) {
					this.pageNum++;
					this.tip = '正在加载中,请稍候';
					this.getUserApplyList();
					return;
				}
				this.tip = '下拉加载更多';
			},
			fileInter(data) {
				var that = this;
				console.log(that.headers)
				return axios({
					method: 'POST',
					url: "",
					data: data,
					baseURL: that.uploadUrl,
					withCredentials: false,
					headers: that.headers
				})
			},
			getApplyFiles() {
				var that = this;
				let fd = new FormData();
				console.log(that.authInfo.qymc)
				fd.append('enterpriseName', that.authInfo.qymc);
				console.log(that.headers);
				axios({
					method: 'POST',
					url: "",
					baseURL: that.getApplyFilesUrl,
					data: fd,
					withCredentials: false,
					headers: that.headers
				}).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						that.allFileList = [];
						for(var i in returnData) {
							returnData[i].url = that.downloadUrl + "?fileId=" + returnData[i].fileId;
							returnData[i].name = returnData[i].fileName;
							returnData[i].id = returnData[i].fileId;
							that.allFileList.push(returnData[i]);
						}
					} else {
						window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});
			},

			beforeSectionUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 4
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 4MB!',
						type: 'warning'
					});
				}
				return isLt2M
			},
			beforeXMLUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 4
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 4MB!',
						type: 'warning'
					});
				}
				return isLt2M
			},
			uploadSectionFile(param, type) { //自定义文件上传
				/*
				 * type:
					1, 营业执照
					2, 法定代表人身份证正面
					3, 法定代表人身份证反面
					4, 法定代表人配偶身份证正面
					5, 法定代表人配偶身份证反面
					6, 实际控制人身份证正面
					7, 实际控制人身份证反面
					8, 实际控制人配偶身份证正面
					9, 实际控制人配偶身份证反面
					10, 企业去年资产负债表
					11, 企业去年资产利润表
					12, 企业去年资产负债表
					13, 企业去年资产利润表
					14, 企业征信报告*/
				var that = this;
				var file = param.file;
				let fd = new FormData();
				fd.append('uploadFile', file);
				fd.append('parentName', that.authInfo.qymc);
				fd.append('fileType', type);
				let loadingInstance1 = Loading.service({ fullscreen: true });
				that.fileInter(fd).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						var tempFile = {
							id: returnData.id,
							name: returnData.fileName,
							url: that.downloadUrl + "?fileId=" + returnData.id,
							fileId: returnData.id,
							fileName: returnData.fileName,
							type: type
						};
						that.allFileList.push(tempFile);
						loadingInstance1.close();
					} else {
						loadingInstance1.close();
						if(data.returnCode === "6000002"){
							this.$message({
								message: data.returnMessage,
								type: 'warning'
							});
						}else{
							this.$message({
								message: data.returnMessage,
								type: 'warning'
							});
						}
						//window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});
			},
			deleteFileInter(data) {
				var that = this;
				console.log(that.headers)
				return axios({
					method: 'post',
					url: that.deleteUrl,
					timeout: 20000,
					data: data,
					withCredentials: false,
					headers: that.headers
				})
			},
			removeFile(type, fileId) {
				/**
				 * 删除
				 */
				var that = this;
				let fd = new FormData();
				fd.append('fileId', fileId); //文件id
				that.deleteFileInter(fd).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						that.removeFileList(type);
					} else {
						window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});
			},
			removeXMLFile(file, fileList, type) {
				console.log(type)

				var that = this;
				let fd = new FormData();
				fd.append('fileId', file.id); //文件id
				that.deleteFileInter(fd).then(res => {
					console.log(res)
					let data = res.data;
					if(data.returnCode === "00000000") {
						var returnData = data.returnData;
						that.removeFileList(type);
					} else {
						window.alert('error: ' + JSON.stringify(data.returnMessage))
					}
				});

			},
			openImage(e, url) {
				//预览图片
				var img_url = url;

				// 创建对象
				var img = new Image();

				// 改变图片的src
				img.src = img_url;

				// 加载完成执行
				img.onload = function() {
					var imagList = [{
						width: img.width,
						height: img.height,
						url: url
					}]
					console.log(e.target)
					fancyBox(e.target, imagList);
				};
			},
			previewFile(file){
				var that=this;
				var url=that.downloadUrl + "?fileId=" + file.id;
				var fileName=file.name;
				if(fileName.indexOf(".pdf")!=-1||fileName.indexOf(".PDF")!=-1){
					this.$router.push({ name: 'pdf', query: { url: Base64.encode(url) } })
				}else{
					console.log(file.name)
					 window.open(url)
				    //this.$router.push({ name: 'viewer', query: { url:"https://view.officeapps.live.com/op/view.aspx?src=http://storage.xuetangx.com/public_assets/xuetangx/PDF/1.xls" } })
				}

			}

		},
		components: {
			'v-detail': detail,
			'v-list': list
		},
	}
</script>

<style lang='less'>
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.clearfix {
		display: block;
	}

	.contentContainer {
		width: 100%;
		margin-top: 80px;
		background-color: #f7f5f5;
		padding: 20px 0;
		.content {
			width: 1000px;
			margin: 0 auto;
			overflow: hidden;
			&>div {
				float: left;
			}
			.menuContainer {
				background-color: rgba(255, 255, 255, 0.6);
				box-sizing: border-box;
				width: 252px;
				height: auto;
				.userImg {
					width: 100%;
					height: 216px;
					text-align: center;
					.img {
						padding-top: 30px;
						margin-bottom: 15px;
					}
					.userName {
						margin-bottom: 15px;
						font-size: 14px;
					}
					.authed {
						font-size: 14px;
					}
					.unAuthed {
						span {
							font-size: 12px;
							color: #fc4343;
						}
						a {
							margin-top: 15px;
							display: inline-block;
							width: 120px;
							height: 28px;
							line-height: 28px;
							background-color: rgb(240, 135, 30);
							border-radius: 14px;
							font-size: 12px;
							color: #fff;
							cursor: pointer;
						}
					}
				}
				.menu {
					margin-top: 18px;
					width: 100%;
					ul {
						width: 100%;
						li {
							cursor: pointer;
							padding-left: 50px;
							position: relative;
							box-sizing: border-box;
							text-align: left;
							width: 100%;
							height: 60px;
							border-top: 1px solid #ddd;
							line-height: 60px;
							&:hover {
								padding-left: 48px;
								color: #f0871e;
								border-left: 2px solid #f0871e;
								i {
									left: 18px;
								}
							}
							i {
								position: absolute;
								left: 20px;
								top: 0;
							}
							&.active {
								padding-left: 48px;
								color: #f0871e;
								border-left: 2px solid #f0871e;
								i {
									left: 18px;
								}
							}
						}
					}
				}
			}
			.memberCentre {
				width: 737px;
				margin-left: 10px;
				height: 645px;
				background-color: rgba(255, 255, 255, 0.6);
				&>div {
					width: 100%;
					height: 100%;
				}
				.title {
					margin-top: 80px;
					font-size: 20px;
					color: #454545;
					margin-bottom: 20px;
				}
				.table {
					box-sizing: border-box;
					border: 1px solid rgba(242, 242, 242, 1);
					width: 384px;
					height: 187px;
					background-color: #fff;
					margin: 15px auto 0 auto;
					div {
						box-sizing: border-box;
						height: 61px;
						span {
							font-size: 14px;
							float: left;
							height: 61px;
							line-height: 61px;
							display: inline-block;
							&.left {
								width: 140px;
								text-align: center;
							}
							&.right {
								text-align: left;
							}
						}
					}
					.first,
					.sec {
						border-bottom: 1px solid rgba(242, 242, 242, 1);
					}
				}
				.img {
					img {
						margin-bottom: 10px
					}
					span {
						font-size: 12px;
					}
				}
				.icon {
					margin-top: 80px;
					overflow: hidden;
					ul {
						width: 420px;
						overflow: hidden;
						margin: 0 auto;
						li {
							text-align: center;
							width: 140px;
							float: left;
						}
					}
				}
				.authImg {
					margin-top: 140px;
				}
				.auth {
					margin-top: 100px;
					a {
						width: 200px;
						display: inline-block;
						line-height: 40px;
						height: 40px;
						background-color: rgba(240, 135, 30, 1);
						border-radius: 20px;
						font-size: 16px;
						color: #fff;
					}
				}
			}
			.loanApplication {
				overflow-y: auto;
				width: 737px;
				margin-left: 10px;
				height: 645px;
				background-color: rgba(255, 255, 255, 0.6);
				.detail {
					background-color: #fcfbfb;
					width: 100%;
					height: 100%;
					overflow-y: auto;
					.back {
						padding: 20px 26px;
						text-align: right;
						span {
							cursor: pointer;
							color: #363f45;
							font-size: 14px;
						}
					}
				}
				.list {
					.tHeader {
						width: 100%;
						text-align: left;
						height: 55px;
						line-height: 50px;
						background-color: #fcfbfb;
						box-shadow: inset 0px -1px 0px 0px rgba(230, 231, 237, 1);
						span {
							color: #363f45;
							font-size: 14px;
							font-weight: 600;
							&.first {
								margin-left: 140px;
							}
							&.sec {
								width:120px;
								text-align:center;
								margin-right: 100px;
								float:right;
							}
							&.operation {
								float: right;
								width: 170px;
								text-align: center;
								margin-right: 8px;
							}
						}
					}
					.tableContent {
						.tabItem {
							font-size: 14px;
							box-sizing: border-box;
							width: 100%;
							&:hover {
								background-color: rgb(255, 245, 235);
							}
							div {
								box-sizing: border-box;
							}
							.head {
								text-align: left;
								line-height: 40px;
								height: 40px;
								border-bottom: 1px solid #ddd;
								margin-left: 20px;
								width: calc(100% - 20px);
								.num {
									margin-left: 10px;
									margin-right: 40px;
								}
							}
							.tr {
								width: calc(100% - 8px);
								height: 105px;
								border-bottom: 1px solid #ddd;
								.first {
									padding-left: 20px;
									text-align: left;
									margin-top: 18px;
									height: 20px;
									span {
										height: 20px;
										line-height: 24px;
										display: inline-block;
										vertical-align: text-top;
										&.productName {
											margin-right: 40px;
										}
										&.enterpriseName {
											margin-right: 40px;
										}
									}
									.pic {
										display: inline-block;
										width: 20px;
										height: 20px;
									}
								}
								.last {
									padding-left: 20px;
									padding-top: 40px;
									text-align: left;
									span {
										&.ed {
											margin-right: 40px;
										}
										&.status{
											float:right;
											width:120px;
											margin-right:100px;
											text-align:center;
										}
										&.operation {
											float: right;
											width: 170px;
											text-align: center;
											span {
												padding: 0 5px;
												cursor: pointer;
												text-decoration: underline;
												&:hover {
													color: #f0871e
												}
											}
										}
									}
								}
							}
						}
					}
					.tip {
						height: 80px;
						line-height: 40px;
						font-size: 14px;
					}
				}
			}
			.applyInfo {
				width: 737px;
				margin-left: 10px;
				height: 645px;
				overflow-y: auto;
				.applyTip {
					text-align: left;
					padding: 25px 25px 10px 25px;
					font-size: 10px;
					color: red;
					line-height: 20px;
				}
				.applyContent {
					background-color: rgba(255, 255, 255, 0.6);
					width: 100%;
					.applyli {
						.applytitle {
							padding: 20px 30px;
							border-bottom: 1px solid #e6e7ed;
							color: #363f45;
							font-size: 14px;
							text-align: left;
							font-weight: bold;
						}
						.applyList {
							padding: 20px 30px;
							border-bottom: 1px solid #e6e7ed;
							text-align: left;
							.mblicence {
								.mblicenceLeft {
									float: left;
									position: relative;
									img {
										width: 118px;
										height: 150px;
										cursor: pointer;
									}
								}
								.mblicenceRight {
									float: left;
									margin-left: 30px;
									margin-top: 15px;
									.mblicenceTip {
										margin-bottom: 38px;
										&>div {
											font-size: 12px;
											color: #999999;
											line-height: 21px;
										}
									}
								}
							}
							.legalPerson {
								.legalPersonli {
									float: left;
									margin-right: 38px;
									text-align: center;
									width: 132px;
									cursor: pointer;
									position: relative;
									.img_div {
										position: relative;
										width: 132px;
										height: 78px;
										.mask {
											position: absolute;
											top: 0;
											left: 0;
											width: 132px;
											height: 78px;
											background: rgba(101, 101, 101, 0.2);
											color: #ffffff;
											border-radius: 5px;
											opacity: 0;
											.avatar-uploader {
												border: 1px dashed #ffffff;
												border-radius: 6px;
												cursor: pointer;
												position: relative;
												overflow: hidden;
												width: 40px;
												height: 40px;
												margin: 19px auto;
												.avatar-uploader-icon {
													font-size: 16px;
													color: #ffffff;
													width: 39px;
													height: 39px;
													line-height: 39px;
													text-align: center;
												}
											}
										}
										a:hover {
											.mask {
												opacity: 1;
											}
										}
									}
									img {
										width: 132px;
										height: 78px;
									}
									.legalPersonTip {
										margin-top: 10px;
										font-size: 12px;
										color: #999999;
										line-height: 16px;
									}
								}
								.legalPersonli:last-child {
									margin-right: 0px;
								}
							}
							.applyUploadList {
								.applyUploadLi {
									margin-bottom: 20px;
									.applyUploadTip {
										float: left;
										font-size: 14px;
										color: #363f45;
										line-height: 30px;
										min-width: 170px
									}
									.applyUploadContent {
										float: left;
										margin-left: 11px;
										.el-upload-list {
											display: inline-block;
											vertical-align: middle;
											margin-left: 15px;
											.el-upload-list__item {
												margin-top: 0px;
												.el-upload-list__item-name {
													min-width: 310px;
												}
											}
										}
									}
								}
							}
						}
					}
					.upload_btn {
						background-color: #f0871e;
						width: 80px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						border-radius: 14px;
						color: #FFFFFF;
						font-size: 12px;
						padding: 0px;
						border-color: #f0871e
					}
					.remove_icon:after {
						position: absolute;
						content: "";
						background: url("./delete.png") no-repeat;
						background-size: 11px;
						background-position: center;
						width: 20px;
						height: 20px;
						top: -10px;
						right: -8px;
						background-color: rgba(101, 101, 101, 0.2);
						border-radius: 50%;
						cursor: pointer;
					}
				}
			}
			.modifyPwd {
				width: 737px;
				margin-left: 10px;
				height: 645px;
				background-color: rgba(255, 255, 255, 0.6);
			}
		}
	}
</style>
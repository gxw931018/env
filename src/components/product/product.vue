<template>
	<div>
		<div v-for="(product, index) in productList" :key="index" v-if='index <= 3' v-show="products != ''">
			<div class="product" v-if="index % 2 == 0" :style="product_one">
				<div class="product-content">
					<div class="product-left">
						<div class="title">
							<span class="product-name">{{product.name}}</span>
							<span class="product-bank">{{product.provider}}</span>
						</div>
						<p class="line"></p>
						<div class="product-info">{{product.indexTitle}}</div>
						<div class="product-item">
							<span class="rate">年利率：{{product.rateFrom}}%-{{product.rateTo}}%</span>
							<span class="limit">最高额度：{{product.maximum}}万</span>
							<span class="due-time">还款期限：{{product.repaymentTerm}}个月</span>
						</div>
						<div class="open-city">已开通城市：{{product.oc}}</div>
						<div class="details" @click="goDetail(product, index)">
							<!--了解详情 &gt;-->
							<a href="javascript:void(0)">了解详情 &gt;</a>
							<!--<router-link :to="{path:'/detail', query:{product_id:product.id,productList:productList,choseCity:choseCity}}">了解详情 &gt;</router-link>-->
						</div>
						<ul class="feature">
							<li class="feature-item" v-for="(item,index) in product.labelPictureList" :key="item.num">
								<span class="icon" :style="{backgroundImage: 'url(' + productList.imgURL + item.path + ')' }"></span>
								<span class="icon-text">{{item.name}}</span>
							</li>
						</ul>
					</div>
					<div class="product-right">
						<img src="/static/img/诚税贷.png" alt="" width="500" height="246" v-if="(index+1)%4==1">
						<img src="/static/img/税信贷.png" alt="" width="441" height="255" v-if="(index+1)%4==2">
						<img src="/static/img/锡银税贷.png" alt="" width="500" height="234" v-if="(index+1)%4==3">
						<img src="/static/img/阳光小微贷.png" alt="" width="365" height="313" v-if="(index+1)%4==0">
					</div>
				</div>
			</div>
			<div class="product" v-if="index % 2 != 0" :style="product_two">
				<div class="product-content">
					<div class="product-right-odd">
						<img src="/static/img/诚税贷.png" alt="" width="500" height="246" v-if="(index+1)%4==1">
						<img src="/static/img/税信贷.png" alt="" width="441" height="255" v-if="(index+1)%4==2">
						<img src="/static/img/锡银税贷.png" alt="" width="500" height="234" v-if="(index+1)%4==3">
						<img src="/static/img/阳光小微贷.png" alt="" width="365" height="313" v-if="(index+1)%4==0">
					</div>
					<div class="product-left-odd">
						<div class="title">
							<span class="product-name">{{product.name}}</span>
							<span class="product-bank">{{product.provider}}</span>
						</div>
						<p class="line"></p>
						<div class="product-info">{{product.indexTitle}}</div>
						<div class="product-item">
							<span class="rate">年利率：{{product.rateFrom}}%-{{product.rateTo}}%</span>
							<span class="limit">最高额度：{{product.maximum}}万</span>
							<span class="due-time">还款期限：{{product.repaymentTerm}}个月</span>
						</div>
						<div class="open-city">已开通城市：{{product.oc}}</div>
						<div class="details" @click="goDetail(product, index)">
							<!--了解详情 &gt;-->
							<a href="javascript:void(0)">了解详情 &gt;</a>
							<!--<router-link :to="{path:'/detail', query:{product_id:product.id,productList:productList,choseCity:choseCity}}">了解详情 &gt;</router-link>-->
						</div>
						<ul class="feature">
							<li class="feature-item" v-for="(item,index) in product.labelPictureList" :key="item.num">{{item}}
								<span class="icon" :style="{backgroundImage: 'url(' + productList.imgURL + item.path + ')' }"></span>
								<span class="icon-text">{{item.name}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	//  import product_one from '@/product-one.png';
	export default {
		props: ['productList', 'choseCity'],
		data() {
			return {
				product_one: {
					backgroundImage: "url(" + require("./product-one.png") + ")",
				},
				product_two: {
					backgroundImage: "url(" + require("./product-two.png") + ")",
				},
				products: {},
				feature: [{
					type: 0
				}, {
					type: 1
				}, {
					type: 2
				}, {
					type: 3
				}],
			};
		},
		created() {
			this.classMap = ['fast', 'free', 'low', 'high'];
			let that = this;
			this.bus.$on("productList", function(data) {
				//          console.log(data);
				that.products = data;
			});
		},
		methods: {
			goDetail(product, index) {
				var that = this;
				let params = {
						product_id: product.id,
						productList: that.productList,
						choseCity: that.choseCity
				};
				if((index + 1) % 4 == 1) {
					sessionStorage.setItem('productLogo', "/static/img/诚税贷.png");
				} else if((index + 1) % 4 == 2) {
					sessionStorage.setItem('productLogo', "/static/img/税信贷.png");
				} else if((index + 1) % 4 == 3) {
					sessionStorage.setItem('productLogo', "/static/img/锡银税贷.png");
				} else if((index + 1) % 4 == 0) {
					sessionStorage.setItem('productLogo', "/static/img/阳光小微贷.png");
				}

				this.$router.push({
					name: 'detail',
					query: params
				});
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl";
	.product {
		width: 100%;
		min-width: 1366px;
		height: 400px;
		background-repeat: no-repeat;
		background-size: 100%;
		.product-content {
			width: 1000px;
			margin: 0 auto;
			.product-left {
				width: 500px;
				float: left;
				text-align: left;
				display: inline-block;
				.title {
					padding: 41px 0 12px 0;
					font-size: 24px;
					.product-name {
						color: rgb(240, 135, 30);
					}
					.product-bank {
						color: rgb(122, 122, 122);
					}
				}
				.line {
					border-bottom: 2px solid rgb(240, 135, 30);
					width: 20px;
				}
				.product-info {
					color: #999999;
					padding-top: 40px;
				}
				.product-item {
					color: #999999;
					padding-top: 14px;
					&>span {
						padding-right: 24px;
					}
				}
				.open-city {
					font-size: 14px;
					color: #999999;
					padding: 15px 0 20px 0;
				}
				.details {
					width: 136px;
					height: 30px;
					border: 1px solid rgb(240, 135, 30);
					border-radius: 15px;
					&>a {
						font-size: 14px;
						color: rgb(240, 135, 30);
						line-height: 30px;
						padding: 8px 26px 8px 36px;
					}
				}
				.feature {
					display: inline-block;
					width: 400px;
					margin: 33px 0 0 20px;
					.feature-item {
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
							&.fast {
								bg-image('fast')
							}
							&.free {
								bg-image('free')
							}
							&.high {
								bg-image('high')
							}
							&.low {
								bg-image('low')
							}
						}
						.icon-text {
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
			.product-right {
				width: 500px;
				float: left;
				display: inline-block;
				&>img {
					margin: 100px 0 0 60px;
					width: 100%;
				}
			}
			.product-left-odd {
				width: 500px;
				float: left;
				text-align: left;
				display: inline-block;
				.title {
					padding: 41px 0 12px 0;
					font-size: 24px;
					.product-name {
						color: rgb(240, 135, 30);
					}
					.product-bank {
						color: rgb(122, 122, 122);
					}
				}
				.line {
					border-bottom: 2px solid rgb(240, 135, 30);
					width: 20px;
				}
				.product-info {
					color: #999999;
					padding-top: 40px;
				}
				.product-item {
					color: #999999;
					padding-top: 14px;
					&>span {
						padding-right: 24px;
					}
				}
				.open-city {
					font-size: 14px;
					color: #999999;
					padding: 15px 0 20px 0;
				}
				.details {
					width: 136px;
					height: 30px;
					border: 1px solid rgb(240, 135, 30);
					border-radius: 15px;
					&>a {
						font-size: 14px;
						color: rgb(240, 135, 30);
						line-height: 30px;
						padding: 8px 26px 8px 36px;
					}
				}
				.feature {
					display: inline-block;
					width: 400px;
					margin: 33px 0 0 20px;
					.feature-item {
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
							&.fast {
								bg-image('fast')
							}
							&.free {
								bg-image('free')
							}
							&.high {
								bg-image('high')
							}
							&.low {
								bg-image('low')
							}
						}
						.icon-text {
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
			.product-right-odd {
				width: 500px;
				float: left;
				display: inline-block;
				&>img {
					margin: 100px 60px 0 0;
					width: 100%;
				}
			}
		}
	}
</style>
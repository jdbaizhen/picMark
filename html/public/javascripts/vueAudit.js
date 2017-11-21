var vm = new Vue({
    	el : "#app-form",
    	data : {
    		formNum : 0, 
    		objPos : '',
    		formhead : 0,
			countPage :'',	//总任务图片数
			currentPage : '', //当前页
    		checkCountVO : '',
			imgId : '', //页面当前图片id
			markId : '', //点击框体时将框id赋值给markId
			ImageVO : '',
			tid : '',
			objs : {"imageVO":{"imgId":177,"imgPath":"http://192.168.3.247:8099/markImg/kakou0.jpg","countPage":19,"currentPage":1,"preImgId":200,"nextImgId":178},"markperson":[{"id":213,"position":1,"phone":1,"shoe":0,"walk":0,"recorder":"","markId":"8669ed93780a46cbbbda70944b7dc2ee","x":896,"y":327,"w":74,"h":77,"did":41,"status":0,"updatetime":"2017-11-03 14:05:27"}],"markCar":[{"id":65,"models":"","copilet":0,"belt":0,"fbelt":0,"visor":0,"carlogo":"bc","carcard":"","markId":"e9b6078de0484df2b1a731ca2b7b23d3","x":252,"y":712,"w":300,"h":162,"did":41,"status":0,"updatetime":"2017-11-03 13:24:18"},{"id":66,"models":"","copilet":0,"belt":0,"fbelt":0,"visor":1,"carlogo":"bmw","carcard":"","markId":"8c32ff92f38748cc884873052eb4c554","x":736,"y":712,"w":134,"h":45,"did":41,"status":0,"updatetime":"2017-11-03 13:38:52"},{"id":67,"models":"","copilet":0,"belt":0,"fbelt":0,"visor":1,"carlogo":"bsj","carcard":"","markId":"dbf21924101b46ba928c8b1b9abcba7c","x":101,"y":285,"w":161,"h":184,"did":41,"status":0,"updatetime":"2017-11-03 13:43:55"}],"markGood":[{"id":22,"huoche":"2","markId":"016fc157721f4e759e477116f9f7bdba","x":918,"y":637,"w":194,"h":119,"did":41,"status":0,"updatetime":"2017-11-03 13:23:24"}],"checkCountVO":{"personTodayPassTotal":0,"carTodayPassTotal":0,"goodTodayPassTotal":0,"personPassTotal":4,"carPassTotal":0,"goodPassTotal":0,"personTodayRejectTotal":0,"carTodayRejectTotal":0,"goodTodayRejectTotal":0,"personRejectTotal":0,"carRejectTotal":0,"goodRejectTotal":0}},
				},
    	mounted : function(){
    		var self = this;
			var href = window.location.href;
			var tid = href.substring(href.indexOf('tid=')+4);
			self.tid = tid;
			$.post('/check/details',{tid : tid},function(data){		
				self.jumpPage(data);			
			})
			
    	},
    	methods : {
    		//表单显示切换
    		changeShow : function(num){
    				this.formNum = num;
    				this.formhead = num;  	
    		},
    		//上一页，下一页方法
    		switchPic : function(num){
    			var self = this;
				$.post('/check/page',{
					num : num,
					tid : self.tid,
					imgId : self.ImageVO.imgId,
					countPage : self.ImageVO.countPage,
					currentPage : self.ImageVO.currentPage,
					preImgId : self.ImageVO.preImgId,
					nextImgId : self.ImageVO.nextImgId
				},function(data){
					self.jumpPage(data);	
				})	
			},
			//跳页控制函数
			jumpPage : function(data){
				var self = this;
				var data = JSON.parse(data);				
				var imgContent = $('#anno4img-container');
					if(data.result){
						var result = JSON.parse(data.data);
						imgContent.empty();	
						self.updateStatistic(result.imageVO,result.checkCountVO,result.imageVO.currentPage,result.imageVO.countPage);	//更新页面统计元素
						var imgId = result.imageVO.imgId;	//图片id
						var picUrl = result.imageVO.imgPath;	//图片路径
						self.imgId = imgId;
						var img = "<img id='"+imgId+"'src='"+picUrl+"'/>";
						imgContent.append(img);
						//渲染框
						self.addPos(result.markperson);
						self.addPos(result.markCar);
						self.addPos(result.markGood);
						$('input[name="imgId"]').val(imgId);
					}else{
						console.log("请求失败");
					}
			},
			//渲染页面实时刷新的数据
			updateStatistic : function(ImageVO,checkCountVO,currentPage,countPage){
				var self = this;
				self.ImageVO = ImageVO;		//当前图片信息
				self.checkCountVO = checkCountVO;	//统计数据
				self.currentPage = currentPage;
				self.countPage = countPage;
			},
			//引入后台数据后遍历渲染标注框
			addPos : function(data){	
				var self = this;
				if(data.length!=0){		
					data.forEach(function(value,index){
						console.log(value.status);
						self.pos(value.x,value.y,value.w,value.h,value.markId,value.status);
					})  
				}  		
			},
			//审核通过
			auditPass : function(e){	
				var self = this;
				e.preventDefault();
				$.get('/check/pass?markId='+self.markId,function(data){
					var res = JSON.parse(data);
					if(res.result){
						alert('审核成功');
						$('#'+self.markId).css('borderColor','#0f0');
					}else{
						alert('审核失败')
					}
				})
			},
			//审核驳回
			auditReject : function(e){
				var self = this;
				e.preventDefault();
				$.post('/check/reject?markId='+self.markId,function(data){
					var res = JSON.parse(data);
					if(res.result){
						alert('驳回成功');
						$('#'+self.markId).css('borderColor','#f00');
					}else{
						alert('驳回失败')
					}
				})
			},
			//在窗口中汇出标记框
			pos : function(x,y,wid,hei,id,status){
				var self = this;
				var div = document.createElement('div');
				div.id = id;
				div.style.position = 'absolute';
				div.style.width = wid+'px';
				div.style.height = hei+'px';
				
				if(status==1){
					div.style.border = '3px solid #f00';
				}else if(status==2){
					div.style.border = '3px solid #0f0';
				}else{
					div.style.border = '3px solid #00f';
				}				
				div.style.zIndex = "9998";
				div.style.top = y+'px';
				div.style.left = x+'px';
				//点击框后渲染表单数据
				div.addEventListener('click',function(){
					self.markId = id;
					//清空表单数据
					$('input[name="carcard"]').val('');
					$('input[name="recorder"]').val('');	
					$('input').removeAttr('checked');	
					$('select option').removeAttr('selected');
					$.get('/taskDetail/draw?markId='+id,function(data){
						var res = JSON.parse(data);
						var result = JSON.parse(res.data);
						console.log(result);
						self.formNum = result.flag;
						self.formhead = result.flag;
						if(result.flag == 2){
							$('select[name="huowu"] option[value='+result.good.huowu+']').attr('selected',true);
							$('select[name="weight"] option[value='+result.good.weight+']').attr('selected',true);
							$('select[name="huoche"] option[value='+result.good.huoche+']').attr('selected',true);	
						}else if(result.flag == 1){
							$('select[name="models"] option[value='+result.car.models+']').attr('selected',true);
							$('select[name="copilet"] option[value='+result.car.copilet+']').attr('selected',true);
							$('select[name="belt"] option[value='+result.car.belt+']').attr('selected',true);
							$('select[name="fbelt"] option[value='+result.car.fbelt+']').attr('selected',true);
							$('select[name="visor"] option[value='+result.car.visor+']').attr('selected',true);
							$('select[name="carlogo"] option[value='+result.car.carlogo+']').attr('selected',true);
							$('select[name="carcolor"] option[value='+result.car.carcolor+']').attr('selected',true);
							$('input[name="carcard"]').val(result.car.carcard);
							$('select[name="yearmark"] option[value='+result.car.yearmark+']').attr('selected',true);	
						}else{
							self.showForm('person',result.person.person);
							self.showForm('position',result.person.position);
							self.showForm('phone',result.person.phone);
							self.showForm('sex',result.person.sex);
							self.showForm('age',result.person.age);
							self.showForm('hat',result.person.hat);			
							self.showForm('helmet',result.person.helmet);
							self.showForm('hire',result.person.hire);
							self.showForm('glass',result.person.glass);
							self.showForm('beard',result.person.beard);
							self.showForm('scarf',result.person.scarf);
							self.showForm('headset',result.person.headset);
							self.showForm('shape',result.person.shape);
							self.showForm('collar',result.person.collar);
							self.showForm('gusset',result.person.gusset);						
							self.showForm('shirt',result.person.shirt);
							self.showForm('pattern',result.person.pattern);
							self.showForm('watch',result.person.watch);
							if(result.person.goods){
								var good = result.person.goods.split(',');
								var goods = $('input[name="goods"]');
								console.log(goods.length+"||"+good.length);
								for(var i=0;i<goods.length;i++){
									for(var j=0;j<good.length;j++){
										if(goods[i].value==good[j]){
											goods[i].checked = true;
											break;
										}
									}
								}
							}	
							self.showForm('upColor',result.person.upColor);
							self.showForm('trousers',result.person.trousers);
							self.showForm('cowboy',result.person.cowboy);
							self.showForm('shoe',result.person.shoe);						
							self.showForm('walk',result.person.walk);
							self.showForm('downColor',result.person.downColor);
							$("input[name='recorder']").val(result.person.recorder);			
						}
					})
					
				})
				
				/*var cardDiv = document.createElement('div');
				cardDiv.style.position = "absolute";
				cardDiv.style.left = -3+"px";
				cardDiv.style.top = -25 +"px";
				cardDiv.style.padding = "0px 3px";
				cardDiv.style.color = "red";
			
				cardDiv.style.height = 25+"px";
				cardDiv.style.border = "3px solid blue";
				cardDiv.style.borderRadius = "3px";
				var span  = document.createElement('span');
				span.style.lineHeight = "20px";
				span.innerText = card;
				cardDiv.append(span);
				div.append(cardDiv);*/
				$('#anno4img-container').append(div);	
			},
			//渲染表单数据
			showForm : function(name,data){
			$("input[name='"+name+"']").each(function(){  
				if($(this).val() == data){  
					$(this).attr( "checked", true );  
				}  
			});  
		},
    	}
    })
	
			

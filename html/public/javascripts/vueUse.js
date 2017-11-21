var vm = new Vue({
    	el : "#app-form",
    	data : {
    		formNum : 0, 
    		objPos : '',
    		formhead : 0,
			countPage :'',	//总任务图片数
			currentPage : '', //当前页
    		markcount : '',
			markId : '',
			imgId : '', //页面当前图片id
			ImageVO : '',
			objs : {"imageVO":{"imgId":0,"imgPath":"","countPage":0,"currentPage":0,"status":null},"countVO":{"personTodayTotal":0,"carTodayTotal":0,"goodTodayTotal":0,"imgTodayTotal":0,"personTotal":0,"carTotal":0,"goodTotal":0,"imgTotal":0},"markperson":[{"id":0,"person":null,"position":null,"phone":null,"sex":null,"age":null,"hat":null,"helmet":null,"hire":null,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":"high","collar":0,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":null,"upColor":null,"trousers":null,"cowboy":null,"shoe":null,"walk":null,"downColor":null,"recorder":"","markId":"1508757710147","x":0,"y":0,"w":0,"h":0,"did":0,"status":0,"updatetime":null},{"id":0,"person":1,"position":1,"phone":1,"sex":1,"age":1,"hat":1,"helmet":2,"hire":1,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":"","collar":null,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":"","upColor":null,"trousers":null,"cowboy":"","shoe":null,"walk":null,"downColor":null,"recorder":"老雷","markId":"191121431","x":159,"y":133,"w":415,"h":156,"did":41,"status":2017,"updatetime":null},{"id":175,"person":1,"position":1,"phone":1,"sex":1,"age":1,"hat":1,"helmet":2,"hire":1,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":"","collar":null,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":"","upColor":null,"trousers":null,"cowboy":"","shoe":null,"walk":null,"downColor":null,"recorder":"老雷","markId":"191121463","x":159,"y":133,"w":415,"h":156,"did":41,"status":2017,"updatetime":null},{"id":176,"person":1,"position":1,"phone":1,"sex":1,"age":1,"hat":1,"helmet":2,"hire":1,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":"","collar":null,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":"","upColor":null,"trousers":null,"cowboy":"","shoe":null,"walk":null,"downColor":null,"recorder":"老雷","markId":"1812456366","x":159,"y":133,"w":415,"h":156,"did":41,"status":2017,"updatetime":null},{"id":179,"person":null,"position":null,"phone":null,"sex":null,"age":null,"hat":null,"helmet":null,"hire":null,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":null,"collar":null,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":null,"upColor":null,"trousers":1,"cowboy":null,"shoe":1,"walk":0,"downColor":null,"recorder":"","markId":"1508899190624","x":826,"y":316,"w":187,"h":174,"did":41,"status":2017,"updatetime":null},{"id":180,"person":null,"position":null,"phone":null,"sex":1,"age":null,"hat":null,"helmet":null,"hire":null,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":null,"collar":null,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":null,"upColor":null,"trousers":null,"cowboy":null,"shoe":null,"walk":null,"downColor":null,"recorder":"","markId":"1508899324425","x":839,"y":557,"w":195,"h":67,"did":41,"status":2017,"updatetime":null},{"id":181,"person":null,"position":null,"phone":null,"sex":0,"age":null,"hat":null,"helmet":null,"hire":null,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":null,"collar":null,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":null,"upColor":null,"trousers":null,"cowboy":null,"shoe":null,"walk":null,"downColor":null,"recorder":"","markId":"1508899360625","x":771,"y":56,"w":170,"h":59,"did":41,"status":2017,"updatetime":null},{"id":182,"person":null,"position":null,"phone":null,"sex":1,"age":null,"hat":null,"helmet":null,"hire":null,"glass":null,"beard":null,"scarf":null,"headset":null,"shape":null,"collar":null,"gusset":null,"shirt":null,"pattern":null,"watch":null,"goods":null,"upColor":null,"trousers":null,"cowboy":null,"shoe":null,"walk":null,"downColor":null,"recorder":"","markId":"1508899462953","x":849,"y":177,"w":202,"h":67,"did":41,"status":2017,"updatetime":null}],"markCar":[],"markgood":[{"id":12,"huowu":null,"weight":null,"huoche":"","markId":"22315161121","x":224,"y":135,"w":128,"h":152,"did":41,"status":null,"updatetime":1508821760000}]}
    	},
    	mounted : function(){
    		var self = this;
    		self.switchPic(0);
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
				//获取当前图片状态
    			var status = $('.markState :selected').val();
				
    			if(num==0){
    				$.post('/taskDetail/upload',{num : 0,status : status},function(data){
						var data = JSON.parse(data);
						if(data.result){	
							self.jumpPage(data);
						}else{
							var result = JSON.parse(data.data);
							if(result.result=='false'){
								self.markcount = result.countVO;								
								$('#anno4img-container').append($('<div style="background:skyblue; width: 100%; height: 600px;font-size:60px;text-align:center;overflow: auto;margin: auto;position: absolute;top:0;line-height:600px"> 此任务已标注完成 </div>'));									
							}
						}
					})
    			}else{	
					$.post('/taskDetail/upload',{
						num : num,
						status : status,
						imgId : self.ImageVO.imgId,
						countPage : self.ImageVO.countPage,
						currentPage : self.ImageVO.currentPage,
						preImgId : self.ImageVO.preImgId,
						nextImgId : self.ImageVO.nextImgId
					},function(data){
						var data = JSON.parse(data);
						if(data.result){
							self.jumpPage(data);
						}else{
							var result = JSON.parse(data.data);
							console.log(result.result);
							if(result.result=='false'){
								$('#anno4img-container').empty()
								$('#anno4img-container').append($('<div style="background:skyblue; width: 100%; height: 100%;overflow: auto;margin: auto;position: absolute;top: 0><p style="margin:20% auto;font-size:50px;font-weight:bold;">此任务已标注完成</p></div>'));	
							}
						}							
					})
    			}
    			self.addPlugins();
    	},
		//跳页控制函数
		jumpPage : function(data){
			var self = this;
			var imgContent = $('#anno4img-container');
				if(data.result){
					var result = JSON.parse(data.data);
					console.log(result);
					imgContent.empty();									
					self.updateStatistic(result.imageVO,result.countVO,result.imageVO.currentPage,result.imageVO.countPage);
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
		
		//根据状态选取
		changePicState : function(event){
				var self = this;
    			var status = event.target.value;
				if(status==3){
					self.switchPic(0);
				}else{
					self.$http.get('/taskDetail/select?status='+status).then(function(res){
						var data = JSON.parse(res.body.data);
						console.log(data);
						if(data==null){
						/*if(JSON.stringify(data) == "{}"){*/	
							alert("暂无该状态下的图片");						
						}else{
							var imgContent = $('#anno4img-container');
							imgContent.empty();
							self.updateStatistic(data.imageVO,data.countVO,data.imageVO.currentPage,data.imageVO.countPage);
							var imgId = data.imageVO.imgId;
							self.addPos(data.markperson);
							self.addPos(data.markCar);
							self.addPos(data.markGood);
							var picUrl = data.imageVO.imgPath;
							self.imgId = imgId;
							var img = "<img id='"+imgId+"'src='"+picUrl+"'/>";
							imgContent.append("<img id='"+imgId+"'src='"+picUrl+"'/>");
							$('input[name="imgId"]').val(imgId);	
						}					
					})	
				}
    			self.addPlugins();
		},
		//渲染页面实时刷新的数据
		updateStatistic : function(ImageVO,countVO,currentPage,countPage){
			var self = this;
			self.ImageVO = ImageVO;		//当前图片信息
			self.markcount = countVO;	//统计数据
			self.currentPage = currentPage;
			self.countPage = countPage;
		},
		//标注完成接口
		complete : function(){
    			var self = this;
    			self.$http.get('/taskDetail/complete?imgId='+self.imgId).then(function(res){
    				if(res.body.result){
						alert('标记完成');
					}else{
						alert('任务完成');
					}
    			})
    	},
    	//引入后台数据后遍历渲染标注框
    	addPos : function(data){	
    		var self = this;
			if(data.length!=0){		
				data.forEach(function(value,index){
					self.pos(value.x,value.y,value.w,value.h,value.markId,value.status);
				})  
			}  		
    	},
    	//插入插件方法
    	addPlugins : function(){
    		var self = this;
    		setTimeout(function(){
		    	var img = $('#anno4img-container img');
		    	img.Jcrop({
			      onSelect:  self.showCoords
			    },function(){
			      jcrop_api = this;
			    });
		    },200)
    	},
    	//表单提交方法
    	submitForm : function(form,address){
    		var self = this;
    		var data = $('#'+form).serialize();
			console.log(data);
			$.post('/'+address,data,function(data){
				var result = JSON.parse(data);
				var res = JSON.parse(result.data);
				if(form=='form1'){
					var x = res.markPersonVO.x,
						y = res.markPersonVO.y,
						w = res.markPersonVO.w,
						h = res.markPersonVO.h,
						markId = res.markPersonVO.markId;
						if(self.markId == markId){
							$('#'+markId).css('borderColor','#00f');
						}else{
							self.pos(x,y,w,h,markId,0);
						}
					
				}else if(form == 'form2'){
					var x = res.markCarVO.x,
						y = res.markCarVO.y,
						w = res.markCarVO.w,
						h = res.markCarVO.h,
						markId = res.markCarVO.markId;
						if(self.markId == markId){
							$('#'+markId).css('borderColor','#00f');
						}else{
							self.pos(x,y,w,h,markId,0);
						}
				}else{
					var x = res.markGoodVO.x,
						y = res.markGoodVO.y,
						w = res.markGoodVO.w,
						h = res.markGoodVO.h,
						markId = res.markGoodVO.markId;
					if(self.markId == markId){
							$('#'+markId).css('borderColor','#00f');
						}else{
							self.pos(x,y,w,h,markId,0);
						}
				}
				$('input[name="carcard"]').val('');
				$('input[name="recorder"]').val('');						
				$('input').removeAttr('checked');	
				$('select option').removeAttr('selected');
			})
			
    	},
    	//获取标记框坐标
    	showCoords : function(c){
    		var self = this;
			var point = {
				x : c.x,
				y : c.y,
				w : c.w,
				h : c.h
			};
		 	self.objPos = point;
			//绘制新标注框时清空表单
			$('input[name="carcard"]').val('');
			$('input[name="recorder"]').val('');	
			$('input[name="markId"]').val('');
			$('input').removeAttr('checked');	
			$('select option').removeAttr('selected');
			$("input[name='imgId']").val(self.imgId);
		    $("input[name='x']").val(self.objPos.x);
			$("input[name='y']").val(self.objPos.y);
			$("input[name='w']").val(self.objPos.w);
			$("input[name='h']").val(self.objPos.h);
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

			div.style.top = y+'px';
			div.style.left = x+'px';
			//点击框后渲染表单数据
			div.addEventListener('click',function(e){
				e.stopPropagation();
				//清空表单数据
				$('input[name="carcard"]').val('');
				$('input[name="recorder"]').val('');	
				$('input').removeAttr('checked');					
				$('select option').removeAttr('selected');		
				
				self.markId = id;	
				$("input[name='markId']").val(id);			
				$.get('/taskDetail/draw?markId='+id,function(data){
					var res = JSON.parse(data);
					var result = JSON.parse(res.data);
					self.formNum = result.flag;
					self.formhead = result.flag;
					
					if(result.flag == 2){
						$('input[name="x"]').val(result.good.x);
						$('input[name="y"]').val(result.good.y);
						$('input[name="w"]').val(result.good.w);
						$('input[name="h"]').val(result.good.h);
						$('select[name="huowu"] option[value='+result.good.huowu+']').attr('selected',true);
						$('select[name="weight"] option[value='+result.good.weight+']').attr('selected',true);
						$('select[name="huoche"] option[value='+result.good.huoche+']').attr('selected',true);	
					}else if(result.flag == 1){
						$('input[name="x"]').val(result.car.x);
						$('input[name="y"]').val(result.car.y);
						$('input[name="w"]').val(result.car.w);
						$('input[name="h"]').val(result.car.h);
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
						$('input[name="x"]').val(result.person.x);
						$('input[name="y"]').val(result.person.y);
						$('input[name="w"]').val(result.person.w);
						$('input[name="h"]').val(result.person.h);
						
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
			var closeDiv = document.createElement('div');
			closeDiv.style.position = "absolute";
			closeDiv.style.width = 15 +"px";
			closeDiv.style.height = 15 + 'px';
			closeDiv.style.right = 0 +'px';
			closeDiv.style.top = 0 +'px';
			closeDiv.style.zIndex = "9999";
			closeDiv.style.cursor = "pointer";
			closeDiv.style.color = "#FFFF00";
			closeDiv.innerText = "X";
			closeDiv.id = id +'s';
			div.append(closeDiv);
			//发送删除请求
			var markId = id;
			closeDiv.addEventListener('click',function(e){
				var self = this;
				e.stopPropagation();
				if(confirm("确认删除？")){
					$.get('/taskDetail/delete?markId='+markId,function(data){
						var datas = JSON.parse(data);
						if(datas.result){
							$('#'+markId).css('display','none');
							
							alert("删除成功");
						}
					})
				}
			})
			var cardDiv = document.createElement('div');
			cardDiv.style.position = "absolute";
			cardDiv.style.left = -3+"px";
			cardDiv.style.top = -25 +"px";
			cardDiv.style.padding = "0px 3px";
			cardDiv.style.color = "red";
			cardDiv.style.zIndex = '9999';
			cardDiv.style.height = 25+"px";
			cardDiv.style.border = "3px solid blue";
			cardDiv.style.borderRadius = "3px";
			cardDiv.style.cursor = 'pointer';
			var span  = document.createElement('span');
			span.style.lineHeight = "20px";
			span.innerText = '呵呵';
			cardDiv.append(span);
			div.append(cardDiv);
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

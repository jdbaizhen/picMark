new Vue({
	el : '#app',
	data : {
		User : '张三', //用户姓名
		
		navStatus : 0,
		current : 0,
		registerUsername : '',//注册用户名
		registerName : '',   //注册姓名
		registerPassword : '',//注册密码
		registerTelephone : '', //注册电话
		fixedUsername : '',//修改用户名
		fixedName : '',   //修改姓名
		fixedPassword : '',//修改密码
		fixedTelephone : '', //修改电话
		fixedTime : '',
		taskName:'',//发布任务名
		count:'',//发布标注数量
		uid:'',//发布标注人员
		all: 18, //用户总页数
        cur: 1, //用户当前页码
        alltask: 18, //任务总页数
        curtask: 1, //任务当前页码
		tid:'',//任务表主键
		tableTask : [],
		tableUser : [],
		tableCommon : [],
		tableVerify:[],
		tableTaskDetail:[],
		cover : 0, //控制模态框显示隐藏
		fixingId : '',	//正在修改的用户id
		authorName : '', //角色名。查询
		group : [],	//所有角色
		groupSelected : [], //已选择角色
		
		tableRole : [], //角色列表
		newRole : '',
		updateRole : '', //更新角色
		updateRoleTime : '',//时间
		updateRoleId : '',
		roleAll : 0,
		roleCur : 1,
		privilegeList : '', //总权限
		privilegeSelected  : '', //选中的权限
		
		pId : '',	//修改权限角色id
		pCode : '',	//权限名
		
		auditAll : '',	//审核页
		auditCur : 1,
		taskDetailCur :1,//详情页
		taskDetailAll : '',
	},
	mounted : function(){
    		var self = this;
			
			var href = window.location.href;
			var current = href.substring(href.indexOf('current=')+8);
		
			if(current.length>5){
				self.current = 0;	
			}else{
				self.current = current;
			}
			$.get('/user/showUserInfo',function(data){
				if(data.result){
					var res = JSON.parse(data.data);
					self.User = res.name;
				}else{
					self.User = '';
				}
			})
			
    		self.$http.get('/user/search?pageIndex='+1).then(function(res){
    			if(res.body.result){
					var data = JSON.parse(res.body.data);
    				self.all = Math.ceil(data.count/10);
    				self.tableUser = data.details;
    			}
    		})
    	},
	methods : {
		
		//退出
		logout : function(){
			this.User = '';
			window.location.href = '/login2.html';
		},
		//num代表菜单栏各个选项
		navToggle : function(num){
			$('.list-group-item-'+num+' .glyphicon-triangle-right').toggleClass('glyphicon-triangle-bottom');
			$(".list-item-children-"+num).slideToggle();
		},
		//序列化搜索表单
		serializeSearch : function(id){
			var self =this;
			var param  = $('#'+id).serialize();
			return param;
		},
		//跳页函数
		jumpPage : function(num){
			var self = this;
			if(num!==''){
				self.current = num;
			}			
		},
		//进入用户列表页面
		adminPage : function(num){
			var self = this;
			self.navStatus = 0;
			self.jumpPage(num);	
			self.cur = 1;
			var data = self.serializeSearch('userForm')+'&'+'pageIndex='+self.cur;
			self.$http.get('/user/search?'+data).then(function(res){
    			if(res.body.result){
					var data = JSON.parse(res.body.data);
    				self.all = Math.ceil(data.count/10);
    				self.tableUser = data.details;
    			}
    		})	
		},
		
		adminPage2 : function(num){
			var self = this;
			self.jumpPage(num);	
			var data = self.serializeSearch('userForm')+'&'+'pageIndex='+self.cur;
			self.$http.get('/user/search?'+data).then(function(res){
    			if(res.body.result){
					var data = JSON.parse(res.body.data);
    				self.all = Math.ceil(data.count/10);
    				self.tableUser = data.details;
    			}
    		})	
		},
		btnClick: function(data,num){//页码点击事件
			var self = this;
            if(data != self.cur){
                self.cur = data;
                self.adminPage2(num);
            }	
        },
        pageClick: function(){
        	var self = this;
            console.log('现在在'+self.cur+'页');
           self.adminPage2(0);
        },	
        //注册用户
		registerAdmin : function(){
			var self = this;
			var qqreg = /^[0-9]{8,11}/;
			var telreg = /^1[3|4|5|7|8][0-9]{9}$/;
			var pwdreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			var pwd = $('input[name="userpasswords"]').val();
			if(self.registerUsername==''||self.registerName==''||self.registerPassword==''||self.registerTelephone==''){
				alert('输入不能为空');
			}else if(self.registerPassword!==pwd){
				alert('两次密码输入不同，请重新输入');
			}else if(!telreg.test(self.registerTelephone)){
				alert('请输入正确的手机号码');
			}else if(!pwdreg.test(self.registerPassword)){
				alert('请输入6~16位数字＋字母组合的密码');
			}else if(!qqreg.test(self.registerUsername)){
				alert('请输入正确的QQ号');
			}else{
				$.post('/user/compareUserName',{
					username : self.registerUsername
				},function(data){
					console.log(data);
					if(data.result){
						$.post('/user/add',{
							username : self.registerUsername,
							name : self.registerName,
							password : self.registerPassword,
							telephone : self.registerTelephone
						},function(result){
							if(result.result){	
								alert("添加成功");
								$('.coverUser').css('display','none');
								self.registerUsername = '';
								self.registerName = '';
								self.registerPassword = '';
								self.registerTelephone = '';
								$('input[name="userpasswords"]').val('');
								self.adminPage(0);
							}else{
								alert("错误代码:"+result.message);
							}
						})
					}else{
						alert('该用户名已被注册，请重新输入用户名');
					}
				})		
			}	
		},
		//获取修改的用户id
		adminFixed : function(id){
			var self= this;
			self.fixingId = id;
			
			$('.adminParts input').attr('checked',false);
			
			$.get('/user/searchById?id='+id,function(data){
				if(data.result){
					self.current = 11;
					var res = JSON.parse(data.data);
					self.fixedUsername = res.username;
					self.fixedName = res.name;
					self.fixedPassword = res.password;
					self.fixedTelephone = res.telephone;
					self.fixedTime = res.register_time;
				}
			});	
			$.get('/user/roleList?id='+id,function(data){
				if(data.result){
					var res = JSON.parse(data.data);
					if(res.group.length>0){
						self.group = res.group;
						if(res.groupSelected.length>0){
							self.groupSelected = res.groupSelected;
							var selegroup = self.groupSelected;
							setTimeout(function(){
								for(var i=0;i<selegroup.length;i++){
									$('input[name='+selegroup[i].id+']').attr('checked',true);
								}
							},200);
						}
					}
				}
			})	
		},	
		//确认修改用户角色
		adminConfirm : function(){
			var self = this;
			var arr = [];
			arr = $('.groups:checked').serialize();
			var arr2 = arr.split('&');
			var pC = [];
			arr2.forEach(function(value,index){
				var theone = value.split('=');
				pC.push(theone[0]);
			})
			var pCode = pC.join(',');
			
			var id = self.fixingId;
			var qqreg = /^[0-9]{8,11}/;
			var telreg = /^1[3|4|5|7|8][0-9]{9}$/;
			var pwdreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
			var pwd = $('input[name="userpasswords"]').val();
			if(self.fixedUsername==''||self.fixedName==''||self.fixedPassword==''||self.fixedTelephone==''){
				alert('输入不能为空');
			}else if(!telreg.test(self.fixedTelephone)){
				alert('请输入正确的手机号码');
			}else if(!pwdreg.test(self.fixedPassword)){
				alert('请输入6~16位数字＋字母组合的密码');
			}else if(!qqreg.test(self.fixedUsername)){
				alert('请输入正确的QQ号');
			}else{
				$.post('/user/update',{
					id : id,
					username : self.fixedUsername,
					name : self.fixedName,
					password : self.fixedPassword,
					telephone : self.fixedTelephone,
					register_time : self.fixedTime
				},function(res){
					if(res.result){
						$.post('/user/updateRole',{
							id : self.fixingId,
							gid : pCode
						},function(data){
							if(data.result){
								if(confirm('修改成功，是否返回上一层？')){
									self.group="";
									self.adminPage(0);
								}else{
									alert('用户信息修改失败');
								}
							}
						})
					}
				})
			}

		},
        //确认修改用户信息
        /*fixedUser : function(){
			var self = this;
			
        },*/
        //删除用户信息
        adminDel : function(id){
        	var self = this;
			if(confirm('确认删除？')){
				$.get('/user/del?id='+id,function(res){
					if(res.result){
						self.tableUser.forEach(function(value,index){
							if(value.id == id){
								self.adminPage(0);					
							}
						})					
					}
				})
			}	
        },
        //进入角色页面
		rolePage : function(){

			var self = this;
			self.jumpPage(1);
			self.roleCur = 1;
			$('.registerBox').attr('checked',false);
			$.post('/group/search',{
				pageIndex : self.roleCur,
				name : self.authorName
			},function(data){
				if(data.result){
					var res = JSON.parse(data.data);
					self.tableRole = res.details;	
					self.roleAll = Math.ceil(res.count/10);
				}else{
					alert('error');
				}
			})		
		},	
		rolePage2 : function(){
			var self = this;
			self.jumpPage(1);
			$('.registerBox').attr('checked',false);
			$.post('/group/search',{
				pageIndex : self.roleCur,
				name : self.authorName
			},function(data){
				if(data.result){
					var res = JSON.parse(data.data);
					self.tableRole = res.details;	
					self.roleAll = Math.ceil(res.count/10);
				}else{
					alert('error');
				}
			})		
		},	
		//添加角色
		addRoles : function(){
			var self = this;
			$.get('/group/add?name='+self.newRole,function(data){
				if(data.result){
					//self.$set(self.tableRole,0,self.newRole);
					//self.tableRole.unshift(self.newRole);	
					$('.addrole').css('display','none');
					self.rolePage();
				}
			})
		},
		//修改角色
		roleChange : function(id){
			var self = this;
			
			$.get('/group/updateList?id='+id,function(data){
				if(data.result){
					var res = JSON.parse(data.data);
					self.updateRole = res.name;
					self.updateRoleId = res.id;
					self.updateRoleTime = res.register_time;
					self.current = 12;
				}
			})	

			$.get('/group/privilege?id='+id,function(data){
				$('.registerBox').attr('checked',false);
				if(data.result){	
					var res = JSON.parse(data.data);
					if(res.privilegeList.length>0){
						self.privilegeList = res.privilegeList;	
						self.privilegeSelected = res.privilegeSelected;		
						var sele = res.privilegeSelected;
						setTimeout(function(){
							for(var i=0;i<sele.length;i++){
								$('input[name='+sele[i].code+']').attr('checked',true);
							}
						},200);
						
					}					
				}
			})
		},
		//修改角色权限
		roleRegister : function(){ 
			var self = this;
			var arr = [];
			arr = $('.registerBox:checked').serialize();
			var pcode = arr.split('&');
			var pC = [];
			pcode.forEach(function(value,index){
				var theOne = value.split('=');
				pC.push(theOne[0]);
			})
			var pCode = pC.join(',');
			if(pCode==undefined){
				$.post('/group/updatePrivilege',{
					id : self.updateRoleId,
					pCode : ''
				},function(data){
					if(data.result){
						$.post('/group/update',{
							id : self.updateRoleId,
							name : self.updateRole,
							register_time : self.updateRoleTime
						},function(data){
							if(data.result){
								if(confirm('修改完成，是否回到上一页')){
									self.privilegeList="";
									self.rolePage();
								}
							}else{
								alert('修改角色失败');
							}
						})
					}
				})
			}else{
				$.post('/group/updatePrivilege',{
					id : self.updateRoleId,
					pCode : pCode
				},function(data){
					if(data.result){
						$.post('/group/update',{
							id : self.updateRoleId,
							name : self.updateRole,
							register_time : self.updateRoleTime
						},function(data){
							if(data.result){
								if(confirm('修改完成，是否回到上一页')){
									self.privilegeList="";
									self.rolePage();
								}
							}else{
								alert('修改角色失败');
							}
						})
					}
				})
			}
		},
		//确认修改角色
		/*roleConfirm : function(){
			var self = this;
			$.post('/group/update',{
				id : self.updateRoleId,
				name : self.updateRole,
				register_time : self.updateRoleTime
			},function(data){
				if(data.result){
					alert('修改成功');
				}else{
					alert('修改失败');
				}
			})
		},*/
		//删除角色
		roleDel : function(id){
			var self = this;
			$.get('/group/del?id='+id,function(res){
				if(res.result){
					self.tableRole.forEach(function(value,index){
						if(value.id == id){
							if(confirm('确认删除？')){
								self.rolePage();
								//self.tableRole.splice(index,1);
							}
						}
					})     			       			
        		}
			})
		},
		//role分页
		roleBtnClick: function(data){//页码点击事件
			var self = this;
            if(data != self.roleCur){
                self.roleCur = data;
                self.rolePage2();
            }
        },
        rolePageClick: function(){
        	var self = this;
            self.rolePage2();
        },	
		
		//隐藏模态框
		cancelCover : function(){
			this.cover = 0;
		},

        taskPage :function(num){
        	var self = this;
			if(num!==''){
				self.current = num;
			}
			self.navStatus = 1;
			self.curtask = 1;
			var data = self.serializeSearch('taskForm')+'&'+'pageIndex='+self.curtask;
			$.get('/task/list?'+data,function(res){
				if(res.result){
					var data = JSON.parse(res.data);
					self.all = Math.ceil(data.count/10);
					self.tableTask = data.details;
					
				}
			})
        },
		
		taskSearch :function(num){
        	var self = this;
			if(num!==''){
				self.current = num;
			}
			var data = self.serializeSearch('taskForm')+'&'+'pageIndex='+self.curtask;
			$.get('/task/list?'+data,function(res){
				if(res.result){
					var data = JSON.parse(res.data);
					self.all = Math.ceil(data.count/10);
					self.tableTask = data.details;		
				}
			})
        },
        
        taskbtnClick: function(data,num){//页码点击事件
			var self = this;
            if(data != self.curtask){
                self.curtask = data;
				self.taskSearch(num);
            }
        },
        taskpageClick: function(num){
        	var self = this;
            console.log('现在在'+self.curtask+'页');
            self.taskSearch(num);
        },	

        //发布任务
		publishTask : function(){
			var self = this;
			$.post('/task/save',{
				name : self.taskName,
				count : self.count,
				uid : self.uid,
			},function(result){
				if(result.result){
					alert("任务发布成功");
					$('.coverTask').css('display','none');
					self.taskName = '';
					self.count = '';
					self.taskPage(2);
				}else{
					console.log("错误代码:"+result.message);
				}
			})
		},	

        //领取任务
         draw:function(id){
			 var self = this;
			 $.post('/task/draw',{
				id:id 
			 },function(result){
				 if(result.result){
					 alert(result.message);
					self.taskPage(2);
					 
				 }
			 })
		 },
		 //任务详情
		 taskDetail:function(id,num){
			var self = this;
			if(num!==''){
				self.current = num;
				self.tid = id;
			}
			self.taskDetailCur = 1;
			var data = self.serializeSearch('taskDetailForm')+'&'+'pageIndex='+self.taskDetailCur+'&id='+id;
			$.get('/taskDetail/list?'+data,function(res){
				if(res.result){
					var data = JSON.parse(res.data);
					self.taskDetailAll = Math.ceil(data.count/10);
					self.tableTaskDetail = data.details;		
				}
			})
		 },
		 
		 taskDetailSearch:function(num){
			var self = this;
			if(num!==''){
				self.current = num;
			}
			var data = self.serializeSearch('taskDetailForm')+'&'+'pageIndex='+self.taskDetailCur+'&id='+self.tid;
			$.get('/taskDetail/list?'+data,function(res){
				if(res.result){
					var data = JSON.parse(res.data);
					self.taskDetailAll = Math.ceil(data.count/10);
					self.tableTaskDetail = data.details;
				}
			})
		 },
		 
		 taskDetailBtnClick: function(data,num){//页码点击事件
			var self = this;
            if(data != self.taskDetailCur){
                self.taskDetailCur = data;
				self.taskDetailSearch(num);
            }
        },
        taskDetailPageClick: function(num){
        	var self = this;
            self.taskDetailSearch(num);
        },
		 
		 //删除任务
		 del:function(id){
			 var self = this;
			 $.post("/task/del",{id:id},function(result){
				 if(result.result){
					 alert(result.message);
					 self.taskPage(2);					 
				 }
			 })
			 
		 },
		 
		 //图片放大
		 showPicture:function(imgpath){
			 $("#picture").attr('src',imgpath);
			 $(".showPicture").css('display','block');
		 },

        //初始化审核列表
        verify:function(num){
        	var self = this;
			if(num!==''){
				self.current = num;
			}
			self.auditCur = 1;
			var data = self.serializeSearch('verifyForm')+'&'+'pageIndex='+self.auditCur;
			$.get('/task/verify?'+data,function(res){
				if(res.result){
					var data = JSON.parse(res.data);
					self.all = Math.ceil(data.count/10);
					self.tableVerify = data.details;
				}
			})
			self.current = 10;
        },
		
		verifySearch : function(num){
			var self = this;
			if(num!==''){
				self.current = num;
			}
			var data = self.serializeSearch('verifyForm')+'&'+'pageIndex='+self.auditCur;
			$.get('/task/verify?'+data,function(res){
				if(res.result){
					var data = JSON.parse(res.data);
					self.all = Math.ceil(data.count/10);
					self.tableVerify = data.details;			
				}
			})
		},
		verifyTask : function(id){
			window.location.href = "/audit.html?tid="+id;
		},
		//audit分页
		auditBtnClick: function(data,num){//页码点击事件
			var self = this;
            if(data != self.auditCur){
                self.auditCur = data;
                self.verifySearch(num);
            }
        },
        auditPageClick: function(num){
        	var self = this;
            self.verifySearch(num);
        },	
		
		//分页公共函数
		indexs: function(cur,all){
          var left = 1;
          var right = all;
          var ar = [];
          if(all>= 5){
            if(cur > 3 && cur < all-2){
                    left = cur - 2
                    right = cur + 2
            }else{
                if(cur<=3){
                    left = 1
                    right = 5
                }else{
                    right = all
                    left = all -4
                }
            }
         }
        while (left <= right){
            ar.push(left)
            left ++
        }
        return ar;
       }       
	}
	
})


$(function(){

	var flag = false;
	var rightW = $('.content').width()/12*10;
	
	$('.glyphicon-th-list').click(function(){
		if(flag){
			$('.left').hide();
			$('.content').width($('body').width()-30);	
			flag = false;
		}else if(flag == false){
			$('.left').show();
			$('.content').width(rightW);
			flag = true;
		}
	})
		
	//添加用户
	$('#add-admin').click(function(){		
		$('.coverUser').css('display','block');
		return false;
	})
	$('#add-role').click(function(){
		$('.addrole').css('display','block');
		return false;
	})
	
	$('.cancle-role').click(function(){
		$('.addrole').css('display','none');
	})
	
	
	$('.cancle-cover').click(function(){
		$('.coverUser').css('display','none');
		$('.coverUserFix').css('display','none');
		return false;
	})
	
	$('#cancle-coverFixed').click(function(){
		$('.coverUserFix').css('display','none');
		return false;
	})
	
	
	//任务发布
    $('#add-task').click(function(){
		var self = this;
		$('.coverTask').css('display','block');
		$.get('/user/searchALL',null,function(result){
				if(result.result){
					var data = JSON.parse(result.data); 
					$("#uid").find("option").remove();
					for(var i=0;i<data.length;i++){  
                    $("#uid").append("<option value='"+data[i].id+"'>" + data[i].name + "</option>");  
                }  
					
				}
			})
		return false;
	})
	
	$('#taskcancle').click(function(){
		$('.coverTask').css('display','none');
		return false;
	})
	
	$('#picturecancle').click(function(){
		$('.showPicture').css('display','none');
		return false;
	})
	

	
	
/*	//注册接口
	$('#register').click(function(){
		var reg = /^1[3|4|5|7|8][0-9]{9}$/;
		var username = $('.username').val(),
			userpassword = $('.userpassword').val(),
			userpasswords = $('.userpasswords').val(),
			usertel = $('.usertel').val();
		if(username==''||userpassword==''||userpasswords==''||usertel==''){
			alert('输入不能为空');
		}else if(userpassword!==userpasswords){
			alert('两次密码输入不同，请重新输入');
		}else if(!reg.test(usertel)){
			alert('请输入正确的手机号码');
		}else{
			接后台之后使用
			$.post('/',{
				username : username,
				userpassword : userpassword,
				usertel : usertel
			},function(data){
				console.log(data);
				$('.cover').css('display','none');
			})
			$('.coverUser').css('display','none');
			var date = new Date();
			var nowdate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			$('.tableUser tbody').append($('<tr><td>'+username+'</td><td>'+userpassword+'</td><td>'+usertel+'</td><td>'+nowdate+'</td><tr>'));
		}
	})
	
	//查询接口
	$('#searchUser').click(function(){
		var searchUsername = $('.searchUsername').val(),
			searchUseraccount = $('.searchUseraccount').val(),
			searchUserstartime = $('.searchUserstartime').val(),
			searchUserendtime = $('.searchUserendtime').val();
		$.post('/',{
			searchUsername : searchUsername,
			searchUseraccount : searchUseraccount,
			searchUserstartime : searchUserstartime,
			searchUserendtime : searchUserendtime
		},function(data){
			console.log(data);
			$('tbody').empty();
			data.forEach(function(value,index){
				$('tbody').append($('<tr><td>'+data.username+'</td><td>'+data.userpassword+'</td><td>'+data.usertel+'</td><td>'+'1'+'</td><td>'+'1'+'</td><td>'+data.nowdate+'</td><tr>'));
			})
		})
	})
	
	//添加任务接口
	$('#add-task').click(function(){
		$('.coverTask').css('display','block');
	})
	
	$('#taskcancle').click(function(){
		$('.coverTask').css('display','none');
	})
	
	$('#taskpublish').click(function(){
		var taskname = $('.taskname').val(),
			taskpicnum = $('.taskpicnum').val(),
			taskstartime = $('.taskstartime').val(),
			taskstatus = $('.taskstatus').val(),
			taskperson = $('.taskperson').val();
			if(taskname!==''&&taskpicnum!==''&&taskstartime!==''&&taskstatus!==''&&taskperson!==''){
				接后台之后使用
				$.post('/',{
					taskname : taskname,
					taskpicnum : taskpicnum,
					taskstartime : taskstartime,
					taskstatus : taskstatus,
					taskperson : taskperson
				},function(data){
					console.log(data);
					$('.cover').css('display','none');
				})
				$('.coverTask').css('display','none');
				$('.tableTask tbody').append($('<tr><td>'+'1'+'</td><td>'+taskname+'</td><td>'+taskpicnum+'</td><td>'+taskstartime+'</td><td>'+taskstatus+'</td><td>'+taskperson+'</td><td><a class="taskreceive">领取    </a><a class="taskdetail">任务详情    </a><a class="taskdelete">删除    </a></td><tr>'));	
			}else{
				alert('输入不能为空');
			}
	})
	
	//查询接口
	$('#taskSerach').click(function(){
		var taskName = $('.taskName').val(),
			taskStatus = $('.taskStatus').val(),
			taskPeople = $('.taskPeople').val(),
			taskTime = $('.taskTime').val();
		$.post('/',{
			taskName : taskName,
			taskStatus : taskStatus,
			taskPeople : taskPeople,
			taskTime : taskTime
		},function(data){
			console.log(data);
			$('tbody').empty();
			data.forEach(function(value,index){
				$('tbody').append($('<tr><td>'+data.taskName+'</td><td>'+data.taskStatus+'</td><td>'+'1'+'</td><td>'+'1'+'</td><tr>'));
			})
		})
	})*/
	
})
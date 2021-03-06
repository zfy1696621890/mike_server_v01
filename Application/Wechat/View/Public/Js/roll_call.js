var open_id;
var id;
var myLocation="";

function initRollCall(){
	open_id = document.getElementById('openID').innerHTML;
	id = document.getElementById('quizID').innerHTML;
	getLocation();
}

function getLocation() { 
	if (navigator.geolocation) { 
		var config = { enableHighAccuracy: true, timeout: 5000, maximumAge: 30000 }; 
		navigator.geolocation.getCurrentPosition(showPosition, showError, config); 
	} else { 
		alert("定位失败,用户已禁用位置获取权限"); 
	} 
} 
/** 
* 获取地址位置成功 
*/ 
function showPosition(position) { 
	//获得经度纬度 
	var x = position.coords.latitude; 
	var y = position.coords.longitude;
	myLocation = x + ',' + y;
	document.getElementById('gotLocation').innerHTML = "已成功获得位置";
} 
/** 
* 获取地址位置失败[暂不处理] 
*/ 
function showError(error) { 
	switch (error.code) { 
		case error.PERMISSION_DENIED: 
		alert("定位失败,用户拒绝请求地理定位"); 
		break; 
		case error.POSITION_UNAVAILABLE: 
		alert("定位失败,位置信息是不可用"); 
		break; 
		case error.TIMEOUT: 
		alert("定位失败,请求获取用户位置超时"); 
		break; 
		case error.UNKNOWN_ERROR: 
		alert("定位失败,定位系统失效"); 
		break; 
	} 
} 

function signIn(){
	$.post("http://112.124.101.41/mike_server_v01/index.php/Wechat/Index/submitRollCall",{'action':'submit_count', 'openid':open_id, 'count_id':id, 'location':myLocation}, function(data){
		var json = eval('(' + data + ')'); 
		if (json.status == 1) {
			document.write("<h3 style='margin-top: 30px;text-align: center;width: 100%'>已成功提交位置</h3>");
		}else if(json.status == -1){
			alert('已提交位置，请勿重复提交！');
		};
	});
}

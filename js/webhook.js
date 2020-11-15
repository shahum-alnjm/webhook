/*

	AUTHOR : LAGANTY <api@xclient.tk>
	TELEG  : @laganty
	INSTA  : @lagant.y
	MADE : "WITH LOVE IN HOME"
	DATE :  15 nov 2020 | 10:18 AM 

*/
function preg_match(regex,inw){
	if(inw.match(regex)){
	  return true;
	}else{
	  return false;
	}
}
function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
function setwebhook(){
	var host = document.getElementById("host").value;
	var token = document.getElementById("token").value;
	if (preg_match("http://",host)){
		alert("التليجرام تدعم فقط *https://*");
        return;
	}
	if (!preg_match("https://(.*).php",host)){
		alert("خطـأ \n .php قم بأدخال الرابط بشكل صحيح مع الامتداد !");
        return;
	}
	if (!preg_match('[0-9]{9}:[a-zA-Z0-9_-]{35}',token)){
        alert("خطـأ \n قم بأدخال توكن البوت الخاص بك كامل بدون نقصان! !\nلا تعرف ما هوا التوكن راسلني t.me/laganty")
		return;
	}
	webhok(host,token);
}
function webhok(url,token){
	document.getElementById("mwl").innerHTML = '<img src="img/loading.gif" class="gif"></img>';
	axios.get('http://api.telegram.org/bot'+token+'/setwebhook?url='+url).then(function (response) {
    	if(response.data.ok === true){
			sleep(8000).then(() => {
				document.getElementById("mwl").innerHTML = "<h4><p class=\"ar\" style=\"color:green\">لقد تم انشاء ويب هوك لبوتك بنجاح.</p></h4>";
			});
		}
	}).catch(function (error) {
		sleep(8000).then(() => {
			document.getElementById("mwl").innerHTML = "<h4><p class=\"ar\" style=\"color:red\">التوكن او الرابط الذي ادخلته غير صالح...<br>اعد المحاوله في وقت اخر</p></h4>";
		});
	});
}


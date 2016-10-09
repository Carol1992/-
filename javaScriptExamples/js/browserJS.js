var newWin = "";
var newWin2 = "";
function openWin() {
	newWin = window.open("http://www.wow666.top", "_blank", "width=400, height=500");
}

function blurWin() {
	newWin.blur();
}

function focusWin() {
	newWin.focus();
}

function closeWin() {
	if(newWin){
		newWin.close();
	}
}

function closeWinCheck() {
	if(!newWin) {
		window.alert("Blog is never opened!");
	} else {
		if(newWin.closed){
			window.alert("Blog is closed!");
		} else {
			window.alert("Blog is open!")
		}
	}
}

function openWin2() {
	newWin2 = window.open("", "_blank", "width=400, height=500");
	newWin2.opener.document.getElementById("demo").innerHTML = "You have open linqing's blogs";
}

function moveWin() {
	newWin2.moveBy(200, 200);
	newWin2.focus();
}

function moveWin2() {
	newWin2.moveTo(200, 200);
	newWin2.focus();
}

function ptintPage() {
	window.print();
}

function resizePage() {
	newWin2.resizeBy(100, 100);
	newWin2.focus();
}

function resizePage2() {
	newWin2.resizeTo(100, 100);
	newWin2.focus();
}

function scrollWin() {
	window.scrollTo(0, 100);
}

function scrollWin2() {
	window.scrollBy(0, 100);
}

(function(){
	document.getElementById("screen").innerHTML = "Screen width and height is " +
	screen.width + " and " + screen.height + ", " + "Available screen width and height is " +
	screen.availWidth + " and " + screen.availHeight + ", " + "Screen color depth is " +
	screen.colorDepth + ".";

	document.getElementById("location").innerHTML = "The hostname and port is " +
	window.location.hostname + ", " + "the path of current url is " + window.location.href +
	", " + "the protocol of current url is " + window.location.protocol + ".";

	document.getElementById("history").innerHTML = "The number of URLs in the history list is " +
	history.length;

	document.getElementById("info").innerHTML = "Cookies enabled is " + navigator.cookieEnabled + ", " +
	"Java enabled is " + navigator.javaEnabled() + ".";

	document.getElementById("info2").innerHTML = "浏览器的名称和工程名称是 " + navigator.appName + " 和 " +
	navigator.appCodeName + "; 版本信息和代理信息是 " + navigator.appVersion + " 和 " + navigator.userAgent +
	"; 平台和语言是 " + navigator.platform + " 和 " + navigator.language + ".";
})();

function newDoc() {
	window.location.assign("http://www.wow666.top");
	// window.location.replace("http://www.wow666.top"); //浏览器不能返回
}

function goBack() {
	window.history.back();
}

function goForward() {
	window.history.forward();
}

function goSpecific() {
	window.history.go(-2);
}

function sayHi() {
	alert("Hello\nWelcome back!");
}

function func01() {
	var x = document.getElementById("demo2");
	if(confirm("Confirmed this post") === true) {
		x.innerHTML = "OK";
	} else {
		x.innerHTML = "Cancel";
	}
}

function func02() {
	var person = prompt("Please enter your name: ", "");
	if(person != null) {
		document.getElementById("demo2").innerHTML = "Hello " + person;
	}
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==  ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}


var timer = setInterval(myClock, 1000);
function myClock() {
	document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
}
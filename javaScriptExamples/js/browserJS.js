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
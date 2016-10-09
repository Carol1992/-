function toUpper(x) {
	x.value = x.value.toUpperCase();
}

function toRed(x) {
	x.style.background = "red";
}

function toBlue(x) {
	x.style.background = "gray";
}

function prefer() {
	prefer = document.forms[0].browsers.value;
	alert("Your prefer browser is " + prefer);
}

function confirmInput() {
	var fname = document.forms[1].fname.value;
	alert("Hello " + fname + "! Welcome to my blogs.");
}

function resetInput() {
	alert("Reset the value.");
}

function demo() {
	document.getElementById("demodemo").innerHTML = "Hello World!";
}

function myFunction(elmnt, clr) {
	elmnt.style.color = clr;
}

function imgError() {
	document.getElementById("img").alt = "No such image~";
}

function coordinates(event) {
	document.getElementById("s").innerHTML = "X = " + event.screenX + "<br>Y = " + event.screenY;
	document.getElementById("c").innerHTML = "Y = " + event.clientX + "<br>Y = " + event.clientY;
}
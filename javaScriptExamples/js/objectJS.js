(function() {
	var x = document.getElementById("test");
	document.getElementById("linkInfo").innerHTML = "The value of href, hreflang, id, rel, target, type as following: " +
	x.href + ", " + x.hreflang + ", " + x.id + ", " + x.rel + ", " + x.target + ", " + x.type + ".";

	var y = document.getElementById("venus");
	document.getElementById("areas").innerHTML = "The value of alternate text,coordinates,shape,href,href's protocol,hostname,post number,pathname,querystring,hash as following: " +
	y.alt + ", " + y.coords + ", " + y.shape + ", " + y.href + ", " + y.protocol + ", " + y.hostname + ", " + y.port + ", " + y.search + ", " + y.hash + ".";

	var z = document.getElementById("img01");
	document.getElementById("imgInfo").innerHTML = "The values of alt, height, src are as follow: " +
	z.alt + ", " + z.height + ", " + z.src + ".";
})();

function changeClr() {
	var x = document.getElementById("myFrame");
	x.style.background = "red";
}

function changeSrc() {
	var x = document.getElementById("myFrame2");
	x.src = "http://www.wow666.top";
	document.getElementById("iframeInfo").innerHTML = "The height of this iframe is: " + 
	x.height + "; The value of name attr is: " + x.name + "; The value of src is: " + 
	x.src + ".";
}

function newImg() {
	var z = document.getElementById("img01");
	z.src = "images/compman.gif";
}

var x = document.getElementById("myTable");
function changeBorder() {
	x.style.border = "4px solid red";
}

function changeMargin() {
	x.style.margin = "25px";
}

function changeCell() {
	var cell = x.rows[0].cells;
	cell[0].style.background = "red";
}

function createCaption() {
	x.createCaption().innerHTML = "New Table";
}

function addRow() {
	var newRow = x.insertRow(0);
	var a = newRow.insertCell(0);
	var b = newRow.insertCell(1);
	a.innerHTML = "Mia";
	b.innerHTML = "Mag";
}

function deleteRow() {
	x.deleteRow(0);
}
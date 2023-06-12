
// top functions
function update(){
		document.getElementById('showAmt').value = count;
		document.title = count + " clicks";
		document.getElementById("ttAutoClick").innerHTML = autoclick;
		document.getElementById("priceAutoClick").innerHTML = ((autoclick+1)*20);
		document.getElementById("ttMulti").innerHTML = multi;
		document.getElementById("priceMulti").innerHTML =((multi+1)*30);
		document.getElementById("countPerSec").innerHTML = "Rate is: "+ parseInt((autoclick)+(multi*2)) + " /sec";
}

var count = 0;
var autoclick =0;
var multi = 0;
	
function timer(){
	count =count +autoclick;
	count = count + multi*2;
	update();
}
	
setInterval(timer, 1000);
//localStorage.clear();
	
	
//working functions
function add(){
		count = (count+1);	
	update();
}
			
			
function save(){
	localStorage.setItem("count", count);
	localStorage.setItem("autoclick",autoclick);
			}
			
function load(){
	count=parseInt(localStorage.getItem("count"));
	document.getElementById("showAmt").value = count;
	autoclick = parseInt(localStorage.getItem("autoclick"));
	document.getElementById("ttAutoClick").value=autoclick;
				
	update();
}
			
function buyAutoClick(){
	if(count >=(autoclick+1)*20){
		count = count -(autoclick+1)*20;
		autoclick = autoclick +1;
		update();
	}
}

function buyMulti(){
	if(count >=(multi+1)*30){
		count = count -(multi+1)*30;
		multi = multi +1;
		update();
	}
}
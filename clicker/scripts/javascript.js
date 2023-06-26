
// top functions
function update(){
		document.getElementById('showAmt').value = cash;
		document.title = cash + " cash";
		document.getElementById("ttAutoClick").innerHTML = autoclick;
		document.getElementById("priceAutoClick").innerHTML = ((autoclick+1)*20);
		document.getElementById("ttMulti").innerHTML = multi;
		document.getElementById("priceMulti").innerHTML =((multi+1)*30);
		document.getElementById("countPerSec").innerHTML = "Rate is: "+ parseInt((autoclick)+(multi*2)) + " /sec";
}

var cash = 0;
var autoclick =0;
var multi = 0;
	
function timer(){
	cash =cash +autoclick;
	cash = cash + multi*2;
	update();
}
	
setInterval(timer, 1000);

function editName(){
	var n = document.getElementById("name");
	var rn = n.readonly;
	
	if(rn=true){
		n.setAttribute("readonly",false);
		n.style.color="white";
	}else{
		n.style.color="black";
		n.setAttribute("readonly", true);
		
		
	}
}

//localStorage.clear();
	
	
//working functions
function add(){
		cash = (cash+1);	
	update();
}
			
			
function save(){
	localStorage.setItem("cash", cash);
	localStorage.setItem("autoclick",autoclick);
			}
			
function load(){
	cash=parseInt(localStorage.getItem("cash"));
	document.getElementById("showAmt").value = cash;
	autoclick = parseInt(localStorage.getItem("autoclick"));
	document.getElementById("ttAutoClick").value=autoclick;
				
	update();
}
			
function buyAutoClick(){
	if(cash >=(autoclick+1)*20){
		cash = cash -(autoclick+1)*20;
		autoclick = autoclick +1;
		update();
	}
}

function buyMulti(){
	if(cash >=(multi+1)*30){
		cash = cash -(multi+1)*30;
		multi = multi +1;
		update();
	}
}
var isLightOn = true;
function ToggleLight()
{
	if (isLightOn == true) {
		document.getElementById("lightBulb").src = "img/bulb-on.png";
	}
	else {
		document.getElementById("lightBulb").src = "img/bulb-off.png";
	}
	
}


function AddNumbers(numA, numB) {
	numC = numA + numB;
	document.getElementById("numbers").innerHTML = numC;
}
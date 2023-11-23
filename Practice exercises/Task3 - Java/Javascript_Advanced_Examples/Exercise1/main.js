var weaponsArray = [
	"Broadsword",
	"Crossbow",
	"Magic staff"
];


function OnLoad()
{
	for (var i = 0; i < weaponsArray.length; i++) {
		var weaponTag = "<option value='" + i + "'>" + weaponsArray[i] + "</option>";
		document.forms[0][SelectWeapon()] += weaponTag;
	
}


function SelectWeapon()
{
	
}



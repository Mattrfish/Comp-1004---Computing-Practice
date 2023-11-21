function CreatePlayer()
{
   
    CreatePlayerName()
    CreatePlayerColour()
    CreatePlayerHealth()
    CreatePlayerWeapon()
  
}

function CreatePlayerName() {
    playerName = document.getElementById("playername").value;
    document.getElementById("name").innerHTML = playerName;
}

function CreatePlayerColour() {
    playerColour = document.getElementById("playercolour").value;
    document.getElementById("colour").style.backgroundColor = playerColour;
}

function CreatePlayerHealth() {
    playerHealth = document.getElementById("playerhealth").value;
    document.getElementById("health").innerHTML = playerHealth;
}

function CreatePlayerWeapon() {

    playerWeapon = document.getElementById("playerweapon").value;
    let weapons;
    switch (playerWeapon) { 
        case "1":
            weapons = "Crossbow of much hurting";
            break;
        case "2":
            weapons = "Broadsword of so slicing";
            break;
        case "3":
            weapons = "Wand of amaze magics";
            break;
    }
    document.getElementById("weapon").innerHTML = weapons;
}
//Event listener for the Spawn button.
let newPlayerButton = document.getElementById("new_player");
newPlayerButton.addEventListener("click", () => {
    if(typeof player.name !== "undefined"){
        showMessageConsole("Your journey has already begun");
        return;
    }
    let name = document.getElementById("input_name").value;
    fetchSpawn(name).then(() => {

    });
});

//Event listener for the Delete Player button.
let deletePlayerButton = document.getElementById("delete_player");
deletePlayerButton.addEventListener("click", () =>{
    if(typeof player.name === "undefined"){

        showMessageConsole("Can't see any object around you.");
        return;
    }
    fetchDeletePlayer().then(() => {

        showHomeScreen();
    })
});

//Event listener for the keys.
document.addEventListener('keyup', (e) => {
    let code = "";
    if(typeof player.name !== "undefined"){
        if (e.keyCode === 87)      code = "UP";
        else if (e.keyCode === 83) code = "DOWN";
        else if (e.keyCode === 65) code = "LEFT";
        else if (e.keyCode === 68) code = "RIGHT";
        else if (e.keyCode === 38) code = "LOOKING UP";
        else if (e.keyCode === 40) code = "LOOKING DOWN";
        else if (e.keyCode === 37) code = "LOOKING LEFT";
        else if (e.keyCode === 39) code = "LOOKING RIGHT";
        else if (e.keyCode === 32) code = "ATTACK";
        else if (e.keyCode === 17) code = "PICKUP";
    }
    if(typeof player.name !== "undefined"){
        if(code === "UP"){
            fetchMovePlayer("N").then(() => {
                player.direction = "N";
                document.getElementById("brujula").style.transform = "rotate(90deg)";
            })
        } else if (code === "DOWN"){
            fetchMovePlayer("S").then(() => {
                player.direction = "S";
                document.getElementById("brujula").style.transform = "rotate(-90deg)";
            })
        } else if (code === "LEFT"){
            fetchMovePlayer("O").then(() => {
                player.direction = "O";
                document.getElementById("brujula").style.transform = "rotate(0deg)";
            })
        } else if (code === "RIGHT"){
            fetchMovePlayer("E").then(() => {
                player.direction = "E";
                document.getElementById("brujula").style.transform = "rotate(180deg)";
            })
        } else if (code === "LOOKING UP") {
            player.direction = "N";
            document.getElementById("brujula").style.transform = "rotate(90deg)";
            updateGameView();
        } else if (code === "LOOKING DOWN") {
            player.direction = "S";
            document.getElementById("brujula").style.transform = "rotate(-90deg)";
            updateGameView();
        } else if (code === "LOOKING LEFT") {
            player.direction = "O";
            document.getElementById("brujula").style.transform = "rotate(0deg)";
            updateGameView();
        } else if (code === "LOOKING RIGHT") {
            player.direction = "E";
            document.getElementById("brujula").style.transform = "rotate(180deg)";
            updateGameView();
        } else if (code === "ATTACK") {
            fetchAttack();
        } else if (code === "PICKUP"){
            fetchPickup();
        }
    }
});

//Event listener for the Craft Item button.
let craftItemButton = document.getElementById("craft_item");
craftItemButton.addEventListener(("click"), () => {
    if(typeof player.name === "undefined"){
        showMessageConsole("Your journey has not begun yet.");
        return;
    }

    fetchCraft();
});

//Event listener for the Re-spawn button.
let reviveItemButton = document.getElementById("revive_player");
reviveItemButton.addEventListener(("click"), () => {
    if(typeof player.name === "undefined"){
        showMessageConsole("Your journey has not begun yet.");
        return;
    }

    fetchRespawn().then(() => {
        //
        }
    );
});



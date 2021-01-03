let newPlayerButton = document.getElementById("new_player");
newPlayerButton.addEventListener("click", () => {
    if(typeof player.name !== "undefined"){
        //TODO: Mostrar por la consola del juego el error y las instrucciones.
        showMessageConsole("The player already exists.");
        return;
    }
    let name = document.getElementById("input_name").value;
    fetchSpawn(name).then(() => {
        //TODO: Controlar códigos de error de todas las llamadas.
    });
});

let deletePlayerButton = document.getElementById("delete_player");
deletePlayerButton.addEventListener("click", () =>{
    if(typeof player.name === "undefined"){
        //TODO: Mostrar por la consola del juego el error y las instrucciones.
        showMessageConsole("The object doesn't exists.")
        console.log("El objeto no existe");
        return;
    }
    fetchDeletePlayer().then(() => {
        //TODO: Mostrar pantalla de inicio.
        showHomeScreen();
    })
});

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

let craftItemButton = document.getElementById("craft_item");
craftItemButton.addEventListener(("click"), () => {
    if(typeof player.name === "undefined"){
        showMessageConsole("Your journey has not begin yet.");
        return;
    }

    fetchCraft();
});


let reviveItemButton = document.getElementById("revive_player");
reviveItemButton.addEventListener(("click"), () => {
    if(typeof player.name === "undefined"){
        showMessageConsole("Your journey has not begin yet.");
        return;
    }

    fetchRespawn().then(() => {
        //
        }
    );
});



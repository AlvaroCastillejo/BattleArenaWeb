let newPlayerButton = document.getElementById("new_player");
newPlayerButton.addEventListener("click", () => {
    if(typeof player.name !== "undefined"){
        //TODO: Mostrar por la consola del juego el error y las instrucciones.
        console.log("El objeto ya existe");
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
    }
    if(typeof player.name !== "undefined"){
        if(code === "UP"){
            fetchMovePlayer("N").then(() => {

            })
        } else if (code === "DOWN"){
            fetchMovePlayer("S").then(() => {

            })
        } else if (code === "LEFT"){
            fetchMovePlayer("O").then(() => {

            })
        } else if (code === "RIGHT"){
            fetchMovePlayer("E").then(() => {

            })
        }

    }
});


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
    })
});

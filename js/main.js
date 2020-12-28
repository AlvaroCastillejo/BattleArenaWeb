let newPlayerButton = document.getElementById("new_player");
newPlayerButton.addEventListener("click", () => {
    //document.querySelector("html").setAttribute("style", 'background-image: url("assets/options/cracks.gif");background-repeat: no-repeat;background-size: 101%;');
    let name = document.getElementById("input_name").value;
    fetchSpawn(name).then(() => {
        console.log("Player attakkked: " + getPlayer().attack);
    });
});
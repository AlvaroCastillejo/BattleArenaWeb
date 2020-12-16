let newPlayerButton = document.getElementById("new_player");
newPlayerButton.addEventListener("click", () => {
    let name = document.getElementById("input_name").value;
    fetchSpawn(name);
});
let player = new Player();
let map = new Array(40).fill(0).map(() => new Array(40).fill(0));  //0: nothing, 1: enemy, 2: object, 3: wall
let map_direction = new Array(40).fill("-").map(() => new Array(40).fill("-"));  //-: no player

async function fetchSpawn(name) {
    await fetch("http://battlearena.danielamo.info/api/spawn/b89f9719/" + name)
        .then(response => response.json())
        .then(data => {
            player.id = data.token;
            player.code = data.code;
            player.name = name;
            fetchPlayer(player.id);
        }).then(() => {
            console.log("player token attack is: " + player.attack)
        });
}

function fetchPlayer(token) {
    return fetch("http://battlearena.danielamo.info/api/player/b89f9719/" + token)
        .then(response => response.json())
        .then(data => {
            player.x = data.x;
            player.y = data.y;
            player.direction = data.direction;
            player.attack = data.attack;
            player.defense = data.defense;
            player.vp = data.vitalpoints;
            player.image = data.image;
            player.object = data.object;
        }).then(() => {
            fetchMap(token);
        });
}

function fetchMap(token) {
    return fetch("http://battlearena.danielamo.info/api/map/b89f9719/" + token)
        .then(response => response.json())
        .then(data => {
            data.enemies.forEach((item) => {
                let x = item.x;
                let y = item.y;
                map[x][y] = 1;
                map_direction[x][y] = item.direction;
            });
            data.objects.forEach((item) => {
                map[item.x][item.y] = 2;
            });
            updateGameView();
        });
}

function updateGameView(){
    let top_left = document.getElementById("top_left");
    let top_center = document.getElementById("top_center");
    let top_right = document.getElementById("top_right");

    let center_left = document.getElementById("center_left");
    let center_center = document.getElementById("center_center");
    let center_right = document.getElementById("center_right");

    let bottom_left = document.getElementById("bottom_left");
    let bottom_center = document.getElementById("bottom_center");
    let bottom_right = document.getElementById("bottom_right");

    center_center.setAttribute("style", 'background-image: url("assets/options/character.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(player.direction) +'deg);');
    //document.querySelector("html").setAttribute("style", 'background-image: url("../assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;');

    if(map[player.x-1][player.y-1] === 1){
        top_left.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.x-1][player.y-1]) +'deg);');
    } else if(map[player.x-1][player.y-1] === 2){
        top_left.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        top_left.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }

    if(map[player.x-1][player.y] === 1){
        top_center.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.x-1][player.y]) +'deg);');
    } else if(map[player.x-1][player.y] === 2){
        top_center.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        top_center.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }

    if(map[player.x-1][Number(player.y)+1] === 1){
        top_right.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.x-1][Number(player.y)+1]) +'deg);');
    } else if(map[player.x-1][Number(player.y)+1] === 2){
        top_right.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        top_right.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }


    if(map[player.x][player.y-1] === 1){
        center_left.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.x][player.y-1]) +'deg);');
    } else if(map[player.x][player.y-1] === 2){
        center_left.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        center_left.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }

    if(map[player.x][Number(player.y)+1] === 1){
        center_right.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.x][Number(player.y)+1]) +'deg);');
    } else if(map[player.x][Number(player.y)+1] === 2){
        center_right.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        center_right.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }


    if(map[Number(player.x)+1][player.y-1] === 1){
        bottom_left.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[Number(player.x)+1][player.y-1]) +'deg);');
    } else if(map[Number(player.x)+1][player.y-1] === 2){
        bottom_left.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        bottom_left.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }

    if(map[Number(player.x)+1][player.y] === 1){
        bottom_center.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[Number(player.x)+1][player.y]) +'deg);');
    } else if(map[Number(player.x)+1][player.y] === 2){
        bottom_center.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        bottom_center.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }

    if(map[Number(player.x)+1][Number(player.y)+1] === 1){
        bottom_right.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[Number(player.x)+1][Number(player.y)+1]) +'deg);');
    } else if(map[Number(player.x)+1][Number(player.y)+1] === 2){
        bottom_right.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
    } else {
        bottom_right.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
    }
}

function showHomeScreen(){
    let top_left = document.getElementById("top_left");
    let top_center = document.getElementById("top_center");
    let top_right = document.getElementById("top_right");

    let center_left = document.getElementById("center_left");
    let center_center = document.getElementById("center_center");
    let center_right = document.getElementById("center_right");

    let bottom_left = document.getElementById("bottom_left");
    let bottom_center = document.getElementById("bottom_center");
    let bottom_right = document.getElementById("bottom_right");

    top_left.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_01.png");background-repeat: no-repeat;background-size: 101%;');
    top_center.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_02.png");background-repeat: no-repeat;background-size: 101%;');
    top_right.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_03.png");background-repeat: no-repeat;background-size: 101%;');
    center_left.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_04.png");background-repeat: no-repeat;background-size: 101%;');
    center_center.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_05.png");background-repeat: no-repeat;background-size: 101%;');
    center_right.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_06.png");background-repeat: no-repeat;background-size: 101%;');
    bottom_left.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_07.png");background-repeat: no-repeat;background-size: 101%;');
    bottom_center.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_08.png");background-repeat: no-repeat;background-size: 101%;');
    bottom_right.setAttribute("style", 'background-image: url("assets/homescreen/homescreen_09.png");background-repeat: no-repeat;background-size: 101%;');
}

function fetchDeletePlayer() {
    return fetch("http://battlearena.danielamo.info/api/remove/b89f9719/" + player.id + "/" + player.code)
        .then(function(response) {
            if(response.status === 200){
                //TODO: Infromar por la consola del juego de que se ha eliminado correctamente.
                console.log("Jugador eliminado correctamente");
                player = new Player();
            }
        });
}

function fetchRespawn(token) {
    return fetch("http://battlearena.danielamo.info/api/respawn/b89f9719/" + token)
        .then(response => response.json());
}

function fetchPlayersObjects(token) {
    return fetch("http://battlearena.danielamo.info/api/playersobjects/b89f9719/" + token)
        .then(response => response.json());
}



function fetcMove(token, direccion) {
    return fetch("http://battlearena.danielamo.info/api/move/b89f9719/" + token + "/" + direccion)
        .then(response => response.json());
}

function fetchAttack(token, direccion) {
    return fetch("http://battlearena.danielamo.info/api/attack/b89f9719/" + token + "/" + direccion)
        .then(response => response.json());
}

function fetchCraft(token) {
    return fetch("http:// battlearena.danielamo.info/api/craft/b89f9719/" + token)
        .then(response => response.json());
}

function fetchPickup(token) {
    return fetch("http://battlearena.danielamo.info/api/pickup/b89f9719/" + token)
        .then(response => response.json());
}

/*async function fetchh(name) {
    await fetch("http://battlearena.danielamo.info/api/spawn/b89f9719/" + name)
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error(response.status);
            }else{
                console.log(response.json());
            }
        })
}*/

function getPlayer(){
    return player;
}
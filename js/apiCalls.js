let player = new Player();

async function fetchSpawn(name) {
    await fetch("http://battlearena.danielamo.info/api/spawn/b89f9719/" + name)
        .then(response => response.json())
        .then(data => {
            player.id = data.token;
            player.name = name;
            fetchPlayer(player.id);
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
        });
}

async function fetchh(name) {
    await fetch("http://battlearena.danielamo.info/api/spawn/b89f9719/" + name)
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error(response.status);
            }else{
                console.log(response.json());
            }
        })
}

function fetchRespawn(token) {
    return fetch("http://battlearena.danielamo.info/api/respawn/b89f9719/" + token)
        .then(response => response.json());
}

function fetchPlayersObjects(token) {
    return fetch("http://battlearena.danielamo.info/api/playersobjects/b89f9719/" + token)
        .then(response => response.json());
}

function fetchMap(token) {
    return fetch("http://battlearena.danielamo.info/api/map/b89f9719/" + token)
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

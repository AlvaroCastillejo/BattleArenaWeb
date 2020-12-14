let helloButton = document.getElementById("hello");



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

async function fetchSpawn(name) {
   return await fetch("http://battlearena.danielamo.info/api/spawn/b89f9719/" + name)
       .then(response => response.json());

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

function fetchPlayer(token) {
   return fetch("http://battlearena.danielamo.info/api/player/b89f9719/" + token)
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

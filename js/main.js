class Player {
    constructor(id, name, x, y, d, attack, defense, vp, image, object) {
        this._id = id;
        this._name = name;
        this._x = x;
        this._y = y;
        this._d = d;
        this._attack = attack;
        this._defense = defense;
        this._vp = vp;
        this._image = image;
        this._object = object;
    }
    // Getters
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get d() {
        return this._d;
    }
    get attack() {
        return this._attack;
    }
    get defense() {
        return this._defense;
    }
    get vp() {
        return this._vp;
    }
    get image() {
        return this._image;
    }
    get object() {
        return this._object;
    }

    // Setters
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    set d(value) {
        this._d = value;
    }
    set attack(value) {
        this._attack = value;
    }
    set defense(value) {
        this._defense = value;
    }
    set vp(value) {
        this._vp = value;
    }
    set image(value) {
        this._image = value;
    }
    set object(value) {
        this._object = value;
    }
}

const p = new Player();

let newPlayerButton = document.getElementById("new_player");
newPlayerButton.addEventListener("click", () => {
    async function fetchSpawn() {
        await fetch("http://battlearena.danielamo.info/api/spawn/b89f9719/" + name)
            .then(response => response.json());
    }
});

//Holi
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

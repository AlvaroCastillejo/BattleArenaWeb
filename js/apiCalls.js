let player = new Player();
let full_hp = null;
let last_hp = null;
let map = new Array(40).fill(0).map(() => new Array(40).fill(0));  //0: nothing, 1: enemy
let map_objects = new Array(40).fill(0).map(() => new Array(40).fill(0));
let map_direction = new Array(40).fill("-").map(() => new Array(40).fill("-"));  //-: no player
let intervalTimer = null;
let pathname = "assets\\avatars\\my_character-" + player.image + ".png";
let items_collected_count = 0;
let deaths_count = 0;
let img_url = 'https://image.flaticon.com/icons/png/512/375/375303.png';
let isAlreadyDead = false;


async function fetchSpawn(name) {
    await fetch("http://battlearena.danielamo.info/api/spawn/b89f9719/" + name)
        .then(function (response) {
            if(response.status !== 200){
                return;
            }
            response.json().then(function (data) {
                player.id = data.token;
                player.code = data.code;
                player.name = name;
                showMessageConsole("Player created succesfully.");
                fetchPlayer(player.id);
                intervalTimer = setInterval(myTimer, 2000);
            })
        })
        /*OLD SYSTEM OPERATIONAL
        .then(response => response.json())
        .then(data => {
            player.id = data.token;
            player.code = data.code;
            player.name = name;
            fetchPlayer(player.id);
        }).then(() => {
            consoleInfo.log("player token attack is: " + player.attack)
        });*/
}

function fetchPlayer(token) {
    return fetch("http://battlearena.danielamo.info/api/player/b89f9719/" + token)
        .then(function (response) {
            if (response.status !== 200){
                return;
            }
            response.json().then(function (data) {
                last_hp = player.vp;
                player.x = data.x;
                player.y = data.y;
                player.direction = data.direction;
                player.attack = data.attack;
                player.defense = data.defense;
                player.vp = data.vitalpoints;
                if(full_hp === null) full_hp = player.vp;
                player.image = data.image;
                player.object = data.object;
                document.getElementById("player_name_text").innerHTML = player.name;
                document.getElementById("player_damage_text").innerHTML = player.attack;
                document.getElementById("player_defense_text").innerHTML = player.defense;
                document.getElementById("player_vp_text").innerHTML = player.vp;
                document.getElementById("player_avatar").setAttribute("style", 'grid-area: player_pic;    margin-left: 20px;    background-image: url("assets/avatars/my_character-'+ player.image
                    +'.png");    background-repeat: no-repeat;    background-size: 220%;    background-position: -90px;    background-position-y: -40px;');         //document.getElementById("ambient").play();
                document.getElementById("brujula").style.transform = "rotate(" + orientationFactor(player.direction) + "deg)";
                if(!isAlreadyDead && (player.vp === 0 || player.vp < 0)){
                    deaths_count = deaths_count + 1;
                    isAlreadyDead = true;
                    showMessageConsole("Noob ez l2p");
                    document.getElementById("deaths_text").innerHTML = String(deaths_count);
                }
            }).then(() => {
                fetchMap(player.id);
                //fetchMap(token);
            })
        })
}

function fetchMap(token) {
    return fetch("http://battlearena.danielamo.info/api/map/b89f9719/" + token)
        .then(function (response) {
            if(response.status !== 200){
                return;
            }
            response.json().then(function (data) {
                map = new Array(40).fill(0).map(() => new Array(40).fill(0));  //0: nothing, 1: enemy
                map_objects = new Array(40).fill(0).map(() => new Array(40).fill(0));
                map_direction = new Array(40).fill("-").map(() => new Array(40).fill("-"));  //-: no player
                data.enemies.forEach((item) => {
                    let x = item.x;
                    let y = item.y;
                    map[y][x] = 1;
                    map_direction[y][x] = item.direction;
                });
                data.objects.forEach((item) => {
                    map_objects[item.y][item.x] = 1;
                });
                updateGameView();
            });
        })
}

function myTimer() {
    if(player.name === undefined){
        clearInterval(intervalTimer);
    } else {
        fetchPlayer(player.id);
    }
}

function updateMinimap(){
    document.getElementById("minimap_container").innerHTML = "";
    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
            var div = document.createElement("div");
            div.style.width = "1.57%";
            div.style.height = "1.57%";
            if(map[i][j] === 1){
                div.style.backgroundImage = "url('assets/options/minimap/enemy.png')";
                div.style.transform = 'rotate(' + orientationFactor(map_direction[i][j]) + 'deg);';
            } else {
                div.style.backgroundImage = "url('assets/options/minimap/nothing.png')";
            }
            div.style.backgroundSize = "100%";
            div.style.backgroundRepeat = "no-repeat";
            //else div.style.backgroundImage = "url('nothing.png')";
            document.getElementById("minimap_container").appendChild(div);
        }
        var jump = document.createElement("br");
        document.getElementById("minimap_container").appendChild(jump);
    }
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

    updateMinimap();

    try{
        if(player.x === "0"){
            bottom_left.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
        } else {
            if (map[player.y - 1][player.x - 1] === 1) {
                if (map_objects[player.y - 1][player.x - 1] === 1) {
                    bottom_left.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[player.y - 1][player.x - 1]) + 'deg);');
                } else {
                    bottom_left.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[player.y - 1][player.x - 1]) + 'deg);');
                }
            } else if (map_objects[player.y - 1][player.x - 1] === 1) {
                bottom_left.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
            } else {
                bottom_left.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
            }
        }
    } catch (e) {
        bottom_left.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(map[player.y-1][player.x] === 1){
            if(map_objects[player.y-1][player.x] === 1) {
                bottom_center.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.y-1][player.x]) +'deg);');
            } else {
                bottom_center.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[player.y-1][player.x]) + 'deg);');
            }
        } else if(map_objects[player.y-1][player.x] === 1){
            bottom_center.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
        } else {
            bottom_center.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
        }
    } catch (e) {
        bottom_center.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(player.x === "39"){
            bottom_right.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
        } else {
            if (map[player.y - 1][Number(player.x) + 1] === 1) {
                if (map_objects[player.y - 1][Number(player.x) + 1] === 1) {
                    bottom_right.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[player.y - 1][Number(player.x) + 1]) + 'deg);');
                } else {
                    bottom_right.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[player.y - 1][Number(player.x) + 1]) + 'deg);');
                }
            } else if (map_objects[player.y - 1][Number(player.x) + 1] === 1) {
                bottom_right.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
            } else {
                bottom_right.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
            }
        }
    } catch (e) {
        bottom_right.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(player.x === "0"){
            center_left.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
        } else {
            if(map[player.y][player.x-1] === 1){
                if(map_objects[player.y][player.x-1] === 1){
                    center_left.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.y][player.x-1]) +'deg);');
                } else {
                    center_left.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[player.y][player.x-1]) +'deg);');
                }
            } else if(map_objects[player.y][player.x-1] === 1){
                center_left.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
            } else {
                center_left.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
            }
        }
    } catch (e) {
        center_left.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(map[player.y][player.x] === 1){
            if(map_objects[player.y][player.x] === 1){
                center_center.setAttribute("style", 'background-image: url("assets/options/character_enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(player.direction) +'deg);');
            } else {
                center_center.setAttribute("style", 'background-image: url("assets/options/character_enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(player.direction) +'deg);');
            }
        } else if(map_objects[player.y][player.x] === 1){
            center_center.setAttribute("style", 'background-image: url("assets/options/character_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(player.direction) +'deg);');
        } else {
            center_center.setAttribute("style", 'background-image: url("assets/options/character.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(player.direction) +'deg);');
        }
    } catch (e) {
        center_center.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(player.x === "39"){
            center_right.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
        } else {
            if (map[player.y][Number(player.x) + 1] === 1) {
                if (map_objects[player.y][Number(player.x) + 1] === 1) {
                    center_right.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[player.y][Number(player.x) + 1]) + 'deg);');
                } else {
                    center_right.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[player.y][Number(player.x) + 1]) + 'deg);');
                }
            } else if (map_objects[player.y][Number(player.x) + 1] === 1) {
                center_right.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
            } else {
                center_right.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
            }
        }
    } catch (e) {
        center_right.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(player.x === "0"){
            top_left.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
        } else {
            if (map[Number(player.y) + 1][player.x - 1] === 1) {
                if (map_objects[Number(player.y) + 1][player.x - 1] === 1) {
                    top_left.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[Number(player.y) + 1][player.x - 1]) + 'deg);');
                } else {
                    top_left.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[Number(player.y) + 1][player.x - 1]) + 'deg);');
                }
            } else if (map_objects[Number(player.y) + 1][player.x - 1] === 1) {
                top_left.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
            } else {
                top_left.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
            }
        }
    } catch (e) {
        top_left.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(map[Number(player.y)+1][player.x] === 1){
            if(map_objects[Number(player.y)+1][player.x] === 1){
                top_center.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate('+ orientationFactor(map_direction[Number(player.y)+1][player.x]) +'deg);');
            } else {
                top_center.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[Number(player.y)+1][player.x]) + 'deg);');
            }
        } else if(map_objects[Number(player.y)+1][player.x] === 1){
            top_center.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
        } else {
            top_center.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
        }
    } catch (e) {
        top_center.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
    }

    try{
        if(player.x === "39"){
            top_right.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
        } else {
            if (map[Number(player.y) + 1][Number(player.x) + 1] === 1) {
                if (map_objects[Number(player.y) + 1][Number(player.x) + 1] === 1) {
                    top_right.setAttribute("style", 'background-image: url("assets/options/enemy_loot.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[Number(player.y) + 1][Number(player.x) + 1]) + 'deg);');
                } else {
                    top_right.setAttribute("style", 'background-image: url("assets/options/enemy.png");background-repeat: no-repeat;background-size: 101%;transform:rotate(' + orientationFactor(map_direction[Number(player.y) + 1][Number(player.x) + 1]) + 'deg);');
                }
            } else if (map_objects[Number(player.y) + 1][Number(player.x) + 1] === 1) {
                top_right.setAttribute("style", 'background-image: url("assets/options/loot.png");background-repeat: no-repeat;background-size: 101%;');
            } else {
                top_right.setAttribute("style", 'background-image: url("assets/options/nothing.png");background-repeat: no-repeat;background-size: 101%;');
            }
        }
    } catch (e) {
        top_right.setAttribute("style", 'background-image: url("assets/options/wallgif.gif");background-repeat: no-repeat;background-size: 101%;');
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
                showMessageConsole("Player deleted succesfully.");

                player = new Player();
                //document.getElementById("ambient).pause();
            }
        });
}

function fetchMovePlayer(direction){
    return fetch("http://battlearena.danielamo.info/api/move/b89f9719/" + player.id + "/" + direction)
        .then(function(response) {
            if(response.status === 200){
                player.move(direction);
                updateGameView();
            } else {
                showMessageConsole("You can't move there!");
            }
        });
}

function fetchAttack() {
    if(player.vp === 0){
        showMessageConsole("You are dead!");
        return;
    }
    return fetch("http://battlearena.danielamo.info/api/attack/b89f9719/" + player.id + "/" + player.direction)
        .then(function(response){
            if(response.status !== 200){
                showMessageConsole("You can't attack there!");
                return;
            }
            response.json().then(function (data) {
                showMessageConsole("HP taken: " + data);
                if(data === 0){
                    let audio = document.getElementById("missed");
                    audio.play();
                } else {
                    let audio = document.getElementById("attack_1");
                    audio.play();
                }
                //return data;
            })
        }).catch(function (err) {
            console.log("ERROR " + err);
        });
}

function fetchCraft() {
    if(player.vp === 0){
        showMessageConsole("You are dead!");
        return;
    }
    let formData = new FormData();
    let itemName = document.getElementById("craft_item_text").value;
    if(itemName.length === 0){
        showMessageConsole("You must name the item first!");
        return;
    }
    let damage = Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1); //String(Math.floor(Math.random() * (10 + 1)));
    let defense = Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1); //String(Math.floor(Math.random() * (10 + 1)));
    formData.append('name', itemName);
    formData.append('image', img_url);
    formData.append('attack', damage);
    formData.append('defense', defense);

    var xhr = new XMLHttpRequest();
    var params = 'name='+itemName+'&image='+img_url+'&attack='+damage+'&defense='+defense;
    xhr.open('POST', "http://battlearena.danielamo.info/api/craft/b89f9719/" + player.id, true);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {//Call a function when the state changes.
        if(xhr.status === 200) {
            showMessageConsole("The legendary " + itemName + " is now in your hands!");
            document.getElementById("equipment_name").innerHTML = itemName;
            document.getElementById("equipment_dmg_text").innerHTML = damage;
            document.getElementById("equipment_def_text").innerHTML = defense;
            document.getElementById("picture_equipment_rectangle").setAttribute("style", 'background-image: url("' + img_url + '");    background-repeat: no-repeat;    background-size: 100%;');         //document.getElementById("ambient").play();

            player.object = itemName;
        } else {
            showMessageConsole("You can't craft that item!");
        }
    };
    xhr.send(params);
}

let object_name = "";
let object_token = "";
let object_img = "";
let object_x = "";
let object_y = "";

function fetchObjectsPlayers() {
    return fetch("http://battlearena.danielamo.info/api/playersobjects/b89f9719/" + player.id)
        .then(function(response){
            if (response.status !== 200){
                return;
            }
            response.json().then(function (data) {
                try{
                    object_name = data.objects[0].name;
                    object_token = data.objects[0].token;
                    object_img = data.objects[0].image;
                    object_x = data.objects[0].x;
                    object_y = data.objects[0].y;

                    var xhr = new XMLHttpRequest();
                    var params = '';
                    xhr.open('GET', "http://battlearena.danielamo.info/api/pickup/b89f9719/" + player.id + "/" + object_token, true);

                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhr.onload = function() {//Call a function when the state changes.
                        if(xhr.status === 200) {
                            //ok
                            showMessageConsole("The legendary " + object_name + " is now in your hands!");
                            document.getElementById("equipment_name").innerHTML = object_name;
                            document.getElementById("equipment_dmg_text").innerHTML = String(Math.floor(Math.random() * (100 + 1)));
                            document.getElementById("equipment_def_text").innerHTML = String(Math.floor(Math.random() * (100 + 1)));
                            player.object = object_name;
                            items_collected_count = items_collected_count +1;
                            document.getElementById("items_collected_text").innerHTML = String(items_collected_count);
                        } else {
                            showMessageConsole("You can't have that item!");
                        }
                    };
                    xhr.send();


                    return null;
                } catch (e) {
                    return null;
                }

            });
        }).catch(function (err) {
            console.log("ERROR " + err);
        });
}

function fetchPickup() {
    if(player.vp === 0){
        showMessageConsole("You are dead!");
        return;
    }
    let object = null;
    fetchObjectsPlayers().then(function(loot) {
        if(loot === null){
            showMessageConsole("There ain't items nearby.");
        } else {
            //
        }
    });

    //if(object === null) return;

}

function fetchRespawn() {
    return fetch("http://battlearena.danielamo.info/api/respawn/b89f9719/" + player.id)
        .then(function(response) {
            if(response.status === 200){
                isAlreadyDead = false;
                showMessageConsole("Player respawned succesfully.");
            }
        });
}
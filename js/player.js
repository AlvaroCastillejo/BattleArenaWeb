class Player {
    constructor(id, code, name, x, y, d, attack, defense, vp, image, object) {
        this._id = id;
        this._code = code;
        this._name = name;
        this._x = x;
        this._y = y;
        this._direction = d;
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
    get code(){
        return this._code;
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
    get direction() {
        return this._direction;
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
    set code(value){
        this._code = value;
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
    set direction(value) {
        this._direction = value;
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

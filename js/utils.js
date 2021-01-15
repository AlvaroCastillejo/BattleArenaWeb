//Determines the factor for an image to be rotated depending on the orientation.
function orientationFactor(orientation){
    switch (orientation) {
        case "N":
            return 90;
        case "S":
            return -90;
        case "O":
            return 0;
        case "E":
            return 180;
    }
}

var dispatchForCode = function(event, callback) {
    var code;

    if (event.key !== undefined) {
        code = event.key;
    } else if (event.keyIdentifier !== undefined) {
        code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        code = event.keyCode;
    }

    callback(code);
};
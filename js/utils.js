function orientationFactor(orientation){
    switch (orientation) {
        case "N":
            return 90;
        case "S":
            return -90;
            break;
        case "W":
            return 0;
            break;
        case "E":
            return 180;
            break;
    }
}
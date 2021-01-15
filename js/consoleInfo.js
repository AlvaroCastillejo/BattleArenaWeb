let consoleInfo = document.getElementById("text_console");
consoleInfo.readOnly = true;
consoleInfo.scrollIntoView();

//Displays the message through the in-game console.
function showMessageConsole(msg) {
    let today = new Date();
    let dt = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let text = document.createTextNode("[" + dt + "] " + msg + "\n");
    consoleInfo.appendChild(text);
    consoleInfo.scrollTop = consoleInfo.scrollHeight;
}

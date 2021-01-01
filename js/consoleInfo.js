let consoleInfo = document.getElementById("text_console");
consoleInfo.readOnly = true;
consoleInfo.scrollIntoView();

function showMessageConsole(msg) {
    let today = new Date();
    let dt = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let text = document.createTextNode("[" + dt + "] " + msg + "\n");
    consoleInfo.appendChild(text);
    consoleInfo.scrollTop = consoleInfo.scrollHeight;
}

let helloButton = document.getElementById("hello");

helloButton.addEventListener(('click'), () => {
   document.getElementById("input").value = "world!";
});
var socket = io.connect("", {"forceNew": true}); //En esta variable se almacena el socket del cliente que se conecta (En el primer argumento se almacena la IP del cliente).

socket.on("mensajes", function(datos) { //El método "on" permite capturar eventos, se está capturando el evento con nombre "mensajes" (El cual representa un Array que llega desde el servidor), el segundo argumento es una función callback y su argumento representan los datos que llegaron (El Array).
    console.log(datos);
    renderizar(datos);
});

function renderizar(datos) { //Esta función inserta datos en el div con ID "mensajes".
    var html = datos.map(function(mensaje, indice) {
        return (`
            <div class="mensaje">
                <strong>${mensaje.nombre}</strong> dice:
                <p>${mensaje.texto}</p>
            </div>
        `);
    }).join(" ");

    document.getElementById("mensajes").innerHTML = html;
    document.getElementById("mensajes").scrollTop = document.getElementById("mensajes").scrollHeight; //Esta instrucción permite que el foco del chat siempre se quede abajo.
}

function addMensaje(e) {
    var mensaje = {
        nombre: document.getElementById("nombre").value,
        texto: document.getElementById("texto").value
    };

    document.getElementById("nombre").style.display = "none";
    socket.emit("add-mensaje", mensaje); //En esta instrucción se emite un evento con el mensaje (El evento debe ser capturado por el servidor).
    return false;
}
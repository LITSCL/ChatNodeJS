const socket = require('socket.io');

var app = require('./app.js'); //En esta constante se almacena toda la configuración del servidor.

var mensajes = [{ //Este Array está simulando una base de datos.
    id: 1,
    texto: "Bienvenido al chat privado de Socket.io y NodeJS",
    nombre: "BOT"
}];

var puerto = 2900;

var server = app.listen(puerto, function() {
    console.log(`Servidor levantado correctamente en el puerto ${puerto}`);
});

var io = socket(server);

io.on("connection", function(socket) { //El método "on" permite capturar eventos, dicho evento a capturar se debe colocar en el primer parámetro (Evento "connection" se ejecuta cuando un usuario se conecta al socket). El argumento de la función callback almacena variada información del usuario que se conecta al socket (Por ejemplo su dirección IP).
    console.log("El cliente con IP: " + socket.handshake.address + " se ha conectado");
    socket.emit("mensajes", mensajes); //El método "emit" permite enviar un evento (El nombre del evento se entrega en el primer argumento) y los datos del evento se colocan en el segundo argumento.

    socket.on("add-mensaje", function(datos) { //El método "on" permite capturar eventos, se está capturando el evento con nombre "add-mensaje" (El cual es enviado desde el cliente que se conectó al socket).
        mensajes.push(datos);

        io.sockets.emit("mensajes", mensajes); //En esta instrucción se envían los mensajes a todos los sockets que se encuentra conectados (Clientes).
    });

    socket.on("disconnect", datos => {
        console.log("Usuario desconectado");
    });
});
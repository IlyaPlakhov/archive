var express = require('express'); //подключаем библиотеку express
var app = express(); //вызываем библиотеку express
var server = require('http').createServer(app); //Создаем сервер с помощью express
var io = require('socket.io')(server); //подключаю библиотеку socket.io

app.use(express.static(__dirname)); //подключаем папку сервера
server.listen(3000); //Задаем порт сервера

app.get('/', function(Server, Client){
    Server.redirect(__dirname + "/index.html");
}); //Блок кода для отображения стартовой HTML страницы

app.get('/home', function(req, res){
    res.sendFile(__dirname + '/site.html');
  }); //Блок кода для подключеной побочной HTML страницы

connections = []; // массив, который содержит всех пользователей сайта

io.sockets.on('connection', function(socket) { //Блок с запросом подключения юзера. Является родительским блоком запросов
	connections.push(socket); //добавление юзера в массив
        console.log("Юзер зашел на сайт"); //вывод сообщения в консоль терминала при подключении юзера к сайту

socket.on('disconnect', function(data) { //Блок с запросом к отключению юзера. Является дочерним блоком запросов
  	connections.splice(connections.indexOf(socket), 1); //удаление юзера из массива
        console.log("Юзер вышел из сайт"); //вывод сообщения в консоль терминала при отключении юзера к сайту
    });

    //ниже данного комментария вставляем дочерние блоки запросов

socket.on("otprevkaTexta", function(text){ //блок с запросом и передачей текста
        console.log(text); //вывод введенного текста в терминал сервера
            var text2 = "Ваше имя: " + text; //добавление "Ваше имя: " к ранее введенному тексту
                socket.emit("otvet", text2) //отправка ответа на клиент с модифицированным текстом
    });
    
});
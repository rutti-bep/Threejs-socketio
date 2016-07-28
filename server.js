var io = require( 'socket.io' )(3000); // Socket.IOモジュール読み込み
console.log("Server Running!!");

var character = {};


io.on('connection',function (socket){
	
	socket.on("inroom",function(data){
		setTimeout(function(){
		character[socket.id] = data.playerPos;
		io.emit("inroom_res",{character:character});
		},10)
		console.log("res");
	});

	socket.on("characterPosUpdate",function(data,id){
		character[socket.id] = data.playerPos;		 
	})
	
	socket.on("disconnect",function(){
		delete character[socket.io];			
	})
})


setInterval(function() {		
						io.emit("update",{character:character});
},1000/30);

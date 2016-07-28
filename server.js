var io = require( 'socket.io' )(3000); // Socket.IOモジュール読み込み
console.log("Server Running!!");

var player = {
	pos:{x:0,y:0,z:0},
	size:{x:10,y:10,z:10},
	jump:{flag:false,speed:0}
}

io.on('connection',function (socket){
	
	socket.on("update",function(data){
					io.emit("update_res",{player:player});
	})
	
	socket.on("playerPosUpdate",function(data){
					//player.pos.x = data.player.pos.x;		
					//player.pos.y = data.player.pos.y;		
					//player.pos.z = data.player.pos.z; 
					player = data.player;
	})
	
	socket.on("disconnect",function(){
					io.emit("send",{value:"disconnect"});
	})
})

window.onload = function() {
		var canvasWidth = 600, canvasHeight = 400;// canvasのサイズを指定
		var scene = new THREE.Scene();
		
		// シーンの作成
		var arrows = {
			righ:false,
			left:false,
			up:false,
			down:false
		};

		// カメラの作成
		var camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 1, 1000);
		camera.position.set(30, 40, 80);

		// ライトの作成
		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(0, 100, 30);
		scene.add(light);

		// 画面表示の設定
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(canvasWidth, canvasHeight);
		document.body.appendChild(renderer.domElement);
		renderer.render(scene, camera);


		 var ioSocket = io.connect( "http://localhost:3000" );
	

		setInterval(function(){
				player.move();
				renderer.render(scene, camera);
				for (key in anotherPlayer){
						anotherPlayer[key].Update();
				}
		},1000/30)
		
class Character {
		constructor(name)	{
				this.name = name;
				this.pos = {x:0,y:0,z:0};
				this.size = {x:10,y:10,z:10};
				this.jumpFlag = false;
				this.jumpSpeed = 0;
				this.color = "#ffffff"
				this.boxGeometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
				this.boxMaterial = new THREE.MeshLambertMaterial({ color: this.color});
				this.boxMesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial);
				scene.add(this.boxMesh);
		}
		
		Update(){
			this.boxMesh.position.set(this.pos.x,this.pos.y,this.pos.z);
		}
}

class Player extends Character {

		move(){
			if(arrows.up) { this.pos.z -= 1;}	
			if(arrows.down){ this.pos.z += 1;}
			if(arrows.left){ this.pos.x -= 1;}
			if(arrows.right){ this.pos.x += 1;}
			if(this.jumpFlag){
				if(this.pos.y === 0){
					this.pos.y += 50;
					this.jumpSpeed = 0;
				}
				if(this.pos.y > 0){
					this.jumpSpeed += 0.1;
					this.pos.y -= this.jumpSpeed*this.jumpSpeed;
				}else{
					this.jumpFlag = false;
					this.pos.y = 0;		
					ioSocket.emit("characterPosUpdate",{playerPos:this.pos});
				}
			}
			if(arrows.up || arrows.down || arrows.left || arrows.right || this.jumpFlag){
					ioSocket.emit("characterPosUpdate",{playerPos:this.pos});
			}
		}

}
			var player = new Player("player");
			var anotherPlayer = {};	
			
		 	ioSocket.on("inroom_res",function(data){
						console.log(anotherPlayer);
			});	
			ioSocket.emit("inroom",{playerPos:player.pos});

			ioSocket.on("update",function(data){
						if(Object.keys(data.character).length !== Object.keys(anotherPlayer).length){
							scene = new THREE.Scene();
							camera.position.set(30, 40, 80);
							light.position.set(0, 100, 30);
							scene.add(light);
							anotherPlayer = {}; 
							for (key in data.character){
									anotherPlayer[key] = new Character(data.id);
							}
						}
							for (key in data.character){
									anotherPlayer[key].pos = data.character[key];
							}
			});	

		document.body.addEventListener('keydown',function (event){
			switch(event.keyCode){
				case 32 :
				player.jumpFlag = true;
				break
				case 38 : //UP
				arrows.up = true;
				break;
				case 40 : //DOWN
				arrows.down = true;
				break;
				case 37 : //LEFT
				arrows.left = true;
				break;
				case 39 : //RIGHT
				arrows.right = true;
				break;
			}
			//console.log();
		})

		document.body.addEventListener('keyup',function (event){
			// console.log(event.keyCode);
			switch(event.keyCode){
				case 38 : //UP
				arrows.up = false;
				break;
				case 40 : //DOWN
				arrows.down = false;
				break;
				case 37 : //LEFT
				arrows.left = false;
				break;
				case 39 : //RIGHT
				arrows.right = false;
				break;
			}
		})
}

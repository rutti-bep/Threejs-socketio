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

		var player = {
				pos:{x:0,y:0,z:0},
				size:{x:10,y:10,z:10},
				jump:{flag:false,speed:0}
		};

		// 箱の作成
		var boxGeometry = new THREE.BoxGeometry(player.size.x, player.size.y, player.size.z);
		var boxMaterial = new THREE.MeshLambertMaterial({ color: '#E74C3C'});
		boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
		boxMesh.position.set(player.pos.x,player.pos.y,player.pos.z);
		scene.add(boxMesh);
		console.dir(boxMesh);
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
				playerupdate();
				renderer.render(scene, camera);
				connect();
		},1000/30)
		
		function playerupdate(){
			if(arrows.up) { player.pos.z -= 1;}	
			if(arrows.down){ player.pos.z += 1;}
			if(arrows.left){ player.pos.x -= 1;}
			if(arrows.right){ player.pos.x += 1;}
			if(player.pos.y > 0){
					player.jump.speed += 0.1;
					player.pos.y -= player.jump.speed*player.jump.speed;
			}else{
					player.jump.flag = false;
					player.pos.y = 0;		
			}
			if(arrows.up || arrows.down || arrows.left || arrows.right){
					ioSocket.emit("playerPosUpdate",{player:player});
			}
			boxMesh.position.set(player.pos.x,player.pos.y,player.pos.z);
		}

		function Jump(){
			player.pos.y += 50;
			player.jump.speed = 0;
			boxMesh.position.set(player.pos.x,player.pos.y,player.pos.z);
		}

		function connect(){
					ioSocket.emit("update",{value:"update"});

					ioSocket.on("update_res",function(data){
							player = data.player;
					});
		}

		document.body.addEventListener('keydown',function (event){
			switch(event.keyCode){
				case 32 :
				if(player.pos.y <= 0){
					Jump();
				}
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

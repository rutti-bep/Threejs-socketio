window.onload = function() {
		// canvasのサイズを指定
		var canvasWidth = 600, canvasHeight = 400;
		// シーンの作成
		var scene = new THREE.Scene();
		var arrows = {
			righ:false,
			left:false,
			up:false,
			down:false
		};

		var player_pos = {
				x:0,
				y:0,
				z:0,
				size:{x:10,y:10,z:10}
		};

		// 箱の作成
		var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
		var boxMaterial = new THREE.MeshLambertMaterial({ color: '#E74C3C'});
		boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
		boxMesh.position.set(player_pos.x,player_pos.y,player_pos.z);
		scene.add(boxMesh);

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

		/*function playerupdate(){
			if(arrows.up && player_pos.y > 0) { player_pos.y -= 10; }
			if(arrows.right && player_pos.x+player_pos.size.x < window_size[0]) { player_pos.x += 10; }
			if(arrows.left && player_pos.x > 0) { player_pos.x -= 10; }
			if(arrows.down && player_pos.y+player_pos.size.y < window_size[1]) { player_pos.y += 10; }
			
			if(player_pos.x >= window_size[0]){
				player_pos.x -= window_size[0];
			}
			if(player_pos.x < 0){
				player_pos.x += window_size[0];
			}
			if(player_pos.y >= window_size[1]){
				player_pos.y -= window_size[1];
			}
			if(player_pos.y < 0){
				player_pos.y += window_size[1];
			}
			
		}*/

		document.body.addEventListener('keydown',function (event){
			// console.log(event.keyCode);
			switch(event.keyCode){
				case 38 : //UP
				arrows.up = true;
				player_pos.y += 10;
				break;
				case 40 : //DOWN
				arrows.down = true;
				player_pos.y -= 10;
				break;
				case 37 : //LEFT
				arrows.left = true;
				player_pos.x -= 10;
				break;
				case 39 : //RIGHT
				arrows.right = true;
				player_pos.x += 10;
				break;
			}
			boxMesh.position.set(player_pos.x,player_pos.y,player_pos.z);
			renderer.render(scene, camera);
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
};

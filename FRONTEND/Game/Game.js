import * as THREE from 'three';
import { io } from 'socket.io-client'

import Camera from './Camera/Camera'
import World from './World/World';
import Player from './Player/Player';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let intersects;
let mousedown = false;

const scene = new THREE.Scene();
const camera = new Camera();
const clock = new THREE.Clock();
let dt = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

camera.initialize()

let player;
let world = new World(scene);

const socket = io('http://localhost:3069')

socket.on('connect', () => {
	console.log("Connected to server!")
})


socket.on('worldData', (worldData) => {

	console.log('World data received!', worldData)

	loadWorld(worldData);

})

async function getWorldData() {

	const url = "https://worldgenerator-hwqyt4hhfq-lz.a.run.app";

	console.log("Fetching data from: " + url)

	try {

		const response = await fetch(url, {
			mode: 'no-cors'
		});

		console.log(response)

		if (!response.ok) {
		  throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		console.log(json);

	  } catch (error) {

		console.log("Error getting world: " + error.message)

	  }

}

function loadWorld(worldData) {

	world.load(worldData);

	player = new Player(scene, world.entryPos.x, world.entryPos.y);

	console.log(world, player)

}

function animate() {

	if (player != undefined) {

		if (player.movement.jump == true) {

			player.jump(dt)
	
		}
	
		if (player.movement.left == true) {
	
			player.moveLeft(dt)
	
		}
	
		if (player.movement.right == true) {
	
			player.moveRight(dt)
	
		}
	
		if (player.movement.down == true) {
	
			player.moveDown(dt)
	
		}
		
	
		if (mousedown === true && player.mouseAction === "Punch") {
	
			player.punch(intersects);
	
		}
	
		if (mousedown === true && player.mouseAction === "Build") {
	
			player.build(intersects);
	
		}
	
		if (mousedown === true && player.mouseAction === "Plant") {
	
			player.plant(intersects);
	
		}
	
		if (mousedown === true && player.mouseAction === "Settings") {
	
			player.settings(intersects);
	
		}

		camera.update(player.position.x, player.position.y)
	
		player.update(dt);

	}

	requestAnimationFrame( animate );

	dt = clock.getDelta();

	raycaster.setFromCamera( pointer, camera.cameraObject );
	intersects = raycaster.intersectObjects( scene.children );

	renderer.render( scene, camera.cameraObject );
}

document.addEventListener("keydown", (e) => {

	let key = e.key.toUpperCase();

	if (key === 'W') {

		player.movement.jump = true;

	}

	if (key === 'A') {

		player.movement.left = true;

	}

	if (key === 'S') {

		player.movement.down = true;

	}

	if (key === 'D') {

		player.movement.right = true;

	}

	if (key === 'P') {

		player.mouseAction = "Punch"

	}

	if (key === 'B') {

		player.mouseAction = "Build"

	}

})

document.addEventListener("keyup", (e) => {

	let key = e.key.toUpperCase();

	if (key === 'W') {

		player.movement.jump = false;

	}

	if (key === 'A') {

		player.movement.left = false;

	}

	if (key === 'S') {

		player.movement.down = false;

	}

	if (key === 'D') {

		player.movement.right = false;

	}

	if (key === 'L') {

		console.log('Requesting world data...', window.location.href.toString())

		let localURL = new URL("http://localhost:3069")

		if (window.location.href == localURL) {
			socket.emit("getworld")
		} else {
			getWorldData()
		}

	}

	if(key === 'O') {

		player.spawn();
		
	}

})

window.addEventListener( 'pointermove', (e) => {

	pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

});

document.addEventListener("pointerdown", () => {
	
	mousedown = true;

})

document.addEventListener("pointerup", () => {
	
	mousedown = false;

})

document.addEventListener("pointerleave", () => {
	
	mousedown = false;

})

function loadGameWorld() {

	animate();

	document.body.appendChild( renderer.domElement );

}

export { world, loadGameWorld }
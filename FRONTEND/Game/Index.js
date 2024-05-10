import * as THREE from 'three';

import Camera from '../Game/Camera/Camera'
import World from './World/World';
import Player from './Player/Player';

const scene = new THREE.Scene();
const camera = new Camera();
const clock = new THREE.Clock();
let dt = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

function animate() {

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

	requestAnimationFrame( animate );

	camera.update(0, 0)

	dt = clock.getDelta();

	renderer.render( scene, camera.cameraObject );
}

document.body.appendChild( renderer.domElement );

let world = new World();
world.load(scene);

let player = new Player();
scene.add(player.spawn());

camera.initialize()
animate();



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

})
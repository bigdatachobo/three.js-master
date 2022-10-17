import * as THREE from "../../build/three.module.js";
import { OrbitControls } from "../../examples/jsm/controls/OrbitControls.js";

class App {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer;

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer;

		const scene = new THREE.Scene();
		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();
		this._setupControls();

		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupControls() {
		new OrbitControls(this._camera, this._divContainer);
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.z = 15;
		this._camera = camera;
	}

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	_setupModel() {
		class CustomSinCurve extends THREE.Curve {
			constructor(scale) {
				super();
				this.scale = scale;
			}
			getPoint(t) {
				const tx = t * 3 - 1.5;
				const ty = Math.sin(2 * Math.PI * t);
				const tz = 0;
				return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
			}
		}

		const path = new CustomSinCurve(4);
		const geometry = new THREE.TubeGeometry(path, 40, 0.8, 8, true);

		const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
		const cube = new THREE.Mesh(geometry, fillMaterial);

		const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
		const line = new THREE.LineSegments(
			new THREE.WireframeGeometry(geometry),
			lineMaterial
		);

		const group = new THREE.Group();
		group.add(cube);
		group.add(line);

		this._scene.add(group);
		this._cube = group;
	}

	// _setupModel() {
	// 	const shape = new THREE.Shape();
	// 	shape.moveTo(1, 1);
	// 	shape.lineTo(1, -1);
	// 	shape.lineTo(-1, -1);
	// 	shape.lineTo(-1, 1);
	// 	shape.closePath();

	// 	const geometry = new THREE.BufferGeometry();
	// 	const points = shape.getPoints();
	// 	geometry.setFromPoints(points);

	// 	const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
	// 	const line = new THREE.Line(geometry, material);

	// 	this._scene.add(line);
	// }

	// _setupModel() {
	// 	class CustomSinCurve extends THREE.Curve {
	// 		constructor(scale) {
	// 			super();
	// 			this.scale = scale;
	// 		}
	// 		getPoint(t) {
	// 			const tx = t * 3 - 1.5;
	// 			const ty = Math.sin(2 * Math.PI * t);
	// 			const tz = 0;
	// 			return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
	// 		}
	// 	}

	// 	const path = new CustomSinCurve(4);

	// 	const geometry = new THREE.BufferGeometry();
	// 	const points = path.getPoints(30);
	// 	geometry.setFromPoints(points);

	// 	const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
	// 	const line = new THREE.Line(geometry, material);

	// 	this._scene.add(line);
	// }

	resize() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time) {
		time *= 0.001; // secondunit
		// this._cube.rotation.x = time;
		// this._cube.rotation.y = time;
		// this._cube.rotation.z = time;
	}
}

window.onload = function () {
	new App();
};

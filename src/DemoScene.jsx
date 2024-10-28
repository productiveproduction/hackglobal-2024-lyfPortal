import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import GUI from 'lil-gui';
import React, { useEffect, useRef, useState } from 'react';


let globalGUI= null;

export default function DemoScene(props) {
	let { scene, gl: renderer, camera } = useThree();
	
	let [gui, setGUI] = useState(globalGUI);
	let [autoRotate, setAutoRotate] = useState(true);
	let controlsRef = useRef(null);

	useEffect(() => {
		globalGUI?.destroy();

		globalGUI = new GUI({
			container: renderer.domElement.parentElement,
		});
		globalGUI.close();
		globalGUI.hide();
		globalGUI.domElement.style.position = 'absolute';
		globalGUI.domElement.style.top = '0';
		globalGUI.domElement.style.right = '0';
		globalGUI.domElement.style.zIndex = '1000';
		globalGUI.domElement.addEventListener('pointerdown', (e) => {
			e.stopPropagation();
		});

		let pixelRatioProxy = {
			get pixelRatio() {
				return renderer.getPixelRatio()
			},
			set pixelRatio(value) {
				renderer.setPixelRatio(value);

				// update url parameter
				let url = new URL(window.location.href);
				url.searchParams.set('pixelRatio', value.toString());
				window.history.replaceState({}, '', url.href);
			}
		}
		// initial pixel ratio from url parameter if available
		const url = new URL(window.location.href);
		let pixelRatioParam = url.searchParams.get('pixelRatio');
		if (pixelRatioParam != null) {
			pixelRatioProxy.pixelRatio = parseFloat(pixelRatioParam);
		}
		
		globalGUI.add(pixelRatioProxy, 'pixelRatio', 0.5, window.devicePixelRatio, 0.25).name('Pixel Ratio');

		setGUI(globalGUI);

		let demoProps = {
			renderer,
			scene,
			camera,
			controls: controlsRef.current,
			gui: globalGUI,
		}

		if (props.demoBasicFn) {
			let demoDispose = props.demoBasicFn(demoProps)?.dispose;

			return () => {
				// call .dispose() on all objects in the scene
				scene.traverse((obj) => {
					(obj).dispose?.();
				});

				demoDispose?.();

				renderer.dispose();

				globalGUI?.destroy();
				globalGUI = null;
			}
		}
	}, []);

	return <>
		<PerspectiveCamera />
		<OrbitControls
			ref={controlsRef}
			autoRotate={autoRotate}
			autoRotateSpeed={0.5}
			enableDamping={true}
			// disable auto rotation when user interacts
			onStart={() => { setAutoRotate(false) }}
			makeDefault
		/>
	</>
}
import { AdaptiveDpr } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { CineonToneMapping } from 'three';
import { Landing } from './Landing';
import { IonSearchbar } from '@ionic/react';
import IonFlyingModal from './IonFlyingModal';
import DemoScene from './DemoScene';
import './App.css';
import Google3DTiles from './Google3DTiles';
import PlaceSidebar from './sidebar/PlaceSidebar';


const demos = {
	basic: {
		"transmission": Landing,
	}
}

export default function App() {
	const modalRef = useRef();
	const demoKeys = Object.keys(demos.basic);

	const [demoKey, setDemoKey] = useState(() => {
		// get url parameter
		const url = new URL(window.location.href);
		let demoParam = url.hash.replace(/^#/, '');
		let demoExists = demoParam != null && demoKeys.includes(demoParam);
		return demoExists ? demoParam : demoKeys[0];
	});
	
	const demoBasicFn = demoKey != null ? demos.basic[demoKey] : null;
	const hasDemo = demoBasicFn != null;

	useEffect(() => {
		function toggleSearch(e) {
			// enter key to show search
			if (e.key === 'Enter') {
				modalRef.current?.present({animate: true});
			}
			// escape key to dismiss search
			if (e.key === 'Escape') {
				modalRef.current?.destroy({animate: true});
			}
		}

		window.addEventListener('keydown', toggleSearch);

		return () => {
			window.removeEventListener('keydown', toggleGUI);
		}
	}, [])

	return <>
		{hasDemo && <Canvas
			className='demo-canvas'
			gl={{
				antialias: false,
				toneMapping: CineonToneMapping,
			}}
			key={demoKey}
			onPointerDown={(e) => {
				// prevent text selection
				e.preventDefault();
			}}
		>
			<AdaptiveDpr pixelated />
			<DemoScene key={demoKey} demoBasicFn={demoBasicFn} />
		</Canvas>}
		<main className="main-container">
			<Google3DTiles/>
			<PlaceSidebar/>
		</main>

		<div className='test'>
			<div className='top-bar'>
				<IonSearchbar 
					placeholder="Where to?" 
					class="custom" 
					onIonFocus={() => {
						modalRef.current?.present({animate: true})
					}}
				/>
			</div>
			<IonFlyingModal innerRef={modalRef} panelKey="modal"/>
		</div>
	</>
}
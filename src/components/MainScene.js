import treeLineImg from '../img/tree-line.png';
import Moon from './Moon';
//import { useState } from 'react';
import calculatePhase from '../utils/phaseCalculator';
import useWindowSize from '../utils/useWindowSize';
import useScrollHeight from '../utils/useScrollHeight';
import '../css/MainScene.css';
import { getPhaseName } from '../utils/getPhaseName';
import { useState, useEffect } from 'react';

function parseDate(display) {
	const addZero = (num) => (num < 10 ? `0${num}` : `${num}`);
	return `${addZero(display.day)}.${addZero(display.month)}`;
}

export default function MainScene({ displayData }) {
	let windowSize = useWindowSize();
	let scrollPosition = useScrollHeight();
	let initialDate = new Date();

	const [display, setDisplay] = useState({
		phase: calculatePhase(initialDate),
		day: initialDate.getDate(),
		month: initialDate.getMonth(),
	});
	function getMoonSize({ width, height }) {
		return Math.floor(width > height ? height * 0.5 : width * 0.5);
	}

	function getTranslateY(scrollPosition, ratio) {
		if (scrollPosition) return `translateY(${scrollPosition / ratio}px)`;
		return '';
	}

	useEffect(() => {
		if (displayData) setDisplay(displayData);
	}, [displayData]);

	return (
		<>
			<div className='scene-container'>
				{
					<h1 className={scrollPosition ? 'opacity-0' : ''}>
						<span>{parseDate(display)}</span>
						<span>{getPhaseName(display.phase)}</span>
					</h1>
				}
				<div
					className='stars-bg'
					style={{ transform: `${getTranslateY(scrollPosition, 5)}` }}></div>
				<Moon
					phase={display.phase}
					moonSize={getMoonSize(windowSize)}
					scrollTranslate={getTranslateY(
						scrollPosition,
						getMoonSize(windowSize) / 100
					)}
				/>

				<div className='tree-line'>
					<img src={treeLineImg} alt='tree-line' />
				</div>
			</div>
			<div className='scene-seam-patch'></div>
		</>
	);
}

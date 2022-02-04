import treeLineImg from '../img/tree-line-trim.png';
import Moon from './Moon';
import useWindowSize from '../utils/useWindowSize';
import useScrollHeight from '../utils/useScrollHeight';
import '../css/MainScene.css';
import { getPhaseName } from '../utils/getPhaseName';
import arrowImg from '../img/arrow.svg';

function parseDate(day, month) {
	const addZero = (num) => (num < 10 ? `0${num}` : `${num}`);
	return `${addZero(day)}.${addZero(month + 1)}`;
}

export default function MainScene({
	getDate,
	getMonth,
	getPhase,
	incrementDay,
}) {
	let windowSize = useWindowSize();
	let scrollPosition = useScrollHeight();

	function getMoonSize({ width, height }) {
		return Math.floor(width > height ? height * 0.5 : width * 0.5);
	}

	function getTranslateY(scrollPosition, ratio) {
		if (scrollPosition) return `translateY(${scrollPosition / ratio}px)`;
		return '';
	}

	function isVisible() {
		return scrollPosition ? 'opacity-0' : '';
	}

	return (
		<>
			<div className='scene-container'>
				{
					<h1 className={isVisible()}>
						<span>{parseDate(getDate(), getMonth())}</span>
						<span>{getPhaseName(getPhase())}</span>
					</h1>
				}
				<div
					className='stars-bg'
					style={{ transform: `${getTranslateY(scrollPosition, 5)}` }}></div>
				<div className='moon-container'>
					<img
						src={arrowImg}
						className={`arrow ${isVisible()}`}
						alt='arrow-left'
						onClick={() => incrementDay(false)}
					/>
					<Moon
						phase={getPhase()}
						moonSize={getMoonSize(windowSize)}
						scrollTranslate={getTranslateY(
							scrollPosition,
							getMoonSize(windowSize) / 100
						)}
					/>
					<img
						src={arrowImg}
						className={`arrow a-right ${isVisible()}`}
						alt='arrow-left'
						onClick={() => incrementDay(true)}
					/>
				</div>

				<div className='tree-line'>
					<img src={treeLineImg} alt='tree-line' />
				</div>
			</div>
			<div className='scene-seam-patch'></div>
		</>
	);
}

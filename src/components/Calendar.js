import '../css/Calendar.css';
import { useEffect, useRef, useState } from 'react';
import calculatePhase from '../utils/phaseCalculator';
import Moon from './Moon';
import useWindowSize from '../utils/useWindowSize';
import { getPhaseName } from '../utils/getPhaseName';

const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

function getMoonSize({ width, height }) {
	return Math.floor(width > height ? height * 0.05 : width * 0.06);
}

function roundWrap(number, decimalPrecision) {
	let multiplier = Math.pow(10, decimalPrecision);
	return Math.floor(number * multiplier) / multiplier;
}

function getMonthArray(year, month) {
	let monthArray = [new Date(year, month, 1)];
	let firstDay = monthArray[0].getDay();
	while (1) {
		let day = new Date(year, month, monthArray.length + 1);
		let condition = day.getMonth() === monthArray[0].getMonth();
		if (!condition || monthArray.length > 31) break;
		monthArray.push(day);
	}
	if (firstDay !== 1) {
		for (let i = 1; i < firstDay; i++) {
			monthArray.unshift(0);
		}
	}
	return monthArray;
}

function parsePhaseName(phase) {
	let phaseName = getPhaseName(phase).split(' ');
	return phaseName.map((w, i) => <span key={i}>{w}</span>);
}

export default function Calendar({ setDisplay }) {
	const actPhase = calculatePhase(new Date());
	const calendarRef = useRef(null);
	const [refPhase, setRefPhase] = useState(actPhase);
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(null);
	const [mArray, setMArray] = useState([]);

	let size = useWindowSize();

	function handleDatePick(phase, day) {
		let month = mArray[7].getMonth();
		setDisplay({ day, month, phase });
		setRefPhase(phase);
	}

	function isToday(phase) {
		let isEqual = phase === actPhase;
		return isEqual ? ' today' : '';
	}

	function isFocus(phase) {
		return phase === refPhase ? ' focus' : '';
	}

	useEffect(() => {
		let newDate = new Date();
		let newMonth = newDate.getMonth();
		let newYear = newDate.getFullYear();
		setMonth(newMonth);
		setYear(newYear);
		setMArray(getMonthArray(newYear, newMonth));
	}, []);

	useEffect(() => {
		if (month !== null && year !== null) setMArray(getMonthArray(year, month));
	}, [month, year]);

	return (
		<div ref={calendarRef} className='calendar-container'>
			<div className='calendar'>
				<div className='header'>
					<h2>{mArray.length && mArray[7].getFullYear()}</h2>
				</div>
				<div className='month-header'>
					<div
						className='month-button left-btn'
						onClick={() => setMonth(month - 1)}>
						&#10094;
					</div>
					<h2>{mArray.length && MONTH_NAMES[mArray[7].getMonth()]}</h2>
					<div
						className='month-button right-btn'
						onClick={() => setMonth(month + 1)}>
						&#10095;
					</div>
				</div>
				<div className='calendar-entries'>
					{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
						<div className='day-label' key={`${day}`}>
							{day}
						</div>
					))}
					{mArray.map((date, index) => {
						if (date) {
							let phase = calculatePhase(date);
							return (
								<div
									className={'calendar-entry' + isToday(phase) + isFocus(phase)}
									key={index}
									onClick={() => handleDatePick(phase, date.getDate())}>
									<div className='entry-top'>
										<span className='entry-date'>{date.getDate()}</span>
										<Moon phase={phase} moonSize={getMoonSize(size)} />
									</div>
									{size.width > 460 && (
										<div className='entry-details'>
											<span className='phase-name'>
												{parsePhaseName(phase)}
											</span>
											<span className='phase-name'>Moon age: </span>
											<span className='phase-name'>
												<span>{roundWrap(phase * 29.5, 1)} days</span>
												<span>({roundWrap(phase * 100, 1)}%)</span>
											</span>
										</div>
									)}
								</div>
							);
						} else {
							return <div className='calendar-entry empty' key={index}></div>;
						}
					})}
				</div>
				<div className='date-info'>
					<span className='phase-name'>{getPhaseName(refPhase)}</span>
					<span className='phase-name'>Moon age: </span>
					<span className='phase-name'>
						{roundWrap(refPhase * 29.5, 1)} days ({roundWrap(refPhase * 100, 1)}
						%)
					</span>
				</div>
			</div>
		</div>
	);
}

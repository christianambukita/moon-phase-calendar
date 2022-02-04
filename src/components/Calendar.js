import '../css/Calendar.css';
import { useEffect, useRef, useState } from 'react';
import calculatePhase from '../utils/phaseCalculator';
import Moon from './Moon';
import useWindowSize from '../utils/useWindowSize';
import { getPhaseName } from '../utils/getPhaseName';
import getMonthArray from '../utils/getMonthArray';

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

function parsePhaseName(phase) {
	let phaseName = getPhaseName(phase).split(' ');
	return phaseName.map((w, i) => <span key={i}>{w}</span>);
}

function getExtraDaysIndexes(mArray) {
	const prev = mArray.filter((date) => date === undefined).map((x, i) => i);
	const nextDaysCount = 7 - (mArray.length % 7);
	const next = new Array(nextDaysCount).fill().map((x, i) => i + mArray.length);
	return [prev, next];
}

function getCalendarArray(mArray, month, year) {
	let [prevDays, nextDays] = getExtraDaysIndexes(mArray);
	const actMonth = mArray.filter((day) => day);
	const prevMonth = getMonthArray(year, month - 1).filter((day) => day);
	const nextMonth = getMonthArray(year, month + 1).filter((day) => day);
	prevDays = prevDays.map(
		(dayIndx) => prevMonth[prevMonth.length - prevDays.length + dayIndx]
	);
	nextDays = nextDays.map((x, i) => nextMonth[i]);
	return [...prevDays, ...actMonth, ...nextDays];
}

export default function Calendar({
	mArray,
	getYear,
	setDate,
	getMonth,
	dayIterator,
	caleldarMonth,
	setCalMonth,
	getPhase,
}) {
	const actPhase = calculatePhase(new Date());
	const calendarRef = useRef(null);
	const initYear = getYear();
	const [calendarArray, setCalArray] = useState(
		getCalendarArray(mArray, caleldarMonth, initYear)
	);
	const [extraDays, setExtraDays] = useState([
		...getExtraDaysIndexes(mArray)[0],
		...getExtraDaysIndexes(mArray)[1],
	]);

	let size = useWindowSize();

	function handleDatePick(dayIndex) {
		if (!extraDays.includes(dayIndex)) setDate(dayIndex, caleldarMonth);
	}

	function incrementMonth(increment) {
		const newMonth = caleldarMonth + (increment ? 1 : -1);

		setCalMonth(newMonth);
	}

	function getCalendarStyle(index, phase) {
		const isToday = phase === actPhase ? ' today' : '';

		const sameIndex = index === dayIterator;
		const sameMonth = caleldarMonth === getMonth();
		const isFocus = sameIndex && sameMonth ? ' focus' : '';

		const isExtra = extraDays.includes(index) ? ' extra' : '';

		return isToday + isFocus + isExtra;
	}

	useEffect(() => {
		const newMonthArray = getMonthArray(initYear, caleldarMonth);
		setCalArray(getCalendarArray(newMonthArray, caleldarMonth, initYear));
		const _extraDays = getExtraDaysIndexes(newMonthArray);
		setExtraDays([..._extraDays[0], ..._extraDays[1]]);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [caleldarMonth]);

	return (
		<div ref={calendarRef} className='calendar-container'>
			<div className='calendar'>
				<div className='header'>
					<h2>{getYear(calendarArray)}</h2>
				</div>
				<div className='month-header'>
					<div
						className='month-button left-btn'
						onClick={() => incrementMonth(false)}>
						&#10094;
					</div>
					<h2>{MONTH_NAMES[getMonth(calendarArray)]}</h2>
					<div
						className='month-button right-btn'
						onClick={() => incrementMonth(true)}>
						&#10095;
					</div>
				</div>
				<div className='calendar-entries'>
					{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
						<div className='day-label' key={`${day}`}>
							{day}
						</div>
					))}
					{calendarArray.map((date, index) => {
						if (date) {
							let phase = calculatePhase(date);
							return (
								<div
									className={'calendar-entry' + getCalendarStyle(index, phase)}
									key={index}
									onClick={() => handleDatePick(index)}>
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
					<span className='phase-name'>{getPhaseName(getPhase())}</span>
					<span className='phase-name'>Moon age: </span>
					<span className='phase-name'>
						{roundWrap(getPhase() * 29.5, 1)} days (
						{roundWrap(getPhase() * 100, 1)}
						%)
					</span>
				</div>
			</div>
		</div>
	);
}

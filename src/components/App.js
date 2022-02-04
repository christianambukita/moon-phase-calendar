import { useState } from 'react';
import '../css/App.css';
import getMonthArray from '../utils/getMonthArray';
import calculatePhase from '../utils/phaseCalculator';
import Calendar from './Calendar';
import MainScene from './MainScene';

function getFilteredMonthArray(mArray) {
	const filtered = mArray.filter((date) => date);
	return filtered;
}

// function getMonthLength(mArray) {
// 	return getFilteredMonthArray(mArray).length;
// }

function getFirstDayIndex(mArray) {
	let firstDay = undefined;

	mArray.forEach((date, i) => {
		if (date?.getDate() === 1) firstDay = i;
	});
	return firstDay;
}

function App() {
	const actDate = new Date();

	const initYear = actDate.getFullYear();
	const [monthIterator, setMonthIterator] = useState(actDate.getMonth());
	const [caleldarMonth, setCalMonth] = useState(monthIterator);

	const [mArray, setMArray] = useState(
		getMonthArray(actDate.getFullYear(), monthIterator)
	);

	const emptyDays = mArray.length - getFilteredMonthArray(mArray).length;
	const [dayIterator, sDay] = useState(actDate.getDate() - 1 + emptyDays);

	function incrementDay(increment) {
		if (increment) {
			if (dayIterator === mArray.length - 1) {
				const newMonth = monthIterator + 1;
				const newMonthArray = getMonthArray(initYear, newMonth);
				const newFirstDay = getFirstDayIndex(newMonthArray);

				setMArray(newMonthArray);
				setMonthIterator(newMonth);
				setCalMonth(newMonth);
				sDay(newFirstDay);
			} else {
				sDay(dayIterator + 1);
				setCalMonth(monthIterator);
			}
		} else {
			if (dayIterator === getFirstDayIndex(mArray)) {
				const newMonth = monthIterator - 1;
				const newMonthArray = getMonthArray(initYear, newMonth);
				const newLastDay = newMonthArray.length - 1;

				setMArray(newMonthArray);
				setMonthIterator(newMonth);
				setCalMonth(newMonth);
				sDay(newLastDay);
			} else {
				sDay(dayIterator - 1);
				setCalMonth(monthIterator);
			}
		}
	}

	function setDate(day, newMonth) {
		const newMonthArray = getMonthArray(initYear, newMonth);

		setMArray(newMonthArray);
		setMonthIterator(newMonth);
		sDay(day);
	}

	function getPhase() {
		return calculatePhase(mArray[dayIterator]);
	}
	function getDate(index = dayIterator) {
		//index = 7 because mArray[7] is never empty
		return mArray[index].getDate();
	}
	function getMonth(month = mArray) {
		//index = 7 because mArray[7] is never empty
		return month[7].getMonth();
	}
	function getYear(month = mArray) {
		return month[7].getFullYear();
	}

	return (
		<div className='App' id='App'>
			<MainScene
				getDate={getDate}
				getMonth={getMonth}
				getPhase={getPhase}
				incrementDay={incrementDay}
			/>
			<Calendar
				mArray={mArray}
				getMonth={getMonth}
				getYear={getYear}
				setDate={setDate}
				getPhase={getPhase}
				caleldarMonth={caleldarMonth}
				setCalMonth={setCalMonth}
				dayIterator={dayIterator}
			/>
		</div>
	);
}

export default App;

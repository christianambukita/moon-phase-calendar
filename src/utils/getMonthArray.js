export default function getMonthArray(year, month) {
	let monthArray = [new Date(year, month, 1)];
	let firstDay = monthArray[0].getDay();
	while (1) {
		let day = new Date(year, month, monthArray.length + 1);
		let condition = day.getMonth() === monthArray[0].getMonth();
		if (!condition || monthArray.length > 31) break;
		monthArray.push(day);
	}
	//fill month array with empty slots until first day of month matches array index
	if (firstDay !== 1) {
		for (let i = 1; i < firstDay; i++) {
			monthArray.unshift(undefined);
		}
	}
	return monthArray;
}

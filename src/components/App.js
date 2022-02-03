import { useState } from 'react/cjs/react.development';
import '../css/App.css';
import Calendar from './Calendar';
import MainScene from './MainScene';

function App() {
	const [displayData, setDisplay] = useState(undefined);

	return (
		<div className='App' id='App'>
			<MainScene displayData={displayData} />
			<Calendar setDisplay={setDisplay} />
		</div>
	);
}

export default App;

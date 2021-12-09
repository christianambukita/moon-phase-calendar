import { useEffect } from 'react';
import '../css/App.css';
import Calendar from './Calendar';
import MainScene from './MainScene';



function App() {

  useEffect(() => {
    document.title = "Moon phase callendar"
  },[])

  return (
    <div className="App" id="App">
      <MainScene />
      <Calendar />
    </div>
  );
}

export default App;

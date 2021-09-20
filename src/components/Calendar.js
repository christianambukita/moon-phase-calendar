import "../css/Calendar.css"
import { useEffect, useRef , useState} from "react"
import calculatePhase from "../utils/phaseCalculator"
import Moon from './Moon';
import useWindowSize from "../utils/useWindowSize";

export default function Calendar (){
    const actPhase = calculatePhase(new Date())
    const calendarRef = useRef(null)
    const [refPhase, setRefPhase] = useState(actPhase)
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [mArray, setMArray] = useState([])
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const PHASE_NAMES = ["New Moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full Moon", "Waning gibbous", "Last quater", "Waning crescent"]
    let size = useWindowSize()

    function getPhaseName(phase, names){
        const ranges = [0.03, 0.23, 0.27, 0.48, 0.52, 0.73, 0.77, 0.97]
        //              --0-- --1-- --2-- --3-- --4-- --5-- --6-- --7--
        if( ranges[7] <= phase || phase <= ranges[0] ) return names[0];
        if( ranges[0] < phase && phase < ranges[1]) return names[1];
        if( ranges[1] <= phase && phase <= ranges[2]) return names[2];
        if( ranges[2] < phase && phase < ranges[3]) return names[3];
        if( ranges[3] <= phase && phase <= ranges[4]) return names[4];
        if( ranges[4] < phase && phase < ranges[5]) return names[5];
        if( ranges[5] <= phase && phase <= ranges[6]) return names[6];
        if( ranges[6] < phase && phase < ranges[7]) return names[7];
        console.warn(`Invalid moon phase: ${phase}, expected floating number from range from 0.0 - 1.0`);
    }

    function getMoonSize({width, height}){
        return Math.floor(width>height? height*0.05 : width*0.06)
    }

    function roundWrap(number, decimalPrecision){
        let multiplier = Math.pow(10, decimalPrecision);
        return Math.floor(number*multiplier)/multiplier;
    }

    function getMonthArray (year, month){
        let monthArray = [new Date(year,month, 1)];
        let firstDay = monthArray[0].getDay();
        while(1){
            let day = new Date(year, month, monthArray.length+1)
            let condition = day.getMonth() === monthArray[0].getMonth();
            if(!condition || monthArray.length>31) break
            monthArray.push(day)
        }
        if(firstDay !== 1){
            for(let i = 1; i<firstDay; i++){
                monthArray.unshift(0)
            }
        }
        return monthArray;
    }
    
    useEffect(()=>{
        let newDate = new Date();
        setMonth(newDate.getMonth())
        setYear(newDate.getFullYear())
    },[])

    useEffect(()=>{
        if(month && year) setMArray(getMonthArray(year, month))
    },[month, year])


    function isToday(phase){
        let isEqual = phase === actPhase
        return isEqual ? " today" : ""
    }

    function isFocus(phase){
        return phase === refPhase ? " focus" : ""
    }

    
    return(
        <div ref = {calendarRef} className="calendar-container">
            
            <div className = "calendar">

                <div className = "header">
                    <h1>{mArray.length && mArray[7].getFullYear()}</h1>
                </div>

                <div className = "month-header">
                    <div className="month-button left-btn" onClick = {() => setMonth(month - 1)}>&#10094;</div>
                    <h1>{mArray.length && MONTH_NAMES[mArray[7].getMonth()]}</h1>
                    <div className="month-button right-btn" onClick = {() => setMonth(month + 1)}>&#10095;</div>
                </div>

                

                <div className = "day-labels-container">
                    <div className = "day-label">Mon</div>
                    <div className = "day-label">Tue</div>
                    <div className = "day-label">Wed</div>
                    <div className = "day-label">Thu</div>
                    <div className = "day-label">Fri</div>
                    <div className = "day-label">Sat</div>
                    <div className = "day-label">Sun</div>
                </div>


                <div className = "calendar-entries">

                    {mArray.map((date, index) => {
                        let gap = 0.5;
                        if(size.width<900) gap = 0;
                        let entryWidth =`${((100-14*gap)/7)}%`
                        if(date){
                            let phase = calculatePhase(date)
                            return(
                                <div 
                                    className = {"calendar-entry" + isToday(phase) + isFocus(phase)}
                                    key = {index}
                                    style = {{flexBasis: entryWidth, margin: `${gap}%`}}
                                    onClick = {() => setRefPhase(phase)}
                                >
                                    <div className = "flex-center" >
                                        <span className = "entry-date">{date.getDate()}</span>
                                        <Moon phase={phase} moonSize={getMoonSize(size)}/>
                                    </div>
                                    {
                                    size.width>460 &&
                                    <div className="entry-details">
                                        <span className = "phase-name">{getPhaseName(phase, PHASE_NAMES)}</span>
                                        <span className = "phase-name">Moon age: </span>
                                        <span className = "phase-name">
                                            {roundWrap(phase*29.5, 1)} days ({roundWrap(phase*100, 1)}%)
                                        </span>
                                    </div>
                                    }
                                </div>
                            )
                        }else{
                            return(
                                <div className = "calendar-entry empty" key = {index} style = {{flexBasis: entryWidth, margin: `${gap}%`}}></div>
                            )
                        }
                    }
                    )}
                </div>
                <div className = "date-info">
                    <span className = "phase-name">{getPhaseName(refPhase, PHASE_NAMES)}</span>
                    <span className = "phase-name">Moon age: </span>
                    <span className = "phase-name">
                        {roundWrap(refPhase*29.5, 1)} days ({roundWrap(refPhase*100, 1)}%)
                    </span>
                </div>
            </div>
        </div>
    )
}
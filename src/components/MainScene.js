import treeLineImg from '../img/tree-line.png';
import Moon from './Moon';
//import { useState } from 'react';
import calculatePhase from "../utils/phaseCalculator"
import useWindowSize from "../utils/useWindowSize";
import useScrollHeight from '../utils/useScrollHeight';
import "../css/MainScene.css"
import { getPhaseName } from "../utils/getPhaseName";

export default function MainScene(){
    let windowSize = useWindowSize();
    //let [sliderValue, setSliderValue] = useState(0.5);
    let scrollPosition = useScrollHeight()
    const actualPhase = calculatePhase(new Date())
    function getMoonSize({width, height}){
        return Math.floor(width>height? height*0.5 : width*0.5)
    }

    function getTranslateY(scrollPosition, ratio){
        if(scrollPosition) return `translateY(${scrollPosition/ratio}px)`
        return ''
    }
    return(
        <>
            <div className="scene-container">
                { <h1 className={scrollPosition ? 'opacity-0' : ""}>{getPhaseName(actualPhase)}</h1>}
                <div className = "stars-bg" style = {{transform: `${getTranslateY(scrollPosition, 5)}`}}></div>
                <Moon phase={actualPhase} moonSize = {getMoonSize(windowSize)} scrollTranslate = {getTranslateY(scrollPosition, getMoonSize(windowSize)/100 )}/>

                <div className="tree-line">
                    <img src={treeLineImg} alt="tree-line"/>
                </div>
                {
                /*
                <div className="slidecontainer">
                    <input type="range" min="0" max="1" step="0.01" value={sliderValue} className="slider" id="myRange" onChange={(e)=>setSliderValue(e.target.value)}/>
                </div>
                */
                }
        </div>
        <div className = "scene-seam-patch"></div>
      </>
    )
}
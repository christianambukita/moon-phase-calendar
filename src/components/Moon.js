import moonImg from '../img/full-moon.png';
import "../css/Moon.css"
import { useState, useEffect } from 'react';
import getShadowStyle from '../utils/getShadowStyle';
import getAliasingPatchStyle from '../utils/getAliasingPatchStyle';


function Moon({phase, moonSize, scrollTranslate}){
    console.log(moonSize)
    let [shadowStyle, setShadowStyle] = useState({
        width: 0,
        height: 0,
    })
    let [aliPatchStyle, setAliPatch] = useState()
    let [rotationAngle, setAngle] = useState(0);


    function getLatitude(setState){
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
          };
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }

          navigator.geolocation.getCurrentPosition( (pos) => setState(-pos.coords.latitude+90), error, options);
    }

    useEffect(()=>{
        if(moonSize && phase){
        getLatitude(setAngle);
        setShadowStyle(getShadowStyle(phase, moonSize));
        }
    }, [moonSize, phase])

    useEffect(()=>{
        if(shadowStyle.width)
            setAliPatch(getAliasingPatchStyle(shadowStyle))
    },[shadowStyle])
    return(
        <>
            {
                moonSize &&
                <div className="moon" 
                style={{
                    width:moonSize,
                    height:moonSize,
                    transform: `${scrollTranslate+' '}rotate(${rotationAngle}deg)`
                }}>
                    <img src={moonImg} style={{width:moonSize}} alt="moon"/>
                    <div className = "moon-shadow" style={shadowStyle}></div>
                    <div className = "shadow-aliasing-patch" style = {aliPatchStyle}></div>
                </div>
            }
        </>
    )
}

export default Moon
export default function getAliasingPatchStyle({width, height, ["--translateX"]: translateX, ["--translateY"]: translateY, borderRadius}){
    
    if(borderRadius) //always except first and third quarter moon phase
        return { 
            width: width+2,
            height: height+2,
            transform: `translate(${translateX-1}px, ${translateY-1}px)`,
            borderColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "50%"
        }
    
    return{
        width: width+2,
        height,
        borderColor: "rgba(0, 0, 0, 0.3)",
        transform: `translate(${translateX + translateX ? 1 : -1}px, ${translateY}px)`,
    }
}
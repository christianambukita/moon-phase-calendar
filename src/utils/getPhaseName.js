export const PHASE_NAMES = ["New Moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full Moon", "Waning gibbous", "Last quater", "Waning crescent"]

export function getPhaseName(phase){
    const ranges = [0.03, 0.23, 0.27, 0.48, 0.52, 0.73, 0.77, 0.97]
    //              --0-- --1-- --2-- --3-- --4-- --5-- --6-- --7--
    if( ranges[7] <= phase || phase <= ranges[0] ) return PHASE_NAMES[0];
    if( ranges[0] < phase && phase < ranges[1]) return PHASE_NAMES[1];
    if( ranges[1] <= phase && phase <= ranges[2]) return PHASE_NAMES[2];
    if( ranges[2] < phase && phase < ranges[3]) return PHASE_NAMES[3];
    if( ranges[3] <= phase && phase <= ranges[4]) return PHASE_NAMES[4];
    if( ranges[4] < phase && phase < ranges[5]) return PHASE_NAMES[5];
    if( ranges[5] <= phase && phase <= ranges[6]) return PHASE_NAMES[6];
    if( ranges[6] < phase && phase < ranges[7]) return PHASE_NAMES[7];
    console.warn(`Invalid moon phase: ${phase}, expected floating number from range from 0.0 - 1.0`);
}
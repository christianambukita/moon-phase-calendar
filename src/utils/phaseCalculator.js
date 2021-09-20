//calculations based on https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf

const NEW_MOON_JD = 2451549.5;
const A_CONST = 100;
const B_CONST = 4;
const C_CONST = 2;
const E_CONST_1 = 365.25;
const E_CONST_2 = 4716;
const F_CONST_1 = 30.6001;
const F_CONST_2 = 1;
const JD_CONST = 1524.5;
const M_CYCLE = 29.53;

export default function calculatePhase(date){
    const currentDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }

    const A = Math.floor( currentDate.year / A_CONST );
    const B = A / B_CONST;
    const C = C_CONST - A + B;
    const E = E_CONST_1 * ( currentDate.year + E_CONST_2 );
    const F = F_CONST_1 * ( currentDate.month + F_CONST_2 );
    const JD = C + currentDate.day + E + F - JD_CONST;

    const daySinceNM = JD - NEW_MOON_JD;

    const newMoons = daySinceNM / M_CYCLE;

    const daysIntoCycle = newMoons % 1 * M_CYCLE;

    const cycleProgression = daysIntoCycle / M_CYCLE;

    return Number(cycleProgression);
}
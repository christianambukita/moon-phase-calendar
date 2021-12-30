# Moon phase calendar

Moon phase calendar which focuses on showcasing current moon phase state on main scene.

Moon phase is calculated purely based on current date based on calculations I found here: https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf

## Motivation

One night looking at moon I wondered how would I create moon with its shadow using css and html elements. To make that a little bit more fun and challanging the shadow would be generated based on current date which is used to calculate current moon phase.

## Challange

Definitely the biggest challange was figuring out how the shadow is projected on the moon and then getting the equation to calculate its radius and position. Key to resolving this problem was an observation that shadow no matter how small or big always intersets whith moon radius exacly in the same points (if we woudnt take moon rotation into consideration it would be north and south pole).

**[view live version](https://moon-phase-calendar.netlify.app/)**
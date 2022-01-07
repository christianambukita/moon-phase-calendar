export default function getShadowStyle(phase, moonSize) {
	const shadowColor = 'rgba(0,0,0,0.85)';
	const boxShadowParams = {
		x: 0.075 * moonSize,
		y: 0,
		blur: 0.075 * moonSize,
		spread: 0.025 * moonSize,
	};

	const initialPhaseState = {
		progresState: 0,
		shadowDir: 0,
		halfShadow: 0,
		phaseProgres: phase,
	};

	function getShadowState(phaseProgres) {
		if (phaseProgres === 0.25) return { ...initialPhaseState, halfShadow: 1 };
		else if (phaseProgres === 0.75)
			return { ...initialPhaseState, halfShadow: 1, shadowDir: 1 };
		else if (phaseProgres < 0.25) return { ...initialPhaseState };
		else if (phaseProgres > 0.25 && phaseProgres < 0.5)
			return { ...initialPhaseState, progresState: 1 };
		else if (phaseProgres >= 0.5 && phaseProgres < 0.75)
			return { ...initialPhaseState, progresState: 1, shadowDir: 1 };
		else if (phaseProgres > 0.75)
			return { ...initialPhaseState, progresState: 0, shadowDir: 1 };
	}

	function getShadowRadius(shadowEdgeOffset) {
		let R = moonSize / 2;
		let A = (shadowEdgeOffset / 0.25) * R;
		let radius = 0.5 * (A + Math.pow(R, 2) / A);
		return radius;
	}
	function getShadowDirection(shadowDir, progresState) {
		return (shadowDir ? -1 : 1) * (progresState ? -1 : 1);
	}

	function getBoxShadowParams(
		shadowDir,
		spreadSelector,
		{ x, y, blur, spread } = boxShadowParams
	) {
		if (!spreadSelector) {
			spread += x;
			x = 0;
		} else {
			spread /= 2;
		}

		let mainShadow = `${
			shadowDir && '-'
		}${x}px ${y}px ${blur}px ${spread}px ${shadowColor}`;
		return {
			0: mainShadow,
			1: `0 0 0 400px ${shadowColor}, inset ${mainShadow}`,
		};
	}
	function getSizeAndPosition({
		progresState,
		shadowDir,
		halfShadow,
		phaseProgres,
	} = initialPhaseState) {
		let boxShadow = getBoxShadowParams(
			shadowDir,
			progresState,
			boxShadowParams
		);
		let background = {
			0: `${shadowColor}`,
			1: 'transparent',
		};

		if (Number(phaseProgres) === 0.5) return {};
		if (halfShadow) {
			let translation = {
				x: shadowDir ? moonSize / 2 : 0,
				y: -0.1 * moonSize,
			};
			return {
				width: moonSize / 2,
				height: moonSize + 0.2 * moonSize,
				transform: `translate(${translation.x}px, ${translation.y}px)`,
				background: `${shadowColor}`,
				boxShadow: boxShadow[0],
				'--translateX': translation.x, //variable used in shadow aliasing patch
				'--translateY': translation.y, //variable used in shadow aliasing patch
			};
		}

		let shadowEdgeOffset = progresState
			? Number(
					phaseProgres > 0.5 ? 0.75 - phaseProgres : phaseProgres - 0.25
			  ).toPrecision(5)
			: Number(
					phaseProgres > 0.5 ? phaseProgres - 0.75 : 0.25 - phaseProgres
			  ).toPrecision(5);
		let newRadius = getShadowRadius(shadowEdgeOffset);
		let moonCenterToShadowEdge = ((shadowEdgeOffset / 0.25) * moonSize) / 2;
		let shadowCenterOffset = newRadius - moonSize / 2; // offset caused by size difference between moon radius and shadow radius
		let shadowTranslateX =
			newRadius -
			moonCenterToShadowEdge +
			getShadowDirection(shadowDir, progresState) * shadowCenterOffset;
		let shadowTranslateY = (newRadius * 2 - moonSize) / 2;
		let translation = {
			x: -getShadowDirection(shadowDir, progresState) * shadowTranslateX,
			y: -shadowTranslateY,
		};

		return {
			width: newRadius * 2,
			height: newRadius * 2,
			transform: `translate(${translation.x}px, ${translation.y}px)`,
			borderRadius: '50%',
			boxShadow: boxShadow[progresState],
			background: background[progresState],
			'--translateX': translation.x, //variable used in shadow aliasing patch
			'--translateY': translation.y, //variable used in shadow aliasing patch
			'--background': shadowColor, //variable used in shadow aliasing patch
		};
	}

	let newShadowState = getShadowState(phase);

	return getSizeAndPosition(newShadowState);
}

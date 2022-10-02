import React, { useEffect, useRef } from "react";

interface SliderProps {
	setLengthOfArray: React.Dispatch<React.SetStateAction<number>>;
}

function Slider(props: SliderProps) {
	const sliderValue = useRef(Math.floor((70 - 25) / 2 + 25));
	const handleSliderChange = (e: any) => {
		sliderValue.current = e.target.value;
		props.setLengthOfArray(e.target.value);
	};

	useEffect(() => {
		let numberOfElements: any = document.getElementById("numberOfElements");
		props.setLengthOfArray(parseInt(numberOfElements.value));
	}, []);

	return (
		<div id="slider" className="selectable">
			<input
				type="range"
				min={25}
				max={70}
				value={sliderValue.current}
				id="numberOfElements"
				onInput={handleSliderChange}
				onClick={handleSliderChange}
			/>
		</div>
	);
}

export default Slider;

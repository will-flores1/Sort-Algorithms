import React from "react";
import "../App.css";

interface BarProps {
	height: number;
	sorted: boolean;
	index: number;
	key: number;
}

function Bar(props: BarProps) {
	if (!props.sorted) {
		return (
			<div
				className="bar"
				id={`${props.index}`}
				style={{ height: `${props.height}px` }}
			></div>
		);
	} else {
		return (
			<div
				className="bar sorted"
				id={`${props.index}`}
				style={{ height: `${props.height}px` }}
			></div>
		);
	}
}

export default Bar;

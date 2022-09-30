import React, { useState } from "react";
import "../App.css";
import Bar from "./Bar";

interface Props {
	lengthOfArray: number;
	generateNewArray: boolean;
	setGenerateNewArray: React.Dispatch<React.SetStateAction<boolean>>;
	conductSort: string;
	setConductSort: React.Dispatch<React.SetStateAction<string>>;
}

function SortInterface(props: Props) {
	const [arrayToSort, setArrayToSort] = useState(() => {
		let array = [];
		for (let i = 0; i < 47; i++) {
			array[i] = { height: 0, sorted: false };
			array[i].height = Math.floor(Math.random() * 500 + 10);
			array[i].sorted = false;
		}
		console.log(array);
		return array;
	});

	return (
		<div className="sort-interface">
			{arrayToSort.map((bar, index) => {
				return (
					<Bar
						height={bar.height}
						sorted={bar.sorted}
						index={index}
						key={index}
					/>
				);
			})}
		</div>
	);
}

export default SortInterface;

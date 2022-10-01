import React, { useEffect, useState } from "react";
import "../App.css";
import Bar from "./Bar";

interface InterfaceProps {
	lengthOfArray: number;
	generateNewArray: boolean;
	setGenerateNewArray: React.Dispatch<React.SetStateAction<boolean>>;
	conductSort: string;
	setConductSort: React.Dispatch<React.SetStateAction<string>>;
}

function SortInterface(props: InterfaceProps) {
	// Unsorted array of bars
	const [arrayToSort, setArrayToSort] = useState(() => {
		let array = [];
		for (let i = 0; i < 47; i++) {
			array[i] = { height: 0, sorted: false };
			array[i].height = Math.floor(Math.random() * 500 + 10);
			array[i].sorted = false;
		}
		return array;
	});
	// console.log(`arrayToSort: ${arrayToSort.length}`);

	// Generate/remove bars to array
	useEffect(() => {
		setArrayToSort(() => {
			let newArray = arrayToSort;
			let difference = props.lengthOfArray - arrayToSort.length;
			if (difference < 0) {
				for (let i = difference; i < 0; i++) {
					newArray.pop();
				}
			} else if (difference > 0) {
				for (let i = 0; i < difference; i++) {
					newArray.push({
						height: Math.floor(Math.random() * 500 + 10),
						sorted: false,
					});
				}
			}
			return newArray;
		});
	}, [props.lengthOfArray]);

	// Generate new array button click
	useEffect(() => {
		props.setConductSort("");
		if (props.generateNewArray) {
			setArrayToSort(() => {
				let array = [];
				for (let i = 0; i < props.lengthOfArray; i++) {
					array[i] = { height: 0, sorted: false };
					array[i].height = Math.floor(Math.random() * 500 + 10);
					array[i].sorted = false;
				}
				return array;
			});
			props.setGenerateNewArray(false);
		}
	}, [props.generateNewArray]);

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

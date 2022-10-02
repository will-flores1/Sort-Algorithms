import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import Bar from "./Bar";

interface arrayCopyTypes {
	height: number | null | undefined;
	sorted: boolean;
}
interface CurrentITypes {
	height?: number | null;
	i?: number | null;
}
interface InterfaceProps {
	lengthOfArray: number;
	generateNewArray: boolean;
	setGenerateNewArray: React.Dispatch<React.SetStateAction<boolean>>;
	conductSort: string;
	setConductSort: React.Dispatch<React.SetStateAction<string | null>>;
}

function SortInterface(props: InterfaceProps) {
	// Conduct sorting algorithms
	const [iterateAgain, setIterateAgain] = useState(0);
	const firstUnsorted: React.MutableRefObject<number | null> = useRef(null);
	const lastUnsorted: React.MutableRefObject<number | null> = useRef(null);
	const arrayCopy: React.MutableRefObject<any | arrayCopyTypes | [] | null> =
		useRef(null);
	const sortedArray: React.MutableRefObject<[] | null> = useRef(null);
	const currentI: React.MutableRefObject<number | null> = useRef(null);
	const shortest: React.MutableRefObject<CurrentITypes> = useRef({
		height: 0,
		i: 0,
	});

	// Unsorted array of bars
	const [arrayToSort, setArrayToSort] = useState<
		{
			height?: number | null;
			sorted?: boolean | null;
		}[]
	>(() => {
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

	// Selection Sort & Bubble Sort
	useEffect(() => {
		if (props.conductSort === null) {
			return;
		} else if (props.conductSort === "Selection Sort") {
			let i = currentI.current; // maybe delete
			// If first unsorted is 0, get first unsorted index
			if (firstUnsorted.current === null) {
				for (let i = 0; i < arrayToSort.length; i++) {
					if (arrayToSort[i].sorted === false) {
						firstUnsorted.current = i;
						break;
					}
				}
			}
			// console.log(firstUnsorted.current);
			currentI.current = firstUnsorted.current;
			let domArrayToSort = Array.from(document.querySelectorAll(".bar"));
			iterate(domArrayToSort);
			function iterate(domArray: any) {
				setTimeout(() => {
					// If previous element exists, remove its highlight
					let previousElement = domArray[currentI.current! - 1];
					if (previousElement) {
						previousElement.classList.remove("highlighted");
					}
					// If current element exists, add its highlight
					let currentElement = domArray[currentI.current!];
					if (currentElement) {
						currentElement.classList.add("highlighted");
					}
					// If shortest is null, shortest = array[currentI]
					if (
						shortest.current!.height === null ||
						shortest.current!.i === null
					) {
						console.log(currentI.current);
						shortest.current = {
							height: arrayToSort[currentI.current!].height,
							i: currentI.current,
						};
					}
					// If array[currentI] is shorter than shortest, record
					if (
						arrayToSort[currentI.current!].height! <= shortest.current!.height!
					) {
						shortest.current = {
							height: arrayToSort[currentI.current!].height,
							i: currentI.current,
						};
					}
					// If end of array
					if (currentI.current === arrayToSort.length - 1) {
						currentElement.classList.remove("highlighted");
						let arrayCopy = [];
						for (let i = 0; i < arrayToSort.length; i++) {
							arrayCopy[i] = arrayToSort[i];
						}
						let tempStorageOfHeight = arrayCopy[firstUnsorted.current!].height;
						arrayCopy[firstUnsorted.current!] = {
							height: shortest.current.height,
							sorted: true,
						};
						arrayCopy[shortest.current.i!].height = tempStorageOfHeight;
						// If all are iterated through
						if (firstUnsorted.current === arrayToSort.length - 1) {
							Array.from(document.querySelectorAll(".selectable")).forEach(
								(element) => {
									if (element.textContent === "Generate New Array") {
										element.classList.remove("unclickable");
									}
								}
							);
							firstUnsorted.current = null;
							props.setConductSort(null);
						} else {
							firstUnsorted.current = firstUnsorted.current! + 1;
						}
						shortest.current = {
							height: null,
							i: null,
						};
						currentI.current = null;
						setArrayToSort(arrayCopy);
						return;
					} else {
						currentI.current = currentI.current! + 1;
						iterate(domArray);
						return;
					}
				}, 15);
			}
		} else if (props.conductSort === "Bubble Sort") {
			setTimeout(() => {
				if (arrayCopy.current === null) {
					arrayCopy.current = [];
					for (let i = 0; i < props.lengthOfArray; i++) {
						arrayCopy.current[i] = {
							height: arrayToSort[i].height,
							sorted: false,
						};
					}
				}
				if (lastUnsorted.current === null) {
					for (let i = props.lengthOfArray - 1; i > 0; i--) {
						if (arrayCopy.current[i].sorted === false) {
							lastUnsorted.current = i;
							break;
						}
					}
				}
				if (firstUnsorted.current === null) {
					for (let i = 0; i < props.lengthOfArray; i++) {
						if (arrayCopy.current[i].sorted === false) {
							firstUnsorted.current = i;
							break;
						}
					}
				}
				if (currentI.current === null) {
					currentI.current = firstUnsorted.current;
				}
				if (sortedArray.current === null) {
					sortedArray.current = arrayCopy.current.map(
						(element: any) => element.height
					);
					sortedArray.current!.sort((a, b) => a - b);
				}
				function switchElements(currentIteration: number) {
					let bigger = arrayCopy.current[currentIteration].height;
					arrayCopy.current[currentIteration].height =
						arrayCopy.current[currentIteration + 1].height;
					arrayCopy.current[currentIteration + 1].height = bigger;
					if (
						sortedArray.current![currentIteration] ===
						arrayCopy.current[currentIteration].height
					) {
						arrayCopy.current[currentIteration].sorted = true;
					} else {
						arrayCopy.current[currentIteration].sorted = false;
					}
					if (
						sortedArray.current![currentIteration + 1] ===
						arrayCopy.current[currentIteration + 1].height
					) {
						arrayCopy.current[currentIteration + 1].sorted = true;
					} else {
						arrayCopy.current[currentIteration + 1].sorted = false;
					}
				}
				function handleHighlights(currentIteration: number) {
					let domArray = Array.from(document.querySelectorAll(".bar"));
					domArray[currentIteration].classList.add("highlighted");
					if (domArray[currentIteration + 1]) {
						domArray[currentIteration + 1].classList.add("highlighted");
					}
					setTimeout(() => {
						domArray[currentIteration].classList.remove("highlighted");
						if (domArray[currentIteration + 1]) {
							domArray[currentIteration + 1].classList.remove("highlighted");
						}
					}, 15);
				}
				function resetRefs() {
					currentI.current = null;
					lastUnsorted.current = null;
					firstUnsorted.current = null;
				}
				let i = currentI.current;
				let allSorted = true;
				for (let y = 0; y < props.lengthOfArray; y++) {
					if (arrayToSort[y].sorted === false) {
						allSorted = false;
						break;
					}
				}
				if (allSorted === true) {
					arrayCopy.current = null;
					sortedArray.current = null;
					Array.from(document.querySelectorAll(".selectable")).forEach(
						(element) => {
							if (element.textContent === "Generate New Array") {
								element.classList.remove("unclickable");
							}
						}
					);
					props.setConductSort(null);
				} else {
					handleHighlights(i!);
					if (i === lastUnsorted.current! - 1) {
						if (arrayToSort[i].height! >= arrayToSort[i + 1].height!) {
							switchElements(i!);
							resetRefs();
							setArrayToSort(arrayCopy.current);
							setIterateAgain(iterateAgain + 1);
						} else {
							resetRefs();
							setIterateAgain(iterateAgain + 1);
						}
					} else if (firstUnsorted.current === lastUnsorted.current) {
						arrayCopy.current[i!].sorted = true;
						resetRefs();
						setArrayToSort(arrayCopy.current);
					} else {
						if (arrayToSort[i!].height! >= arrayToSort[i! + 1].height!) {
							switchElements(i!);
							currentI.current = currentI.current! + 1;
							setArrayToSort(arrayCopy.current);
							setIterateAgain(iterateAgain + 1);
						} else {
							currentI.current = currentI.current! + 1;
							setIterateAgain(iterateAgain + 1);
						}
					}
				}
			}, 15);
		}
	}, [arrayToSort, props.conductSort, iterateAgain]);

	return (
		<div className="sort-interface">
			{arrayToSort.map((bar, index) => {
				return (
					<Bar
						height={bar.height!}
						sorted={bar.sorted!}
						index={index}
						key={index}
					/>
				);
			})}
		</div>
	);
}

export default SortInterface;

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
	setConductSort: React.Dispatch<React.SetStateAction<string>>;
}

interface mergeCopyTypes {
	height: number | null | undefined;
	sorted?: boolean;
	index?: number;
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
		if (props.conductSort === "") {
			return;
		} else if (props.conductSort === "Selection Sort") {
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
							props.setConductSort("");
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
					props.setConductSort("");
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

	// Merge Sort
	const mergeCopy: React.MutableRefObject<mergeCopyTypes | null | any> =
		useRef(null);
	const mergeSorted: React.MutableRefObject<any | null> = useRef(null);
	const arrayMorphs: React.MutableRefObject<any | null> = useRef([]);

	useEffect(() => {
		if (props.conductSort === "") {
			mergeCopy.current = null;
			mergeSorted.current = null;
			arrayMorphs.current = [];
			return;
		} else if (props.conductSort === "Merge Sort") {
			if (mergeCopy.current === null) {
				mergeCopy.current = [];
				for (let i = 0; i < arrayToSort.length; i++) {
					mergeCopy.current[i] = {
						height: arrayToSort[i].height,
						sorted: false,
						index: i,
					};
				}
			}
			if (mergeSorted.current === null) {
				mergeSorted.current = [];
				for (let i = 0; i < arrayToSort.length; i++) {
					mergeSorted.current[i] = {
						height: arrayToSort[i].height,
					};
				}
				mergeSorted.current.sort((a: any, b: any) => a.height - b.height);
			}

			let domArray = Array.from(document.querySelectorAll(".bar"));
			mergeSort(mergeCopy.current);
			iterateOverMorphs(arrayMorphs.current);
			function iterateOverMorphs(morphArray: any) {
				for (let i = 0; i < morphArray.length; i++) {
					setTimeout(() => {
						setArrayToSort(morphArray[i]);
						if (i === morphArray.length - 1) {
							Array.from(document.querySelectorAll(".selectable")).forEach(
								(element) => {
									if (element.textContent === "Generate New Array") {
										element.classList.remove("unclickable");
									}
								}
							);
							props.setConductSort("");
						}
					}, 30 * i);
				}
			}
			function mergeSort(array: any): any {
				let middle = Math.floor(array.length / 2);
				let leftArray = [];
				let rightArray = [];

				if (array.length === 1) {
					return array;
				}
				for (let i = 0; i < middle; i++) {
					leftArray.push(array[i]);
				}
				for (let i = middle; i < array.length; i++) {
					rightArray.push(array[i]);
				}
				leftArray = mergeSort(leftArray);
				rightArray = mergeSort(rightArray);

				return merge(leftArray, rightArray);

				function merge(left: any, right: any) {
					let leftMostPosition = left[0].index;
					let newArray = [];

					while (left[0] && right[0]) {
						if (left[0].height <= right[0].height) {
							left[0].index = leftMostPosition;
							newArray.push(left[0]);
							mergeCopy.current[leftMostPosition] = left[0];
							leftMostPosition++;
							left.shift();
							for (let i = 0; i < mergeCopy.current.length; i++) {
								if (
									mergeSorted.current[i].height === mergeCopy.current[i].height
								) {
									mergeCopy.current[i].sorted = true;
								} else {
									mergeCopy.current[i].sorted = false;
								}
							}
							let arrayCopy = [];
							for (let i = 0; i < mergeCopy.current.length; i++) {
								arrayCopy[i] = {
									height: mergeCopy.current[i].height,
									sorted: mergeCopy.current[i].sorted,
									index: mergeCopy.current[i].index,
								};
							}
							arrayMorphs.current!.push(arrayCopy);
						} else {
							right[0].index = leftMostPosition;
							newArray.push(right[0]);
							mergeCopy.current[leftMostPosition] = right[0];
							leftMostPosition++;
							right.shift();
							for (let i = 0; i < mergeCopy.current.length; i++) {
								if (
									mergeSorted.current[i].height === mergeCopy.current[i].height
								) {
									mergeCopy.current[i].sorted = true;
								} else {
									mergeCopy.current[i].sorted = false;
								}
							}
							let arrayCopy = [];
							for (let i = 0; i < mergeCopy.current.length; i++) {
								arrayCopy[i] = {
									height: mergeCopy.current[i].height,
									sorted: mergeCopy.current[i].sorted,
									index: mergeCopy.current[i].index,
								};
							}
							arrayMorphs.current.push(arrayCopy);
						}
					}
					while (left[0]) {
						left[0].index = leftMostPosition;
						newArray.push(left[0]);
						mergeCopy.current[leftMostPosition] = left[0];
						leftMostPosition++;
						left.shift();
						for (let i = 0; i < mergeCopy.current.length; i++) {
							if (
								mergeSorted.current[i].height === mergeCopy.current[i].height
							) {
								mergeCopy.current[i].sorted = true;
							} else {
								mergeCopy.current[i].sorted = false;
							}
						}
						let arrayCopy = [];
						for (let i = 0; i < mergeCopy.current.length; i++) {
							arrayCopy[i] = {
								height: mergeCopy.current[i].height,
								sorted: mergeCopy.current[i].sorted,
								index: mergeCopy.current[i].index,
							};
						}
						arrayMorphs.current.push(arrayCopy);
					}
					while (right[0]) {
						right[0].index = leftMostPosition;
						newArray.push(right[0]);
						mergeCopy.current[leftMostPosition] = right[0];
						leftMostPosition++;
						right.shift();
						for (let i = 0; i < mergeCopy.current.length; i++) {
							if (
								mergeSorted.current[i].height === mergeCopy.current[i].height
							) {
								mergeCopy.current[i].sorted = true;
							} else {
								mergeCopy.current[i].sorted = false;
							}
						}
						let arrayCopy = [];
						for (let i = 0; i < mergeCopy.current.length; i++) {
							arrayCopy[i] = {
								height: mergeCopy.current[i].height,
								sorted: mergeCopy.current[i].sorted,
								index: mergeCopy.current[i].index,
							};
						}
						arrayMorphs.current.push(arrayCopy);
					}
					return newArray;
				}
			}
		}
	}, [props.conductSort]);

	// Quick Sort
	const quickSorted: React.MutableRefObject<any | null> = useRef(null);
	const quickCopy: React.MutableRefObject<any | null> = useRef(null);
	const quickMorphs: React.MutableRefObject<any | null> = useRef(null);

	useEffect(() => {
		if (props.conductSort === "") {
			quickSorted.current = null;
			quickCopy.current = null;
			quickMorphs.current = null;
		} else if (props.conductSort === "Quick Sort") {
			if (quickSorted.current === null) {
				quickSorted.current = [];
				for (let i = 0; i < arrayToSort.length; i++) {
					quickSorted.current[i] = arrayToSort[i].height;
				}
				quickSorted.current.sort((a: number, b: number) => a - b);
			}
			if (quickCopy.current === null) {
				quickCopy.current = [];
				for (let i = 0; i < arrayToSort.length; i++) {
					quickCopy.current[i] = {
						height: arrayToSort[i].height,
						sorted: false,
						index: i,
					};
				}
			}
			if (quickMorphs.current === null) {
				quickMorphs.current = [];
			}
			quickSort(quickCopy.current, 0, quickCopy.current.length - 1);
			iterateOverMorphs(quickMorphs.current);

			function iterateOverMorphs(morphArray: any) {
				for (let i = 0; i < morphArray.length; i++) {
					setTimeout(() => {
						setArrayToSort(morphArray[i]);
						if (i === morphArray.length - 1) {
							Array.from(document.querySelectorAll(".selectable")).forEach(
								(element) => {
									if (element.textContent === "Generate New Array") {
										element.classList.remove("unclickable");
									}
								}
							);
							props.setConductSort("");
						}
					}, 70 * i);
				}
			}

			function quickSort(array: any, left: any, right: any) {
				let index = partition(array, left, right);

				if (left < index - 1) {
					quickSort(array, left, index - 1);
				}
				if (index < right) {
					quickSort(array, index, right);
				}
			}

			function partition(array: any, left: any, right: any) {
				let pivot = array[Math.floor(left + (right - left) / 2)].height;
				while (left <= right) {
					while (array[left].height < pivot) {
						left++;
					}
					while (array[right].height > pivot) {
						right--;
					}

					if (left <= right) {
						let tempStorage = array[left];
						array[left] = array[right];
						array[right] = tempStorage;

						for (let i = 0; i < array.length; i++) {
							if (array[i].height === quickSorted.current[i]) {
								array[i].sorted = true;
							} else {
								array[i].sorted = false;
							}
						}

						let newArray = [];
						for (let i = 0; i < quickCopy.current.length; i++) {
							newArray[i] = {
								height: quickCopy.current[i].height,
								sorted: quickCopy.current[i].sorted,
							};
						}
						quickMorphs.current.push(newArray);
						left++;
						right--;
					}
				}
				return left;
			}
		}
	}, [props.conductSort]);

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

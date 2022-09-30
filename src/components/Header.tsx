import React, { SyntheticEvent } from "react";
import "../App.css";

interface Props {
	setLengthOfArray: React.Dispatch<React.SetStateAction<number>>;
	setGenerateNewArray: React.Dispatch<React.SetStateAction<boolean>>;
	setConductSort: React.Dispatch<React.SetStateAction<string>>;
}
function Header(props: Props) {
	const handleSortSelection = (e: SyntheticEvent) => {
		let selectableSortAlgorithms = Array.from(
			document.querySelectorAll(".selectable")
		);
		for (let i = 0; i < selectableSortAlgorithms.length; i++) {
			selectableSortAlgorithms[i].classList.add("unclickable");
		}
		props.setConductSort(e.target.textContent);
	};

	return (
		<nav className="nav-container">
			<div>
				<h2 className="selectable" onClick={handleSortSelection}>
					Selection Sort
				</h2>
				<h2 className="selectable" onClick={handleSortSelection}>
					Bubble Sort
				</h2>
				<h2 className="selectable" onClick={handleSortSelection}>
					Merge Sort
				</h2>
				<h2 className="selectable" onClick={handleSortSelection}>
					Quick Sort
				</h2>
			</div>
			<div>
				<h2 className="selectable" id="arraySize-nav">
					Array Size
				</h2>
			</div>
			<div>
				<h2 className="selectable">Generate New Array</h2>
			</div>
		</nav>
	);
}

export default Header;

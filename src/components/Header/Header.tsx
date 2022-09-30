import React from "react";
import "../../App.css";

function Header() {
	return (
		<nav className="header-container">
			<div className="sort-container">
				<h2 className="selectable">Selection Sort</h2>
				<h2 className="selectable">Bubble Sort</h2>
				<h2 className="selectable">Merge Sort</h2>
				<h2 className="selectable">Quick Sort</h2>
			</div>
			<div>
				<h2 className="selectable" id="arraySize-slider">
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

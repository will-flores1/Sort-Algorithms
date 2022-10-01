import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SortInterface from "./components/SortInterface";

function App() {
	// Size of bar chart
	const [lengthOfArray, setLengthOfArray] = useState(0);
	// Sets new array for bar chart when 'Generate New Array' is clicked
	const [generateNewArray, setGenerateNewArray] = useState(false);
	// Value of sort button clicked
	const [conductSort, setConductSort] = useState("");
	// console.log(`lengthOfArray: ${lengthOfArray}`);

	return (
		<div className="App">
			<Header
				setLengthOfArray={setLengthOfArray}
				setGenerateNewArray={setGenerateNewArray}
				setConductSort={setConductSort}
			/>
			<SortInterface
				lengthOfArray={lengthOfArray}
				generateNewArray={generateNewArray}
				setGenerateNewArray={setGenerateNewArray}
				conductSort={conductSort}
				setConductSort={setConductSort}
			/>
		</div>
	);
}

export default App;

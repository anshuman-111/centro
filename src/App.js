


import Home from "./components/Home";
import layoutContext from "./components/utils/layoutContext";

function App() {
	const savedLayout = {
		layoutType: "",
		showName: "",
		tablePos: [],
		tableData: [],
		meals: [],
		changed: false,
		printMode: false
	};

	return (
		<>
			<layoutContext.Provider value={savedLayout}>
				<Home />
			</layoutContext.Provider>
		</>
	);
}
export default App;

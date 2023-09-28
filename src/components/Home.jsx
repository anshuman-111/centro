import { useContext, useRef, useState } from "react";
import Papa from "papaparse";
import dataProc from "./dataProc";
import LayoutProvider from "./LayoutProvider";
import layoutContext from "./utils/layoutContext.js";
import ReactToPrint from "react-to-print";
import { dummy } from "./utils/dummyData";
const Home = () => {
	const items = [
		{
			id: 1,
			name: "Select Layout Type",
			value: "empty",
		},
		{
			id: 2,
			name: "Full Sorrento Room",
			value: "full",
		},
		{
			id: 3,
			name: "Comedy Layout",
			value: "comedy",
		},
		{
			id: 4,
			name: "Dance Layout",
			value: "dance",
		},
	];
	const layoutRef = useRef();
	var savedLayout = useContext(layoutContext);
	const [layout, setLayout] = useState(items[0].value);
	const [data, setData] = useState([]);
	savedLayout.layoutType = "";

	const handleUpload = (e) => {
		if (e.target.files.length > 0) {
			Papa.parse(e.target.files[0], {
				header: true,
				complete: (results) => {
					setData(dataProc(results.data));
					setLayout(items[0].value);
				},
			});
		}
	};

	const [foodOps, setFood] = useState({ meal1: "", meal2: "" });
	savedLayout.layoutType = layout;
	savedLayout.meals = [foodOps.meal1, foodOps.meal2];
	const switchMode = () => {
		savedLayout.printMode = true;
	};

	return (
		<>
			<div className="text-center text-2xl p-3 text-white bg-stone-500">
				Centro CBD Sorrento Room Layout Generator
			</div>
			<button
				onClick={() => (setData(dummy), setLayout("dance"))}
				className="absolute translate-x-[65rem] translate-y-[6rem] text-white font-bold p-5 bg-red-900"
			>
				DUMMY DATA FOR TEST
			</button>
			<div className="flex flex-row items-center justify-center bg-slate-400">
				<p className="mx-6">Upload your Bookings CSV file : </p>
				<input
					type="file"
					name="file"
					accept=".csv"
					className="p-4"
					onChange={handleUpload}
				/>

				<p className="mx-6">Select Layout : </p>
				<select
					value={layout}
					className="p-5"
					onChange={(e) => {
						setLayout(e.target.value);
					}}
				>
					{items.map((item) => (
						<option className="p-2" value={item.value} key={item.id}>
							{item.name}
						</option>
					))}
				</select>
				<p className="mx-6">Select Meals : </p>
				<input
					type="text"
					placeholder="Meal 1"
					name="meal1"
					className="mr-2 p-5"
					onChange={(e) => setFood({ ...foodOps, meal1: e.target.value })}
				/>
				<input
					type="text"
					placeholder="Meal 2"
					name="meal2"
					className="ml-2 p-5"
					onChange={(e) => setFood({ ...foodOps, meal2: e.target.value })}
				/>

				<ReactToPrint
					trigger={() => {
						return (
							<button className="bg-green-200 ml-3 p-5" onClick={switchMode}>
								Download Layout
							</button>
						);
					}}
					content={() => layoutRef.current}
					documentTitle={data.event}
				/>
			</div>
			<layoutContext.Provider value={savedLayout}>
				<LayoutProvider
					meals={foodOps}
					layoutType={layout}
					booking={data}
					ref={layoutRef}
				/>
			</layoutContext.Provider>
		</>
	);
};

export default Home;

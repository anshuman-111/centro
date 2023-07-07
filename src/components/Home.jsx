import { useContext, useRef, useState } from "react";
import Papa from "papaparse";
import dataProc from "./dataProc";
import LayoutProvider from "./LayoutProvider";
import layoutContext from "./utils/layoutContext.js";
import ReactToPrint from "react-to-print";

const Home = () => {
	const layoutRef = useRef();
	const savedLayout = useContext(layoutContext);
	savedLayout.layoutType = "";
	const items = [
		{
			id: 1,
			name: "Full Sorrento Room",
			value: "full",
		},
		{
			id: 2,
			name: "Comedy Layout",
			value: "comedy",
		},
		{
			id: 3,
			name: "Dance Layout",
			value: "dance",
		},
	];

	const [data, setData] = useState([]);
	const handleUpload = (e) => {
		if (e.target.files.length > 0) {
			Papa.parse(e.target.files[0], {
				header: true,
				complete: (results) => {
					setData(dataProc(results.data));
				},
			});
		}
	};

	const handleLayoutSave = () => {};

	const [layout, setLayout] = useState(items[0].value);
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
				<button className="bg-green-200 ml-3 p-5" onClick={handleLayoutSave}>
					Save Layout
				</button>
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

import { useContext, useState } from "react";
import Papa from "papaparse";
import dataProc from "./dataProc";
import LayoutProvider from "./LayoutProvider";
import layoutContext from "./utils/layoutContext.js";

const Home = () => {
	const savedLayout = useContext(layoutContext);
	savedLayout.layoutType = "test";
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

	const food = [
		{
			id: 1,
			name: "Pork",
			value: "pork",
		},
		{
			id: 2,
			name: "Chicken",
			value: "chicken",
		},
		{
			id: 3,
			name: "Fish",
			value: "fish",
		},
		{
			id: 4,
			name: "Veal",
			value: "veal",
		},
		{
			id: 5,
			name: "Lamb",
			value: "lamb",
		},
		{
			id: 6,
			name: "Beef",
			value: "beef",
		},
	];
	const [data, setData] = useState([]);
	const handleUpload = (e) => {
		Papa.parse(e.target.files[0], {
			header: true,
			complete: (results) => {
				setData(dataProc(results.data));
			},
		});
	};

	const handleMealSave = () => {};

	const [layout, setLayout] = useState(items[0].value);
	const [foodOps, setFood] = useState({ meal1: "", meal2: "" });
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
				<button className="bg-green-200 ml-3 p-5" onClick={handleMealSave}>
					Save Meals
				</button>
			</div>
			<layoutContext.Provider value={savedLayout}>
				<LayoutProvider meals={foodOps} layoutType={layout} booking={data} />
			</layoutContext.Provider>
		</>
	);
};

export default Home;

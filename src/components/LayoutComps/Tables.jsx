import React, { useContext, useEffect, useState } from "react";
import layoutContext from "../utils/layoutContext.js";

const Tables = (props) => {
	const savedLayout = useContext(layoutContext);
	const [selected, setSelected] = useState(false);
	const [tableSize, setTableSize] = useState("w-fit h-fit rounded-full");
	const [tableBg, setTableBg] = useState("bg-white");
	const [tableSpacing, setSpacing] = useState("");
	const [dietries, setDiets] = useState([]);
	const [tableDataState, setTableData] = useState(props?.tableData);

	const handleTableClick = () => {
		props.openModal({
			tableNo: tableDataState?.tableNo,
			people: tableDataState?.people,
			diet: dietries,
			type: tableDataState?.type,
		});
	};

	useEffect(() => {
		if (tableDataState?.people >= 10) {
			setTableSize("w-28 h-28 rounded-full");
		} else if (tableDataState?.people <= 9 && tableDataState?.people > 6) {
			setTableSize("w-24 h-24 rounded-full");
		} else if (tableDataState?.people <= 6 && tableDataState?.people > 4) {
			setTableSize("w-24 h-24 rounded-full");
		} else {
			setTableSize("w-20 h-20 rounded-full");
		}
	}, [props]);

	useEffect(() => {
		if (savedLayout.layoutType === "dance") {
			setSpacing("mb-3 pt-3");
		} else {
			setSpacing("mb-5 pt-5");
		}

		const shortDiet = shortner(tableDataState?.diet);
		if (tableDataState?.type === "mixed") {
			setTableBg("bg-amber-100");
			setDiets(shortDiet);
		} else if (
			tableDataState?.diet !== "" &&
			tableDataState?.diet !== "no" &&
			tableDataState?.type === "ds"
		) {
			setTableBg("bg-red-200");
			setDiets(shortDiet);
		} else if (tableDataState?.type === "s") {
			setTableBg("bg-gray-300");
			setDiets("Show only");
		} else {
			setTableBg("bg-white");
			setDiets("");
		}
	}, [props]);

	const shortner = (diet) => {
		var shortDiet = diet.replace(";", " ").replace(":", " ").replace("-", " ");

		var shortDiet = shortDiet
			.replace("vegetarian", "veg")
			.replace("gluten free", "gf")
			.replace("lactose free", "df")
			.replace("gluten intolerant", "gf")
			.replace("lactose intolerant", "df")
			.replace("dairy free", "df")
			.replace("one", "1x")
			.replace("two", "2x")
			.replace("three", "3x")
			.replace("four", "4x")
			.trim();
		return shortDiet;
	};

	return (
		<>
			<div className={`flex flex-col w-full ${tableSpacing}`}>
				<p className="text-center text-sm font-bold">
					{tableDataState?.people}
					{tableDataState?.type === "s" ? (
						""
					) : (
						<span className="text-xs">{`  (${tableDataState?.eatCount} Eating)`}</span>
					)}
				</p>
				<div
					className={` ${tableSize} ${tableBg} inline-block border-black border-2 text-lg pt-2 font-bold text-center m-auto hover:bg-green-100 `}
					onClick={handleTableClick}
				>
					<p className="text-[1rem] tracking-tighter leading-snug">
						T{tableDataState?.tableNo}
					</p>
					<p className="text-[12px] tracking-tighter leading-tight">
						{dietries}
					</p>
				</div>
			</div>
		</>
	);
};

export default Tables;

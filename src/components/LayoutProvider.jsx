import React, { forwardRef, useContext, useEffect, useState } from "react";
import LayoutFull from "./Layouts/LayoutFull";
import LayoutComedy from "./Layouts/LayoutComedy";
import LayoutDance from "./Layouts/LayoutDance";
import layoutContext from "./utils/layoutContext.js";

const LayoutProvider = forwardRef((props, ref) => {
	const [render, setRender] = useState("");
	const [flatData, setFlat] = useState([]);

	useEffect(() => {
		setRender(props.layoutType);
	}, [props]);

	const savedLayout = useContext(layoutContext);
	useEffect(() => {
		const dataFlattener = (data) => {
			const tablesList = [];
			data?.forEach((table) => {
				const tableObj = {
					tableNo: table.tableNo,
					diet: "",
					bookingName: "",
					people: 0,
					type: "",
					eatCount: 0,
				};
				const types = [];
				table?.data?.forEach((person) => {
					tableObj.people += 1;
					types.push(person.type);
					if (person.diet.toString() !== "no") {
						if (
							tableObj.diet === person.diet &&
							person.name !== tableObj.bookingName
						) {
							tableObj.diet += person.diet;
						} else {
							tableObj.diet = person.diet;
						}
					}

					if (person.type === "ds") {
						tableObj.eatCount += 1;
					}
					tableObj.bookingName = person.name;
				});
				const typeSet = new Set(types);
				if (typeSet.size > 1) {
					tableObj.type = "mixed";
				} else {
					tableObj.type = typeSet.values().next().value;
				}
				tablesList.push(tableObj);
			});
			setFlat(tablesList);
		};

		dataFlattener(props?.booking?.procData);
	}, [props]);

	savedLayout.tableData = flatData;
	savedLayout.showName = props?.booking?.event;

	return (
		<div ref={ref} className="flex flex-col justify-center">
			<div className="border-2 w-[20cm] h-[29cm] my-5 border-black mx-auto">
				<div className="w-[21cm] flex flex-col">
					<div className="flex flex-row w-[19.87cm] align-bottom">
						<div className="w-1/12 h-10 text-center text-sm bg-gray-100 text-black">
							Bathroom
						</div>
						<div className="bg-white w-10/12 h-fit mx-auto text-black border-b-2 border-r-2 border-l-2 border-black text-center">
							<p className="text-md">STAGE</p>
							<p className="text-lg font-bold">{props?.booking?.event}</p>
							<p className="text-md ml-[10rem] capitalize text-start mx-auto">
								Meal 1: {props?.meals?.meal1}
							</p>
							<p className="text-md ml-[10rem] capitalize text-start mx-auto">
								Meal 2: {props?.meals?.meal2}
							</p>

							<span>
								Total: &nbsp;
								<span className="font-bold">
									{props?.booking?.showMetrics?.total} &nbsp;|&nbsp;
								</span>
								Dinner and Show: &nbsp;
								<span className="font-bold">
									{props?.booking?.showMetrics?.ds} &nbsp;|&nbsp;
								</span>
								Show Only: &nbsp;
								<span className="font-bold">
									{props?.booking?.showMetrics?.s}
								</span>
							</span>
							<div className="flex flex-col absolute h-24 w-20 -translate-x-0 -translate-y-[6.35rem]">
								<div className="bg-amber-100 w-full h-6 border-black border-2 text-center leading-snug text-sm">
									Mixed
								</div>
								<div className="bg-red-300 w-full h-6 border-black border-2 text-sm">
									Dietries
								</div>
								<div className="bg-blue-200 w-full h-6 border-black border-2 text-sm">
									Show Only
								</div>
							</div>
						</div>
						<div className="w-1/12 text-sm h-10 text-center overflow-clip bg-gray-100 text-black">
							Kitchen
						</div>
					</div>
				</div>
				{flatData.length >= 1 ? (
					render === "full" ? (
						<LayoutFull data={flatData} eventName={props?.booking?.event} />
					) : render === "comedy" ? (
						<LayoutComedy data={flatData} eventName={props?.booking?.event} />
					) : render === "dance" ? (
						<LayoutDance data={flatData} eventName={props?.booking?.event} />
					) : (
						<div className="text-4xl">
							After you upload the file, the layout will appear here
						</div>
					)
				) : (
					<div className="text-2xl text-center">
						After you upload the file, the layout will appear here
					</div>
				)}
				<div className="bg-gray-500 w-4 -z-10 h-14 translate-y-[34rem]">
					Entry
				</div>
				<div className="mt-4 w-8 h-20 -translate-x-[0] translate-y-[50rem] bg-gray-500">
					Bar
				</div>
				<div className="mt-4 w-14 h-14 bg-gray-500 translate-x-[43rem] translate-y-[45rem]">
					Mixing Desk
				</div>
			</div>
		</div>
	);
});

export default LayoutProvider;

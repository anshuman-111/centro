import React, { forwardRef, useContext, useEffect, useState } from "react";
import LayoutFull from "./Layouts/LayoutFull";
import LayoutComedy from "./Layouts/LayoutComedy";
import LayoutDance from "./Layouts/LayoutDance";
import layoutContext from "./utils/layoutContext.js";


const LayoutProvider = forwardRef(({ booking, meals, layoutType }, ref) => {
	const [render, setRender] = useState("empty");
	const [data, setData] = useState(booking?.procData);

	useEffect(() => {
		setRender(layoutType);
		setData(booking?.procData);
	}, [layoutType, booking]);

	return (
		<div ref={ref} className="flex flex-col justify-center mx-auto w-1/2">
			<div className="border-2 w-[20cm] h-[29cm] my-5 border-black ml-20">
				<div className="w-[21cm] flex flex-col">
					<div className="flex flex-row w-[19.87cm] align-bottom">
						<div className="w-1/12 h-10 text-center text-sm bg-gray-100 text-black">
							Bathroom
						</div>
						<div className="bg-white w-10/12 h-fit mx-auto text-black border-b-2 border-r-2 border-l-2 border-black text-center">
							<p className="text-md">STAGE</p>
							<p className="text-lg font-bold">{booking?.event}</p>
							<p className="text-md ml-[10rem] capitalize text-start mx-auto">
								Meal 1: {meals?.meal1}
							</p>
							<p className="text-md ml-[10rem] capitalize text-start mx-auto">
								Meal 2: {meals?.meal2}
							</p>

							<span>
								Total: &nbsp;
								<span className="font-bold">
									{booking?.showMetrics?.total} &nbsp;|&nbsp;
								</span>
								Dinner and Show: &nbsp;
								<span className="font-bold">
									{booking?.showMetrics?.ds} &nbsp;|&nbsp;
								</span>
								Show Only: &nbsp;
								<span className="font-bold">{booking?.showMetrics?.s}</span>
							</span>
							<div className="flex flex-col absolute h-2 w-20 -translate-x-0 -translate-y-[6.05rem]">
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
				{data?.length >= 1 ? (
					render === "full" ? (
						<LayoutFull data={data} eventName={booking?.event} />
					) : render === "comedy" ? (
						<LayoutComedy data={data} eventName={booking?.event} />
					) : render === "dance" ? (
						<LayoutDance data={data} eventName={booking?.event} />
					) : (
						<div className="text-4xl text-center mt-10">
							Select Layout Type To See Results
						</div>
					)
				) : (
					<div className="text-2xl text-left ml-36">
						<ol prefix="Step">
							<li>Upload your Bookings CSV file</li>
							<li>Select Layout Type</li>
							<li>Add Meals if applicable</li>
							<li>Adjust dietries for tables if necessary</li>
							<li>Print layout</li>
						</ol>
					</div>
				)}
				{(data?.length & (render == "empty")) < 1 ? (
					<></>
				) : (
					<>
						<div className="bg-gray-500 w-4 -z-10 h-14 translate-y-[34rem]">
							Entry
						</div>
						<div className="mt-4 w-8 h-20 -translate-x-[0] translate-y-[50rem] bg-gray-500">
							Bar
						</div>
						<div className="mt-4 w-14 h-14 bg-gray-500 translate-x-[43rem] translate-y-[45rem]">
							Mixing Desk
						</div>
					</>
				)}
			</div>
		</div>
	);
});

export default LayoutProvider;

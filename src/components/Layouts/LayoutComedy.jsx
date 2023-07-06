import React, { useContext, useEffect, useState } from "react";
import Tables from "../LayoutComps/Tables";
import Modal from "../LayoutComps/Modal";
import layoutContext from "../utils/layoutContext.js";

const LayoutComedy = (props) => {
	const savedLayout = useContext(layoutContext);
	savedLayout.tableData = props?.data;
	const [dataState, setDataState] = useState(savedLayout.tableData);
	const firstRow = dataState?.slice(0, 5);
	const secondRow = dataState?.slice(5, 9);
	const thirdRow = dataState?.slice(12, 17);
	const fourthRow = dataState?.slice(17, 21);
	const fifthRow = dataState?.slice(21, 25);
	const sixthRow = dataState?.slice(25, 28);
	const [showModal, setShowModal] = useState(false);
	const [modalInfo, setModalInfo] = useState(null);

	useEffect(() => {});
	const openModal = (info) => {
		setModalInfo(info);
		setShowModal(true);
		console.log("modal Click");
	};

	const closeModal = () => {
		setModalInfo(null);
		setShowModal(false);
	};

	const handleSaveChanges = (modalData) => {
		const copy = [...dataState];
		copy.forEach((element) => {
			if (
				element.tableNo === modalData.tableNo &&
				element.diet.toString() !== "no"
			) {
				element.diet = modalData.diet;
			}
		});
		savedLayout.tableData = copy;
		setDataState(copy);
	};

	const handleDeleteTable = (modalData) => {
		savedLayout?.tableData.forEach((element) => {});
	};
	return (
		<>
			{/* ADDING TABLES MODAL */}
			<div className="h-96 w-1/4 absolute bg-gray-300 -translate-x-[32.5rem] -translate-y-12 flex rounded-lg flex-col text-center">
				<h1 className="mt-4 mb-3 font-bold">Add new tables</h1>
				<input
					type="text"
					className="w-1/3 mx-auto bg-white text-center rounded-md h-10 mb-5 mt-2"
					placeholder="Table Number"
				/>
				<input
					type="text"
					className="w-1/3 mx-auto bg-white text-center rounded-md h-10 mb-5 mt-2"
					placeholder="Number of People"
				/>
				<input
					className="w-2/3 mx-auto bg-white rounded-md p-4 h-20 mb-5"
					placeholder="Dietries for Table"
				/>
				<button className="w-2/3 mx-auto bg-green-200 rounded-lg h-14">
					Add Table
				</button>
			</div>
			<div className="w-[20.92cm] h-[29.7cm] absolute">
				<p className="border-t-2 border-dashed border-red-600 mt-2"></p>
				<div className="flex flex-row-reverse w-full mx-auto">
					{firstRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse mx-auto ">
					{secondRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse">
					{thirdRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse">
					{fourthRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600 h-2"></p>

				<div className="flex flex-row-reverse">
					{fifthRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse flex-wrap mx-auto">
					{sixthRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
			</div>
			{/* CHANGING TABLE INFO MODAL */}
			{showModal ? (
				<Modal
					info={modalInfo}
					closeModal={closeModal}
					save={handleSaveChanges}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default LayoutComedy;

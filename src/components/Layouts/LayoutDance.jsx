import React, { useContext, useEffect, useState } from "react";
import Tables from "../LayoutComps/Tables";
import Modal from "../LayoutComps/Modal";
import layoutContext from "../utils/layoutContext.js";

const LayoutDance = (props) => {
	const savedLayout = useContext(layoutContext);
	savedLayout.tableData = props?.data;
	const [dataState, setDataState] = useState(savedLayout.tableData);
	const firstRight = dataState?.slice(0, 3);
	const firstRow = dataState?.slice(3, 6);
	const firstLeft = dataState?.slice(6, 9);
	const secondRow = dataState?.slice(9, 14);
	const thirdRow = dataState?.slice(14, 19);
	const fourthRow = dataState?.slice(19, 22);
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
				<div className="grid grid-cols-3 grid-flow-col-dense mx-auto">
					<div className="flex flex-col-reverse w-full ">
						{firstLeft?.map((table) => (
							<Tables
								tableData={table}
								key={table.tableNo}
								openModal={openModal}
							/>
						))}
					</div>
					<div className="w-96 h-96 -translate-x-[4rem] bg-gray-500 mx-auto"></div>
					<div className="flex flex-col w-full">
						{firstRight?.map((table) => (
							<Tables
								tableData={table}
								key={table.tableNo}
								openModal={openModal}
							/>
						))}
					</div>
				</div>

				<div className="flex flex-row-reverse mx-auto ">
					{firstRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>

				<div className="flex flex-row-reverse">
					{secondRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>

				<div className="flex flex-row-reverse">
					{thirdRow?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>

				<div className="flex flex-row-reverse mx-auto">
					{fourthRow?.map((table) => (
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

export default LayoutDance;
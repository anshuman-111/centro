import React, { useContext, useEffect, useState } from "react";
import Tables from "../LayoutComps/Tables";
import Modal from "../LayoutComps/Modal";
import layoutContext from "../utils/layoutContext.js";

const LayoutDance = (props) => {
	const savedLayout = useContext(layoutContext);
	//savedLayout.tableData = props?.data;
	const [dataState, setDataState] = useState(props?.data);
	const firstRight = dataState?.slice(0, 2);
	const firstRow = dataState?.slice(2, 7);
	const firstLeft = dataState?.slice(7, 9);
	const secondRow = dataState?.slice(9, 14);
	const thirdRow = dataState?.slice(14, 19);
	const fourthRow = dataState?.slice(19, 22);
	const [showModal, setShowModal] = useState(false);
	const [modalInfo, setModalInfo] = useState(null);


	const openModal = (info) => {
		setModalInfo(info);
		setShowModal(true);
	};

	const closeModal = () => {
		setModalInfo(null);
		setShowModal(false);
	};

	const handleSaveChanges = (modalData) => {
		const copy = [...dataState];
		copy.forEach((element) => {
			if (element.tableNo === modalData.tableNo) {
				if (modalData.diet === "") {
					element.diet = "";
				} else {
					element.diet = modalData.diet;
				}
			}
		});
		savedLayout.tableData = copy;
		setDataState(copy);
		
		setShowModal(false);
	};

	const handleDeleteTable = (modalData) => {
		if (window.confirm(`Table Number ${modalData.tableNo} will be deleted`)) {
			const copy = [...dataState];
			
			const filtered = copy.filter(
				(element) => element.tableNo !== modalData.tableNo,
			);
			savedLayout.tableData = filtered;
			setDataState(filtered);
			setShowModal(false);
		}
	};
	return (
		<>
			<div className="w-96 h-80 translate-x-[11.9rem] bg-white border-b-2 border-x-2 border-black mx-auto absolute -z-10"></div>
			<div className="w-[19.95cm] h-[29cm] absolute">
				<div className="grid grid-cols-2 gap-[26rem] grid-flow-col-dense mx-auto">
					<div className="flex flex-col-reverse w-full ">
						{firstLeft?.map((table) => (
							<Tables
								tableData={table}
								key={table.tableNo}
								openModal={openModal}
							/>
						))}
					</div>

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

				<div className="flex flex-row-reverse w-[38rem] mx-auto ">
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
					deleteTable={handleDeleteTable}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default LayoutDance;

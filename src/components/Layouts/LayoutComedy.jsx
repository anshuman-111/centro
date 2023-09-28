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
			<div className="w-[19.95cm] h-[29cm] absolute">
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
				<div className="flex flex-row-reverse mx-auto">
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
					deleteTable={handleDeleteTable}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default LayoutComedy;

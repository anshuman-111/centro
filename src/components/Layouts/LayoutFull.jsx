import React, { useContext, useEffect, useState } from "react";
import Tables from "../LayoutComps/Tables";
import Modal from "../LayoutComps/Modal";
import layoutContext from "../utils/layoutContext.js";

const LayoutFull = (props) => {
	const savedLayout = useContext(layoutContext);
	const [dataState, setDataState] = useState(props?.data);
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
			console.log(modalData.tableNo);
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
			<div className="w-[19.95cm] h-[29.1cm] absolute">
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse w-full -my-2">
					{dataState?.slice(0, 5)?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse mx-auto -my-2">
					{dataState?.slice(5, 12)?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse">
					{dataState?.slice(12, 17)?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600"></p>
				<div className="flex flex-row-reverse">
					{dataState?.slice(17, 21)?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600 h-2"></p>

				<div className="flex flex-row-reverse">
					{dataState?.slice(21, 27)?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<p className="border-t-2 border-dashed border-red-600 h-2"></p>
				<div className="flex flex-row-reverse mx-auto">
					{dataState?.slice(27, 31)?.map((table) => (
						<Tables
							tableData={table}
							key={table.tableNo}
							openModal={openModal}
						/>
					))}
				</div>
				<div className="flex flex-row-reverse mx-auto -mt-5">
					{dataState?.slice(31)?.map((table) => (
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

export default LayoutFull;

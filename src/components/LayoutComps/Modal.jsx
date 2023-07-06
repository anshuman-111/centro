import React, { useContext, useEffect, useState } from "react";
import layoutContext from "../utils/layoutContext.js";

const Modal = ({ info, closeModal, save }) => {
	const [modalData, setModalData] = useState({
		tableNo: 0,
		people: 0,
		diet: "",
	});

	useEffect(() => {
		setModalData(info);
	}, [info]);
	return (
		<div className="h-96 w-96 absolute bg-gray-300 translate-x-[55rem] -translate-y-20 flex flex-col rounded-lg text-center">
			<>
				<h1 className="mt-10 font-bold">Details - Table No. {info?.tableNo}</h1>
				<input
					type="text"
					className="w-1/3 mx-auto bg-white text-center rounded-md h-10 mb-5 mt-2"
					placeholder="Number of People"
					defaultValue={info?.people}
					value={modalData.people}
					onChange={(e) => {
						setModalData({ ...modalData, people: e.target.value });
					}}
				/>
				<textarea
					className="w-2/3 mx-auto bg-white rounded-md p-4 h-fit mb-5"
					placeholder="Dietries for Table"
					defaultValue={info?.diet}
					value={modalData.diet}
					onChange={(e) => {
						setModalData({ ...modalData, diet: e.target.value });
					}}
				/>
				<button
					className="w-2/3 mx-auto bg-green-200 rounded-lg h-14 mb-2"
					onClick={() => save(modalData)}
				>
					Save Changes
				</button>
				<button className="w-2/3 mx-auto bg-red-200 rounded-lg h-14 mb-2">
					Delete Table
				</button>
			</>
		</div>
	);
};

export default Modal;

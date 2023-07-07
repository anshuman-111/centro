import React, { useEffect, useState } from "react";

const Modal = ({ info, closeModal, save, deleteTable }) => {
	const [modalData, setModalData] = useState({
		tableNo: 0,
		people: 0,
		diet: "",
	});

	useEffect(() => {
		setModalData(info);
	}, [info]);
	return (
		<div className="h-[26rem] w-96 absolute bg-gray-300 translate-x-[55rem] translate-y-10 flex flex-col rounded-lg">
			<>
				<p
					className="font-bold text-lg text-end mr-4 cursor-pointer"
					onClick={closeModal}
				>
					x
				</p>

				<h1 className="font-bold text-center underline">
					Details - Table No. {info?.tableNo}
				</h1>
				<p className="font-bold text-red-600 ml-16">
					Number of People on Table {info?.tableNo}
				</p>
				<p className="font-bold text-red-600 ml-16">
					{info?.type === "ds" ? (
						<>Dinner and Show</>
					) : info?.type === "s" ? (
						<>Show Only</>
					) : (
						<>Mixed</>
					)}
				</p>
				<input
					type="text"
					className="w-1/3 mx-auto bg-white text-center rounded-md h-10 mb-5 mt-2"
					placeholder="Number of People"
					value={modalData.people}
					onChange={(e) => {
						if (e.target.value.length === 0) {
							setModalData({ ...modalData, people: 0 });
						} else {
							setModalData({ ...modalData, people: e.target.value });
						}
					}}
				/>
				<p className="font-bold text-red-600 ml-16">
					Dietries for Table {info?.tableNo}
				</p>
				{info?.type === "s" ? (
					<></>
				) : (
					<textarea
						className="w-2/3 mx-auto bg-white rounded-md p-4 h-full mb-5"
						placeholder="Dietries for Table"
						value={modalData.diet}
						onChange={(e) => {
							if (e.target.value.length === 0) {
								setModalData({ ...modalData, diet: "" });
							} else {
								setModalData({ ...modalData, diet: e.target.value });
							}
						}}
					/>
				)}

				<button
					className="w-2/3 mx-auto bg-green-200 rounded-lg h-14 mb-2"
					onClick={() => save(modalData)}
				>
					Save Changes
				</button>
				<button
					className="w-2/3 mx-auto bg-red-200 rounded-lg h-14 mb-8"
					onClick={() => deleteTable(modalData)}
				>
					Delete Table
				</button>
			</>
		</div>
	);
};

export default Modal;

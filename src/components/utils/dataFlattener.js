import { restructureTableData } from "./restructureTableData";

export const dataFlattener = (data, setFlat) => {
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
    return restructureTableData(tablesList);
};
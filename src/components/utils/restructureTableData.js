export const restructureTableData = (tables, setFlat) => {
    const restructuredData = [];

    var lastSeenTable = 0;
    tables.forEach((table) => {
        if (table.tableNo !== lastSeenTable + 1) {
            const length = table.tableNo - lastSeenTable;
            for (let index = 1; index < length; index++) {
                restructuredData.push({
                    tableNo: lastSeenTable + index,
                    bookingName: "",
                    diet: "",
                    eatCount: 0,
                    people: 0,
                    type: "",
                });
            }
            lastSeenTable = lastSeenTable + length - 1;
        }
        restructuredData.push(table);
        lastSeenTable++;
    });

    return restructuredData;
};
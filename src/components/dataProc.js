

// Read CSV File

import { dataFlattener } from './utils/dataFlattener'


const dataProc = (rawData) => {
    const dataForge = require('data-forge')
    var data = new dataForge.DataFrame(rawData)
    // Get event Name
    const eventName = data.getSeries('Event Name').head(1).toArray()[0]
    var dietColName = ''
    for (const col of data.getColumns()){
        
     if(col.name.toString().toLowerCase().includes('dietary')){
        dietColName = col.name
         data = data.withSeries({ 'diet' : col.series})
     }
    }
    data = data.dropSeries(dietColName)
   
    // Convert Column Names to more readable format
    data = data.renameSeries({'Booking First Name' : 'fn', 'Booking Last Name' : 'ln', 'Number Of Tickets' : 'tickNum', 'Ticket Type' : 'type', 'Section' : 'table', 'Date Booked (UTC+10)' : 'bookDate'})
    // Remove Unnecessary Columns
    data = data.transformSeries({
        diet: value=>value.toString().trim().toLowerCase(),
        fn: value=>value.toString().trim(),
        ln: value=>value.toString().trim(),
        type: value=>value.toString().trim(),
        table: value=>value.toString().trim(),
    })
    data = data.dropSeries(['Void', 'Event Name'])
    // Combine First Name and Last Name column into One Name Column
    // Convert Table Name into integer after splitting it
    
    
    data = data.withSeries({
        'name': data=>data.select(row=>row.fn + ' ' + row.ln),
        'tableNo': data=>data.select(row=>Number(row.table.toString().split(' ')[1].toString()))
    })
    data = data.transformSeries({
        type: value => {
            if(value.toString().toLowerCase().includes('dinner')){
                return 'ds'
            }else{
                return 's'
            }
        }
    })

    const showMetrics = {
        'total' : data.count(),
        'ds' : data.where(row => row.type === 'ds').count(),
        's': data.where(row => row.type === 's').count()
    }
    data = data.transformSeries({
        diet: value => {
            if(value.toString().includes('no diet') || value.toString().includes('none') || value.toString() === 'na' ||  value.toString() === 'nil' || value.toString() === 'n/a' || value.toString().includes('no aller') || value.toString() === 'no' || value.toString().length <= 2  || value.toString().includes('no problem')){
                return 'no'
            }else{
                return value
            }
        }
    })

    data = data.dropSeries(['fn', 'ln', 'table', 'bookDate', 'tickNum'])
    var groups = data.groupBy(row=>row.tableNo).select(group=>{
        return {
            tableNo: group.first().tableNo,
            data: group.toArray()
        }
    })
    groups = groups.orderBy(row=>row.tableNo)
    const restructuredData = dataFlattener(groups.toArray())
  return { event: eventName, procData: restructuredData, showMetrics: showMetrics}
}
// export default data
export default dataProc






// Convert to DS and S

// Convert Null values to 'no'







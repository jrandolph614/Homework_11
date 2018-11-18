// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var table = d3.select("table");
var button = d3.select("#filter-btn")
var all_data = d3.select("#all_btn")
// YOUR CODE HERE!
all_data.on("click", function() {
    d3.event.preventDefault();
    tableData.forEach((ufoData)=> {
        var row = tbody.append("tr");
        Object.entries(ufoData).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
    }) 
})
});

button.on('click', function() {
    d3.event.preventDefault();
    tbody.text("");
    var inputElement= d3.select(".form-control");
    var inputData = inputElement.property("value");
    console.log(inputData);
    function filterDate(sight){
        return sight.datetime === inputData;
    };
    var dataReturn = tableData.filter(data => data.datetime === inputData);
    console.log(dataReturn);
    dataReturn.forEach((dateLoop)=> {
        var row = tbody.append("tr");
        Object.entries(dateLoop).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
            });
    });
});


/*
button.on("click",function() {
function filterTable() {
    d3.event.preventDefault()
    var inputElement= d3.select("form-control");
    var inputData = inputElement.property('value');
    console.log(inputData);
function filterDate(sight){
    return sight.datetime === inputData;
};
var dataReturn = tableData.filter(filterDate);
console.log(dataReturn)
dataReturn.forEach((ufoData)=> {
    var row = tbody.append("tr");
    Object.entries(ufoData).forEach(([key, value]) => {
        var cell = tbody.append("td");
        cell.text(value);

    }); 
});
}});
*/


//function filterList(){
//var options = {
//    valueNames: ['datetime', 'city', 'state',
//'country', 'shape', 'durationMinutes', 'comments']
//}
//var userList = new List('ufo_filter', options)}
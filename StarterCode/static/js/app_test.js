function makeTable() {
    var data, sort_by, filter_cols;
    var table;
    var dispatcher = d3.dispatch('highlight', 'select')
    function _table(targetDiv) {
        var tableSelect = targetDiv.append("table")
            .attr("class", "display compact")
            .attr("id", "ufo_table")
            .style("visibility","hidden");
        var colnames = Object.keys(data[0]);
            if (typeof filter_cols !== 'undefined'){
                colnames = colnames.filter(function (e){
                    return filter_cols.indexof(e) <0;
                });
            }
        var headSelect = tableSelect.append("thead");
        headSelect.append("tr")
            .selectAll('td')
            .data(colnames).enter()
                .append('td')
                .html(function(d) {return d; });
            if(typeof sort_by !== 'undefined'){
                sortby[0] = colnames.indexOf(sort_by[0]);
                sort_by = [sort_by];
            }
        $(document).ready(function (){
            table = $("#ufo_table").DataTable({
                data: data,
                columns: colnames.map(function(e) {return {data: e};}),
                "bLengthChange": false,
                "bDeferRender": true,
                "order": sort_by
            });
            tableSelect.style("visibility", "visible");
        $("#ufo_table tbody")
        .on( 'mouseover', 'tr', function () { highlight(this, true); } )
        .on( 'mouseleave', 'tr', function () { highlight(this, false); } )
        .on('click', 'tr', function () { select(this); });
        });   
    }
    function highlight(row, on_off){
        if(typeof on_off === 'undefined'){
            on_off = !d3.select(row).classed('highlight');
        }
        d3.select(row).classed('highlight', on_off);
        dispatcher.highlight(table.rows(row).data()[0], on_off);
    }
    function select(row, on_off) {
        if(typeof on_off === 'undefined'){
            on_off = !d3.select(row).classed('selected');
        }
        d3.select(row).classed('selected', on_off);
        dispatcher.select(table.rows(row).data()[0], on_off);
    }
    _table.datum = function(_){
    if (!arguments.length) {return data;}
    data= _;
    return _table;
    };
    _table.filterCols = function(_){
    if (!arguments.length) {return filter_cols;}
    filter_cols =_;
    return _table;
    };
    _table.sort_by = function(colnames, ascending){
    if (!arguments.length) {return sort_by;}
        sort_by = [];
        sort_by[0] = colname;
        sort_by[1] = ascending ? 'asc': 'desc';
    return _table;
    };
    d3.rebind(_table, dispatcher, 'on');
    return _table;
}
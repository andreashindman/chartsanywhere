function init(s) {
    Tabletop.init( { key: s, 
                     callback: drawChart,
                     simpleSheet: true } );
}

// returns columns that should be visualized
function getColumns(d) {
    var c = []
    for (var i in d[0]) {
        if (!["date"].includes(i)) {
            c.push(i);
        }
    }
    return c; 
}

function handleMouseOver(d, i) {
    d3.select(this)
        .attr("r", 7);

    var cx = d3.select(this).attr("cx");
    var cy = d3.select(this).attr("cy");
    var val = d3.select(this).attr("value");
    var name = d3.select(this).attr("name");
    
    svg.append("text")
        .attr("id", "tooltip")
        .attr("x", cx - 70)
        .attr("y", cy - 15)
        .attr("fill", "grey")
        .style("font-size", "14px")
        .text(name + ": " + val);	
}

function handleMouseOut(d, i) {
    d3.select(this)
        .attr("r", 5);

    var cx = d3.select(this).attr("cx");
    var cy = d3.select(this).attr("cy");

    d3.select("#tooltip").remove();
}

function getMax(d, v) {
    var max;
    for (var i=0; i < d.length; i++) {
        if (max == null || parseInt(d[i][v]) > parseInt(max[v]))
            max = d[i];
    }
    return max;
}

// set the dimensions and margins of the graph
var margin = {top: 120, right: 20, bottom: 90, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("id", "chart-area")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "draw-area")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

function drawChart(data, tabletop) {
    var ranges = getColumns(data); // get name columns
    
    // scale the range of data in the domains
    x.domain(data.map(function(d) { return d.date; }));
    
    var c = [];
    ranges.forEach((n) => c.push(getMax(data, n)[n]));
    y.domain([0, d3.max(c)]);
    
    // color scale function
    var colorScale = d3.scaleOrdinal().domain(ranges).range(d3.schemeTableau10);

    // color legend
    var colorLegend = d3.legendColor()
        .shape("circle")
        .shapePadding(5)
        .scale(colorScale);
    
    svg.append("g")
        .attr("transform", function(d) { return "translate(30, 20)" })
        .attr("class", "legend")
        .call(colorLegend);

    for (var i in ranges) {
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", colorScale(ranges[i]))
            .attr("stroke-width", 3)
            .attr("d", d3.line() // .curve(d3.curveBasis)
                  .x(function(d) { return x(d.date) + x.bandwidth() / 2 })
                  .y(function(d) { return y(d[ranges[i]]) }));

        svg.selectAll("circleMarkers")
            .data(data)
            .enter()
            .append("circle")
            .attr("fill", colorScale(ranges[i]))
            .attr("stroke", "none")
            .attr("cx", function(d) { return x(d.date) + x.bandwidth() / 2 })
            .attr("cy", function(d) { return y(d[ranges[i]]) } )
            .attr("r", 5)
            .attr("value", function(d) { return d[ranges[i]] } )
            .attr("name", ranges[i])
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
    }
    
    // add the x axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-65)" 
        });

    // add the y axis
    svg.append("g").call(d3.axisLeft(y));

    // chartsanywhere.com specific code: hide loader
    document.getElementById('loader').style.display = "none";

} 

function setupChart() {
    var googleSheetURL = document.getElementById("sheetsURL").value;
    // var googleSheetURL = 'https://docs.google.com/spreadsheets/d/1i2VsyFFcLQb-wC1nzh8sIKp70_yrns7rvj-H9myBDtg/edit?usp=sharing';
    
    removeContent();
    init(googleSheetURL);
    //readTextFile("drawChart.js");
    addStringToPage(preprocessOutputCode(setd3ChartString()));
}

function removeContent() {
    document.getElementById("chart").innerHTML = "";
    document.getElementById("js-text").textContent = "";
}

function addStringToPage(s) {
    document.getElementById("js-text").textContent = s;
}

// Beautify and modify the string for output
function preprocessOutputCode(s) {
    return js_beautify(s)
  
}

// CORS issues
// function readTextFile(file) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4) {
//             if (rawFile.status === 200 || rawFile.status == 0) {
//                 var allText = rawFile.responseText;
//                 addStringToPage(allText);
//             }
//         }
//     };
//     rawFile.open("GET", file);
//     rawFile.send()
// }


function setd3ChartString() {
    return `function init() {Tabletop.init( { key: \"${document.getElementById("sheetsURL").value}\", callback: drawChart, simpleSheet: true } );} function getColumns(d) {var c = [] for (var i in d[0]) {if (![\"date\"].includes(i)) {c.push(i);}} return c;} function handleMouseOver(d, i) {d3.select(this) .attr(\"r\", 7); var cx = d3.select(this).attr(\"cx\"); var cy = d3.select(this).attr(\"cy\"); var val = d3.select(this).attr(\"value\"); var name = d3.select(this).attr(\"name\"); svg.append(\"text\") .attr(\"id\", \"tooltip\") .attr(\"x\", cx - 70) .attr(\"y\", cy - 15) .attr(\"fill\", \"grey\") .style(\"font-size\", \"14px\") .text(name + \": \" + val);} function handleMouseOut(d, i) {d3.select(this) .attr(\"r\", 5); var cx = d3.select(this).attr(\"cx\"); var cy = d3.select(this).attr(\"cy\"); d3.select(\"#tooltip\").remove();} function getMax(d, v) {var max; for (var i=0; i < d.length; i++) {if (max == null || parseInt(d[i][v]) > parseInt(max[v])) max = d[i];} return max;} var margin = {top: 120, right: 20, bottom: 90, left: 50}, width = 960 - margin.left - margin.right, height = 500 - margin.top - margin.bottom; var x = d3.scaleBand() .range([0, width]) .padding(0.1); var y = d3.scaleLinear() .range([height, 0]); var svg = d3.select(\"body\").append(\"svg\") .attr(\"class\", \"chart\") .attr(\"width\", width + margin.left + margin.right) .attr(\"height\", height + margin.top + margin.bottom) .append(\"g\") .attr(\"id\", \"chart\") .attr(\"transform\",\"translate(\" + margin.left + \",\" + margin.top + \")\"); function drawChart(data, tabletop) {var ranges = getColumns(data); x.domain(data.map(function(d) { return d.date; })); var c = []; ranges.forEach((n) => c.push(getMax(data, n)[n])); y.domain([0, d3.max(c)]); var colorScale = d3.scaleOrdinal().domain(ranges).range(d3.schemeTableau10); var colorLegend = d3.legendColor() .shape(\"circle\") .shapePadding(5) .scale(colorScale); svg.append(\"g\") .attr(\"transform\", function(d) { return \"translate(30, 20)\" }) .attr(\"class\", \"legend\") .call(colorLegend); for (var i in ranges) {svg.append(\"path\") .datum(data) .attr(\"fill\", \"none\") .attr(\"stroke\", colorScale(ranges[i])) .attr(\"stroke-width\", 3) .attr(\"d\", d3.line() .x(function(d) { return x(d.date) + x.bandwidth() / 2 }) .y(function(d) { return y(d[ranges[i]]) })); svg.selectAll(\"circleMarkers\") .data(data) .enter() .append(\"circle\") .attr(\"fill\", colorScale(ranges[i])) .attr(\"stroke\", \"none\") .attr(\"cx\", function(d) { return x(d.date) + x.bandwidth() / 2 }) .attr(\"cy\", function(d) { return y(d[ranges[i]]) } ) .attr(\"r\", 5) .attr(\"value\", function(d) { return d[ranges[i]] } ) .attr(\"name\", ranges[i]) .on(\"mouseover\", handleMouseOver) .on(\"mouseout\", handleMouseOut);} svg.append(\"g\") .attr(\"transform\", \"translate(0,\" + height + \")\") .call(d3.axisBottom(x)) .selectAll(\"text\") .style(\"text-anchor\", \"end\") .attr(\"dx\", \"-.8em\") .attr(\"dy\", \".15em\") .attr(\"transform\", function(d) {return \"rotate(-65)\"}); svg.append(\"g\").call(d3.axisLeft(y));} init();`;
}

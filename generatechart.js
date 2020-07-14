function setupChart() {
    // var googleSheetURL = document.getElementById("sheetsURL").value;
    // var googleSheetURL = 'https://docs.google.com/spreadsheets/d/1i2VsyFFcLQb-wC1nzh8sIKp70_yrns7rvj-H9myBDtg/edit?usp=sharing';

    removeChart();
    init();
    readTextFile("./drawChart.js");
}
function removeChart() {
    console.log("This function should remove chart");
}

function addStringToPage(s) {
    var jsTextNode = document.createTextNode(s);
    document.getElementById("js-text").innerHTML = s;
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                console.log(allText);
                addStringToPage(allText);
            }
        }
    }
    rawFile.send(null)
}

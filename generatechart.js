function setupChart() {
    var googleSheetURL = document.getElementById("sheetsURL").value;
    // var googleSheetURL = 'https://docs.google.com/spreadsheets/d/1i2VsyFFcLQb-wC1nzh8sIKp70_yrns7rvj-H9myBDtg/edit?usp=sharing';
    init();
}
function addStringToPage(s) {
    var jsTextNode = document.createTextNode("teeeesting");
    document.getElementById("js-text").appendChild(jsTextNode);
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
                addStringToPage("alskdj");
            }
        }
    }
    rawFile.send(null)
}

readTextFile("./drawChart.js");


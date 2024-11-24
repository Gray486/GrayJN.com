document.getElementById("results").style.display = "none";

function calculate() {
    const GRADE_PAGE = document.getElementById("gradeInput").value;

    if (GRADE_PAGE == "Skip Navigation") {
        alert("ERROR: Please try copying your IC page again!");
    }

    let gradePageArr = GRADE_PAGE.split('\n');

    gradePageArr.splice(0, 4);

    let currentGPA = null;

    if (gradePageArr[0] == "GPA") {
        currentGPA = parseFloat(gradePageArr[2]);
        gradePageArr.splice(0, 3);
    }

    let classes = [];

    while (gradePageArr.indexOf("In-progress") > -1) {
        let index = gradePageArr.indexOf("In-progress");
        gradePageArr.splice(index, 1);
    }

    while (gradePageArr.length > 0) {
        let name = gradePageArr[0];
        let spliceNumSubtractor = 0;

        if (isNaN(parseFloat(gradePageArr[2]))) {
            spliceNumSubtractor = 2;
        }

        let percentage = gradePageArr[6 - spliceNumSubtractor];

        percentage = parseFloat(percentage.slice(1))

        classes.push({
            name: name,
            weighted: name.includes("AP") ? percentage + 10 : percentage,
            unweighted: percentage
        })

        if (isAny(gradePageArr[8-spliceNumSubtractor], ["A", "B", "C", "D", "E", "F"])) {
            if (!isNaN(parseFloat(gradePageArr[9-spliceNumSubtractor]?.slice(1)))) {
                gradePageArr.splice(0, 10-spliceNumSubtractor);
            } else {
                gradePageArr.splice(0, 9-spliceNumSubtractor);
            }
        } else {
            gradePageArr.splice(0, 8-spliceNumSubtractor);
        }
    }

    let unweightedGPA = 0;
    let weightedGPA = 0;

    for (let i = 0; i < classes.length; i++) {
        unweightedGPA += classes[i].unweighted;
        weightedGPA += classes[i].weighted;
    }

    unweightedGPA /= classes.length;
    weightedGPA /= classes.length;

    weightedGPA = Math.round(weightedGPA*1000)/1000
    unweightedGPA = Math.round(unweightedGPA*1000)/1000
    let weightedTotalGPA = Math.round((weightedGPA+currentGPA)/2*1000)/1000

    let table = '<tbody>'
    table += `<tr class="table-info"> <td scope="col">Unweighted Class Average<sup>1</sup></td> <td scope="col">${unweightedGPA}</td> </tr>`;
    table += `<tr class="table-info"> <td scope="col">Weighted Class Average<sup>1</sup></td> <td scope="col">${weightedGPA}</td> </tr>`;
    table += `<tr class="table-info"> <td scope="col">Weighted GPA<sup>2</sup></td> <td scope="col">${weightedTotalGPA}</td> </tr>`;
    table += `<tr> <td>IC Current Weighted GPA</td> <td>${currentGPA}</td> </tr>`;

    for (let i = 0; i < classes.length; i++) {
        table += `<tr> <td>${classes[i].name}</td> <td>${classes[i].weighted}</td> </tr>`;
    }

    table += "</tbody>"

    document.getElementById("results").innerHTML = table
    document.getElementById("results").style.display = "block";
}

function isAny(element, things) {
    for (let i = 0; i < things.length; i++) {
        if (element == things[i]) return true;
    }
    return false;
}
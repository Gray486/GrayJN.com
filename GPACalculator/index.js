document.getElementById("results").style.display = "none";

function calculate() {
    const GRADE_PAGE = document.getElementById("gradeInput").value;

    if (GRADE_PAGE == "Skip Navigation") {
        alert("ERROR: Please try copying your IC page again!");
    }

    let gradePageArr = GRADE_PAGE.split('\n');

    gradePageArr.splice(0, 4);

    let currentGPA = null;

    const PARTS_TO_REMOVE = ["A", "B", "C", "D", "E", "F", "Conduct", "In-progress", "Settings", "Grades Settings", "Hide dropped courses", "Hide rows without grades or assignments", "Activating these elements will cause content on the page to change.", ""]

    while (includesAny(gradePageArr, PARTS_TO_REMOVE) > -1) {
        let index = includesAny(gradePageArr, PARTS_TO_REMOVE);
        gradePageArr.splice(index, 1);
    }

    if (gradePageArr[0] == "GPA") {
        currentGPA = parseFloat(gradePageArr[2]);
        gradePageArr.splice(0, 3);
    }

    while (gradePageArr.indexOf("Progress") > -1) {
        let index = gradePageArr.indexOf("Progress");
        gradePageArr.splice(index, 3);
    }

    console.log(gradePageArr)

    let classes = []

    let runs = 0;
    while (gradePageArr.length > 0 && runs < 100) {
        runs++;
        
        console.log(gradePageArr)

        let name = gradePageArr[0];
        let percentage = parseFloat(gradePageArr[3].slice(1))
        let splice = 4;

        if (gradePageArr[4] && !isNaN(parseFloat(gradePageArr[4].slice(1)))) splice++;

        classes.push({
            name: name,
            weighted: name.includes("AP") ? percentage + 10 : percentage,
            unweighted: percentage
        })
        gradePageArr.splice(0, splice)
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
    if (currentGPA) {
        table += `<tr> <td>IC Current Weighted GPA</td> <td>${currentGPA}</td> </tr>`;
    }

    for (let i = 0; i < classes.length; i++) {
        table += `<tr> <td>${classes[i].name}</td> <td>${classes[i].weighted}</td> </tr>`;
    }

    table += "</tbody>"

    document.getElementById("results").innerHTML = table
    document.getElementById("results").style.display = "block";
}

function includesAny(list, things) {
    for (let i = 0; i < things.length; i++) {
        if (list.includes(things[i])) return list.indexOf(things[i]);
    }
    return -1;
}
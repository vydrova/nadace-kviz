let score = 0;
let selectCounter = 0;
let counter = 0;

function getType(i) {
    let typeOfQuestion = questions[i].type;
    return typeOfQuestion;
}

function getName(i) {
    let nameOfQuestion = questions[i].name;
    return nameOfQuestion;
}

function view(i) {
    let form = document.querySelector(".answers");
    let lastIndex = questions.length - 1;
    let table = document.querySelector(".results");

    if (i <= lastIndex) {
        let answersContent = "";
        let indexOfQuestion = i + 1;
        let name = getName(i);
        let type = getType(i);

        document.querySelector(".question").innerHTML = "<span>" + questions[i].content + "</span><hr>";

        if (type === "radio" || type === "checkbox") {
            questions[i].answers.forEach(function(item, index) {
                answersContent = answersContent + '<input type="' + type + '" name="' + name +
                    '" class="checked-answer" id="' + index + '"><label for="' + index + '">&nbsp;' + item.content + '</label><br>';
            });
            form.innerHTML = answersContent;
        }

        if (type === "img") {
            questions[i].answers.forEach(function(item, index) {
                let pathOfImg = item.path;
                let nameOfQuestion = questions[i].name;
                answersContent = answersContent + '<img src="' + pathOfImg + '" title="' + name + '" class="img-answer"> ';
            });
            form.innerHTML = answersContent;
            imgClick();
        }

        document.querySelector(".numerate").textContent = "Otázka: " + indexOfQuestion + "/" + (lastIndex + 1);

    } else if (i > lastIndex) {
        let resultsContent = table.innerHTML;

        document.querySelector(".question").innerHTML = "<span>Výsledky testu</span>";
        document.querySelector(".header-question").classList.add("hidden");
        form.classList.add("hidden");
        questions.forEach(function(item, index) {
            resultsContent = resultsContent + "<tr> <td>" + item.content +
                "</td> <td>" + item.score + "</td> <tr>";
        })
        resultsContent = resultsContent + "<tr> <td><b>" + "Celkový počet bodů</b>" +
            "</td> <td><b>" + score + "</b></td> <tr>";
        table.innerHTML = resultsContent;
        document.querySelector(".results").classList.remove("hidden");
        document.querySelector(".footer-question").classList.add("hidden");
    }

    if (i === lastIndex) {
        document.querySelector(".next").textContent = "Vyhodnotit test";
    }
}

view(counter);


function checkedSelect(i, name) {
    let questionScore = 0;
    selectCounter = 0;
    document.getElementsByName(name).forEach(function(item, index) {
        if (item.checked) {
            selectCounter = selectCounter + 1;
            if (questions[i].answers[index].correct) {
                score = score + 1;
                questionScore = questionScore + 1;
            } else {
                score = score - 1;
                questionScore = questionScore - 1;
            }
        }
    });
    questions[i].score = questionScore;
    return selectCounter;
}

function imgSelect(i) {
    let questionScore = 0;
    selectCounter = 0;
    document.querySelectorAll(".img-answer").forEach(function(item, index) {
        if (item.classList.contains("selected")) {
            selectCounter = selectCounter + 1;
            if (questions[i].answers[index].correct) {
                score = score + 1;
                questionScore = questionScore + 1;
            } else {
                score = score - 1;
                questionScore = questionScore - 1;
            }
        }
    });
    questions[i].score = questionScore;
    return selectCounter;
}

function imgClick() {
    document.querySelectorAll(".img-answer").forEach(function(item) {
        item.addEventListener("click", function() {
            let imgSelected = 0;
            document.querySelectorAll(".img-answer").forEach(function(nameimg) {
                if (nameimg.classList.contains("selected")) {
                    imgSelected = imgSelected + 1;
                }
            });

            if (imgSelected < 2) {
                item.classList.toggle("selected");
            } else if (imgSelected === 2 && item.classList.contains("selected")) {
                item.classList.remove("selected");
            }
        });
    });
}

document.querySelector(".next").addEventListener("click", function() {
    let viewNext = false;

    if (getType(counter) === "radio" || getType(counter) === "checkbox") {
        checkedSelect(counter, getName(counter));
        if (selectCounter === 0) {
            alert("Zvol odpověď!");
        } else {
            viewNext = true;
        }
    }

    if (getType(counter) === "img") {
        imgSelect(counter);
        if (selectCounter < 2) {
            alert("Zvol dva obrázky!");
        } else {
            viewNext = true;
        }
    }

    if (viewNext) {
        counter = counter + 1;

        view(counter);
    }

});
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#new")
let msgcontainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    turnO = true;
    enablebtn();
    msgcontainer.classList.add("hide")
}
const disabledbtn = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enablebtn = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }

}
const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgcontainer.classList.remove("hide")
    disabledbtn()
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked")
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    })
})


const checkwinner = () => {
    let winnerfound = false;

    for (let Pattern of winpatterns) {
        let value1 = boxes[Pattern[0]].innerText
        let value2 = boxes[Pattern[1]].innerText
        let value3 = boxes[Pattern[2]].innerText


        if (value1 != "" && value2 != "" && value3 != "") {
            if (value1 === value2 && value2 === value3) {
                console.log("Winner", value1)
                showwinner(value1)
                winnerfound = true;
                break;
            }
        }
    }
    if(!winnerfound){
        let allFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                allFilled = false;
                break;
            }
        }
        if (allFilled) {
            msg.innerText = "It's a Draw!";
            msgcontainer.classList.remove("hide");
            disabledbtn();
        }
    }
}

resetbtn.addEventListener("click", resetgame)
newgamebtn.addEventListener("click", resetgame)


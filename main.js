const darkMode = document.getElementById("to-dark")
const lightMode = document.getElementById("to-light")
const header = document.querySelector(".header")
const insertBox = document.querySelector("#insert-box")
const itemHouse = document.querySelector(".item-housing")
let count = 0
const countRecord = document.querySelector(".count-record")
countRecord.innerHTML = `${count} item(s) left`
let item = []
let allActive = []
let completed = []
const clearBtn = document.querySelector(".clear")
let itemText = []

const valueHolder = []

insertBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        if (insertBox.value !== "") {
            itemHouse.innerHTML += `
            <div class="item active-item">
                <div class="item-content">
                    <div class="check"></div>
                    <p class="item-text">${insertBox.value}</p>
                </div>
                <button class="close"></button>
            </div>
        `
        count++
        countRecord.innerHTML = `${count} item(s) left`
        item = document.querySelectorAll(".item")
        allActive = document.querySelectorAll(".active-item")
        itemText = document.querySelectorAll(".item-text")
        // console.log(itemHouse)
        valueHolder.push({value: insertBox.value})
        localStorage.setItem("myData", JSON.stringify(valueHolder))
        }
    insertBox.value = ""
    }
    const circle = document.querySelectorAll(".check")
    circle.forEach((circle) => {
        circle.addEventListener("click", () => {
            circle.classList.toggle("clicked")
            if (circle.classList.contains("clicked")) {
                circle.parentElement.childNodes[3].style.textDecoration = "line-through"
                circle.parentElement.childNodes[3].style.color = "hsl(236, 9%, 61%)"
                count--
                countRecord.innerHTML = `${count} item(s) left`
                circle.parentElement.parentElement.classList.add("completed")
                circle.parentElement.parentElement.classList.remove("active-item")
                completed = document.querySelectorAll(".completed")
            } else {
                circle.parentElement.childNodes[3].style.textDecoration = "none"
                circle.parentElement.childNodes[3].style.color = "hsl(235, 19%, 35%)"
                count++
                countRecord.innerHTML = `${count} item(s) left`
                circle.parentElement.parentElement.classList.remove("completed")
                circle.parentElement.parentElement.classList.add("active-item")
            }
        }) 
    })

    const delBtn = document.querySelectorAll(".close")
    delBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            let indexParent = Array.from(allActive)
            let index = indexParent.indexOf(btn.parentElement)
            console.log(index)
            if (valueHolder[index] !== -1) {
                    valueHolder.splice(index, 1)
                    console.log(valueHolder)
                    console.log(indexParent)
                    localStorage.setItem("myData", JSON.stringify(valueHolder))
            }
            if (!btn.parentElement.children[0].children[0].classList.contains("clicked")) {
                btn.parentElement.remove()
                count--
                countRecord.innerHTML = `${count} item(s) left`
            } else {
                btn.parentElement.remove()
                countRecord.innerHTML = `${count} item(s) left`
            }
        })
    })
})

const tabs = document.querySelector(".tabs")
const allTab = document.getElementById("all")
const activeTab = document.getElementById("active")
const completeTab = document.getElementById("complete")


document.addEventListener("DOMContentLoaded", () => {
    allTab.style.color = "hsl(220, 98%, 61%)"
})


let activeFilter = []

activeTab.addEventListener("click", () => {
    allTab.style.color = "hsl(235, 19%, 35%)"
    completeTab.style.color = "hsl(235, 19%, 35%)"
    activeTab.style.color = "hsl(220, 98%, 61%)"

    allActive.forEach((task) => {
        task.style.display = "flex"
    })

    completed.forEach((task) => {
        task.style.display = "none"
    })
})

allTab.addEventListener("click", () => {
    allTab.style.color = "hsl(220, 98%, 61%)"
    completeTab.style.color = "hsl(235, 19%, 35%)"
    activeTab.style.color = "hsl(235, 19%, 35%)"

    allActive.forEach((task) => {
        task.style.display = "flex"
    })

    completed.forEach((task) => {
        task.style.display = "flex"
    })
})

completeTab.addEventListener("click", () => {
    allTab.style.color = "hsl(235, 19%, 35%)"
    completeTab.style.color = "hsl(220, 98%, 61%)"
    activeTab.style.color = "hsl(235, 19%, 35%)"

    allActive.forEach((task) => {
        task.style.display = "none"
    })

    completed.forEach((task) => {
        task.style.display = "flex"
    })
})

clearBtn.addEventListener ("click", () => {
    completed.forEach((task) => {
        task.remove()
    })
})

const container = document.querySelector(".item-container")
const insertSection = document.querySelector(".insert-section")
let light = []

darkMode.addEventListener ("click", () => {
    darkMode.style.display = "none"
    lightMode.style.display = "inline"
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)"
    insertSection.style.backgroundColor = "hsl(235, 24%, 19%)"
    insertBox.style.backgroundColor = "hsl(235, 24%, 19%)"
    container.style.backgroundColor = "hsl(235, 24%, 19%)"
    tabs.style.backgroundColor = "hsl(235, 24%, 19%)"
    if (window.innerWidth < 950) {
        header.style.backgroundImage = `url("./images/bg-mobile-dark.jpg")`
    } else {
        header.style.backgroundImage = `url("./images/bg-desktop-dark.jpg")`
    }
})

lightMode.addEventListener("click", () => {
    lightMode.style.display = "none"
    darkMode.style.display = "inline"
    document.body.style.backgroundColor = "hsl(236, 33%, 92%)"
    insertSection.style.backgroundColor = "white"
    insertBox.style.backgroundColor = "white"
    container.style.backgroundColor = "white"
    tabs.style.backgroundColor = "white"
    if (window.innerWidth < 950) {
        header.style.backgroundImage = `url("./images/bg-mobile-light.jpg")`
    } else {
        header.style.backgroundImage = `url("./images/bg-desktop-light.jpg")`
    }
})

document.addEventListener("DOMContentLoaded", () => {
    // let storedData = localStorage.getItem("myData")
    // let parsedDataArray = JSON.parse(storedData)
    // for (let i = 0; i < parsedDataArray.length; i++) {
    //     itemHouse.innerHTML += `
    //     <div class="item active-item">
    //         <div class="item-content">
    //             <div class="check"></div>
    //             <p class="item-text">${parsedDataArray[i].value}</p>
    //         </div>
    //         <button class="close"></button>
    //     </div>
    // `
    // count++
    // countRecord.innerHTML = `${count} item(s) left`
    // }
    // const delBtn = document.querySelectorAll(".close")
    // delBtn.forEach((btn) => {
    //     btn.addEventListener("click", () => {
    //         if (!btn.parentElement.children[0].children[0].classList.contains("clicked")) {
    //             btn.parentElement.remove()
    //             count--
    //             countRecord.innerHTML = `${count} item(s) left`
    //         } else {
    //             btn.parentElement.remove()
    //             countRecord.innerHTML = `${count} item(s) left`
    //         }
    //     })
    // })
})

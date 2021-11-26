const darkMode = document.getElementById("to-dark")
const lightMode = document.getElementById("to-light")
const header = document.querySelector(".header")
const insertSection = document.querySelector(".insert-section")
const insertBox = document.querySelector("#insert-box")
const itemHouse = document.querySelector(".item-housing")
const container = document.querySelector(".item-container")
const tabs = document.querySelector(".tabs")
let completed = []


// switching betwwwn light and dark mode
darkMode.addEventListener("click", () => {
    darkMode.style.display = "none"
    lightMode.style.display = "block"
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


// adding items to list
let count = 0
const countRecord = document.querySelector(".count-record")
countRecord.innerHTML = `${count} item(s) left`
let circle = []
let delBtn = []
let todoItems = []
let item = []
let allActive = []

insertBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
    const todo = {
        text: "",
        checked: false,
        id: Date.now()
    }
    if (insertBox.value !== "") {
        itemHouse.innerHTML += `
        <div class="item active-item">
            <div class="item-content">
                <div class="check"></div>
                <p class="item-text" id="${todo.id}">${insertBox.value}</p>
            </div>
            <button class="close"></button>
        </div>
    `
        todo.text = insertBox.value
        todoItems.push(todo)
        insertBox.value = ""
        allActive = document.querySelectorAll(".active-item")
        circle = document.querySelectorAll(".check")
        delBtn = document.querySelectorAll(".close")
        count = allActive.length
        countRecord.innerHTML = `${count} item(s) left`
        setLocalStorage()
    }

    circle.forEach((circle) => {
        circle.addEventListener("click", () => {
            circle.classList.toggle("clicked")
            checkedItem(circle)
        })
    })

    delBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            deleteBtn(btn)
        })
    })
   }
})


function checkedItem(par) {
            if (par.classList.contains("clicked")) {
                par.parentElement.childNodes[3].style.textDecoration = "line-through"
                par.parentElement.childNodes[3].style.color = "hsl(236, 9%, 61%)"
                count--
                countRecord.innerHTML = `${count} item(s) left`
                par.parentElement.parentElement.classList.add("completed")
                par.parentElement.parentElement.classList.remove("active-item")
                completed = document.querySelectorAll(".completed")
                for (let i = 0; i < todoItems.length; i++) {
                    if (todoItems[i].id === Number(par.parentElement.children[1].id)) {
                        todoItems[i].checked = true
                    } 
                }
            } else {
                par.parentElement.childNodes[3].style.textDecoration = "none"
                par.parentElement.childNodes[3].style.color = "hsl(235, 19%, 35%)"
                count++
                countRecord.innerHTML = `${count} item(s) left`
                par.parentElement.parentElement.classList.remove("completed")
                par.parentElement.parentElement.classList.add("active-item")
                for (let i = 0; i < todoItems.length; i++) {
                    if (todoItems[i].id === Number(par.parentElement.children[1].id)) {
                        todoItems[i].checked = false
                    }
                }
            }        
}


function deleteBtn(par2) {
        let itemID = Number(par2.parentElement.children[0].children[1].id) 
        let idFilter = todoItems.filter((object) => {
            if(object.id !== itemID) {
                return true
            }
        })
        todoItems = idFilter

        if (!par2.parentElement.children[0].children[0].classList.contains("clicked")) {
            par2.parentElement.remove()
            allActive = document.querySelectorAll(".active-item")
            count = Number(allActive.length)
            countRecord.innerHTML = `${count} item(s) left`
        } else {
            par2.parentElement.remove()
            allActive = document.querySelectorAll(".active-item")
            count = Number(allActive.length)
            countRecord.innerHTML = `${count} item(s) left`
        }

        setLocalStorage()
}


// adding items to local storage
function setLocalStorage() {
    localStorage.setItem("myData", JSON.stringify(todoItems))
}


// clear button
const clearBtn = document.querySelector(".clear")
clearBtn.addEventListener ("click", () => {
    const removeCleared = todoItems.filter((object) => {
        if (object.checked !== true) {
            return true
        }
    })
    todoItems = removeCleared
    completed.forEach((task) => {
        task.remove()
    })
    setLocalStorage()
})


// tab buttons
const allTab = document.getElementById("all")
const activeTab = document.getElementById("active")
const completeTab = document.getElementById("complete")

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


// get items from local storage
let storedData = localStorage.getItem("myData")
let parsedDataArray = JSON.parse(storedData)


document.addEventListener("DOMContentLoaded", () => {
    allTab.style.color = "hsl(220, 98%, 61%)"

    for (let i = 0; i < parsedDataArray.length; i++) {
        todoItems.push(parsedDataArray[i])
    }


    for (let j = 0; j < parsedDataArray.length; j++) {
        if (todoItems[j].checked === true) {
            itemHouse.innerHTML += `
                    <div class="item completed">
                        <div class="item-content">
                            <div class="check clicked"></div>
                            <p class="item-text" id="${parsedDataArray[j].id}">${parsedDataArray[j].text}</p>
                        </div>
                        <button class="close"></button>
                    </div>
                `
        } else {
            itemHouse.innerHTML += `
            <div class="item active-item">
                <div class="item-content">
                    <div class="check"></div>
                    <p class="item-text" id="${parsedDataArray[j].id}">${parsedDataArray[j].text}</p>
                </div>
                <button class="close"></button>
            </div>
        `
        }

        
        circle = document.querySelectorAll(".check")
        delBtn = document.querySelectorAll(".close")
        allActive = document.querySelectorAll(".active-item")
        count = allActive.length
        countRecord.innerHTML = `${count} item(s) left`


        circle.forEach((circle) => {
            if (circle.classList.contains("clicked")) {
                checkedItem(circle)
                count = allActive.length
                countRecord.innerHTML = `${count} item(s) left`
            }

            circle.addEventListener("click", () => {
                circle.classList.toggle("clicked")
                checkedItem(circle)
                setLocalStorage()
            })
        })

        delBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                deleteBtn(btn)
            })
        })
        }
})


//setUp settings variables
let theInput = document.querySelector(".add_todo input");
let addButton = document.querySelector(".add_todo .plus");
let taskContainer = document.querySelector(".task_content");
let tasksCount = document.querySelector(".tasks_stats .count span");
let tasksCompleted = document.querySelector(".tasks_stats .task_comleted span");
let elemArr = Array.from(document.querySelectorAll(".task_box"));


window.onload = function() {
  theInput.focus();
}


let myStack = [];
let myComp = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== "eruda-resources"&&
        localStorage.key(i) !== "eruda-console"&&
        localStorage.key(i) !== "eruda-network"&&
        localStorage.key(i) !== "eruda-dev-tools"&&
        localStorage.key(i) !== "eruda-elements"&&
        localStorage.key(i) !== "eruda-entry-button"
    ){
      myStack.push(localStorage.key(i));
      
      let arr = localStorage.getItem(localStorage.key(i)).split(" ");
      
    if (arr.indexOf("finiched") !== -1) {
      myComp.push(arr[0]);
    }
  }
}



  let ii = 0;
  
myStack.forEach((satck,i) => {

  ii = ii + 1;
  let mainSpan = document.createElement("span");
  
  let DeleteBtn = document.createElement("spna");
  
  let divOne = document.createElement("div");
  
  let divTwo = document.createElement("div");
  
  let checkbox = document.createElement("input");
  
  let labelCheck = document.createElement("label");
  
  let text = document.createTextNode(myStack[i]);
    
  let spanText = document.createElement("span");
    
  let deleteText = document.createTextNode("Delete");
    
    spanText.className = `text_${ii}`;
    spanText.appendChild(text);
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id",`id-${ii}`);
    
  labelCheck.setAttribute("for", `id-${ii}`);
  
  divOne.className = "con_label";
  divTwo.className = "task";
  
  divOne.appendChild(checkbox);
  divOne.appendChild(labelCheck);
  
  mainSpan.className = "task_box";
  DeleteBtn.className = "delete";
  
  DeleteBtn.appendChild(deleteText);
  
  divTwo.appendChild(spanText);
  divTwo.appendChild(DeleteBtn);
  
  mainSpan.appendChild(divOne);
  mainSpan.appendChild(divTwo);
  
  mainSpan.classList.add(`id-${ii}`);
  
  taskContainer.appendChild(mainSpan);
 });


  

addButton.onclick = function () {
  if (theInput.value == "") {
    swal("Warning", "This field can't be empty", "warning");
  }else{
    ii = ii+1;
    let notFoundMsg = document.querySelector(".no_message");
    
    if (document.body.contains(notFoundMsg)) {
      notFoundMsg.remove();
    }
    
    
    let mainSpan = document.createElement("span");
    
    let DeleteBtn = document.createElement("spna");
    
    let divOne = document.createElement("div");
    
    let divTwo = document.createElement("div");
    
    let checkbox = document.createElement("input");
    
    let labelCheck = document.createElement("label");
    
    let text = document.createTextNode(theInput.value);
    
    let spanText = document.createElement("span");
    
    let deleteText = document.createTextNode("Delete");
    
    spanText.className = `text_${ii}`;
    spanText.appendChild(text);
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id",`id-${ii}`);
    
    labelCheck.setAttribute("for",`id-${ii}`);
    
    divOne.className = "con_label";
    divTwo.className = "task";
    
    divOne.appendChild(checkbox);
    divOne.appendChild(labelCheck);
    
    mainSpan.className = "task_box";
    DeleteBtn.className = "delete";
    
    DeleteBtn.appendChild(deleteText);
    
    divTwo.appendChild(spanText);
    divTwo.appendChild(DeleteBtn);
    
    mainSpan.appendChild(divOne);
    mainSpan.appendChild(divTwo);
    
    taskContainer.appendChild(mainSpan);
    
    mainSpan.classList.add(`id-${ii}`);
    
    localStorage.setItem(theInput.value,spanText.classList[0]);
    theInput.value = "";
    theInput.focus();
  }
}

document.addEventListener("click",function (e) {
  if (e.target.className == "delete") {
    ii -= 1;
    e.target.parentNode.parentNode.remove();
    for(let x = 0; x < localStorage.length; x++) {
      if (localStorage.key(x) == e.target.parentNode.childNodes[0].textContent) {
        localStorage.removeItem(localStorage.key(x));
      }
    }
    if (taskContainer.childElementCount == 0) {
      createMsg();
    }
  }
  if (e.target.classList.contains(`task`)) {
    document.getElementById(e.target.parentNode.classList[1]).click();
    e.target.firstElementChild.classList.toggle("finiched");
    localStorage.setItem(e.target.firstElementChild.textContent,e.target.firstElementChild.classList);
  }
  calculateTasks();
});


function createMsg() {
  
  let spanMsg = document.createElement("span");
  
  let textMsg = document.createTextNode("No Tasks To Show");
  
  spanMsg.appendChild(textMsg);
  spanMsg.className = "no_message";
  taskContainer.appendChild(spanMsg);
}

function calculateTasks() {
  
  tasksCount.innerHTML = document.querySelectorAll(".task_content .task_box").length;
  
  tasksCompleted.innerHTML = document.querySelectorAll(".task_content .finiched").length;
}

if (myStack.length !== 0) {
  document.querySelector(".no_message").remove();
  calculateTasks();
}
myComp.forEach(com => {
  document.querySelector("." + com).parentNode.previousSibling.lastElementChild.click();
  document.querySelector("." + com).classList.toggle("finiched");
  calculateTasks();
})
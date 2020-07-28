var a = new Date();
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var b = days[a.getDay()] + ' ' + months[a.getMonth()] + ' ' + a.getDate() + ' ' + a.getFullYear();

var c = document.getElementById("currentDate");
c.innerHTML = b




function addTask() {
    var getTodo = document.getElementById('add-task');
    var subTodo = document.createElement("div");
    subTodo.setAttribute("id", "single-div");
    subTodo.classList.add("todo-design");


    var list = document.createElement("input");
    list.setAttribute("type", "text");
    list.setAttribute("value", getTodo.value);
    list.setAttribute("id", "show");
    list.classList.add("type-text-task");
    list.disabled = true;
    subTodo.appendChild(list);


    var delBtn = document.createElement("i");
    delBtn.classList.add("fa");
    delBtn.classList.add("fa-trash");
    delBtn.setAttribute("aria-hidden", "true");
    delBtn.setAttribute("onClick", "deleteSingle(this)");
    subTodo.appendChild(delBtn);



    var editBtn = document.createElement("i");
    editBtn.classList.add("fa");
    editBtn.classList.add("fa-pencil-square-o");
    editBtn.setAttribute("aria-hidden", "true");
    editBtn.setAttribute("onClick", "editBtn(this)");
    editBtn.setAttribute("id", "btnCycle");
    subTodo.appendChild(editBtn);

    var container = document.getElementById("todoitems");

    if (document.getElementById("add-task").value == "") {
        alert("Please Enter Any Todo..");
    }
    else {
        container.appendChild(subTodo);
        getTodo.value = "";
    }
}

function editBtn(edit) {
    edit.parentNode.firstChild.disabled = !edit.parentNode.firstChild.disabled;
}

function deleteSingle(d) {
    d.parentNode.remove();
}

function deleteAll() {
    var deleteAll = document.getElementById("todoitems");
    deleteAll.innerHTML = "";
}

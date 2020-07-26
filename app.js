var a = new Date();
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var b = days[a.getDay()] + ' ' + months[a.getMonth()] + ' ' + a.getDate() + ' ' + a.getFullYear();

var c = document.getElementById("currentDate");
c.innerHTML = b














function addTask(){
    var getTask = document.getElementById("add-task");

    var list = document.createElement("p");
    var listItem = document.createTextNode(getTask.value);
    
    list.appendChild(listItem);


    



    var delButton = document.createElement("i");
    delButton.className = "fa fa-trash fa-2x";
    delButton.setAttribute("aria-hidden", "true");

    list.appendChild(delButton);

    var editButton = document.createElement("i");
    editButton.className = "fa fa-pencil fa-2x";
    editButton.setAttribute("aria-hidden", "true");

    list.appendChild(editButton);


   



    todoitems.appendChild(list)
}



















function deleteAll(){

}
var a = new Date();
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var b = days[a.getDay()] + ' ' + months[a.getMonth()] + ' ' + a.getDate() + ' ' + a.getFullYear();

var c = document.getElementById("currentDate");
c.innerHTML = b



const signIn = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        sendUserData(user);
    }).catch(function (error) {
        swal(error.message)
    });

}

let sendUserData = (userInfo) => {
    var user = userInfo
    uid = user.uid;
    let userData = {
        name: user.displayName,
        photo: user.photoURL,
        email: user.email,
        uid: user.uid
    }
    firebase.database().ref('userData/' + userData.uid).set(userData);


}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById('user_name').innerHTML = 'Welcome' + '<br />' + user.displayName;
        var getImgDiv = document.getElementById('user_profile_image');
        var makeImg = document.createElement('img');
        makeImg.setAttribute('src', user.photoURL)
        getImgDiv.appendChild(makeImg)

        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('userData/' + userId + 'todos').on('child_added', (data) => {
            var subTodo = document.createElement("div");
            subTodo.setAttribute("id", data.val().key);
            subTodo.classList.add("todo-design");

            var list = document.createElement("input");
            list.setAttribute("type", "text");
            list.setAttribute('autofocus', 'true');
            list.setAttribute("value", data.val().todo);
            list.classList.add("show", "type-text-task");
            list.disabled = true;
            subTodo.appendChild(list);

            var delBtn = document.createElement("i");
            delBtn.classList.add("fa", "fa-trash");
            delBtn.setAttribute("aria-hidden", "true");
            delBtn.setAttribute("onClick", "deleteSingle(this.parentNode.id, this)");
            subTodo.appendChild(delBtn);

            var editBtn = document.createElement("i");
            editBtn.classList.add('fa', 'fa-pencil');
            editBtn.setAttribute("aria-hidden", "true");
            editBtn.setAttribute("onClick", "editBtn(this.parentNode.id, this)");
            editBtn.setAttribute("id", "btnCycle");
            subTodo.appendChild(editBtn);

            var container = document.getElementById("todoitems");
            container.appendChild(subTodo);
        })
    }
    else {
        // No user is signed in.
    }
});


function addTask() {

    var user = firebase.auth().currentUser;

    if (user) {
        let key = firebase.database().ref().push().key
        let currentUserTodos = {
            todo: document.getElementById('add-task').value,
            key: key
        }

        if (document.getElementById("add-task").value === "") {
            swal("Please Enter Any Todo..");
        }
        else {
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('userData/' + userId + 'todos').child(key).set(currentUserTodos);
            document.getElementById('add-task').value = '';
        }
    } else {
        swal('Please Sign in first')
    }
    
}

function editBtn(key, element) {

    let changeInput = element.parentNode.firstChild;

    if (changeInput.disabled) {
        changeInput.disabled = false;
        element.classList.remove('fa', 'fa-pencil');
        element.classList.add('fa', 'fa-check');

    }
    else if (!changeInput.disabled) {
        changeInput.disabled = true;
        element.classList.remove('fa', 'fa-check');
        element.classList.add('fa', 'fa-pencil');
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('userData/' + userId + 'todos').child(key).child('todo').set(element.parentNode.firstChild.value);
    }

}

function deleteSingle(key, element) {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('userData/' + userId + 'todos').child(key).remove()
    element.parentNode.remove();
}

function deleteAll() {

    if(firebase.auth().currentUser == null){
        swal('Please Sign in first')
    }
    else if (document.getElementById("todoitems").innerHTML == 0){
        swal('Please add Todo first')
    }
    else if(firebase.auth().currentUser != null){
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('userData/' + userId + 'todos').remove();
        document.getElementById("todoitems").innerHTML = '';
    }
    
}


let signOut = () => {
    firebase.auth().signOut().then(function () {
        document.getElementById('user_name').innerHTML = "";
        document.getElementById('user_profile_image').innerHTML = '';
        document.getElementById("todoitems").innerHTML = ' ';
        swal("Good job!", "You Have Sign Out Successfully", "success");
    }).catch(function (error) {
        swal(error.message);
    });
}
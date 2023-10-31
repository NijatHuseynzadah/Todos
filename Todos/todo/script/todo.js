const users = JSON.parse(localStorage.getItem('users'));
const currentUser = localStorage.getItem('currentUser');

let todos = users.find(user => user.name === currentUser).todos;
console.log(users[0].todos)

let edit = false;

function updateSite() {
    $('.todos').html('');

    for (let todo of todos) {
        $('.todos').append(`<div class="todo">
            <div class="todo-content">
                <h2>${todo.title}</h2>
                <p>${todo.text}</p>
            </div>
            <div class="options">
                <button id='${todo.id}D' class="btn btn-danger">Delete</button>
                <button id='${todo.id}E' class="btn btn-success edit-todo">Edit</button>
            </div>
        </div>`);
    }
}

updateSite();

$('#save-todo').click(function () {
    if (!edit) {
        let newTodo = {
            id: Date.now(),
            title: $('#title').val(),
            text: $('textarea').val()
        };

        todos.push(newTodo);

        $('#title').val('');
        $('textarea').val('');

        users.find(user => user.name === currentUser).todos = todos;

        localStorage.setItem('users', JSON.stringify(users));
        updateSite();
    } else {
        const id = $('#save-todo').data('todo-id');
        const index = todos.findIndex(todo => todo.id === id);
        todos[index] = {
            id: id,
            title: $('#title').val(),
            text: $('textarea').val(),
        };

        users.find(user => user.name === currentUser).todos = todos;

        localStorage.setItem('users', JSON.stringify(users));
        updateSite();
    }
    edit = false;
});

$('.todos').on('click', '.edit-todo', function () {
    edit = true;
    const id = $(this).attr('id');
    $('#save-todo').data('todo-id', id);
    const currentTodo = todos.find(todo => todo.id + 'E' === id);

    $('#title').val(currentTodo.title);
    $('textarea').val(currentTodo.text);
});

$('.todos').on('click', 'button.btn-danger', function () {
    const id = $(this).attr('id');
    todos = todos.filter(todo => todo.id + 'D' !== id);

    users.find(user => user.name === currentUser).todos = todos;

    localStorage.setItem('users', JSON.stringify(users));
    updateSite();
});

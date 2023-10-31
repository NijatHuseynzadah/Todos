let users = [];

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem('users'));
}

$(".place").on("input", function () {
    $(this).css({
        'outline-color': '',
        'border': ''
    });

    if (
        $("#name").val().length >= 2 &&
        $("#password").val().length >= 2 &&
        $("#check").is(":checked")
    ) {
        $(".btn").attr("disabled", false);
    } else {
        $(".btn").attr("disabled", true);
    }
});

$("#check").click(function () {
    if (
        $("#name").val().length >= 2 &&
        $("#password").val().length >= 2 &&
        $("#check").is(":checked")
    ) {
        $(".btn").attr("disabled", false);
    } else {
        $(".btn").attr("disabled", true);
    }
});

$(".btn").click(function (event) {
    event.preventDefault();

    let newUser = {
        name: $('#name').val(),
        password: $('#password').val(),
        items: []
    }

    let alreadyExist = users.some(user => user.name === $('#name').val())

    if (alreadyExist) {
        alert('This is already registered!')
        $('#name').css({
            'outline-color': 'red',
            'border': '1px solid red'
        })
    } else {
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        $('.place').val('')
    }
});
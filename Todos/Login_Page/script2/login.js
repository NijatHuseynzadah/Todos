let users = [
  {
  name: "u1" ,
  password: "p1" ,
  todos:[
    {
      id: 1,
      title: 'Title',
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos nam mollitia assumenda nostrum laudantium, natus necessitatibus dignissimos nesciunt harum accusantium ex veritatis, voluptate, saepe alias facilis obcaecati laboriosam sed ipsam.'
    },
],
},
];

if(!localStorage.getItem('users')){
    localStorage.setItem('users', JSON.stringify(users))
}

users = JSON.parse(localStorage.getItem('users'))

$(".place").on("input", function () {
    if (
      $("#name").val().length >= 2 &&
      $("#password").val().length >= 2 
    ) {
      $(".btn").attr("disabled", false);
    } else {
      $(".btn").attr("disabled", true);
    }
});

$('form').on('submit', function(event){
    event.preventDefault()

    let userExist = users.some(
        
    (user) => user.name === $('#name').val() && user.password === $('#password').val()

    );
    if(userExist){
        localStorage.setItem('currentUser', $('#name').val())
        $('.place').val('')
        location.href = './Home.html'
    }else{
        alert('yout password or name is incorrect')
    }

})

/* profile box */

// let userButton = document.getElementById("user-button");
// if (userButton.href==""){
//     userButton.addEventListener('click',function(){
//         let box = document.querySelector(".profile-box");
//         box.classList.toggle('active');
//     });
// }

/* login to registration */

let register_show = document.getElementById("register-show");
console.log(register_show);

if(register_show){
    register_show.onclick= function() {
        event.preventDefault(); // Prevent the default behavior of the button click
        document.getElementById("login-f").style.display='none';
        document.getElementById("register-f").style.display='block';
    }
}
let login_show = document.getElementById("login-show");
if(login_show){
    login_show.onclick= function() {
        event.preventDefault(); // Prevent the default behavior of the button click
        document.getElementById("register-f").style.display='none';
        document.getElementById("login-f").style.display='block';
    }
    }

    /* login/register methods */
    function logIn() {
        alert('You have been logged in!');
        event.preventDefault();
    }

    function register(){
        alert('You have a new account!');
        event.preventDefault();
    }
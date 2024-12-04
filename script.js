
/* profile box */

let userButton = document.getElementById("user-button");
if (userButton.href==""){
    userButton.addEventListener('click',function(){
        let box = document.querySelector(".profile-box");
        box.classList.toggle('active');
    });
}

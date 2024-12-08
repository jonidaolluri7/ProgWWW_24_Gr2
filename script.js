
/** slider-top */
const slider = document.querySelector(".slider-top");
if(slider){
    function toRight(){
        if(slider.scrollWidth-slider.clientWidth === slider.scrollLeft){
            slider.scrollTo({
                left:0,
                behavior:'smooth'
            });
        }
        else{
            slider.scrollBy({
                left:window.innerWidth,
                behavior:'smooth'
            });
        }
    }

    function toLeft(){
        slider.scrollBy({
            left: -window.innerWidth,
            behavior:'smooth'
        });
    }

    
    document.querySelector(".left-arrow").onclick=function() {
        toLeft();
    }
    document.querySelector(".right-arrow").onclick=function() {
        toRight();
    }
}


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
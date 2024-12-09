
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
        window.location.replace('profile.html');
        event.preventDefault();
    }

    function register(){
        alert('You have a new account!');
        event.preventDefault();
    }


    /* greeting */

    function greetingUsers() {
        const greeting = document.getElementById("greeting");
        const now = new Date();
        const hours = now.getHours();
        const time = hours < 12 ? "Good Morning!" : hours < 18 ? "Good Afternoon!" : "Good Evening!";
        greeting.innerHTML = time + " Welcome to our jewelry collection.";
    }

    window.onload = greetingUsers;



    
    /* event */
    const items = document.querySelectorAll("header .fa-solid");
    items.forEach(item => {
        item.addEventListener("mouseover", () => {
        item.classList.add("highlight");
        });
        item.addEventListener("mouseleave", () => {
        item.classList.remove("highlight");
        });
    });



    // 
    function checkOut(){
        alert('You have checked out that item!');
        event.preventDefault();
    }

// per canvas
const mouseCanvas = document.getElementById("mouseEffectCanvas");
const mouseCtx = mouseCanvas.getContext("2d");

function drawEffect(x, y) {
  mouseCtx.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);

  const gradient = mouseCtx.createRadialGradient(x, y, 0, x, y, 10);
  gradient.addColorStop(0, "#fff");
  gradient.addColorStop(1, "#430b4c");

  mouseCtx.beginPath();
  mouseCtx.arc(x, y, 50, 0, Math.PI * 2);
  mouseCtx.fillStyle = gradient;
  mouseCtx.fill();

  mouseCtx.font = "20px Arial"; 
  mouseCtx.fillStyle = "black"; 
  mouseCtx.fillText("Jewelry", x+55, y); 
}

mouseCanvas.addEventListener("mousemove", (e) => {
  const rect = mouseCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  drawEffect(x, y);
});
//gradienti linear
const canvas = document.getElementById('jewelryCanvas');
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  gradient.addColorStop(0, '#fff');
  gradient.addColorStop(1, '#430b4c');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 500, 300);

  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI * 2, false); 
  ctx.fillStyle = 'white';
  ctx.fill();

  const img = new Image();
  img.src = 'img/diamond.jpg'; 
  img.onload = function () {
    ctx.drawImage(img, 120, 120, 100, 100);
  };

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


/* display future products */ //edhe per web worker me llogarit qmimin total te ketyre produkteve
let products = [
  { name: "Diamond Ring", price: 34 },
  { name: "Gold Necklace", price: 30 },
  { name: "Silver Bracelet", price: 56 },
  { name: "Pearl Earrings", price: 12 },
  { name: "Sapphire Ring", price: 45 },
  { name: "Emerald Necklace", price: 40 },
  { name: "Ruby Bracelet", price: 70 },
  { name: "Topaz Earrings", price: 22 },
];

//
const worker = new Worker("worker.js");

function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; 

  for (let i = 0; i < products.length; i++) {
      const listItem = document.createElement("li");
      listItem.className = "product-item";
      listItem.textContent = `${products[i].name} - $${products[i].price}`;
      productList.appendChild(listItem);
  }

  const calculateTotalBtn = document.getElementById("calculate-total-btn");
    calculateTotalBtn.style.display = "inline-block";
}
function calculateTotal() {
  worker.postMessage(products); 

  worker.onmessage = function (event) {
      const totalPrice = event.data; 
      document.getElementById("total-price").textContent = `Total price: $${totalPrice}`;
  };
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
    function logInUser() {
        alert('You have been logged in!');
        window.location.replace('profile.html');
        event.preventDefault();
    }

    function logInAdmin() { 
      alert('You have been logged in!');
      window.location.replace('admin.html');
      event.preventDefault();
  }

    function register(){
        alert('You have a new account!');
        event.preventDefault();
    }

    const users = { email: "admin@gmail.com", password: "123"};
    const loginForm = document.getElementById("login-f");
    if(loginForm){
        loginForm.addEventListener("submit", function(event) {
          event.preventDefault();
          const email = document.getElementById("lemail").value;
          const password = document.getElementById("lpassword").value;
          if(email === users.email && password === users.password){
            logInAdmin();
          } else {
            logInUser();
          }
        });
    }


    /* add product / local/global variable/objects */
    const addProductForm = document.getElementById("add-product-form");
    if(addProductForm){

          addProductForm.addEventListener("submit", (event) => {
            event.preventDefault(); 
            // variablave lokale
            const productName = document.getElementById("product-name").value;
            const productPrice = document.getElementById("product-price").value;

            // Krijo një objekt të ri
            const newProduct = {
                name: productName,
                price: parseFloat(productPrice)
            };
            //variabla gloobale products
            products.push(newProduct);
            for(let i=0; i<products.length; i++){
                console.log(products[i].name);
                document.getElementById("display").innerHTML += "<li>"+products[i].name+" - $"+products[i].price+"</li>";  

            }

      });
    }

    /* greeting */
    const greeting = document.getElementById("greeting");
    if(greeting){
      function greetingUsers() {
        const now = new Date();
        const hours = now.getHours();
        console.log(hours);
        const time = hours < 12 ? "Good Morning!" : hours < 18 ? "Good Afternoon!" : "Good Evening!";
        greeting.innerHTML = time + " Welcome to our jewelry collection.";
      }

      window.onload = greetingUsers;    
    }
    




    
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

    /* add to wishlist */
    function addToWishlist() {
      alert('Added to Wishlist!');
      event.preventDefault();
    }

    /* add to cart */
    function addToCart() {
        alert('Added to Cart!');
        event.preventDefault();
    }

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


  // per audios qe te jene one at a time
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.addEventListener('play', () => {
      audios.forEach(otherAudio => {
        if (otherAudio !== audio) {
          otherAudio.pause();
        }
      });
    });
  });
  // per videos qe te jene one at a time
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });


//per lokacion
function getLocation() {
  const output = document.getElementById("output");

  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;
              output.innerHTML = `Latitude: ${latitude}<br> Longitude: ${longitude}`;
          },
          (error) => {
              output.innerHTML = `Error: ${error.message}`;
          }
      );
  } else {
      output.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// jquery
$(document).ready(function() {
  // When the user hovers over a product image, zoom in on it
  $('.product-img').hover(function() {
      $(this).css('transform', 'scale(1.2)');
  }, function() {
      $(this).css('transform', 'scale(1)');
  });
  
});

$(document).ready(function() {
  $('#showButton').click(function() {
      $('#textToShow').show(); 
  });

  $('#hideButton').click(function() {
      $('#textToShow').hide();
  });
});

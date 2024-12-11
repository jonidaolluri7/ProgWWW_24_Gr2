
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
/** --------------------------------------------------------------------------------------------------------------- */

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

/** --------------------------------------------------------------------------------------------------------------- */
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
    //log in as user
    function logInUser() {
      
      alert('You have been logged in!');
      window.location.replace('profile.html');
      event.preventDefault();
    }

    //log in as admin
    function logInAdmin() { 
      alert('You have been logged in!');
      window.location.replace('admin.html');
      event.preventDefault();
    }

    //register validation
    function register(){

      const name = document.getElementById("name").value;
      const lastname = document.getElementById("lastname").value;
      const email = document.getElementById("email").value;
      const tel = document.getElementById("tel").value;
      const password = document.getElementById("password").value;
      
      try{
        validateName(name);
        validateLastname(lastname);
        validateEmail(email);
        validatePhoneNumber(tel);
        validatePassword(password);
        alert('You have a new account!');
        event.preventDefault();
      } 
      
      catch(error){
        console.error(error.message);
        alert("Failed to register: " + (error));
      }

    }

    //login validation
    //admin and user login
    const users = { email: "admin@gmail.com", password: "123"};
    const loginForm = document.getElementById("login-f");
    if(loginForm){
        loginForm.addEventListener("submit", function(event) {
          
          event.preventDefault();
          const email = document.getElementById("lemail").value;
          const password = document.getElementById("lpassword").value;
          
          try{
            validateEmail(email);
            validatePassword(password);
            if(email === users.email && password === users.password){
              logInAdmin();
            } 
            else {
              logInUser();
            }
          }
          
          catch(error){
            console.error(error.message);
            alert("Failed to log in: " + (error.message || error));
          }

        });
    }

    //validation functions
    function validateEmail(email) {
      if (!email) throw "Email cannot be empty.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) throw "Invalid email format.";
    }

    function validatePassword(password) {
      if (!password) throw "Password cannot be empty.";
      if (password.length < 6) throw "Password must be at least 6 characters long.";
      if (!/[A-Z]/.test(password)) throw "Password must contain at least one uppercase letter.";
      if (!/[a-z]/.test(password)) throw "Password must contain at least one lowercase letter.";
      if (!/[0-9]/.test(password)) throw "Password must contain at least one number.";
      if (!/[!@#$%^&*]/.test(password)) throw "Password must contain at least one special character.";
    }

    function validateName(name) {
      if (!name) throw "Name cannot be empty.";
      if (name.length < 2) throw "Name must be at least 2 characters long.";
      if (!/^[A-Za-z\s]+$/.test(name)) throw "Name can only contain letters and spaces.";
    }

    function validateLastname(lastname) {
      if (!lastname) throw "Last name cannot be empty.";
      if (lastname.length < 2) throw "Last name must be at least 2 characters long.";
      if (!/^[A-Za-z\s]+$/.test(lastname)) throw "Last name can only contain letters and spaces.";
    }

    function validatePhoneNumber(phoneNumber) {
      if (!phoneNumber) throw "Phone number cannot be empty.";
      if (!/^\d{10}$/.test(phoneNumber)) throw "Phone number must be exactly 10 digits.";
    }

    /** --------------------------------------------------------------------------------------------------------------- */
    /* add product / local/global variable/objects */
    const addProductForm = document.getElementById("add-product-form");
    if(addProductForm){

          addProductForm.addEventListener("submit", (event) => {
            event.preventDefault(); 
            // variablave lokale
            const productName = document.getElementById("product-name").value;
            const productPrice = document.getElementById("product-price").value;

            addNewProduct(productName, productPrice);
      });
    }

    function addNewProduct(productName, productPrice) {
      try {
          if (!productName || !productPrice || isNaN(productPrice)) {
              throw new Error("Invalid product name or price");
          }
          const newProduct = { 
            name: productName, 
            price: parseFloat(productPrice) 
          };
          products.push(newProduct);
          for(let i=0; i<products.length; i++){
            console.log(products[i].name);
            document.getElementById("display").innerHTML += "<li>"+products[i].name+" - $"+products[i].price+"</li>"; 
          }
          alert(`Product "${productName}" added successfully!`); 
      } 
      catch (error) {
        console.error(error.message);
        alert("Failed to add product: " + error.message);
      }
  }

  /** --------------------------------------------------------------------------------------------------------------- */


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
    

  /** --------------------------------------------------------------------------------------------------------------- */
    
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

    /** --------------------------------------------------------------------------------------------------------------- */

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

    /* checkout */
    function checkOut(){
        alert('You have checked out that item!');
        event.preventDefault();
    }

    /** --------------------------------------------------------------------------------------------------------------- */
    //validimi ne about us per form
    
    const aboutUsForm = document.getElementById("about-us-form");
    if(aboutUsForm){

      aboutUsForm.addEventListener("submit", (event) => {

        event.preventDefault(); 
        const jewelryType = document.getElementById("jewelryType").value;
        const jewelryOptionsDatalist = document.getElementById("jewelryOptions");
        const checkboxes = document.querySelectorAll('input[name="jewelry"]:checked');
        const nrProductsNumber = document.getElementById("nrProducts").value;
        const files = document.getElementById("files").value;
        const message = document.getElementById("message").value;
        
        try {
          validateDatalist(jewelryType, jewelryOptionsDatalist);
          validateCheckList(checkboxes);
          validateNumber(nrProductsNumber);
          validateFile(files);
          validateMessage(message);
          alert("Message sent successfully!");
        } 
        
        catch (error) {
          console.error(error);
          alert("Failed to send message: " + error);
        }

      });

    }

    // about us validation functions

    function validateDatalist(value, datalist) {
      const options = Array.from(datalist.options).map(option => option.value);
      if (!options.includes(value)) throw new Error("Invalid selection. Choose from the list.");
    }

    function validateCheckList(checkboxes){
      if (checkboxes.length === 0) {
        throw new Error("Please select at least one type of jewelry.");
      }
    }

    function validateNumber(nrProductsNumber){
      if (!nrProductsNumber || nrProductsNumber < 1 || nrProductsNumber > 100) {
        throw new Error("Please select a number between 1 and 100 for the number of products.");
      }
    }

    function validateFile(files){
      if (!files.length) {
        throw new Error("Please select at least one file.");
      }
    }

    function validateMessage(message){
      if (!message) {
        throw new Error("Please enter a message.");
      }
    }

    /** --------------------------------------------------------------------------------------------------------------- */
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

//hide show 
$(document).ready(function() {
  $('#showButton').click(function() {
      $('#textToShow').show(); 
  });

  $('#hideButton').click(function() {
      $('#textToShow').hide();
  });
});
//fade in fade out  
$(document).ready(function() {
  $('#buttonFadeIn').click(function() {
      $('#textFadeIn').fadeIn("slow"); 
      $("#textFadeTo").fadeTo("slow", 0.15);

  });

  $('#buttonFadeOut').click(function() {
      $('#textFadeOut').fadeOut();
      $("#textFadeToggle").fadeToggle(3000);

  });
});
//slide and animate and callback
$(document).ready(function(){
  $("#clickText1").click(function(){
    $("#shownText1").slideUp("slow");
  });
  $("#clickText2").click(function(){
    $("#shownText2").slideDown("slow");
  });
  $("#clickText3").click(function(){
    $("#shownText3").slideToggle("slow");
  });

  $("#animateButton").click(function(){
    var div = $("#animateDiv");  
    div.animate({left: '100px'}, "slow");
    div.animate({fontSize: '3em'}, "slow");
  });

  $("#buttonCallback").click(function(){
    $("#randomDate").hide("slow", function(){
      alert("The paragraph is now hidden");
    });
  });
});

// get a random date permes date objektit
function getRandomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1).getTime(); 
  const end = new Date(endYear, 11, 31).getTime(); 
  const randomTime = Math.random() * (end - start) + start; 
  return new Date(randomTime); 
}
const randomDate = getRandomDate(1998, 2003);
console.log(randomDate.toDateString());
document.getElementById("randomDate").textContent = randomDate.toDateString();
// 
const birthday = new Date(1998, 3, 0o5); 
document.getElementById("textToShow").textContent = birthday.toDateString();

// konstatet dhe funksionet matematikore
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;
const LN2 = Math.LN2;
const LN10 = Math.LN10;

const area= PI * Math.pow(5, 2);
console.log(area);
document.getElementById("result1").textContent = "PI= "+PI+", area of circle = "+area;

const exponent = Math.exp(2);//e^2
document.getElementById("result2").textContent = "E= "+E+", e^2 = "+exponent;

const squareRoot9 = Math.sqrt(9);
document.getElementById("result3").textContent = "SQRT2= "+SQRT2+", square root of 9 = "+squareRoot9;
document.getElementById("result4").textContent = "LN2= "+LN2+", LN10= "+LN10;

const randomValue = Math.random() * 100;
const roundedValue = Math.round(randomValue);
const floorValue = Math.floor(randomValue);
document.getElementById("result5").textContent = "Random value: "+randomValue+", rounded value: "+roundedValue+", floor value: "+floorValue;

//replace and match
let tekstii = document.getElementById("replace").textContent;
tekstii = tekstii.replace(/amet/g, "!!!!!");
document.getElementById("replace").textContent = tekstii;

const teksti2 = document.getElementById("randomDate").textContent;
const numbers = teksti2.match(/\d+/g); //find all the numbers
if (numbers) {
  document.getElementById("result6").textContent = "Numbers found: " + numbers.join(', ');
} else {
  document.getElementById("result6").textContent = "No numbers found.";
}

//i,g regex
const teksti = document.getElementById("tekstiRegEx").textContent;
const words2 = teksti.match(/amet/gi); //case insensitive
document.getElementById("iRegEx").textContent = "Found the word 'amet' " + words2.length + " times.";
const words = teksti.match(/amet/g); //case sensitive
document.getElementById("gRegEx").textContent = "Found the word 'amet' " + words.length + " times.";
//text
const pattern = /amet/;
const result = pattern.test(teksti);
document.getElementById("testRegEx").textContent = "The paragraph contains the word amet? - " + result;
//exec
const result2 = pattern.exec(teksti);
document.getElementById("execRegEx").textContent = "The word amet is found at position " + result2.index;


//number manipulation
document.getElementsByClassName("minMaxValue")[0].textContent = "Min value: " + Number.MIN_VALUE + ", Max value: " + Number.MAX_VALUE;
document.getElementsByClassName("posNegInfinity")[0].textContent = "Positive Infinity: " + Number.POSITIVE_INFINITY +"; Negative Infinity: " + Number.NEGATIVE_INFINITY;
let number1 = 5.56789;
let number2 = 0/0;
document.getElementsByClassName("isNan")[0].textContent = "Is number1 NaN? " + isNaN(number1) +";   Is number2 NaN? " + isNaN(number2);

let num1 = 12345.6789;
document.getElementsByClassName("toExpon")[0].textContent = "Exponential: " + num1.toExponential(2);
let num2 = 255;
document.getElementsByClassName("hexBin")[0].textContent = "Hexadecimal: " + num2.toString(16) +"; Binary: " + num2.toString(2);
document.getElementsByClassName("toPrecision")[0].textContent = "Precision: " + num1.toPrecision(3);
let num5 = new Number(555); 
document.getElementsByClassName("toFixedValueOf")[0].textContent = "Fixed: " + num1.toFixed(2) +"; ValueOf: " + num5.valueOf();

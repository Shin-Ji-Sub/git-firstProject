// Show Menu

const navMenu = document.getElementById('navMenu');
const navClose = document.getElementById('navClose');
const navToggle = document.getElementById('navToggle');

if(navToggle) {
  navToggle.addEventListener('click', () => {

    navMenu.classList.add('showMenu');

  })
}


if(navClose) {
  navClose.addEventListener('click', () => {

    navMenu.classList.remove('showMenu'); 

  })
}



// Click Link, Remove show-menu
const navLink = document.querySelectorAll('.navLink');

const actionLink = () => {

  const navMenu = document.getElementById('navMenu');

  navMenu.classList.remove('showMenu');

}

navLink.forEach(n => n.addEventListener('click', actionLink));





// Change Background Header
const scrollHeader = () => {

  const header = document.getElementById('header');

  this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header');

}

window.addEventListener('scroll', scrollHeader);



// User Name
let getItem = localStorage.getItem('nowUser');
if(getItem != undefined){
  getItem = JSON.parse(getItem);
  $('.id-container p').html(`Welcome, ${getItem.userName}`);

  $('.navItem').eq(2).replaceWith(`
  <li class="navItem">
    <div class="log-out">Log Out</div>
  </li>
  `);

  $('.link').eq(2).replaceWith(`
  <div class="link">
    <h5 class="carousel-logOut">Log Out</h5>
  </div>
  `);
} else {
  $('.id-container p').html('');
}



// Previous, Next Button
let x = 0;

$('.next-btn').click(() => {
  x -= 50;

  if(x < -100){
    x = 0;
    $('.link').css('transition', 'all 0.4s');
    $('.link').css('transform', `translateX(${x}vw)`);
  } else {
    $('.link').css('transition', 'all 0.4s');
    $('.link').css('transform', `translateX(${x}vw)`);
  }

  setTimeout(() => {
    $('.link').css('transition', 'none');    
  }, 500)
});

$('.previous-btn').click(() => {
  x += 50;

  if(x > 0){
    x = -100;
    $('.link').css('transition', 'all 0.4s');
    $('.link').css('transform', `translateX(${x}vw)`);
  } else {
    $('.link').css('transition', 'all 0.4s');
    $('.link').css('transform', `translateX(${x}vw)`);
  }

  setTimeout(() => {
    $('.link').css('transition', 'none');    
  }, 500)
});



// Log Out btn Function
function logOut(){
  localStorage.removeItem('nowUser');

  $('.id-container p').html('');

  $('.navItem').eq(2).replaceWith(`
  <li class="navItem">
    <a href="./LoginPage/login.html" class="navLink">Log In</a>
  </li>
  `);

  $('.link').eq(2).replaceWith(`
  <div class="link">
    <h5><a href="./LoginPage/login.html">Log In</a></h5>
  </div>
  `);

  $('.link').eq(2).css('transform', `translateX(${x}vw)`);
}


$('.log-out').click(() => {
  logOut();
});

$('.carousel-logOut').click(() => {
  logOut();
});
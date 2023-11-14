let newArr = [];
let cartArr = [];
let detailArr = [];

{/* <picture>
  <source media="(max-width:360px)" srcset="./../img/f${value.id + 1}.webp">
  <img src="./../img/f${value.id + 1}.webp" alt="item image">
</picture> */}

{/* <img src="./../img/f${value.id + 1}.webp" alt="item image" sizes="
      (min-width: 1250px) 360w,
      (max-width: 767px) 250w,
      360w"
      ></img> */}

/* Make Card Function */
function appendCard(value){
  let card = `
  <a href="./../DetailPage/detail.html">
    <div class="card" id=${value.id}>
      <picture>
        <source srcset="./../img/f${value.id + 1}.webp" />
        <img src="./../img/f${value.id + 1}.webp" alt="item image" sizes="
        (min-width: 1250px) 360w,
        (max-width: 767px) 250w,
        360w">
      </picture>
      <h5>${value.brand}</h5>
      <p>${value.title}</p>
      <p>${value.price}$</p>
    </div>
  </a>
  `;

  $('.item-container').append(card);
}



// Detail Page에 전송
function propsCard() {
  $('.card').click(e => {

    localStorage.removeItem('detail');
    let findItem = newArr.find(value => value.id == e.currentTarget.id);
    detailArr.push(findItem);

    detailArr = new Set(detailArr);
    detailArr = Array.from(detailArr);

    localStorage.setItem('detail', JSON.stringify(detailArr));

  });
}




/* Ajax */
$.get('./../data/product.json').then((data) => {
  newArr = [...data.products, ...data.products2];
  
  data.products.forEach((value) => {
    appendCard(value);
  });

  
  // 더보기 버튼 기능
  $('.more-btn').click(() => {
    $('.more-btn').css('visibility', 'hidden');
    data.products2.forEach((value) => {
      appendCard(value);
    });

    // Detail Page에 전송 (localStorage)
    propsCard();
  });



  // 검색 창 기능
  $('.search-icon').click(() => {
    $('.search-container').css('top', '100%');
  });

  $('.close-btn').click(() => {
    $('.search-container').css('top', '-100%');
    $('.item-container').html('');
    $('.more-btn').css('visibility', 'visible');
    $('.scrollUp-btn').css('visibility', 'visible');

    data.products.forEach(value => {
      appendCard(value);
    });
    
    // Detail Page에 전송 (localStorage)
    propsCard();
  });

  $('.search-input').on('input', (e) => {

    $('.scrollUp-btn').css('visibility', 'hidden');

    let searchValue = e.currentTarget.value;
    let findArr = [];

    newArr.forEach(value => {
      if(value.title.includes(searchValue) || value.brand.includes(searchValue)){
        findArr.push(value);
      }
    });

    $('.item-container').html('');
    $('.more-btn').css('visibility', 'hidden');

    findArr.forEach((value) => {
      appendCard(value);
    });

    // Detail Page에 전송 (localStorage)
    propsCard();
  });


  // Toggle 검색 창 기능
  $('.toggle-search-icon').on('click', (e) => {
    $('.toggle-input').css('display', 'inline');
    $('.toggle-close-btn').css('display', 'inline');
  })

  $('.toggle-input').on('input', (e) => {

    $('.scrollUp-btn').css('visibility', 'hidden');

    let searchValue = e.target.value;
    let findArr = [];

    newArr.forEach(value => {
      if(value.title.includes(searchValue) || value.brand.includes(searchValue)){
        findArr.push(value);
      }
    });

    $('.item-container').html('');
    $('.more-btn').css('visibility', 'hidden');

    findArr.forEach(value => {
      appendCard(value);
    });

    // Detail Page에 전송 (localStorage)
    propsCard();
  });

  $('.toggle-close-btn').on('click', () => {
    $('.toggle-input').css('display', 'none');
    $('.toggle-close-btn').css('display', 'none');
    $('.item-container').html('');
    $('.more-btn').css('visibility', 'visible');
    $('.scrollUp-btn').css('visibility', 'visible');

    data.products.forEach(value => {
      appendCard(value);
    });

    // Detail Page에 전송 (localStorage)
    propsCard();
  });



  // Detail Page에 전송 (localStorage)
  propsCard();
  

});




/* Show & Hidden Toggle Btn */
$('.fa-toggle-off').click(() => {
  $('.nav-container').css('top', '0');
  $('.main-container').css('margin-top', '15rem');
});

$('.fa-toggle-on').click(() => {
  $('.nav-container').css('top', '-100%');
  $('.main-container').css('margin-top', '8rem');
});


/* Nav UI (scroll Eventhandler) */
$(window).on('scroll', () => {
  if(window.scrollY > 15) {
    $('header').css('zoom', '0.8');
  } else {
    $('header').css('zoom', '1');
  }
});

$('.scrollUp-btn').click(() => {
  window.scrollTo(0, 0);
})



// Log in Change UI
let getItem = localStorage.getItem('nowUser');
if(getItem != undefined){
  
  $('li').eq(2).replaceWith(`
  <li>
    <div class="log-out">Log Out</div>
  </li>
  `);

}


// Log out Btn Function
$('.log-out').click(() => {
  localStorage.removeItem('nowUser');

  $('li').eq(2).replaceWith(`
  <li>
    <a href="./../LoginPage/login.html">Log In</a>
  </li>
  `);
});
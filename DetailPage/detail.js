function detailCard(value){
  let card = `
  <div class="detail-container">
    <div class="pic-container">
      <img class="img" src="./../img/f${value.id + 1}.jpg">
      <img class="img" src="./../img/b1.jpg">
      <img class="img" src="./../img/b4.jpg">
    </div>
    <div class="explain-container">
      <div class="itemInfo-container">
        <h4>${value.title}</h4>
        <p>${value.brand}</p>
        <p>${value.price}$</p>
        <div class="explain">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam congue tortor eget pulvinar lobortis. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia Curae; Nam ac dolor augue. Pellentesque mi mi, laoreet
          et dolor sit amet, ultrices varius risus. Nam vitae iaculis elit.
          Aliquam mollis interdum libero. Sed sodales placerat egestas.
        </div>
      </div>
      <div class="function-container">
        <form action="#" class="select-container">
          <h4>사이즈</h4>
          <select class="select" name="size">
            <option value="none">선택</option>
            <option value="small">Small Size</option>
            <option value="medium">Medium Size</option>
            <option value="Large">Large Size</option>
          </select>
        </form>
        <form action="#" class="quantity-container">
          <label for="quantity">수량</label>
          <input value="1" type="number" class="input-count">
        </form>
        <a href="./../CartPage/cart.html">
          <button class="buy-btn">
            구매하기
          </button>
        </a>
      </div>
    </div>
  </div>
  `

  $('.main-container').append(card);
}


// Detail 페이지에 데이터바인딩
let getItem = localStorage.getItem('detail');
getItem = JSON.parse(getItem);

getItem.forEach((value) => {
  detailCard(value);
});


// Scroll 기능
$(window).on('scroll', () => {
  // window height 변할 때마다 detail-container height 값 바꿔주기(sticky)
  $('.detail-container').css('height', `${$('.pic-container').height()}`);

  // 웹페이지 실제높이 - 웹페이지 보이는 높이
  let height = document.querySelector('html').scrollHeight - document.querySelector('html').clientHeight;
  // 현재 웹페이지 스크롤 양
  let yValue = document.querySelector('html').scrollTop;

  if(yValue < (height / 3 - 10)){
    $('.explain').html(`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nam congue tortor eget pulvinar lobortis. Vestibulum ante
    ipsum primis in faucibus orci luctus et ultrices posuere
    cubilia Curae; Nam ac dolor augue. Pellentesque mi mi, laoreet
    et dolor sit amet, ultrices varius risus. Nam vitae iaculis elit.
    Aliquam mollis interdum libero. Sed sodales placerat egestas.`);
  } else if(yValue >= (height / 3 - 10) && (yValue <= height / 3 * 2 - 10)){
    $('.explain').html(`The HyperText Markup Language or HTML is the standard markup 
    language for documents designed to be displayed in a web browser. It is often assisted 
    by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.
    Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. 
    HTML describes the structure of a web page semantically and originally included cues for its appearance.`);
  } else if(yValue > (height / 3 * 2 - 10)){
    $('.explain').html(`CSS is designed to enable the separation of content and presentation, including layout, colors, and fonts.
    [3] This separation can improve content accessibility; provide more flexibility and control in the specification of presentation characteristics; 
    enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, 
    which reduces complexity and repetition in the structural content; and enable the .css file to be cached
     to improve the page load speed between the pages that share the file and its formatting.`);
  }
});



// 사이즈 & 수량 data localStorage에 저장 기능,
// 구매하기 버튼 기능
$('.select').click((e) => {
  let value = e.target.value;

  if(value != 'none') {
    getItem[0].size = value;
    getItem[0].count = 1;
  }
});

$('.input-count').on('input', (e) => {
  let value = e.target.value;

  if(value <= 0) {
    $('.input-count').val('1');
  } else if(value >= 1){
    getItem[0].count = value;
  } else {
    return
  }
});

$('.buy-btn').click((e) => {
  if(getItem[0].size == undefined || getItem[0].count == undefined){
    e.preventDefault();
    window.alert('사이즈나 수량을 확인해주세요.');
  } else {
    let buyArr = localStorage.getItem('buy');
    buyArr = JSON.parse(buyArr);

    if(buyArr == null){
      localStorage.setItem('buy', JSON.stringify(getItem));
    } else {
      // 중복 확인 및 count++ 기능
      let overlapIndex = buyArr.findIndex(element => element.id == getItem[0].id && element.size == getItem[0].size);
      
      if(overlapIndex == -1){
        buyArr.push(getItem[0]);
        localStorage.setItem('buy', JSON.stringify(buyArr));
      } else {
        buyArr[overlapIndex].count += 1;
        localStorage.setItem('buy', JSON.stringify(buyArr));
      }
    }
  }
})




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


// Log in Change UI
let nowUser = localStorage.getItem('nowUser');

if(nowUser != undefined){
  $('li').eq(2).replaceWith(`
  <li>
    <div class="log-out">Log Out</div>
  </li>
  `);
}

$('.log-out').click(() => {
  localStorage.removeItem('nowUser');

  $('li').eq(2).replaceWith(`
  <li>
    <a href="./../LoginPage/login.html">Log In</a>
  </li>
  `);
});
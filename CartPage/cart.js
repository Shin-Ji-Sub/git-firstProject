let cartArr = [];

function appendCard(value) {
  let card = `
    <tr>
      <td>${value.brand}</td>
      <td>${value.title}</td>
      <td>${value.size}</td>
      <td>${value.price}$</td>
      <td>
        <input value="${value.count}" aria-label="count-input" type="number" class="count-input">
      </td>
      <td>
        <input class="delete-check" aria-label="delete-check" id="${value.id}" type="checkbox">
      </td>
    </tr>
  `;
  
  $('tbody').append(card);

}


let getItem = localStorage.getItem('buy');
getItem = JSON.parse(getItem);
cartArr = [...getItem];

cartArr.forEach((value) => {
  appendCard(value);
});



// Delete Btn 기능
const checkClick = Array(cartArr.length).fill(false);
let checkArr = [];
let id;
let size;
let quan;


// 삭제 버튼마다 체크를 했는지, 풀었는지 확인하고
// 체크한 상품 data 담고, 풀었으면 data 초기화 기능
cartArr.forEach((value, i) => {
  $('.delete-check').eq(i).on('click', (e) => {
  
    checkClick[i] = !checkClick[i];
    
    if(checkClick[i] == true) {
      id = e.target.id;
      size = $(e.target).parent().siblings('td').eq(2).text();
      quan = $(e.target).parent().siblings('td').eq(4).children().val();
      let obj = {
        id : id,
        size : size,
        quan : quan
      }
      checkArr.push(obj);   
    } else {
      let index = checkArr.findIndex(element => element.id == e.target.id);
      checkArr.splice(index, 1);
    }
  });
});

// Delete Btn 기능
$('.delete-btn').click(() => {
  checkArr.forEach((value) => {
    let findIndex = cartArr.findIndex(element => element.id == value.id);
  
    cartArr.splice(findIndex, 1);
    getItem.splice(findIndex, 1);

    localStorage.setItem('buy', JSON.stringify(getItem));
  });

  $('tbody').html('');
  cartArr.forEach((value) => {
    appendCard(value);
  });

  total();
});


// 총 수량, 총 가격 보여주는 기능
function total(){
  let totalQuan = 0;
  let totalPrice = 0;

  if(cartArr.length == 0){
    $('.count').html('');
    $('.price').html('');

    $('.count').html('0');
    $('.price').html('0');
  } else {
    cartArr.forEach((value) => {
      $('.count').html('');
      $('.price').html('');
  
      totalQuan += parseInt(value.count);
      $('.count').html(totalQuan);
      
      totalPrice += (parseInt(value.price) * parseInt(value.count));
      $('.price').html(totalPrice);
    });
  }
}

total();

$('.count-input').on('input', (e) => {

  let count = $(e.target).val();
  let title = $(e.target).parent().siblings('td').eq(1).text();

  if(count <= 0){
    $(e.target).val('1')
  } else {
    cartArr.forEach((value, i) => {
      if(title == value.title) {
        value.count = count;
        getItem[i].count = count;
        localStorage.setItem('buy', JSON.stringify(getItem));
      }
    });
  }

  total();
  
});


// Toggle 기능
$('.fa-toggle-off').click(() => {
  $('.nav-container').css('top', '0');
});

$('.fa-toggle-on').click(() => {
  $('.nav-container').css('top', '-100%');
});


// Log in Change  UI
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
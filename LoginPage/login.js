
// Nav List hover UI 기능
$('.nav-list').on('mouseover', (e) => {
  let listWidth = parseInt($(e.currentTarget).css('width'));


  $(e.currentTarget).children('span').css('width', `${listWidth}`);
});

$('.nav-list').on('mouseout', (e) => {
  $(e.currentTarget).children('span').css('width', '0');
});



// Log in Btn (id, pw input value examine) 기능
$('.submit-btn').click((e) => {
  let id = $('.id-input').val();
  let pw = $('.pw-input').val();

  let getItem = localStorage.getItem('user');
  getItem = JSON.parse(getItem);

  let findItem = getItem.find(element => element.userId === id && element.userPw === pw);

  if(findItem == undefined){
    e.preventDefault();
    return window.alert('ID, PW가 틀렸습니다.');
  } else {
    localStorage.removeItem('nowUser');
    localStorage.setItem('nowUser', JSON.stringify(findItem));
  }
});
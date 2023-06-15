// Nav List hover UI 기능
$('.nav-list').on('mouseover', (e) => {
  let listWidth = parseInt($(e.currentTarget).css('width'));


  $(e.currentTarget).children('span').css('width', `${listWidth}`);
});

$('.nav-list').on('mouseout', (e) => {
  $(e.currentTarget).children('span').css('width', '0');
});



// Introduction UI
let helloArr = $('.hello').text().split('');
let textArr = $('.introduction p').text().split('');
let plusArr = [];
let plusArr2 = [];
let minusArr = [...helloArr];
let num = Math.floor(Math.random() * 2) + 1;
let finish = 0;


$('.introduction p').html('');
$('.hello').html('');


setTimeout(() => {
  helloArr.forEach((value, i) => {
    setTimeout(() => {
      
      plusArr.push(value);
      plusArr.toString();
      $('.hello').html(plusArr);

      if(i == helloArr.length - 1){
        finish = 1;
      }

      if(finish == 1){

        setTimeout(() => {
          for(let z = 0; z < helloArr.length; z++){
            setTimeout(() => {
              minusArr.pop();
              minusArr.toString();
              $('.hello').html(minusArr);

              if(z == helloArr.length - 1){
                finish = 2;
              }

              /* p tag UI */
              if(finish == 2){
                setTimeout(() => {
                  for(let i = 0; i < textArr.length; i++){
                    setTimeout(() => {
                      plusArr2.push(textArr[i]);
                      plusArr2.toString();
                      $('.introduction p').html(plusArr2);
                    }, (num * i) + '00');
                  }
                }, 500);
              }

            }, (num * z) + '00');
          }
        }, 1000);

      }

    }, (num * i) + '00')
  });
}, 1000);



// Examine Input value
$('.id-input').on('input', (e) => {
  // white space, length, special characters
  let id = $('.id-input').val();

  if(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test(id)){
    $('.id-msg').html('특수문자 없이 입력해주세요.');
  } else if(/\s/.test(id)){
    $('.id-msg').html('공백 없이 입력해주세요.');
  } else if(id.length < 5 && id.length > 0){
    $('.id-msg').html('5글자 이상 입력해주세요.');
  } else if(id.length == 0){
    $('.id-msg').html('');
  } else {
    $('.id-msg').html('');
  }
});

$('.pw-input').on('input', () => {
  // white space, special characters, length
  let pw = $('.pw-input').val();
  
  if(/\s/.test(pw)){
    $('.pw-msg').html('공백 없이 입력해주세요.');
  } else if(pw.length < 8 && pw.length > 0){
    $('.pw-msg').html('8글자 이상 입력해주세요.');
  } else if(pw.length == 0){
    $('.pw-msg').html('');
  } else if(!/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test(pw)){
    $('.pw-msg').html('대문자, 특수문자 각각 1글자 이상 포함시켜주세요.');
  } else if(!/[A-Z]/.test(pw)){
    $('.pw-msg').html('대문자, 특수문자 각각 1글자 이상 포함시켜주세요.');
  } else {
    $('.pw-msg').html('');
  }
});

$('.name-input').on('input', () => {
  // white space, special characters
  let name = $('.name-input').val();

  if(/\s/.test(name)){
    $('.name-msg').html('공백 없이 입력해주세요.');
  } else if(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test(name)){
    $('.name-msg').html('특수 기호 없이 입력해주세요.');
  } else if(name.length == 0){
    $('.name-msg').html('');
  } else {
    $('.name-msg').html('');
  }
});


// Register Btn 기능
$('.register-btn').click((e) => {
  let id = $('.id-input').val();
  let pw = $('.pw-input').val();
  let name = $('.name-input').val();
  let idCheck = false;
  let pwCheck = false;
  let nmaeCheck = false;

  // id
  if(!/\s/.test(id) 
  && id.length > 4
  && !/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test(id)){
    idCheck = true;
  } else {
    e.preventDefault();
    window.alert('ID를 다시 확인해주세요.');
  }
  // pw
  if(!/\s/.test(pw) 
  && /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test(pw)
  && /[A-Z]/.test(pw)
  && pw.length > 7){
    pwCheck = true;
  } else {
    e.preventDefault();
    window.alert('Password를 다시 확인해주세요.');
  }
  // name
  if(!/\s/.test(name)
  && !/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test(name)
  && id.length > 0){
    nmaeCheck = true;
  } else {
    e.preventDefault();
    window.alert('Name을 다시 확인해주세요.');
  }


  if(idCheck && pwCheck && nmaeCheck){
    
    let obj = {
      userId : id,
      userPw : pw,
      userName : name
    }

    let getItem = localStorage.getItem('user');

    if(getItem != undefined){
      getItem = JSON.parse(getItem);
      let findItem = getItem.find(element => element.userId == id);
      if(findItem == undefined){
        getItem.push(obj);
        localStorage.setItem('user', JSON.stringify(getItem));
      } else {
        e.preventDefault();
        return window.alert('이미 등록된 ID가 있습니다.');
      }
    } else {
      localStorage.setItem('user', JSON.stringify([obj]));
    }
  }

});
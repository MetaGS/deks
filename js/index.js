$(document).ready(function(){
  var cher =document.querySelectorAll('div audio');
  var check = [];
  var record = [];
  var position = 0;
  var where = 1;
  var points = 0;
  var inter;
  var worksNow = true;
  var timeout;
  var strictMode = false;
  
  $('#strict').on('click',function(){
    if(!strictMode){
    strictMode = true;
    $('#strict').animate({left:'18px',opacity:'1'});
    } else {
      strictMode = false;
    $('#strict').animate({left:'-22px',opacity:'1'});
    }
    
  });
  
  
  $('#reset').on('click',function(){
    rest();
  });

  function rest(){
    check = [];
    record =[];
    position = 0;
    where = 1;
    points = 0;
    clearInterval(inter);
    worksNow = false;
    clearTimeout(timeout);
    $('#point').html(points);
  }
  
  
  
  
$('div').mousedown(function(){
  if(!worksNow){
  $(this).css('opacity','0.5');
  var current = this.children;

$(current)[0].play();
  var kor = $(this.parentElement.children);
var toCheck = Number($(current).attr('data-index'));
  if(record[position]!==toCheck){
  if(strictMode){rest();}
  $('.alarm').html('Wrong,try again');
  $('#central').css('background-color','rgb(183, 25, 25)')
   timeout = setTimeout(function(){$('.alarm').html(' ');comp(where);$('#central').css('background-color','black');},1000)
    
  }else if(record[record.length-1]==toCheck&&position==record.length-1) {
    position = 0;
    points++;
    where++;
    $('.alarm').html('Жоха, прошел уровень: '+ points);
    $('#central').css('background-color','green')
    $('#point').html(points);
    timeout = setTimeout(function(){$('.alarm').html(' ');
       comp(where);$('#central').css('background-color','black');},1000);
    
  }else {
  position++;
  }

  
  $('div').mouseup(function(){
    $(this).css('opacity','1');
  });
  }
});
  
    
  //cher[0].play();
  //--------------------------------
  $('#start').on('click',function(){

comp(where);
   worksNow = false;
    //-----------------------------
  });
  function comp(param){
    var combo = rand(param);
    worksNow = true;
    record = combo.slice(0);
    position = 0;
    var i=0;
    var times = 0;
    var prevColor;
clearInterval(inter);

    console.log(record)
    
    
  inter = setInterval(function(){
    prevColor = $(cher[combo[i]].parentElement).css('background-color').slice(0);
    $(cher[combo[i]].parentElement).css('opacity','0.5');
    setTimeout(function(){
    $(cher[combo[i-1]].parentElement).css('opacity','1');

    },500)
    cher[combo[i]].play();
    
    if(times === param){
      clearInterval(inter);
      worksNow = false;
    }
    times++;
    i++;
  },1000);
   
  }
  
  
  function rand(param){
    var arrRet = [];
    for(var i = 0; i<=param;i++){
      arrRet.push(Math.floor(Math.random()*4));
    }
    return arrRet;
  }

  
 
});
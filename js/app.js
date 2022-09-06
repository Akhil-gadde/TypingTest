// importing from another js files

import {clearing,addingchild} from "./test.js";

// 

// HTML selectors
const wordcounts=[document.querySelector("#wordcount1"),document.querySelector("#wordcount2"),
document.querySelector("#wordcount3"),document.querySelector("#wordcount4")];
const restart1=document.querySelector('.forrestart1');
const restart2=document.querySelector('.forrestart2');
const inp=document.querySelector('.typed');
const correctwords=document.querySelector('.correct');

// 

// Variable declarations

let wordtyped=0,curposinpara=0;
let count=0;let last=0;
let timetaken=0;let timervar=0;
const wordcountselected=[10,25,50,100];
let wordcountavailable=4;
let numofwordsselected=0;
// 

// if(curposinpara==0){
// API call

async function getword() {
  let url="https://random-word-api.herokuapp.com/word?number=1000&swear=0";
  const response = await axios.get(url);
  wordconv(response.data);
}

// 


// conereting strings to div elements and adding to html

function wordconv(res){
  let str="";
  let req=0,pos=0;
  const paradisp=document.querySelector('.paradisp');
  clearing(paradisp);
  while(req<count && pos<1000){
    if(res[pos].length<9){
      str+=`${res[pos]} `;  
      addingchild(paradisp,'div',`${res[pos]}`,'wordsinpara',"wordsinpara"+`${req}`);
      req++;
    }
    pos++;
  }
}

// 

// eventlistner for numer of words choosen
wordcounts[0].addEventListener('click',(eve)=>{
  numofwordsselected=0;
  wordselection();
})
wordcounts[1].addEventListener('click',(eve)=>{
  numofwordsselected=1;
  wordselection();
})
wordcounts[2].addEventListener('click',(eve)=>{
  numofwordsselected=2;
  wordselection();
})
wordcounts[3].addEventListener('click',(eve)=>{
  numofwordsselected=3;
  wordselection();
})

function wordselection(){
  for(let i=0;i<wordcountavailable;i++){
    if(wordcounts[i].classList.contains('active')){
      wordcounts[i].classList.remove('active');
    }
    if(i==numofwordsselected){
      const timeworddisp=document.querySelector('.timecnt');
      var curcnt=wordcountselected[numofwordsselected];
      count=curcnt;
      timeworddisp.textContent=`${curcnt}`;
      wordcounts[i].classList.add('active');
      restart();
    }
  }
}

// wordcount.addEventListener('change', (eve)=>{
//   // wordtyped=0;curposinpara=0;
//   // last=0;
  
//   // correctwords.textContent="correct words: 0";
  
//   // getword(curcnt);
// })

// 

// setting everything to 0

function restart(){
  last=0;timetaken=0;wordtyped=0;curposinpara=0;
  clearInterval(timervar);
  timervar=null;
  const timer_text=document.querySelector('.timer');
  timer_text.textContent =0;
  const paradisp=document.querySelector('.paradisp');
  clearing(paradisp);
  correctwords.textContent="correct words: 0";
  const cnt=wordcountselected[numofwordsselected];
  getword(cnt);
  inp.value="";
}

//  

// event listener on restart button in midpart1

restart1.addEventListener('click',(eve)=>{
  restart();
})


restart2.addEventListener('click',(eve)=>{
  restart();
  const midpar1=document.querySelector('.midpart1');
  const midpar2=document.querySelector('.midpart2');
  midpar2.style.display="none";
  midpar1.style.display="block";
  document.querySelector('.righttop').style.display="block";
})


// 


if(curposinpara ==0){
  inp.addEventListener('click',(eve)=>{
    // console.log("listening");
    if(curposinpara!=0) return;
    clearInterval(timervar);
    timervar = setInterval(updateTimer, 1000);
  })
}


function updateTimer() {  
  if (timetaken <100) {
    // decrease the current time left
    timetaken++;
 
    // increase the time elapsed
    // timeElapsed++;
 
    // update the timer text
    const timer_text=document.querySelector('.timer');
    timer_text.textContent = timetaken + "s";
  }
  else {
    // finish the game
    // finishGame();
    clearInterval(timervar);
    const timer_text=document.querySelector('.timer');
    timer_text.textContent = "time over";
  }
}


// event listener on input from user for words

inp.addEventListener('keyup', eve =>{
  if(curposinpara<count){
    if(eve.code== 'Space'){
      let x=inp.value.slice(0,-1);
      check(x,curposinpara);
      if(curposinpara-last >10){ // just changed
        clearfirsrtline();
      }
      inp.value="";
      curposinpara++;
      if(curposinpara==count) finished();
    }
  }else{
    finished();
  }
})

// 

// making the midpart2 visible and toggling the midpart1 as none

function finished(){
  clearInterval(timervar);
  const midpar1=document.querySelector('.midpart1');
  const midpar2=document.querySelector('.midpart2');
  const wp=document.querySelector('.wpm');
  clearing(wp);
  addingchild(wp,'div',`final words typed: ${wordtyped}`,'finalwordstyped','finalwordstypedid');
  addingchild(wp,'div',`total time spent: ${timetaken}`,'finaltimetaken','finaltimetakenid');
  addingchild(wp,'div',`WPM: ${Math.round((60*wordtyped)/timetaken)}`,'finalwpm','finalwpmid');
  // wp.textContent=`${wordtyped}  ${timetaken}  ${Math.round((60*wordtyped)/timetaken)}`;
  midpar1.style.display="none";
  midpar2.style.display="block";
  document.querySelector('.righttop').style.display="none";
}

// 

// checking whether typed word is same as required or not

function check(curstr,curposinpara){
  const curstrinpara=document.querySelector(`#wordsinpara${curposinpara}`);

  if(`${curstrinpara.textContent}`==`${curstr}`){
    wordtyped++;
    correctwords.textContent=`correct words:${wordtyped}`;
    curstrinpara.classList.add('correctspelled');
  }else{
    curstrinpara.classList.add('wrongspelled');
  }
}

// 


// clearing the elements that are already used

function clearfirsrtline(){
  const widt=document.querySelector('.paradisp').offsetWidth;
  let curlen=0;
  // may become too time Complexed
  for(let i=last;i<=curposinpara;i++){
    const x=document.querySelector("#wordsinpara"+`${i}`).offsetWidth;
    let y=0;
    if(i+1< count ) y+=(document.querySelector("#wordsinpara"+`${i+1}`).offsetWidth);
    if((curlen+x <= widt) && (curlen+x+y > widt)){
      for(let j=last;j<i;j++){
        document.querySelector("#wordsinpara"+`${j}`).style.display='none';
      }
      last=i+1;
      break;
    }else{
      curlen+=x;
    }
  }
}

// 
// // }

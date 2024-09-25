const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelectorAll(".from select");
const toCurr=document.querySelectorAll(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns){
    for(currCodes in countryList){
    let currOption=document.createElement("option");
    currOption.innerText=currCodes;
    currOption.value=currCodes;
    if(select.name==="from" && currOption.innerText==="INR"){
       currOption.selected="selected";
    }
    else if(select.name==="to"&&currOption.innerText==="USD"){
        currOption.selected="selected";
    }
    select.append(currOption);
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}

const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
}


btn.addEventListener("click",async (event)=>{
  event.preventDefault();
  let amount=document.querySelector(".amount input");
  let amtVal=amount.value;
  if(amtVal===""||amtVal<1){
    amtVal=1;
    amount.value="1";
  }
  const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response=await fetch(URL);
  let data=await response.json();
  let rate=data[toCurr.value.toLowerCase()];
  let finalAmount=amtVal * rate;
  msg.innerText=`${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value}`;
});



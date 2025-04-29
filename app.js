const BASE_URL ="https://v6.exchangerate-api.com/v6/654567202323fb9699b6be63/latest"

const main =document.querySelectorAll(".main_container .dropdown");
const btn=document.querySelector("#getbutton");
const fromCurr=document.querySelector(".from .dropdown");
const toCurr=document.querySelector(".to .dropdown");
const msg=document.querySelector("#button");




for(let select of main){
    for(let currcode in countryList){
       let newOption=document.createElement("option");
       newOption.innerText=currcode;
       newOption.value=currcode;
       select.append(newOption);
    };

    select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
};
const updateFlag=(element)=>  {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
     let img =element.parentElement.querySelector("img");
    img.src= newSrc;
};
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("input");
    let amtvalue =amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
      }

    const URL=`${BASE_URL}/${fromCurr.value}`;  
    let response = await fetch(URL);
    let data =await response.json();
    let rate=data.conversion_rates[toCurr.value.toUpperCase()];
    let finalamount = amtvalue*rate;
    msg.innerText=`${amtvalue}${fromCurr.value}=${finalamount}${toCurr.value}`;
});


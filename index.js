const api_key = "08a30f332d94407ea56b0d24c74b83e5";
const url = "https://newsapi.org/v2/everything?q=";
let loader = document.querySelector(".loader")
let news_container = document.querySelector(".news_container")
var card =document.querySelector(".card");
var logo =document.querySelector(".logo");



window.addEventListener("load",()=>{
    fetchnews("india")
})


const  fetchnews = async (query)=>{
  loader.style.display = "inline-block";
let res = await fetch(`${url}${query}&apikey=${api_key}`) 
let data = await res.json()
shownews(data.articles)
loader.style.display = "none";

}

function shownews(articles){
    let news_container = document.querySelector(".news_container");
    news_container.innerHTML =
    articles.map((ele)=>{
        let dateEl = new Date(ele.publishedAt).toLocaleString("en-US",{timeZone:"Asia/kolkata"});
      if(!ele.urlToImage ) return;
      return(

        `<div class="card">
        
            <img src=${ele.urlToImage} alt="img">
      <div class="write">
            <h3>${ele.title}</h3>
            <h4>${ele.source.name}: ${dateEl}</h4> 
            <div class="description">${ele.description}  <span><a href="${ele.url}" target="_blank" class="readmore">...read-more</a></span></div> 
           
           

     </div>

        </div>`  )
        
      })

    }

 

    
   
    const searchfun = ()=>{
        let search_inp = document.querySelector(".search_inp");
        let s_btn = document.querySelector(".s_btn")
        s_btn.addEventListener("click",()=>{
          let  search_val = search_inp.value;
      if(search_val === "") return;
      if(!search_val) return;
        fetchnews(search_val)
        let active = document.querySelector(".active");
        active?.classList.remove("active");
      
        })
    }
    searchfun();


    

  const selectfun =()=>{
   let ank = document.querySelectorAll(" a");
   ank.forEach((a)=>{
       a.addEventListener("click",()=>{
          let active = document.querySelector(".active");
          active?.classList.remove("active");
          a.classList.add("active");
         
        fetchnews(a.innerHTML)
        let search_inp = document.querySelector(".search_inp");
         search_inp.value = "" 

      })
   })
  }
  selectfun();



  logo.addEventListener("click",()=>{
    location.reload()
  })




// responsive nav  //



 let fa_bar = document.querySelector(".fa-bars");
 let fa_xmark = document.querySelector(".fa-xmark");
 let nav_links = document.querySelector(".nav_links");

 fa_bar.addEventListener("click",()=>{
  nav_links.style.right = "0";

  fa_bar.style.display = "none";
  fa_xmark.style.display = "block"


 })

 fa_xmark.addEventListener("click",()=>{
  fa_bar.style.display = "block";
  fa_xmark.style.display = "none";
  nav_links.style.right = "-200px";



 })
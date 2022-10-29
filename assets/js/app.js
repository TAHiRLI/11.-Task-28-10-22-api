let deleteBtns = document.getElementsByClassName('del-btn');
       for (const btn of deleteBtns) {
          btn.addEventListener('click', (e)=>{
         
           e.target.parentElement.parentElement.style.display = 'none'
          })
       }

const  cards = document.querySelector('.cards');
const BASE_URL = 'https://dummyjson.com';

const getProducts = ()=>{
    fetch(`${BASE_URL}/products`)
    .then(res => res.json())
    .then(data => {
      data?.products.map(product =>{
          cards.innerHTML +=
          `
          <div class="card">
          <div class="card-body">
          <h4 class="card-title">${product.title}</h4>
          <img width="100%" src="${product.thumbnail}" alt="" class="card-img">
              <p class="card-text">${product.description}}</p>
          </div>
          <div class=" border-top border-1 p-2 text-end ">
              <button class="btn del-btn btn-outline-danger ms-2 fs-5">Delete</button>
          </div>
      </div>

          `;
         deleteBtns = document.getElementsByClassName('del-btn');
        for (const btn of deleteBtns) {
           btn.addEventListener('click', (e)=>{

            e.target.parentElement.parentElement.style.display = 'none'
           })
        }


      })
        })
    
}

getProducts();



            
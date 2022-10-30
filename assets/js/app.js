let deleteBtns = document.getElementsByClassName('del-btn');
let rowNumbers = document.querySelectorAll('th[scope = "row"');
let table = document.querySelector('#tableWrapper');
let tbody = document.querySelector('tbody');
let menuBtn = document.querySelector('#menu')

for (const btn of deleteBtns) {
    btn.addEventListener('click', (e) => {

        e.target.parentElement.parentElement.style.display = 'none';
    });
}

const cards = document.querySelector('.cards');
const BASE_URL = 'https://dummyjson.com';

const getAndShowproducts = () => {
    fetch(`${BASE_URL}/products`)
        .then(res => res.json())
        .then(data => {
            data?.products.map(product => {
                cards.innerHTML +=
                    `
          <div class="card" id = "card${product.id}">
          <div class="card-body">
          <h4 class="card-title">${product.title}</h4>
          <img width="100%" src="${product.thumbnail}" alt="" class="card-img">
              <p class="card-text text-muted">${product.description}}</p>
          </div>
          <div class="d-flex justify-content-between border-top border-1 p-2 px-4 ">
             <h6 class="card-brand text">${product.brand}</h6>
              <button class=" del-btn  border-0 bg-transparent text-danger fs-2  las la-trash"> </button>
          </div>
      </div>

          `;

                tbody.innerHTML += `
          <tr id="tr${product.id}">
          <th scope="row"></th>
          <td>${product.brand}</td>
          <td>${product.title}</td>
          <td>${product.rating}</td>
          <td><div class="row">
          <button class="p-0 col edit-btn  border-0 bg-transparent text-warning fs-5  las la-pen"> </button>
          <button class="p-0 col remove-btn  border-0 bg-transparent text-danger fs-5  las la-trash"> </button>
          <button class="p-0 col discard-btn  border-0 bg-transparent text-danger  fs-5 las la-times d-none"> </button>
          <button class="p-0 col save-btn  border-0 bg-transparent text-success  fs-5 las la-check d-none"> </button>
          

          </div></td>
          </tr>
          `;


                removeBtns = document.getElementsByClassName('remove-btn');
                for (const btn of removeBtns) {
                    btn.addEventListener('click', (e) => {
                        let row = e.target.parentElement.parentElement.parentElement;
                        row.style.display = 'none';
                        tbody.removeChild(e.target.parentElement.parentElement.parentElement);
                        cards.removeChild(document.querySelector(`.card[id="${row.getAttribute('id').replace('tr','card')}"]`));

                        numberRows();
                    });
                }
                deleteBtns = document.getElementsByClassName('del-btn');
                for (const btn of deleteBtns) {
                    btn.addEventListener('click', (e) => {
                        let card = e.target.parentElement.parentElement;
                        card.style.display = 'none';
                        cards.removeChild(e.target.parentElement.parentElement);
                        tbody.removeChild(document.getElementById(`${card.getAttribute('id').replace('card','tr')}`));

                        numberRows();
                    });
                }


            });
        })
        .then(() => numberRows())
        .then(()=>{
           let editBtns =  document.querySelectorAll('.edit-btn');
           
           editBtns.forEach(btn =>{
               btn.onclick  = (e)=>{
                const BTN_CONTAINER = e.target.parentElement;


                let row = e.target.parentElement.parentElement.parentElement;
                let brandText = row.children[1];
                let titleText = row.children[2];


                let brand = brandText.innerHTML;
                let title = titleText.innerHTML;
                let  newBrand = brand;
                let  newTitle= title;
                
                // making fields inputs
                brandText.innerHTML = `
                <input type="text" value="${brand}">
                `
                titleText.innerHTML = `
                <input type="text" value="${title}">
                `
                // getting values from inputs 
                let brandInput = brandText.children[0];
                let titleInput = titleText.children[0];

                brandInput.addEventListener('change', ()=>{
                     newBrand = brandInput.value;
                })

                titleInput.addEventListener('change', ()=>{
                   newTitle = titleInput.value;
                })



                // hiding del,edit and show discard,save
                for (const btn of BTN_CONTAINER.children) {
                    btn.classList.toggle('d-none');
                }



                let saveBtns = document.querySelectorAll('.save-btn');
                saveBtns.forEach(btn=>{
                    btn.onclick = (ev)=>{
                        brandText.innerHTML = newBrand;
                        titleText.innerHTML = newTitle;
                        
                        // updating cards accordingly
                        let searchId = row.getAttribute('id').replace('tr','card');
                        console.log(searchId)
                        let wantedCardTitle = document.querySelector(` #${searchId} .card-title`)
                        let wantedCardBrand = document.querySelector(` #${searchId} .card-brand`)
                        wantedCardBrand.innerHTML = newBrand
                        wantedCardTitle.innerHTML = newTitle







                        // hide save,discard and show edit,del
                        for (const btn of BTN_CONTAINER.children) {
                            btn.classList.toggle('d-none');
                        }
        
                        
                    }
                })

                let discardBtns = document.querySelectorAll('.discard-btn');
                discardBtns.forEach(btn=>{
                    btn.onclick = (e)=>{
                        brandText.innerHTML = brand;
                        titleText.innerHTML = title;
                        // hide save,discard and show edit,del
                        for (const btn of BTN_CONTAINER.children) {
                            btn.classList.toggle('d-none');
                        }
        
                    }
                })




            }
           })
        });

};

getAndShowproducts();

const numberRows = () => {
    rowNumbers = document.querySelectorAll('th[scope = "row"');
    for (let i = 0; i < rowNumbers.length; i++) {
        rowNumbers[i].innerText = i + 1;

    }
}

menuBtn.addEventListener('click', ()=>{
    table.classList.toggle('hide')
})




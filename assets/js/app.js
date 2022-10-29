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

const getProducts = () => {
    fetch(`${BASE_URL}/products`)
        .then(res => res.json())
        .then(data => {
            data?.products.map(product => {
                console.log(product)
                cards.innerHTML +=
                    `
          <div class="card" id = "${product.id}">
          <div class="card-body">
          <h4 class="card-title">${product.title}</h4>
          <img width="100%" src="${product.thumbnail}" alt="" class="card-img">
              <p class="card-text">${product.description}}</p>
          </div>
          <div class=" border-top border-1 p-2 text-end ">
              <button class="btn del-btn btn-outline-danger ms-2 ">Delete</button>
          </div>
      </div>

          `;

                tbody.innerHTML += `
          <tr id="${product.id}tr">
          <th scope="row"></th>
          <td>${product.brand}</td>
          <td>${product.title}</td>
          <td>${product.rating}</td>
          <td><div class="">
          <button class="btn btn-outline-danger remove-btn">Remove</button>
          </div></td>
          </tr>
          `;


                removeBtns = document.getElementsByClassName('remove-btn');
                for (const btn of removeBtns) {
                    btn.addEventListener('click', (e) => {
                        let row = e.target.parentElement.parentElement.parentElement;
                        row.style.display = 'none';
                        tbody.removeChild(e.target.parentElement.parentElement.parentElement);
                        cards.removeChild(document.querySelector(`.card[id="${row.getAttribute('id').replace('tr','')}"]`));

                        numberRows();
                    });
                }
                deleteBtns = document.getElementsByClassName('del-btn');
                for (const btn of deleteBtns) {
                    btn.addEventListener('click', (e) => {
                        let card = e.target.parentElement.parentElement;
                        card.style.display = 'none';
                        cards.removeChild(e.target.parentElement.parentElement);
                        tbody.removeChild(document.querySelector(`tr[id="${card.getAttribute('id')}tr"]`));

                        numberRows();
                    });
                }


            });
        })
        .then(() => numberRows());

};

getProducts();

const numberRows = () => {
    rowNumbers = document.querySelectorAll('th[scope = "row"');
    for (let i = 0; i < rowNumbers.length; i++) {
        rowNumbers[i].innerText = i + 1;

    }
}

menuBtn.addEventListener('click', ()=>{
    table.classList.toggle('active')

})




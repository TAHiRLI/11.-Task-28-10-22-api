let deleteBtns = document.getElementsByClassName('del-btn');
let delSelectedBtn = document.querySelector('#del-selected');
let rowNumbers = document.querySelectorAll('th[scope = "row"');
let table = document.querySelector('#tableWrapper');
let tbody = document.querySelector('tbody');
let menuBtn = document.querySelector('#menu');

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

                cards.appendChild(makeNewCard(product.brand, product.title, product.thumbnail, product.description, product.id));
                tbody.appendChild(makeNewRow(product.brand, product.title, product.rating, product.id));

                //     cards.insertAdjacentElement('afterbegin', `
                //     <div class="card" id = "card${product.id}">
                //     <div class="card-body">
                //     <h5 class="card-title">${product.title}</h5>
                //     <img width="100%" src="${product.thumbnail}" alt="" class="card-img">
                //         <p class="card-text text-muted">${product.description}}</p>
                //     </div>
                //         <div class="d-flex justify-content-between border-top border-1 p-2 px-4 ">
                //             <h6 class="card-brand text">${product.brand}</h6>
                //             <button class=" del-btn  border-0 bg-transparent text-danger fs-2  las la-trash"> </button>
                //         </div>
                //     </div>
                // `);


                // tbody.insertAdjacentHTML('beforeend', `
                // <tr id="tr${product.id}">
                // <th><input type="checkbox"></th>
                // <th scope="row"></th>
                // <td>${product.brand}</td>
                // <td>${product.title}</td>
                // <td>${product.rating}</td>
                // <td><div class="row">
                // <button class=" edit-btn    text-warning   las la-pen"> </button>
                // <button class=" remove-btn    text-danger   las la-trash"> </button>
                // <button class=" discard-btn    text-danger   las la-times d-none"> </button>
                // <button class=" save-btn    text-success   las la-check d-none"> </button>


                // </div></td>
                // </tr>`);





            });
        })
        .then(() => {
            numberRows();

        });




};

getAndShowproducts();

menuBtn.addEventListener('click', () => {
    table.classList.toggle('hide');

});


let addBtn = document.querySelector('#add');

let modalSaveBtn = document.querySelector('#modal-save');
modalSaveBtn.addEventListener('click', () => {
    let brand = document.querySelector('#brand').value;
    let title = document.querySelector('#title').value;
    let rating = document.querySelector('#rating').value;
    let url = document.querySelector('#url').value;
    let desc = document.querySelector('#desc').value;
    let id = parseInt(cards.lastChild.id.replace('card', '')) + 1;


    cards.appendChild(makeNewCard(brand, title, url, desc, id));
    tbody.appendChild(makeNewRow(brand, title, rating, id));


    // TASK part 2
    let newObj = new MakeCardObj(brand, title, url, rating, desc);
    fetch(`${BASE_URL}/products/add`, {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));
});







const numberRows = () => {
    rowNumbers = document.querySelectorAll('th[scope = "row"');
    for (let i = 0; i < rowNumbers.length; i++) {
        rowNumbers[i].innerText = i + 1;

    }
};

const makeNewCard = (brand, title, url, desc, id) => {

    let card = document.createElement('div');
    card.classList.add('card');
    card.id = `card${id}`;


    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = title;

    let cardImg = document.createElement('img');
    cardImg.classList.add('card-img');
    cardImg.setAttribute('src', url);

    let description = document.createElement('p');
    description.innerText = desc;
    description.classList.add('card-text');
    description.classList.add('text-muted');



    let btnHolder = document.createElement('div');
    btnHolderClasses = ['d-flex', 'justify-content-between', 'border-top', 'border-1', 'p-2', 'px-4'];
    btnHolderClasses.forEach(className => btnHolder.classList.add(className));

    let cardBrand = document.createElement('h6');
    cardBrand.innerText = brand;
    cardBrand.classList.add('card-brand');

    let btnTrash = document.createElement('button');
    btnTrashClasses = ['del-btn', 'border-0', 'bg-transparent', 'text-danger', 'fs-2', 'las', 'la-trash'];
    btnTrashClasses.forEach(className => btnTrash.classList.add(className));


    card.appendChild(cardBody);
    card.appendChild(btnHolder);
    cardBody.append(cardTitle, cardImg, description);
    btnHolder.append(cardBrand, btnTrash);

    return card;


};

const makeNewRow = (brand, title, rating, id) => {
    let tr = document.createElement('tr');
    tr.id = `tr${id}`;

    let tdCheckbox = document.createElement('td');
    let thRowNumber = document.createElement('th');
    thRowNumber.setAttribute('scope', 'row');
    let tdBrand = document.createElement('td');
    let tdTitle = document.createElement('td');
    let tdRating = document.createElement('td');
    let tdAction = document.createElement('td');
    let tdActionWrapper = document.createElement('div');
    tdBrand.innerText = brand;
    tdTitle.innerText = title;
    tdRating.innerText = rating;


    tr.append(tdCheckbox, thRowNumber, tdBrand, tdTitle, tdRating, tdAction);


    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    tdCheckbox.appendChild(checkBox);

    let editBtn = document.createElement('button');
    let removeBtn = document.createElement('button');
    let discardBtn = document.createElement('button');
    let saveBtn = document.createElement('button');

    editBtn.classList.add('edit-btn', 'text-warning', 'las', 'la-pen');
    removeBtn.classList.add('remove-btn', 'text-danger', 'las', 'la-trash');
    discardBtn.classList.add('discard-btn', 'text-danger', 'las', 'la-times', 'd-none');
    saveBtn.classList.add('save-btn', 'text-success', 'las', 'la-check', 'd-none');
    tdActionWrapper.classList.add('row');
    tdActionWrapper.append(editBtn, removeBtn, discardBtn, saveBtn);

    tdAction.appendChild(tdActionWrapper);




    return tr;


};

function MakeCardObj(brand, title, url, rating, desc) {
    this.brand = brand;
    this.title = title;
    this.rating = rating;
    this.description = desc;
    this.thumbnail = url;
}


delSelectedBtn.addEventListener('click', () => {
    let checkedElements = document.querySelectorAll('input[type="checkbox"]:checked');
    for (const element of checkedElements) {
        let row = element.parentElement.parentElement;
        let card = document.querySelector(`#${row.getAttribute('id').replace('tr', 'card')}`);
        tbody.removeChild(row);
        cards.removeChild(card);

        // Task Part 2
        fetch(`${BASE_URL}/products/${row.id.replace('tr', '')}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => console.log(data));


    }
    numberRows();
});


cards.addEventListener('click', (e) => {
    if (e.target.classList.contains('del-btn')) {
        let card = e.target.parentElement.parentElement;
        cards.removeChild(e.target.parentElement.parentElement);

        tbody.removeChild(document.getElementById(`${card.getAttribute('id').replace('card', 'tr')}`));

        numberRows();

        // Task Part 2
        fetch(`${BASE_URL}/products/${card.id.replace('card', '')}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

});

tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        console.log('calise');
        let row = e.target.parentElement.parentElement.parentElement;
        row.style.display = 'none';
        tbody.removeChild(e.target.parentElement.parentElement.parentElement);
        cards.removeChild(document.querySelector(`.card[id="${row.getAttribute('id').replace('tr', 'card')}"]`));
        numberRows();

        // Task Part 2
        fetch(`${BASE_URL}/products/${row.id.replace('tr', '')}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    else if (e.target.classList.contains('edit-btn')) {
        const BTN_CONTAINER = e.target.parentElement;
        let row = e.target.parentElement.parentElement.parentElement;
        let brandText = row.children[2];
        let titleText = row.children[3];
        let brand = brandText.innerHTML;
        let title = titleText.innerHTML;
        let newBrand = brand;
        let newTitle = title;

        // making fields inputs
        brandText.innerHTML = `
                <input type="text" value="${brand}">
                `;
        titleText.innerHTML = `
                <input type="text" value="${title}">
                `;
        // getting values from inputs 
        let brandInput = brandText.children[0];
        let titleInput = titleText.children[0];

        brandInput.addEventListener('change', () => {
            newBrand = brandInput.value;
        });

        titleInput.addEventListener('change', () => {
            newTitle = titleInput.value;
        });

        // hiding del,edit and show discard,save
        for (const btn of BTN_CONTAINER.children) {
            btn.classList.toggle('d-none');
        }

        let saveBtns = document.querySelectorAll('.save-btn');
        saveBtns.forEach(btn => {
            btn.onclick = () => {
                brandText.innerHTML = newBrand;
                titleText.innerHTML = newTitle;

                // updating cards accordingly
                let searchId = row.getAttribute('id').replace('tr', 'card');
                let wantedCardTitle = document.querySelector(` #${searchId} .card-title`);
                let wantedCardBrand = document.querySelector(` #${searchId} .card-brand`);
                wantedCardBrand.innerHTML = newBrand;
                wantedCardTitle.innerHTML = newTitle;

                // hide save,discard and show edit,del
                for (const btn of BTN_CONTAINER.children) {
                    btn.classList.toggle('d-none');
                }


                // Task Part 2

                fetch(`${BASE_URL}/products/${row.id.replace('tr', '')}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        brand: newBrand,
                        title: newTitle
                    })
                })
                    .then(res => res.json())
                    .then(data => console.log(data));

            };

        });


        let discardBtns = document.querySelectorAll('.discard-btn');
        discardBtns.forEach(btn => {
            btn.onclick = (e) => {
                brandText.innerHTML = brand;
                titleText.innerHTML = title;
                // hide save,discard and show edit,del
                for (const btn of BTN_CONTAINER.children) {
                    btn.classList.toggle('d-none');
                }

            };
        });







    }
});

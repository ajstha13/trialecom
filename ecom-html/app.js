//added
//import KhaltiCheckout from "khalti-checkout-web";

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 120000
    }
];
let listCards  = [];
/*if(JSON.parse(localStorage.getItem('listCards')))
{
    listCards=JSON.parse(localStorage.getItem('listCards'));
}*/
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
      // copy product from the products list to the listCards
      listCards[key] = { ...products[key], quantity: 1 };
    } else {
      // If the item already exists in listCards, increase its quantity
      listCards[key].quantity += 1;
    }
    reloadCard();
  }
/*    original
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        //added
       
    }
    reloadCard();
} */
/*
// Convert the list to a JSON string
const listCardsJSON = JSON.stringify(listCards);
// Save the JSON string to localStorage with a specific key
localStorage.setItem('listsData', listCardsJSON);
// Retrieve the JSON string from localStorage using the key
const storedTasksJSON = localStorage.getItem('listsData');
if (storedTasksJSON) {
    // Parse the JSON string back to a list data type (array)
    listCards = JSON.parse(storedTasksJSON);
    
}*/
function updateLocalStorage() {
    localStorage.setItem('listCards', JSON.stringify(listCards));
  }
  updateLocalStorage();
function reloadCard(){
    
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
    
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
/*
//added
const handleKhaltiPayment = () => {
    setLoading(true);

    const khaltiConfig = {
      publicKey: "test_public_key_4f0056c164884b55b26aaf7caf6511af",
      productIdentity: "your_product_identity",
      productName: "Your Product Name",
      productUrl: "http://localhost:3000",
      amount: subTotal * 1,
      eventHandler: {
        onSuccess(payload) {
          console.log(payload);
          setLoading(false);
          router.push("/success");
        },
        onError(error) {
          console.log(error);
          setLoading(false);
          router.push("/failed");
        },
        onClose() {
          setLoading(false);
        },
      },
    };

    const khaltiCheckout = new KhaltiCheckout(khaltiConfig);
    khaltiCheckout.show();
  };

  */
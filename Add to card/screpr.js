

const products = [
    { image: 'image/1.jpg', titel: 'Product 1', price: 99 },
    { image: 'image/2.jpg', titel: 'Product 2', price: 150 },
    { image: 'image/3.jpg', titel: 'Product 3', price: 99 }
];

let cardindexshow = 0 ;

   

// Function to create product 
function displayProducts() {
    const container = document.getElementById('contener');
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('bar');
        productDiv.innerHTML = `
            <img src="${product.image}" width="100%" alt="${product.titel}">
            <h2>${product.titel}</h2>
            <button onclick="AddTocard(${index})">Add to Cart</button>
        `;
        container.appendChild(productDiv);
    });
}

// Function to add a product to the cart
function AddTocard(index) {
    let DataarrayCard;
    try {
        DataarrayCard = JSON.parse(localStorage.getItem("ProductsCard")) || [];
    } catch (error) {
        console.error('Failed to parse ProductsCard:', error);
        DataarrayCard = [];
    }

    const productToAdd = {
        image: products[index].image,
        titel: products[index].titel,
        price: products[index].price,
        quantity: 1 // Default quantity to 1 when added
    };

    // Check if the product is already in the cart and update quantity if so
    const existingProductIndex = DataarrayCard.findIndex(item => item.titel === productToAdd.titel);
    if (existingProductIndex > -1) {
        DataarrayCard[existingProductIndex].quantity += 1; // Increase quantity
    } else {
        DataarrayCard.push(productToAdd); // Add new product
    }

    localStorage.setItem("ProductsCard", JSON.stringify(DataarrayCard));
    showproductsCard();
}

// Function to display cart products in the table
function showproductsCard() {
    const DataarrayCard = JSON.parse(localStorage.getItem("ProductsCard")) || [];
    const tableCard = document.getElementById('tableCard');
    const totalPriceElement = document.getElementById('totalPrice');
    tableCard.innerHTML = ''; // Clear existing content
    let total = 0;

    DataarrayCard.forEach((item, index) => {
    
        total += item.price * item.quantity; // Sum up total price
        if(index != 0){
            document.getElementById("cardnumber").innerText = `${index + 1}`;
        }else{
            document.getElementById("cardnumber").innerText = ` `;
        }
        document.getElementById("cardnumber").innerText = `${index + 1}`;
        tableCard.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${item.image}" alt="${item.titel}" width="50px"></td>
                <td><h3>${item.titel}</h3></td>
                <td><span>${item.price}</span>$</td>
                <td>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </td>
                <td><button class="deletproducts" onclick="removeProduct(${index})">X</button></td>
            </tr>
        `;
    });

    totalPriceElement.textContent = total; // Display total price
}

// Function to remove a product from the cart
function removeProduct(index) {
    let DataarrayCard = JSON.parse(localStorage.getItem("ProductsCard")) || [];
    DataarrayCard.splice(index, 1);
    localStorage.setItem("ProductsCard", JSON.stringify(DataarrayCard));
    showproductsCard();
}

// Function to increase product quantity
function increaseQuantity(index) {
    let DataarrayCard = JSON.parse(localStorage.getItem("ProductsCard")) || [];
    DataarrayCard[index].quantity++; // Increase quantity by 1
    localStorage.setItem("ProductsCard", JSON.stringify(DataarrayCard));
    showproductsCard();
}

// Function to decrease product quantity
function decreaseQuantity(index) {
    let DataarrayCard = JSON.parse(localStorage.getItem("ProductsCard")) || [];
    if (DataarrayCard[index].quantity > 1) {
        DataarrayCard[index].quantity--; // Decrease quantity by 1
    } else {
        DataarrayCard.splice(index, 1); // Remove product if quantity is 1
    }
    localStorage.setItem("ProductsCard", JSON.stringify(DataarrayCard));
    showproductsCard();
}

// Initialize the product display on page load
window.onload = function() {
    displayProducts();
    showproductsCard();
};

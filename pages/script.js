window.onload = () => {

    sortTheProducts()
}

const products = [
    { name: "Bread", price: 15 }
    , { name: "Milk", price: 23 }
    , { name: "Gum", price: 3 }
    , { name: "Cheese", price: 12 }
]




const sortTheProducts = () => {

    let inptvalue = document.querySelector("#id_input").value;

    if (inptvalue == "") {
        document.querySelector("#id_main").innerHTML = `
    
        <div id="id_div">
        <h3>Bread 15</h3>
        <button onclick='list(0)'>ADD TO THE LIST</button>
        </div>
        <br>
        <div id="id_div">
        <h3>Milk 23</h3>
        <button onclick='list(1)'>ADD TO THE LIST</button>
        </div>
        <br>
        <div id="id_div">
        <h3>Gum 3</h3>
        <button onclick='list(2)'>ADD TO THE LIST</button>
        </div>
        <br>
        <div id="id_div">
        <h3>Cheese 12</h3>
        <button onclick='list(3)'>ADD TO THE LIST</button>
        </div>
        <br>`
    }
    else {
        document.querySelector('#id_main').innerHTML = '';
        for (let i = 0; i < products.length; i++) {
            if (inptvalue >= products[i].price) {
                document.querySelector("#id_main").innerHTML +=
                    `<div id="id_div">
                    <h3> ${products[i].name + ' '}${products[i].price}</h3>
                    <button onclick='list(${i})'>ADD TO THE LIST</button>
                    </div> <br>`;

            }
        }
        for (let i = 0; i < products.length; i++) {
            if (inptvalue == products[i].name[0] || inptvalue.toUpperCase() == products[i].name[0]) {
                document.querySelector("#id_main").innerHTML +=
                    `<div id="id_div">
                <h3> ${products[i].name + ' '}${products[i].price}</h3>
                <button onclick='list(${i})'>ADD TO THE LIST</button>
                </div> <br>`;

            }
        }
    }
}


const saveUser = () => {
    let email = document.forms["User"]['email'].value;
    let pass = document.forms['User']['pass'].value;
    sessionStorage.setItem('Email', email)
    sessionStorage.setItem('Pass', pass)
    // console.log(email)
    // console.log(pass)
}
let chosenProducts = [

];
function list(value) {
    chosenProducts.push(products[value]);
    let data = JSON.stringify(chosenProducts);
    sessionStorage.setItem('AllProducts', data)
    // console.log(data);
}


function buy() {

    let totProducts = chosenProducts.length;
    sessionStorage.setItem('totProducts', totProducts)


    totPrice = 0;
    for (let i = 0; i < chosenProducts.length; i++) {
        totPrice += chosenProducts[i].price;
    }
    sessionStorage.setItem('totPrice', totPrice)



    window.location.href = 'Buy.html'

}

function changePage() {
    window.location.href = 'SignUp.html';
}
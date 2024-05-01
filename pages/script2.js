window.onload = function () {

    dispaly()
    
}

function dispaly() {

    document.querySelector("#id_span1").innerHTML = sessionStorage['totProducts']
    document.querySelector("#id_span2").innerHTML = sessionStorage['totPrice']
}

function sendToServer() {

    let userProducts = [];
    userProducts.push(sessionStorage['Email'])
    userProducts.push(sessionStorage['Pass'])
    userProducts.push(sessionStorage, 'AllProducts')

    const userEmail = sessionStorage['Email'];
    const userPass = sessionStorage['Pass'];
    const userAllP = sessionStorage['AllProducts'];


    fetch('/sendData', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            pass: userPass,
            products: userAllP
        })
    }).then(res => res.json())
        .then(data => {
            sessionStorage.setItem('allData', data);
        })
        alert('Thank You For Buying!')
        // window.location.href = 'All.html'
}



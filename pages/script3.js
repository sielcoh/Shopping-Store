

window.onload = () =>{
dispalyAllBuying()
}


function dispalyAllBuying(){
fetch('/renderAllBuying')
.then(res=> res.json())
.then(data=>{ 
    let allData = data.result;
    for(let i = 0 ; i < allData.length ;i++){
        
        document.body.innerHTML+= `  

        <div id= "id_div"> 
        ${allData[i].email}
        </div>
        <div id= "id_div"> 
        ${allData[i].products}
        </div>
        <hr>

        
        ` 
        // console.log(allData[i].email)    
    }
})
}


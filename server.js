const express = require('express');
const app = express();
const bp = require('body-parser');
const db = require('mongoose');
const url = 'mongodb+srv://siel:ab1020@cluster0.wadjy2k.mongodb.net/Project'

db.connect(url).then(()=>{
    console.log('DB is on')
}).catch((err) =>{
    if (err) throw err;
});

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(express.static('pages'));

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/SignUp.html')
})
app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/Buy.html')
})
app.get('/all', async (req, res) => {
    if(req.query.admin == 'true'){
        res.sendFile(__dirname + '/pages/All.html')
    }else{
        res.status(400).send('EROR! Only the administrator has permission')
    }

})
app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/pages/Products.html')
})

const usersSchema = db.Schema({
    name: String,
    email: String,
    pass: Number
})
const usersList = db.model('users', usersSchema);

const buySchema = db.Schema({
    email: String,
    pass: Number,
    products: String
})
const buyList = db.model('allBuy', buySchema);



// const orderSchema = db.Schema({

// })
// const productsSchema = db.Schema({
//     product: String,
//     price: Number
// })

// const productList = db.model('products', productsSchema);

// const arrProducts = [
//     {
//         product: 'Bread',
//         price: 15
    
//     },
//     {
//         product: 'Milk',
//         price: 23
    
//     },
//     {
//         product: 'Gum',
//         price: 3
    
//     },
//     {
//         product: 'Cheese',
//         price: 12
    
//     },


// ];


// productList.insertMany(arrProducts);



app.post('/signup', (req , res) => {

    const checkIfUserExists = async () => {
        let result = await usersList.findOne(
            {
                email: req.body.email,
            });
            if(result === null){
                let temp = {
                    name: req.body.name,
                    email: req.body.email,
                    pass: req.body.password
                }
                const AddToDb = async (user) => {
                    await usersList.insertMany(user)
                }
                console.log(temp);
                AddToDb(temp);
                res.redirect('/');   
            }
            else{
                res.send(`<script>alert ('This Email exist in the systme'); location.href = "SignUp" </script> `)
            }}
            checkIfUserExists()

})


app.post('/signin', (req, res) => {
    const checkIfUserExists = async () => {
        let result = await usersList.findOne(
            {
                email: req.body.email,
                pass: req.body.pass
            });
            if(result === null){
                res.send(`<script>alert ('this user does not exist, please Sign Up'); location.href = "/" </script> `)
            }else{
                res.redirect('Products');
                
            }

    }
    checkIfUserExists()
})

app.post('/sendData', (req, res) => {
    let temp = {
        email: req.body.email,
        pass: req.body.pass,
        products: req.body.products
    }
    console.log(temp)
    const addUserToDb = async (user) => {
        await buyList.insertMany(user)
    }
    addUserToDb(temp);
    res.json({ messege: 'ok'})
})

app.get('/renderAllBuying' , async (req , res) =>{
let result = await buyList.find({})
res.json({result});
})



app.listen(3000, () => { console.log('server works on port 3000') })
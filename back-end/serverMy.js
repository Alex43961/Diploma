require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");




const app = express();
const PORT = 3000;
const productSchema = require("./models/product");
const usersSchema = require("./models/user");
let Product = {};
let Users = {};


const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        Product = await mongoose.model("Product", productSchema);
        Users = await mongoose.model("Users",usersSchema,);
    } catch (err) {
        console.log(`DB connection error: ${err}`);
    }
    app.listen(PORT, (err) => {
        err ? console.log(err) : console.log(`listening port ${PORT}`);
    });
}

const handleError = (res, error) => {
    res.status(500).json({ error });
}

app.use(express.json());

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Method', "*");
  next();
});

app.get('/users', (req, res) => {
    console.log('/users');
    console.log('Users:', Users)
    Users
        .find()
        .then((users) => {
            console.log(':users: ', users)
            res
                .status(200)
                .json(users);

        })
        .catch(() => handleError(res, "Something goes wrong..."));
});


app.get('/products', (req, res) => {
    console.log('/products');
    console.log('Product:', Product)
    Product
        .find()
        .then((products) => {
            console.log(':products: ', products)
            res
                .status(200)
                .json(products);

        })
        .catch(() => handleError(res, "Something goes wrong..."));
});
// app.get("/products", (req, res) => {
//   Product
//   find()
//    req.json(products);



//   res.end(products);
// });

app.get('/products/:id', (req, res) => {
    Product
        .findById(req.params.id)
        .then((product) => {
            res
                .status(200)
                .json(product);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.delete('/movies/:id', (req, res) => {
    Product
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.post('/products', (req, res) => {
    const product = new Product(req.body);
    product
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch('/products/:id', (req, res) => {
    Product
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

connection().catch(e => {
    console.log("!!!", e)
});
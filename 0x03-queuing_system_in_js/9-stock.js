import { createClient, print } from "redis";
import { promisify } from 'util';
const express = require("express");

const listProducts = [
  {
    Id: 1,
    name: "Suitcase 250",
    price: 50,
    stock: 4,
  },
  {
    Id: 2,
    name: "Suitcase 450",
    price: 100,
    stock: 10,
  },
  {
    Id: 3,
    name: "Suitcase 650",
    price: 350,
    stock: 2,
  },
  {
    Id: 4,
    name: "Suitcase 1050",
    price: 550,
    stock: 5,
  },
];

function getItemById(id) {
    const item = listProducts.find(obj => obj.Id === id);
    if (item) {
        return Object.fromEntries(Object.entries(item));
      }
}

// creation of express server
const app = express();
const port = 1245;

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

app.get("/list_products", (req, res) => {
  res.send(JSON.stringify(listProducts));
});

// creation of a redis client
const client = createClient()
  .on("connect", () => console.log("Redis client connected to the server"))
  .on("error", (err) =>
    console.log(`Redis client not connected to the server: ${err}`)
  );

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
    const getAsync = promisify(client.get).bind(client);
    try {
        const value = await getAsync(`item.${itemId}`);
        return value
    } catch (err) {
        return
    }
}

app.get('/list_products/:itemId', (req, res)=> {
    const id = Number.parseInt(req.params.itemId)
    const item = getItemById(id)
    if (!item){
        res.json({"status":"Product not found"})
    }
    getCurrentReservedStockById(id)
    .then((data) => {
        res.json(item)
    })
    .catch(()=>{
        return
    })
})

app.get('/reserve_product/:itemId', (req, res) => {
    const id = Number.parseInt(req.params.itemId)
    const item = getItemById(id)
    if (!item){
        res.json({"status":"Product not found"})
    }
    if (item.stock < 1){
        res.json({"status":"Not enough stock available","itemId":1})
    } else {
        reserveStockById(id, 1)
        item.stock = item.stock - 1
        res.json({"status":"Reservation confirmed","itemId":id})
    }

})

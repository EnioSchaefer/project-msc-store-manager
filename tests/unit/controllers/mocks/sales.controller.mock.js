const sales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2023-03-02T15:38:53.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2023-03-02T15:38:53.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2023-03-02T15:38:53.000Z"
  }
]

const saleToInsert = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const salesToUpdate = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
]



module.exports = {
  sales,
  saleToInsert,
  salesToUpdate
};
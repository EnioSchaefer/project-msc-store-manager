const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const sales = require('./mocks/sales.service.mock');

describe('Testa a camada service das vendas', function () {

  const notFoundType = 'NOT_FOUND';
  const productNotFoundMessage = 'Product not found';
  const saleNotFoundMessage = 'Sale not found';
  const propertyFormatType = 'PROPERTY_FORMAT'
  const propertyFormatMessage = '"quantity" must be greater than or equal to 1'

  afterEach(function () {
    sinon.restore();
  })

  it('testa se a funcao getAllSales retorna todas as vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(sales);

    const result = await salesService.getAllSales();

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(sales);
  })

  describe('testa a funcao getSaleById', async function () {
    it('testa se retorna um erro com o id incorreto', async function () {
      const error = await salesService.getSaleById(999);

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(saleNotFoundMessage);
    })

    it('testa se retorna a venda pesquisada corretamente', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves(sales[0]);

      const result = await salesService.getSaleById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal(sales[0]);
    })
  })

  describe('testa a funcao insertSales', async function () {
    it('testa se retorna um erro com o id incorreto', async function () {
      const error = await salesService.insertSales([{ "productId": 15, "quantity": 1 }]);

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(productNotFoundMessage);
    })

    it('testa se retorna um erro com a quantidade incorreta', async function () {
      const error = await salesService.insertSales([{ "productId": 2, "quantity": 0 }]);

      expect(error.type).to.equal(propertyFormatType);
      expect(error.message).to.equal(propertyFormatMessage);
    })

    it('testa se insere a venda corretamente', async function () {
      sinon.stub(salesModel, 'insertSales').resolves(3);

      const result = await salesService.insertSales([{ "productId": 3, "quantity": 15 }]);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 3, itemsSold: [{ "productId": 3, "quantity": 15 }] });
    })
  })

  describe('testa a funcao updateSales', function () {
    it('testa se retorna um erro com id da venda incorreto', async function () {
      const error = await salesService.updateSales(999, [{ "productId": 1, "quantity": 10 }])

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(saleNotFoundMessage);
    })

    it('testa se retorna um erro com id do produto incorreto', async function () {
      const error = await salesService.updateSales(1, [{ "productId": 15, "quantity": 10 }])

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(productNotFoundMessage);
    })

    it('testa se retorna um erro com a quantidade incorreta', async function () {
      const error = await salesService.updateSales(2, [{ "productId": 2, "quantity": 0 }])

      expect(error.type).to.equal(propertyFormatType);
      expect(error.message).to.equal(propertyFormatMessage);
    })

    it('testa se atualiza uma venda corretamente', async function () {
      const result = await salesService.updateSales(2, [{ "productId": 3, "quantity": 10 }])

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(
        {
          "saleId": 2,
          "itemsUpdated": [
            {
              "productId": 3,
              "quantity": 10
            }
          ]
        });
    })
  })

  describe('testa a funcao deleteSale', function () {
    it('testa se retorna erro com o id da venda incorreto', async function () {
      const error = await salesService.deleteSale(999);

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(saleNotFoundMessage);
    })

    it('testa se deleta uma venda corretamente', async function () {
      sinon.stub(salesModel, 'deleteSale').resolves();

      const result = await salesService.deleteSale(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    })
  })
})

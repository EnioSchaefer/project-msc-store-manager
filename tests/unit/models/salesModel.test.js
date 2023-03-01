const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');
const { sales, saleById } = require('./mocks/sales.model.mock');

describe('Testa a camada Model', () => {

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

  afterEach(function () {
    sinon.restore();
  });

  it('testa se a funcao findAll retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(sales)
  });

  it('testa se a funcao getSaleById retorna a venda solicitada', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);

    const result = await salesModel.getSaleById(1);

    expect(result).to.deep.equal(saleById)
  });

  it('testa se a funcao deleteSale deleta uma venda corretamente', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModel.deleteSale(1);

    expect(result).to.equal(204)
  });

  it('testa se a funcao updateSales atualiza as vendas corretamente', async function () {
    sinon.stub(connection, 'execute').resolves(salesToUpdate);

    const result = await salesModel.updateSales(1, salesToUpdate);

    expect(result).to.deep.equal(salesToUpdate)
  });

  it('testa se a funcao insertSales insere as vendas corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await salesModel.insertSales(salesToUpdate);

    expect(result).to.equal(3)
  });
})
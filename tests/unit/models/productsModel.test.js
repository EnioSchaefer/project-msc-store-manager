const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');
const { products } = require('./mocks/products.model.mock');

describe('Testa a camada Model', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('testa se a funcao findAll retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.findAll();

    expect(result).to.deep.equal(products)
  });

  it('testa se a funcao findById retorna o produto solicitado', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);

    const result = await productsModel.findById(1);

    expect(result).to.deep.equal(products[0])
  });

  it('testa se a funcao searchProducts retorna o produto pesquisado', async function () {
    sinon.stub(connection, 'execute').resolves([products[1]]);

    const result = await productsModel.searchProducts('Traje');

    expect(result).to.deep.equal(products[1])
  });

  it('testa se a funcao deleteProduct deleta um produto corretamente', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await productsModel.deleteProduct(1);

    expect(result).to.equal(204)
  });

  it('testa se a funcao insertProduct insere um produto corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModel.insertProduct('Example Product');

    expect(result).to.equal(4)
  });

  it('testa se a funcao updateProductName atualiza um produto corretamente', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);

    const result = await productsModel.updateProductName(2, 'Example Product');

    expect(result).to.equal(2)
  });
})
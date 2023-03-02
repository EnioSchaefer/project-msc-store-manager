const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const products = require('./mocks/products.service.mock');

describe('Testa a camada service dos produtos', () => {

  const notFoundType = 'NOT_FOUND';
  const notFoundMessage = 'Product not found';

  afterEach(function () {
    sinon.restore();
  })

  it('testa se a funcao findAll retorna todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(products)

    const result = await productsService.findAll();

    expect(result.message).to.equal(products);
  })

  it('testa se a funcao searchProducts retorna o produto pesquisado', async function () {
    sinon.stub(productsModel, 'searchProducts').resolves(products);

    const result = await productsService.searchProducts();

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(products);
  })

  describe('testa a funcao findById', function () {
    it('testa se a funcao retorna um erro com o id invalido', async function () {
      const error = await productsService.findById(999);

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(notFoundMessage);
    })

    it('testa se a funcao retorna um produto com o id correto', async function () {
      sinon.stub(productsModel, 'findById').resolves(products[0]);

      const result = await productsService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal(products[0]);
    })
  })

  describe('testa a funcao insertProduct', function () {
    it('testa se a funcao retorna um erro com o nome invalido', async function () {
      const error = await productsService.insertProduct('abc');

      expect(error.type).to.equal('PROPERTY_FORMAT');
      expect(error.message).to.equal('"name" length must be at least 5 characters long');
    })

    it('testa se a funcao insere um produto corretamente', async function () {
      sinon.stub(productsModel, 'insertProduct').resolves(4);

      const result = await productsService.insertProduct('EX Product');

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ "id": 4, "name": "EX Product" });
    })
  })

  describe('testa a funcao updateProductName', function () {
    it('testa se a funcao retorna um erro com o nome invalido', async function () {
      const error = await productsService.updateProductName(1, 'ABC')

      expect(error.type).to.equal('PROPERTY_FORMAT');
      expect(error.message).to.equal('"name" length must be at least 5 characters long');
    })

    it('testa se a funcao retorna um erro com o id invalido', async function () {
      const error = await productsService.updateProductName(999, 'ABCDE')

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(notFoundMessage);
    })

    it('testa se a funcao atualiza um produto corretamente', async function () {
      sinon.stub(productsModel, 'updateProductName').resolves();

      const result = await productsService.updateProductName(1, 'ABCDE')

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: 1, name: 'ABCDE' });
    })
  })

  describe('testa a funcao deleteProduct', function () {
    it('testa se retorna um erro com o id invalido', async function () {
      const error = await productsService.deleteProduct(999);

      expect(error.type).to.equal(notFoundType);
      expect(error.message).to.equal(notFoundMessage);
    })

    it('testa se deleta um produto corretamente', async function () {
      sinon.stub(productsModel, 'updateProductName').resolves();

      const result = await productsService.deleteProduct(1)

      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    })
  })
});
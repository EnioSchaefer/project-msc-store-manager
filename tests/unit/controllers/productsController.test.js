const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const products = require('./mocks/products.controller.mock');

describe('Testa a camada controller dos produtos', function () {

  afterEach(function () {
    sinon.restore();
  })

  it('testa se a funcao listProducts lista todos os produtos', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAll').resolves({ type: null, message: products });

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  })

  it('testa se a funcao deleteProduct deleta um produto corretamente', async function () {
    const req = { params: { id: '1' } };
    const res = { end: function () { } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'deleteProduct').resolves({ type: null, message: '' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  })

  it('testa a funcao searchProducts', async function () {
    const req = { query: { q: '' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'searchProducts').resolves({ type: null, message: ['Found Products'] })

    await productsController.searchProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(['Found Products']);
  })

  it('testa a funcao getProduct', async function () {
    const req = { params: { id: 2 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findById').resolves({ type: null, message: ['Found Product'] })

    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(['Found Product']);
  })

  it('testa a funcao insertProduct', async function () {
    const body = { name: 'Testing Product' }
    const req = { body }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'insertProduct').resolves({ type: null, message: { id: 4, name: body.name } })

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: body.name });
  })

  it('testa a funcao updateProduct', async function () {
    const body = { name: 'Testing Product' }
    const params = { id: '2' }
    const req = { params, body }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProductName').resolves({ type: null, message: { id: params.id, name: body.name } })

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: params.id, name: body.name });
  })
})
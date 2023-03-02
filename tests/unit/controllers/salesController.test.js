const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { sales, salesToInsert, salesToUpdate } = require('./mocks/sales.controller.mock');

describe('Testa a camada controller dos produtos', function () {

  afterEach(function () {
    sinon.restore();
  })

  it('testa a funcao getAllSales', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales').resolves({ type: null, message: sales });

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  })

  it('testa a funcao getSaleById', async function () {
    const firstSale = { "date": "2023-03-02T15:39:30.000Z", "productId": 2, "quantity": 10 };
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSaleById').resolves({ type: null, message: firstSale });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(firstSale);
  })

  it('testa a funcao insertSale', async function () {
    const body = salesToInsert;
    const req = { body };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insertSales').resolves({ type: null, message: { id: 3, itemsSold: salesToInsert } });

    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 3, itemsSold: salesToInsert });
  })

  it('testa a funcao updateSale', async function () {
    const body = salesToUpdate;
    const params = { id: 1 };
    const req = { params, body };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSales').resolves({ type: null, message: { saleId: params.id, itemsUpdated: salesToUpdate } });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: params.id, itemsUpdated: salesToUpdate });
  })

  it('testa a funcao deleteSale', async function () {
    const req = { params: { id: 1 } };
    const res = { end: function () { } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'deleteSale').resolves({ type: null, message: '' });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  })
})
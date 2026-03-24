const mongoose = require('mongoose');
const resumeController = require('./resumeController');

describe('resumeController.getAll', () => {
  test('returns empty array when mongodb disconnected', async () => {
    const req = {};
    const json = jest.fn();
    const res = { json };
    const originalReadyState = mongoose.connection.readyState;

    Object.defineProperty(mongoose.connection, 'readyState', {
      value: 0,
      configurable: true,
    });

    await resumeController.getAll(req, res);
    expect(json).toHaveBeenCalledWith([]);

    Object.defineProperty(mongoose.connection, 'readyState', {
      value: originalReadyState,
      configurable: true,
    });
  });
});

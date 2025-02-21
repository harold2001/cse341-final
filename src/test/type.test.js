import request from 'supertest';
import app from '../app.js'; // Asegúrate de importar correctamente la app
import Type from '../models/Type.js';
import { ALLOWED_TYPES } from '../helpers/constants.js';

jest.mock('../models/Type.js');

describe('TypeController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getTypes - should return all types', async () => {
    const mockTypes = [{ _id: '1', name: 'TestType' }];
    Type.find.mockResolvedValue(mockTypes);

    const response = await request(app).get('/types');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTypes);
  });

  test('createType - should create a new type', async () => {
    const mockType = { _id: '1', name: 'NewType' };
    Type.create.mockResolvedValue(mockType);

    const response = await request(app)
      .post('/types')
      .send({ name: 'NewType' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockType);
  });

  test('getTypeById - should return type by ID', async () => {
    const mockType = { _id: '1', name: 'ExistingType' };
    Type.findById.mockResolvedValue(mockType);

    const response = await request(app).get('/types/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockType);
  });

  test('getTypeById - should return 404 if type not found', async () => {
    Type.findById.mockResolvedValue(null);

    const response = await request(app).get('/types/1');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Type not found' });
  });

  test('updateType - should update a type', async () => {
    const mockType = { _id: '1', name: 'UpdatedType' };
    Type.findByIdAndUpdate.mockResolvedValue(mockType);

    const response = await request(app)
      .put('/types/1')
      .send({ name: 'UpdatedType' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockType);
  });

  test('updateType - should return 400 if type is in ALLOWED_TYPES', async () => {
    Type.findByIdAndUpdate.mockResolvedValue({
      _id: '1',
      name: ALLOWED_TYPES[0],
    });

    const response = await request(app)
      .put('/types/1')
      .send({ name: ALLOWED_TYPES[0] });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Type cannot be updated' });
  });

  test('deleteType - should delete a type', async () => {
    Type.findById.mockResolvedValue({ _id: '1', name: 'DeletableType' });
    Type.findByIdAndDelete.mockResolvedValue();

    const response = await request(app).delete('/types/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Type deleted successfully' });
  });

  test('deleteType - should return 403 if type is in ALLOWED_TYPES', async () => {
    Type.findById.mockResolvedValue({ _id: '1', name: ALLOWED_TYPES[0] });

    const response = await request(app).delete('/types/1');
    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Type cannot be deleted' });
  });
});

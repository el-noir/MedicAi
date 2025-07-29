
import axios from "axios";
import { predictionAPI } from '../api';




jest.mock("axios");

describe('predictionAPI() predictionAPI method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    test('should save a prediction successfully', async () => {
      const mockData = { id: 1, prediction: 'test' };
      axios.post.mockResolvedValueOnce({ data: mockData });

      const result = await predictionAPI.savePrediction(mockData);

      expect(axios.post).toHaveBeenCalledWith('/api/v1/predictions', mockData);
      expect(result.data).toEqual(mockData);
    });

    test('should get user predictions successfully', async () => {
      const mockData = [{ id: 1, prediction: 'test' }];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await predictionAPI.getUserPredictions();

      expect(axios.get).toHaveBeenCalledWith('/api/v1/predictions', { params: {} });
      expect(result.data).toEqual(mockData);
    });

    test('should get a prediction by ID successfully', async () => {
      const mockData = { id: 1, prediction: 'test' };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await predictionAPI.getPredictionById(1);

      expect(axios.get).toHaveBeenCalledWith('/api/v1/predictions/1');
      expect(result.data).toEqual(mockData);
    });

    test('should delete a prediction successfully', async () => {
      axios.delete.mockResolvedValueOnce({ status: 204 });

      const result = await predictionAPI.deletePrediction(1);

      expect(axios.delete).toHaveBeenCalledWith('/api/v1/predictions/1');
      expect(result.status).toBe(204);
    });

    test('should get prediction statistics successfully', async () => {
      const mockData = { total: 10 };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await predictionAPI.getPredictionStats();

      expect(axios.get).toHaveBeenCalledWith('/api/v1/predictions/stats');
      expect(result.data).toEqual(mockData);
    });
  });

  describe('Edge Cases', () => {
    test('should handle network error when saving a prediction', async () => {
      axios.post.mockRejectedValueOnce(new Error('Network error'));

      await expect(predictionAPI.savePrediction({})).rejects.toThrow('Network error');
    });

    test('should handle 404 error when getting a prediction by ID', async () => {
      axios.get.mockRejectedValueOnce({ response: { status: 404 } });

      await expect(predictionAPI.getPredictionById(999)).rejects.toEqual({ response: { status: 404 } });
    });

    test('should handle error when deleting a non-existent prediction', async () => {
      axios.delete.mockRejectedValueOnce({ response: { status: 404 } });

      await expect(predictionAPI.deletePrediction(999)).rejects.toEqual({ response: { status: 404 } });
    });

    test('should handle empty response when getting user predictions', async () => {
      axios.get.mockResolvedValueOnce({ data: [] });

      const result = await predictionAPI.getUserPredictions();

      expect(result.data).toEqual([]);
    });

    test('should handle error when getting prediction statistics', async () => {
      axios.get.mockRejectedValueOnce(new Error('Server error'));

      await expect(predictionAPI.getPredictionStats()).rejects.toThrow('Server error');
    });
  });
});
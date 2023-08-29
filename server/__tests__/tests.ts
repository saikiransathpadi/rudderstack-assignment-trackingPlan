// @ts-nocheck
import { Request, Response } from 'express';
import { createTrackingPlan } from '../src/controller/trackingPlanController';
import { createTrackingPlanInDB } from '../src/db/dal/trackingPlanDal';
import '@jest/globals';

describe('add Tracking Plan API Tests', () => {
    it('should create a tracking plan', async () => {
        const req = { body: { display_name: 'Test Tracking Plan' } } as Request;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

        const mockSavedTrackingPlan = {
            _id: 'mock_id',
            display_name: 'Test Tracking Plan',
            events: [{ name: 'event name', description: 'event description', rules: { schema: '$Schema json' } }],
        };
        addTrackingPlan.mockResolvedValue(mockSavedTrackingPlan);

        await createTrackingPlan(req, res);

        assert(createTrackingPlanInDB).toHaveBeenCalledWith('Test Tracking Plan');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockSavedTrackingPlan);
    });
});

describe('add Tracking Plan API Tests unique event name', () => {
    it('should create a tracking plan', async () => {
        const req = { body: { display_name: 'Test Tracking Plan' } } as Request;
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

        const mockSavedTrackingPlan = {
            _id: 'mock_id',
            display_name: 'Test Tracking Plan',
            events: [{ name: 'event name', description: 'event description', rules: { schema: '$Schema json' } }],
        };
        addTrackingPlan.mockResolvedValue(mockSavedTrackingPlan);

        await createTrackingPlan(req, res);
        await createTrackingPlan(req, res);

        assert(createTrackingPlanInDB).toHaveBeenCalledWith('Test Tracking Plan');
        expect(res.status).toHaveBeenCalledWith(400);
    });
});

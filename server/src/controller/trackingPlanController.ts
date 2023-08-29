import { Request, Response } from 'express';
import {
    associateEventWithTrackingPlanInDB,
    createTrackingPlanInDB,
    getTrackingPlanByIDFromDB,
    getTrackingPlanListDb,
    updateTrackingPlanInDB,
} from '../db/dal/trackingPlanDal';

export async function createTrackingPlan(req: Request, res: Response) {
    try {
        const { display_name, events, description } = req.body;
        const trackingPlan = await createTrackingPlanInDB(display_name, description, events);
        return res.status(201).json(trackingPlan);
    } catch (error: any) {
        console.error('Error creating tracking plan:', error);
        const message = error?.errors?.display_name?.message || error?.errors?.name?.message || error.message
        return res.status(error?.errors ? 400 : 500).json({ error: true, message: error?.errors?.display_name?.message || error.message });
    }
}

export async function associateEventWithTrackingPlan(req: Request, res: Response) {
    try {
        const { tracking_plan_id, event_id } = req.body;
        const associationMessage = await associateEventWithTrackingPlanInDB(tracking_plan_id, event_id);
        return res.status(200).json({ message: associationMessage });
    } catch (error: any) {
        console.error('Error associating event with tracking plan:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}

export async function getTrackingPlanByID(req: Request, res: Response) {
    try {
        console.log('request for tracking plan by id');
        const { tracking_plan_id } = req.params;
        const trackingPlan = await getTrackingPlanByIDFromDB(tracking_plan_id);
        if (!trackingPlan) {
            return res.status(404).json({ error: 'Tracking plan not found' });
        }
        return res.status(200).json(trackingPlan);
    } catch (error: any) {
        console.error('Error getting tracking plan by ID:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}

export async function updateTrackingPlan(req: Request, res: Response) {
    try {
        console.log('request for tracking plan update');
        const { tracking_plan_id } = req.params;
        const { display_name } = req.body;
        const updateMessage = await updateTrackingPlanInDB(tracking_plan_id, display_name);
        if (!updateMessage) {
            return res.status(404).json({ error: 'Tracking plan not found' });
        }
        return res.status(200).json({ message: updateMessage });
    } catch (error: any) {
        console.error('Error updating tracking plan:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}

export async function getTrackingPlanList(req: Request, res: Response) {
    try {
        console.log('request for tracking plan list');
        const plans = await getTrackingPlanListDb();
        return res.status(200).json({ message: 'Success', data: plans });
    } catch (error: any) {
        console.error('Error updating tracking plan:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}

import { Router } from 'express';
import {
    associateEventWithTrackingPlan,
    createTrackingPlan,
    getTrackingPlanByID,
    getTrackingPlanList,
    updateTrackingPlan,
} from '../controller/trackingPlanController';

const trackPlanRouter = Router();

trackPlanRouter.get('/get/:tracking_plan_id', getTrackingPlanByID);
trackPlanRouter.post('/create', createTrackingPlan);
trackPlanRouter.post('/update/:tracking_id', updateTrackingPlan);
trackPlanRouter.post('/:tracking_plan_id/event', associateEventWithTrackingPlan);
trackPlanRouter.get('/list', getTrackingPlanList)

export default trackPlanRouter;

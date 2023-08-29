import { Router } from 'express';
import eventRouter from './eventRouter';
import trackingPlanRouter from './trackingPlanRouter';

const router = Router();

const allRoutes = [
    {
        path: '/event',
        route: eventRouter,
    },
    {
        path: '/tracking-plan',
        route: trackingPlanRouter,
    },
];

allRoutes.forEach((eachRoute) => {
    router.use(eachRoute.path, eachRoute.route);
});

export default router;

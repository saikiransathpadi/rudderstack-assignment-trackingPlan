import { Router } from 'express';
import { getEventByID, createEvent, updateEvent } from '../controller/eventsController';

const eventRouter = Router();

eventRouter.get('/:event_id', getEventByID);
eventRouter.post('create', createEvent);
eventRouter.post('update/:event_id', updateEvent);

export default eventRouter;

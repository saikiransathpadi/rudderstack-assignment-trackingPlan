import { Request, Response } from 'express';
import { createEventInDB, getEventByIDFromDB, updateEventInDB } from '../db/dal/eventsDal';

export async function createEvent(req: Request, res: Response) {
    try {
        const { name, description, rules } = req.body;
        const event = await createEventInDB(name, description, rules);
        return res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getEventByID(req: Request, res: Response) {
    try {
        const { event_id } = req.params;
        const event = await getEventByIDFromDB(event_id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        return res.status(200).json(event);
    } catch (error) {
        console.error('Error getting event by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateEvent(req: Request, res: Response) {
    try {
        const { event_id } = req.params;
        const { description } = req.body;
        const updateMessage = await updateEventInDB(event_id, description);
        if (!updateMessage) {
            return res.status(404).json({ error: 'Event not found' });
        }
        return res.status(200).json({ message: updateMessage });
    } catch (error) {
        console.error('Error updating event:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

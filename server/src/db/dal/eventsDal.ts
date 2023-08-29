import { EventModel, Event } from '../../models';

export async function createEventInDB(name: string, description: string, rules: any) {
    try {
        const event: Event = new EventModel({ name, description, rules });
        const savedEvent = await event.save();
        return savedEvent;
    } catch (error) {
        throw error;
    }
}

export async function getEventByIDFromDB(eventId: string) {
    try {
        const event = await EventModel.findById(eventId).exec();
        return event;
    } catch (error) {
        throw error;
    }
}

export async function updateEventInDB(eventId: string, description: string) {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { description },
      { new: true }
    ).exec();

    if (!updatedEvent) {
      return null;
    }

    return `Event ${eventId} updated`;
  } catch (error) {
    throw error;
  }
}

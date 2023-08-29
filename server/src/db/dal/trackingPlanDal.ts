import { startSession } from 'mongoose';
import { TrackingPlanModel, EventModel, TrackingPlanEventAssociationModel } from '../../models';


export async function createTrackingPlanInDB(displayName: string, description: string, events: string[]) {
    const session = await startSession();
    session.startTransaction();
  
    try {
      const trackingPlan = new TrackingPlanModel({ display_name: displayName, description });
      const savedTrackingPlan = await trackingPlan.save({ session });
  
      const savedEvents = await EventModel.insertMany(events, { session });
  
      const associationsToAdd = savedEvents.map(event => ({
        tracking_plan_id: savedTrackingPlan._id,
        event_id: event._id
      }));
      await TrackingPlanEventAssociationModel.insertMany(associationsToAdd, { session });
  
      await session.commitTransaction();
      session.endSession();
  
      return { trackingPlan: savedTrackingPlan, events: savedEvents };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
}


export async function associateEventWithTrackingPlanInDB(trackingPlanId: string, eventId: string) {
  try {
    await TrackingPlanEventAssociationModel.create({ tracking_plan_id: trackingPlanId, event_id: eventId });
    return `Event ${eventId} associated with Tracking Plan ${trackingPlanId}`;
  } catch (error) {
    throw error;
  }
}


export async function getTrackingPlanByIDFromDB(trackingPlanId: string) {
  try {
    const trackingPlan = await TrackingPlanModel.findById(trackingPlanId).exec();
    return trackingPlan;
  } catch (error) {
    throw error;
  }
}


export async function updateTrackingPlanInDB(trackingPlanId: string, displayName: string) {
  try {
    const updatedTrackingPlan = await TrackingPlanModel.findByIdAndUpdate(
      trackingPlanId,
      { display_name: displayName },
      { new: true }
    ).exec();

    if (!updatedTrackingPlan) {
      return null;
    }

    return `Tracking Plan ${trackingPlanId} updated`;
  } catch (error) {
    throw error;
  }
}

export async function getTrackingPlanListDb(filters: any = {}) {
    try {
        const trackingPlansWithAssociations = await TrackingPlanModel.find();

        const trackingPlanIds = trackingPlansWithAssociations.map((plan) => plan._id);

        const associations = await TrackingPlanEventAssociationModel.find({
            tracking_plan_id: { $in: trackingPlanIds },
        });

        const eventIds = associations.map((assoc) => assoc.event_id);

        const events = await EventModel.find({
            _id: { $in: eventIds },
        });
        console.log(JSON.stringify(events), associations, eventIds);
        
        const trackingPlansWithEvents = trackingPlansWithAssociations.map((plan) => {
            const associatedEventIds = associations.filter((assoc) => assoc.tracking_plan_id === String(plan._id)).map((assoc) => assoc.event_id);

            const associatedEvents = events.filter((event) => associatedEventIds.includes(String(event._id)));
            console.log(JSON.stringify(associatedEventIds), JSON.stringify(associatedEvents));

            return {
                ...plan.toObject(),
                events: associatedEvents,
            };
        });

        return trackingPlansWithEvents;
    } catch (error) {
        throw error;
    }
}

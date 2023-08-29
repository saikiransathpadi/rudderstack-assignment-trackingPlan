import mongoose, { Document, Schema, model } from 'mongoose';

const trackingPlanSchema = new Schema({
    display_name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
});

const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    rules: { type: Object, required: true },
});

const trackingPlanEventAssociationSchema = new Schema({
    tracking_plan_id: { type: String, required: true },
    event_id: { type: String, required: true },
});

trackingPlanSchema.path('display_name').validate(async function (value) {
    const count = await mongoose.models.TrackingPlan.countDocuments({ display_name: value });
    return !count;
}, 'Name already exists');

eventSchema.path('name').validate(async function (value) {
    const count = await mongoose.models.Event.countDocuments({ name: value });
    return !count;
}, 'Event Name already exists');

export const TrackingPlanModel = model<TrackingPlan>('TrackingPlan', trackingPlanSchema);
export const EventModel = model<Event>('Event', eventSchema);
export const TrackingPlanEventAssociationModel = model<TrackingPlanEventAssociation>(
    'TrackingPlanEventAssociation',
    trackingPlanEventAssociationSchema
);

interface TrackingPlan extends Document {
    tracking_plan_id: string;
    display_name: string;
    description: string;
}

interface Event extends Document {
    event_id: string;
    name: string;
    description: string;
    rules: Record<string, any>;
}

interface TrackingPlanEventAssociation extends Document {
    tracking_plan_id: string;
    event_id: string;
}

export { TrackingPlan, Event, TrackingPlanEventAssociation };

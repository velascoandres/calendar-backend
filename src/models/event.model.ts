import { model, Schema } from 'mongoose';

import { IEvent } from '../interfaces';


const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});


EventSchema.method(
    'toJSON',
    function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    }
);

const EventModel = model<IEvent>('Event', EventSchema);


export {
    EventModel,
}

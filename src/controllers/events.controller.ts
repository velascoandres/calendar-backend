import { UpdateResponse } from './../interfaces/common';
import log from '../logger';
import {
    CreateResponse,
    IEvent,
    ListResponse,
    RequestWithUser,
    UserPayload,
    DeleteResponse,
} from '../interfaces';
import { EventModel } from '../models/event.model';




const createEvent = async (req: RequestWithUser, res: CreateResponse<IEvent>): Promise<void> => {
    try {
        const event = new EventModel(req.body);

        const user = req.user as UserPayload;

        event.user = user.uid;

        const savedEvent = await event.save();

        res.json(
            savedEvent
        );

    } catch (error) {
        log.error('Error on create event', error);
        res.status(500).json(
            {
                ok: false,
                msg: 'Server error',
            }
        );

    }
};


const getEvents = async (req: RequestWithUser, res: ListResponse<IEvent>): Promise<void> => {
    try {
        const events = await EventModel.find().populate('user', 'name');
        res.json(
            {
                data: events,
            }
        );

    } catch (error) {
        log.error('Error on list events', error);
        res.status(500).json(
            {
                ok: false,
                msg: 'Server error',
            }
        );
    }
};


const updateEvent = async (req: RequestWithUser, res: UpdateResponse<IEvent>): Promise<UpdateResponse<IEvent>> => {
    try {
        const eventId = req.params.id;

        const eventToUpdate = req.body as IEvent;

        const user = req.user as UserPayload;

        const currentEvent = await EventModel.findById(eventId);

        if (!currentEvent) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'Event does not exist',
                }
            );
        }

        if (user.uid !== currentEvent?.user.toString()) {
            return res.status(300).json(
                {
                    ok: false,
                    msg: 'You do not have any permissions to update this event',
                }
            );
        }

        const newEvent = {
            ...eventToUpdate,
            user: user.uid,
        };

        const updatedEvent = await EventModel
            .findByIdAndUpdate(
                eventId,
                newEvent,
                { upsert: false, new: true },
            );


        return res.json(
            updatedEvent as IEvent
        );

    } catch (error) {
        log.error('Error on update event', error);
        return res.status(500).json(
            {
                ok: false,
                msg: 'Server error',
            }
        );

    }
};


const deleteEvent = async (req: RequestWithUser, res: DeleteResponse<IEvent>): Promise<DeleteResponse<IEvent>> => {

    try {
        const eventId = req.params.id;
    
        const user = req.user as UserPayload;
    
        const currentEvent = await EventModel.findById(eventId);
    
        if (!currentEvent) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'Event does not exist',
                }
            );
        }

        if (user.uid !== currentEvent?.user.toString()) {
            return res.status(300).json(
                {
                    ok: false,
                    msg: 'You do not have any permissions to update this event',
                }
            );
        }


        await EventModel.findByIdAndDelete(eventId).exec();


        return res.json(
            {
                ok: true,
            }
        );

    } catch (error) {
        log.error('Error on delete event', error);
        return res.status(500).json(
            {
                ok: false,
                msg: 'Server error',
            }
        );
    }


};




export {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}

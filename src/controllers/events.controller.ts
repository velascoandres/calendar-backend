import log from '../logger';
import { Request, Response } from 'express';
import { CreateResponse, IEvent, ListResponse, RequestWithUser, UserPayload } from '../interfaces';
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
        log.error('Error on create even', error);
        res.status(500).json(
            {
                ok: false,
                msg: 'Server error',
            }
        );

    }
};


const getEvents = (req: Request, res: Response<ListResponse<IEvent>>) => {

};


const updateEvent = (req: Request, res: Response<ListResponse<IEvent>>) => {

};


const deleteEvent = (req: Request, res: Response<ListResponse<IEvent>>) => {

};




export {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}

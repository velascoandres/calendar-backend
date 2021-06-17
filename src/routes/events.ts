import { Router } from 'express';

import { check } from 'express-validator';

import { validateJWT } from '../middlewares/validate-jwt';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/events.controller';
import { isDate } from '../helpers/is-date';


const eventRouter = Router();

eventRouter.use(validateJWT);

eventRouter.get(
    '/',
    getEvents,
);


eventRouter.post(
    '/',
    [
        check('title', 'Title is required').notEmpty(),
        check('start', 'Start is required').notEmpty(),
        check('start', 'Start must be a valid date').custom(isDate),
        check('end', 'End is required').notEmpty(),
        check('end', 'End must be a valid date').custom(isDate),
    ],
    createEvent,
);


eventRouter.put(
    '/:id',
    [],
    updateEvent,
);


eventRouter.delete(
    '/:id',
    [],
    deleteEvent,
);




export {
    eventRouter,
}

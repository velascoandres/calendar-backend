import { Meta } from 'express-validator';
import moment from 'moment';



const isDate = (value: number, { req, location, path }: Meta): boolean => {

    if (value >= 0) {

        const date = moment(value);


        return date.isValid();
    
    }

    return false;

};


export { isDate };
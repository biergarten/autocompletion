

import { Request, Response } from 'express';
import { FRUTAS } from "./frutas";



export function getAllFrutas(req: Request, res: Response) {





    setTimeout(() => {

        res.status(200).json({ payload: Object.values(FRUTAS) });

    }, 1500);


}




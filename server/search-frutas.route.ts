


import { Request, Response } from 'express';
import { setTimeout } from "timers";
import { FRUTAS } from './frutas';



export function searchFrutas(req: Request, res: Response) {

    const queryParams = req.query as any;

    const filter = queryParams.filter || '',
        sortOrder = queryParams.sortOrder || 'asc',
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize) || 3;

    let frutas;

    frutas = Object.values(FRUTAS);

    if (filter) {
        frutas = frutas.filter(fruta => fruta.name.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder == "desc") {
        frutas = frutas.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const frutasPage = frutas.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({ payload: frutasPage });
    }, 10);


}

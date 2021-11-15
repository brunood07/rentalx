import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {    

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
            const all = await listCategoriesUseCase.execute();
            
            return response.json(all);
        } catch (err) {
            next(err);
        }   
    }
}

export { ListCategoriesController };
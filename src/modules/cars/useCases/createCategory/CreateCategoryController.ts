import { Response, Request, NextFunction } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, description } = request.body;
            const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

            await createCategoryUseCase.execute({ name, description });

            return response.status(201).send();
        } catch (err) {
            next(err);
        }
    }
}

export { CreateCategoryController };
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, description } = request.body;
            const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
        
            await createSpecificationUseCase.execute({ name, description });

            return response.status(201).send();
        } catch (err) {
            next(err);
        }
        
    }
}

export { CreateSpecificationController }; 
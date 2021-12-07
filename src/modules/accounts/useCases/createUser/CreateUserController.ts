import { Response, Request, NextFunction } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, email, password, driver_license } = request.body;
            const createUserUseCase = container.resolve(CreateUserUseCase);

            await createUserUseCase.execute({ name, email, password, driver_license });

            return response.status(201).send();
        } catch (err) {
            next(err);
        }
    }
}

export { CreateUserController };
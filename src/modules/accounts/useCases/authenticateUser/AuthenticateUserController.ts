import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response>   {
        try {
            const { password, email } = request.body;
            
            const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

            const authenticateInfo = await authenticateUserUseCase.execute({password, email});

            return response.json(authenticateInfo);
        } catch (err) {
            next(err);
        }
    }  
}

export { AuthenticateUserController };

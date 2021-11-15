import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateuserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const avatar_file = request.file.filename;

        const updateUserAvatarUseCase = container.resolve(UpdateuserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return response.status(201).send();
    }
}

export { UpdateUserAvatarController };
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const { file } = request;
            const importCategoryUseCase= container.resolve(ImportCategoryUseCase);
        
            await importCategoryUseCase.execute(file);

            return response.status(201).send();
        } catch (err) {
            next(err);
        }
    }
}

export { ImportCategoryController };

import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {

    async handle(request: Request, response: Response) {
        const { name } = request.body;

        const CreateTagService = new CreateTagService();

        const tag = await CreateTagService.execute(name);

        return response.json(tag)
    }
}

export { CreateTagController}
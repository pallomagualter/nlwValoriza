import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


class CreateTagService {
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        if (!name) { //verificação se está passando name
            throw new Error("Incorrent name!");
        }

        // verifica se já existe este nome cadastrado
        // SELECT * FROM TAGS WHERE NAME = 'name'
        const tagAlreadyExists = await tagsRepositories.findOne({ 
            name
        });

        if (tagsRepositories) {
            throw new Error("Tag already exists!");
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService }
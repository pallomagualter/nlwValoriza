import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean; //opcional
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    console.log("Email", email);

    if (!email) { //verificação se e-mail foi preenchido
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({ //procurar se existe algum usuário cadastrado com o e-mail em questão
      email,
    });

    if (userAlreadyExists) { //se o usuário já existe monstrar mensagem de erro
      throw new Error("User already exists");
    }

    const user = usersRepository.create({ //tudo certo criar o usuário
      name,
      email,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };

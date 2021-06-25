import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean; //opcional
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin, password}: IUserRequest) {
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

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({ //tudo certo criar o usuário
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };

import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();
const CreateTagController = new CreateTagController();

router.post("/users", createUserController.handle);
router.post("/tags", CreateTagController.handle);

export { router };

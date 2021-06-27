import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
    ){
    // Receber o token
    const authToken = request.headers.authorization;
    
    // Validar se token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }
    //console.log(token);

    // vai gerar um array dividindo pelo espaço e na primeira posição vai ignorar e a segunda armazenar na variável token
    const [, token] = authToken.split(" "); 

    // Validar se token é válido 
    try {
        const { sub }= verify( 
            token, 
            "a0a68817a5ac9b36bddada1fd86be7d6"
        ) as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;
        
        return next();
    } catch (err) {
        response.status(401).end();
    }   
}
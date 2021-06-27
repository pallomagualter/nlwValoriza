import { Request, Response, NextFunction } from "express";

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    // Receber o token
    const token = request.headers.authorization;
    //console.log(token);
    
    // Validar se token está preenchido
    if (!token) {
        return response.status(401).end();
    }

    return next();


    // Validar se token é válido

    // Recuperar informações do usuário

}
import jwt from 'jsonwebtoken';
import { ISession } from './session.interfaces';

interface JWTGetSign{
  payload: any;
  keySecret: string;
  sessionTime?: number;
}

interface GetVerify{
  token: string;
  keySecret: string;
}

export class JWT{

  static getVerify({token, keySecret}: GetVerify){
    
    const verify = jwt.verify(
      token,
      keySecret
    );

    return verify;
  }

  static sign({ payload, keySecret, sessionTime }: JWTGetSign) {
    const now = Date.now();
    const defaultSessionTime = 60; // 1 hora en minutos
    const effectiveSessionTime = sessionTime ? sessionTime : defaultSessionTime;
    const expiresIn = effectiveSessionTime * 60 * 1000; // Convertir minutos a milisegundos
    const expiresAt: number = now + expiresIn;

    const myPayload: ISession = {
        ...payload,
        createdAt: now,
        expiresAt
    };

    return jwt.sign(
        myPayload,
        keySecret,
        { expiresIn: effectiveSessionTime * 60 } // Establecer tiempo de expiración en segundos
    );
}
}
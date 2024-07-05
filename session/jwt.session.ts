import jwt from 'jsonwebtoken';
import { ISession } from './session.interfaces';

interface JWTGetSing{
  payload: any, 
  keySecret: string
}

interface GetVerify{
  token: string,
  keySecret: string
}

export class JWT{

  static getVerify({token, keySecret}: GetVerify){
    
    const verify = jwt.verify(
      token,
      keySecret
    );

    return verify;
  }

  static sign({payload, keySecret}: JWTGetSing){

    const now = Date.now();
    const expiresIn = process.env.SESSION_MAX_AGE || 86400000;
    const expiresAt: number = now + (typeof expiresIn === 'string' ? parseInt(expiresIn, 10) : expiresIn) * 1000;

    const myPayload: ISession = {
      ...payload,
      createdAt: now,
      expiresAt: expiresAt
    }

    return  jwt.sign(
      myPayload,
      keySecret,
      { expiresIn: '1h' }
    );
  }
}
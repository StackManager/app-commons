import jwt from 'jsonwebtoken';

interface JWTGetSing{
  payload: any, 
  keySecret: string
}

export class JWT{

  static getVerify(token: any){
    
    const verify = jwt.verify(
      token,
      process.env.JWT_KEY!
    );

    return verify;
  }

  static sign({payload, keySecret}: JWTGetSing){
    return  jwt.sign(
      payload,
      keySecret,
      { expiresIn: '1h' }
    );
  }
}
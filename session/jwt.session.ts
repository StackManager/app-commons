import jwt from 'jsonwebtoken';

export class JWT{

  static getVerify(token: any){
    
    const verify =  jwt.verify(
      token,
      process.env.JWT_KEY!
    );

    return verify;
  }

  static  getSign(object: any ){
    return  jwt.sign(
      object,
      process.env.JWT_KEY!
    );
  }
}
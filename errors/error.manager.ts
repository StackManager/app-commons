// import { Response } from 'express';
// import { ModelErrorBase } from './ModelErrorBase';


// export class ModelErrorManager{

//   static async response(res: Response, err: unknown){


//     if (err instanceof ModelErrorBase) {
//       return res.status(err.statusCode).send({ errors: err.serializeErrors() });
//     }

//     const msg = err instanceof Error ? err.message : 'Something went wrong';
//     res.status(400).send({
//       errors: [{ message: msg }]
//     });
//   }
// }
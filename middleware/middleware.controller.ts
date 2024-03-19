import { ModelErrorBase } from '@Commons/errors/error.base';
import { SessionData } from '@Commons/session/data/session.data';
import { Request, Response, NextFunction } from 'express';

export class MiddlewareController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;
  protected session: SessionData;
  protected getSession: boolean = false;
  protected getPermission: string[] = [];
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.session = new SessionData(this.req);
  }
  
  async handleAsync(fn: Function): Promise<void> {

    try {
      
      if (this.getSession) {
        this.session.run();
      }

      await fn();

    } catch (err) {
      
      if (err instanceof ModelErrorBase) {
        this.res.status(err.statusCode).send({ errors: err.serializeErrors() });
      }
  
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      this.res.status(400).send({
        errors: [{ message: msg }]
      });
    }
  }
}
import { ModelErrorBase } from '@Commons/errors/error.base';
import { ControllerSession } from '@Commons/session/controller.session';
import { ISession } from '@Commons/session/session.interfaces';
import { Request, Response, NextFunction } from 'express';

export class MiddlewareController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;
  protected session: ISession | undefined;
  protected getSession: boolean = false;
  protected getPermission: string[] = [];

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.session = (this.getSession)? ControllerSession.get(req) : undefined;
  }


  async handleAsync(fn: Function): Promise<void> {

    try {

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
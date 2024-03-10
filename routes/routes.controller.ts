import { Express, Router } from 'express';

export class RouteController {
  
  private app: Express;
  private prefix: string;

  constructor(app: Express) {
    this.app = app;
    this.prefix = '/api';
  }

  public addRouter(router: Router) {
    this.app.use(this.prefix, router);
  }

  public run() {
    const { routes } = require('./../../routes'); 
    routes.forEach((router: Router) => this.addRouter(router));
  }
}
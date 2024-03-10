import { Document, Model } from 'mongoose';
import { FilterManager } from './crud.filter.base';
import { GenericError } from '@Commons/errors/factory/generic.error';
import { MODELERRORTEXTTYPE } from '@Commons/errors/error.types';

export interface IPopulate{
  path: string,
  select: string,
  populate?: IPopulate
}

export abstract class BaseReader<T extends Document> {
  
  protected variable: string;
  protected populateModules: Array<IPopulate> = [];
  filterManager = new FilterManager();

  constructor(variable: string) {
    this.variable = variable;
  }

  protected abstract  getModel(): Model<T>;
 
  async get(): Promise<T | undefined> {
    
    try {
      console.log(this.filterManager.get())
      let query = await this.getModel().findOne({...this.filterManager.get()});
      if (!query) return undefined;
      
      const populateLength = this.populateModules.length;
      if (populateLength > 0)
        query = await this.getModel().populate(query, this.populateModules);

      return query;
    } catch (error) {
      return undefined;
    }
  }

  async getOrFail(): Promise<T> {
    
    let result: any;
    try {
      result = await this.get();
    } catch (error) {
      throw new GenericError([{
        message: `${this.variable} error system`,
        field: this.variable,
        detail: `${this.variable} error system, BaseReader`,
        code: MODELERRORTEXTTYPE.is_system_error
      }]);
    }

    if (!result) {
      throw new GenericError([{
        message: `${this.variable} must be a valid value`,
        field: this.variable,
        detail: `${this.variable} must be a valid value`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
    return result;
  }

  getInstance<T>(value: any){
    return value as T;
  }

}
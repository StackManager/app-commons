import { GenericError } from "@Helpers/errors/Factory/GenericError";
import { MODELERRORTEXTTYPE } from "@Helpers/errors/ModelErrorConfig";
import { Model, Document, FilterQuery } from 'mongoose';
import { FilterManager } from "./BaseFilter";

export interface IPopulate{
  path: string,
  select: string
}

export abstract class BaseReader<T extends Document> {
  
  protected variable: string;
  protected filter: any = {};
  protected populateModules: Array<IPopulate> = [];
  filterManager = new FilterManager();

  constructor(variable: string) {
    this.variable = variable;
  }

  protected abstract  getModel(): Model<T>;
 
  async get(): Promise<T | undefined> {
    
    try {

      let query = this.getModel().findOne({...this.filterManager.get()});
    
      // Aplicar población (populate) si hay configuraciones de población
      const populateLength = this.populateModules.length;
      for (let i = 0; i < populateLength; i++) {
        const populateConfig = this.populateModules[i];
        query.populate(populateConfig.path, populateConfig.select);
      }

      const result = await query.exec();

      if (!result) return undefined;
      return result;
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
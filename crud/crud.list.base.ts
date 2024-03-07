import { GenericError } from "@Commons/errors/factory/generic.error";
import { FilterOptions } from "./crud.filter.base";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";


export class BaseList<T> {

  protected variable: string = 'Undefined';
  private model: T;
  protected filter: any = {};

  constructor(model: T) {
      this.model = model;
      this.filter = {};
  }

  addFilter(options: FilterOptions): void {
    switch (options.type) {
      case 'regex':
        this.filter[options.key] = new RegExp(options.value, 'i');
        break;
      default:
        this.filter[options.key] = options.value;
        break;
    }
  }

  async paginate(options: { page: number; limit: number }) {
      try {
          const result = await (this.model as any).paginate({...this.filter}, options);
          //console.log('Total de registros:', result.total);
          //console.log('Resultados de la paginación:', result.docs);
          return result;
      } catch (err) {
        throw new GenericError([{
          message: `${this.variable} error system listing results`,
          field: this.variable,
          detail: `${this.variable} error system listing results`,
          code: MODELERRORTEXTTYPE.is_system_error
        }]);
      }
  }
}


// const User = require('./models/User'); // Suponiendo que tienes un modelo de usuario en './models/User.js'
// const base = new Base(User);
// base.addFilter({ age: { $gte: 18 } }); // Agregar filtro
// base.paginate({ page: 1, limit: 10 });
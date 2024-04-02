import { GenericError } from "@Commons/errors/factory/generic.error";
import { FilterManager, FilterOptions } from "./crud.filter.base";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { IPopulate } from "./crud.reader.base";
import { ValidateNumber } from "@Commons/validator/number.validator";


interface PaginationResult<T> {
  docs: T[]; // Array de documentos paginados
  totalDocs: number; // Total de documentos
  limit: number; // Límite de documentos por página
  page: number; // Página actual
  totalPages: number; // Total de páginas
  hasNextPage: boolean; // Indica si hay una página siguiente
  nextPage?: number; // Número de la página siguiente, opcional
  hasPrevPage: boolean; // Indica si hay una página anterior
  prevPage?: number; // Número de la página anterior, opcional
  pagingCounter: number; // Contador de documentos paginados
}

export interface ListElements {
  name: string;
  value: any;
}

export abstract class BaseList<T> {

  protected variable: string = 'Undefined';
  protected filterManager = new FilterManager();
  protected populateModules: Array<IPopulate> = [];
  protected abstract  getModel():any;
  
  constructor(variable: string) {
    this.variable = variable;
  }

  async paginate(options: { page: any; limit: any;}): Promise<PaginationResult<T>>{
      try {

      // Convertir los valores de página y límite a números antes de validarlos
      const pageValue = parseInt(options.page);
      const limitValue = parseInt(options.limit);

      // Validar que los valores convertidos sean números válidos
      ValidateNumber.validateOrFail({ value: pageValue, name: 'Page' });
      ValidateNumber.validateOrFail({ value: limitValue, name: 'Limit' });

      // Utilizar los valores convertidos en la paginación
      return  await this.getModel().paginate(
        {...this.filterManager.get()}, 
        { 
          page: pageValue, 
          limit: limitValue, 
          populate: this.populateModules 
      });

      } catch (err) {

        throw new GenericError([{ message: `${this.variable} error system listing results`, field: this.variable, detail: `${this.variable} error system listing results`, code: MODELERRORTEXTTYPE.is_system_error }]);
      }
  }
}

// const User = require('./models/User'); // Suponiendo que tienes un modelo de usuario en './models/User.js'
// const base = new Base(User);
// base.addFilter({ age: { $gte: 18 } }); // Agregar filtro
// base.paginate({ page: 1, limit: 10 });
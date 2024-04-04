import { GenericError } from "@Commons/errors/factory/generic.error";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { Schema } from "mongoose";



export interface FilterOptions {
  value: any;
  key: string;
  type?: 'regex' | 'direct';
}

export class FilterManager {
  private filter: Record<string, any>;

  constructor() {
      this.filter = {};
  }

  // Función para validar el valor de entrada
  private validateValue(value: any): void {
    // console.log(value, typeof value )
    // if (
    //     typeof value !== 'string' &&
    //     typeof value !== 'boolean' &&
    //     !(value instanceof Schema.Types.ObjectId)
    // ) {
    //     throw new GenericError([{
    //         message: `Filter no adecuate`,
    //         field: 'filter',
    //         detail: `Filter no adecuate, BaseReader`,
    //         code: MODELERRORTEXTTYPE.is_system_error
    //     }]);
    // }
    }

  // Método para agregar un filtro
  public addFilter(options: FilterOptions): void {
      // Valida el valor de entrada
      this.validateValue(options.value);

      // Define el filtro según el tipo
      switch (options.type) {
          case 'regex':
              this.filter[options.key] = new RegExp(options.value, 'i');
              break;
          default:
              this.filter[options.key] = options.value;
              break;
      }
  }

  // Método para obtener el filtro actual
  public get(): any {
      return this.filter;
  }
}
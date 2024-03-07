// Clase para configurar los datos
class DatabaseData {
  private _requiredEnvVariables: string[];



}



// constructor() {
//   this._requiredEnvVariables = [
//     'JWT_KEY',
//     'MONGO_USERNAME',
//     'MONGO_PASSWORD',
//     'MONGO_HOSTNAME',
//     'MONGO_PORT',
//     'MONGO_DB'
//   ];
// }

  // // Validar las variables de entorno necesarias
  // public validateEnvVariables(): void {
  //   for (const variable of this._requiredEnvVariables) {
  //     if (!process.env[variable]) {
  //       throw new GenericError([{
  //         message: `${variable} must be defined`,
  //         field: variable,
  //         detail: `${variable} must be defined`,
  //         code: MODELERRORTEXTTYPE.is_value_no_exist
  //       }]);
  //     }
  //   }
  // }

  // // Getters y setters
  // public get requiredEnvVariables(): string[] {
  //   return this._requiredEnvVariables;
  // }

  // public set requiredEnvVariables(value: string[]) {
  //   this._requiredEnvVariables = value;
  // }


export class MiddlewareControllerModel {

  protected _: any;

  constructor(_this: any){
    this._ = _this;
  }

  protected handleModifiedProperty(property: string, updateFunction: (newValue: any) => void) {

    if (this._.isNew || this._.isModified(property)) {
      const value = this._.get(property);
      updateFunction(value);
    }
  }

  protected async handleAsyncModifiedProperty(property: string, updateFunction: (newValue: any) => Promise<void>) {
    if (this._.isNew || this._.isModified(property)) {
      const value = this._.get(property);
      await updateFunction(value);
    }
  }

}
import { IPopulate } from "@Commons/crud/crud.reader.base";
import { PopulateGenerator } from "./populate.generator.mongose";


interface IPopulateMongoseAdd{
  select: string;
}

export abstract class PopulateMongose{

  protected populate: Array<IPopulate>;
  protected path: string[] = [];
  private populateGen: PopulateGenerator;;

  add(params: IPopulateMongoseAdd){

    this.populateGen.add({
      select: this.fields(params.select),
      level: this.path
    });
    
  }

  protected abstract fields(select_: string): string;

  constructor(populate: Array<IPopulate>, path: string[] = []){
    this.populate = populate;
    this.path = path;
    this.populateGen = new PopulateGenerator(this.populate);
  }

  protected createPopulate(path: string, select: string, populates: (IPopulate | null)[]): IPopulate {
    const populate: IPopulate = {
      path,
      select,
      populate: [] as IPopulate[]
    };
  
    const populateAdd = populates.filter((e) => e !== null) as IPopulate[];
  
    if (populate.populate && populateAdd.length > 0) {
      populate.populate.push(...populateAdd);
    }
  
    return populate;
  }

  
}
interface INode {
  path: string;
  select?: any; // Puedes reemplazar `any` con el tipo de datos adecuado
  populate?: INode[];
}

interface NewObject {
  level: string[];
  select: any; // Puedes reemplazar `any` con el tipo de datos adecuado
}

export class PopulateGenerator {
  private total: number = 0;
  private newObject!: NewObject;
  private object: INode[] = [];

  constructor(object: INode[]) {
    this.object = object;
  }

  private addNode(object: INode[], path: string, i: number): void {
    const ob: INode = {
      path,
      select: this.newObject.select
    };
    object.push(ob);
  }

  private findNode(object: INode[], i: number): void {
    const index = object.findIndex((e) => e.path === this.newObject.level[i]);

    if (index !== -1) {
      if (this.total === i) {
        if (!object[index].populate) {
          object[index].populate = []; // Inicializar populate si aún no está definido
        }
        this.addNode(object[index].populate!, this.newObject.level[i], i + 1);
      } else {
        if (!object[index].populate) {
          object[index].populate = []; // Inicializar populate si aún no está definido
        }
        this.findNode(object[index].populate!, i + 1);
      }
    } else {
      if (i === this.total) {
        this.addNode(object, this.newObject.level[i], i);
      } else {
        throw new Error("No encontrado el camino");
      }
    }
  }

  add(newObject: NewObject): void {
    this.total = newObject.level.length - 1;
    this.newObject = newObject;
    if (this.newObject.level.length === 0) {
      throw new Error("Proporciona un nivel adecuado");
    }
    this.findNode(this.object, 0);
  }
}

// Enumeración para los tipos de etiquetas
export enum EmailTags {
  TITLE = "title",
  TEXT = "text",
  MESSAGE = "message",
  BUTTON = "button",
  IMAGE="image",
  SECTION="section"
}

export interface IEmailContentItem {
  msg?: string;
  tag: EmailTags;
  url?: string;
}



export interface IParamsEmail{
  body: string;
  title: string;
}

export interface IParamsButton{
  url: string;
  title: string;
}

export interface IGenerateHMTLTableFooter{
  value: string,
  col?: number
}

export interface IGenerateHTMLTable {
  data: any;
  headers: string[];
  footer?: IGenerateHMTLTableFooter[] | undefined;
}

export interface DataObject {
  [key: string]: string | number;
}
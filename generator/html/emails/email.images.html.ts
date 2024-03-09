interface HtmlImageCreateAttrs {
  src: string,
  alt?: string,
  width?: number,
  height?: number,
  style?: string,
}

export class HtmlImage {
  static create({
    src,
    alt = '',
    width = undefined,
    height = undefined,
    style = ''
  }: HtmlImageCreateAttrs) {
    let imgTag = `<img src="${src}" alt="${alt}"`;
    if (width !== undefined) {
      imgTag += ` width="${width}"`;
    }
    if (height !== undefined) {
      imgTag += ` height="${height}"`;
    }
    if (style) {
      imgTag += ` style="${style}"`;
    }
    imgTag += '>';
    return imgTag;
  }
}
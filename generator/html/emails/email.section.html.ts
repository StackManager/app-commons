interface HtmlSectionCreateAttrs {
  align: 'center' | 'right' | 'left',
  child: string,
  paddingTop?: number,
  paddingBottom?: number,
  backgroundColor?: string,
  borderRadius?: number,
}

export class HtmlSection {
  static create({
    align = 'center',
    child = '',
    paddingTop = 0,
    paddingBottom = 0,
    backgroundColor = '#fff',
    borderRadius = 0
  }: HtmlSectionCreateAttrs) {
    return `
      <table align="${align}" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: ${backgroundColor}; border-radius: ${borderRadius}px;">
        <tr>
            <td align="${align}" style="padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px;">
              ${child}
            </td>
        </tr>
      </table>`;
  }
}
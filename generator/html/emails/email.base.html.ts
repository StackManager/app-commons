
import { toSingleLine } from "@Commons/functions/string";
import { EmailTags, IEmailContentItem, IGenerateHMTLTableFooter, IGenerateHTMLTable, IParamsButton, IParamsEmail } from "./email.html.interfaces";



export class EmailHtmlBase{

  
  generateEmailContent(emailContent: IEmailContentItem[]): string {

    let htmlContent = "";
    let title = "text-align: left; text-align: justify;text-decoration-line: none;color: #282828;margin: 0;font-weight: 500;display: block; font-size: 1.5em; margin-block-start: 0.83em; margin-block-end: 0.83em; margin-inline-start: 0px; margin-inline-end: 0px; font-weight: bold;";
    let text = "text-align: left; text-align: justify;text-decoration-line: none;color: #282828;margin:0;font-weight:400;margin-top:0.8em;font-size:1em;line-height:1.5; font-size: 1.0em;";
    let message = "font-style:italic; text-decoration-line: none;color: #282828;margin:0;font-weight:500;margin-top:0.8em;font-size:1em;line-height:1.2; font-size: 0.9em;"
    
    for (const { msg = '', tag, url = '' } of emailContent) {
      switch (tag) {
        case EmailTags.TEXT:
          htmlContent += `<p style="${text}">${msg}</p>`;
          break;
        case EmailTags.MESSAGE:
          htmlContent += `<p style="${message}"><em>${msg}</em></p>`;
          break;
        case EmailTags.TITLE:
          htmlContent += `<h2 style="${title}" >${msg}</h2>`;
          break;
        case EmailTags.IMAGE:
            htmlContent += `<table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <img src="${url}" style="display: block; width: 100%; height: auto;" border="0" alt="Imagen" />
              </td>
            </tr>
          </table>`;
          break;
        case EmailTags.BUTTON:
            htmlContent += this.buttonTemplate({title: msg, url});
          break;
        case EmailTags.SECTION:
            htmlContent += `${msg} ${url}`;
          break;
        default:
          htmlContent += `<p style="${text}">${msg}</p>`;
          break;
      }
    }
    return htmlContent;
  }
  
  generateDataRows<T extends Record<string, any>>(data: T[], attrTD: any): string {

    const dataRows = data.map(item => {
        const rowData = Object.values(item).map(value => {
            return `<td ${attrTD}>${value}</td>`;
        });
        return `<tr>${rowData.join('')}</tr>`;
    }).join('');

    return dataRows;
}

generateTableFooter(footerData: IGenerateHMTLTableFooter[] | undefined, attrTD: string): string {
  
  if (!footerData || footerData.length === 0) {
      return '';
  }

  const footerRows = footerData.map(footerItem => {
      const colspan = footerItem.col ? `colspan="${footerItem.col}"` : '';
      return `<td ${colspan} ${attrTD}>${footerItem.value}</td>`;
  }).join('');

  return `<tfoot><tr>${footerRows}</tr></tfoot>`;
}

generateHTMLTable(params: IGenerateHTMLTable): string {

    const tableOptions = 'role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-top: 12px; margin-bottom:12px;"';
    const attrTD=`style="text-align: left;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Fira Sans',Ubuntu,Oxygen,'Oxygen Sans',Cantarell,'Droid Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Emoji','Segoe UI Symbol','Lucida Grande',Helvetica,Arial,sans-serif;font-size:16px;padding-top:4px";`
    
    const dataRows = this.generateDataRows(params.data, attrTD);
    const header = `<tr>${params.headers.map(header => `<th ${attrTD}>${header}</th>`).join('')}</tr>`;
    const footer = this.generateTableFooter(params.footer, attrTD);
    const tableHTML = `
      <table ${tableOptions}>
        ${header}
        ${dataRows}
        ${footer}
      </table>`;
    return tableHTML;
  }

  
  buttonTemplate({url, title}: IParamsButton){
    const button = `height:min-content;border-radius:24px;padding-top:12px;padding-bottom:12px;padding-left:24px;padding-right:24px;text-align:center;font-size:16px;font-weight:600;text-decoration-line:none;background-color:#0a66c2;color:#ffffff;border-width:1px;border-style:solid;border-color:#0a66c2;line-height:1.25;min-height:auto!important`;
    const tableOptions = 'role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-top: 24px; margin-bottom:24px;"';
    return `
      <table ${tableOptions}>
        <tbody>
          <tr>
            <td valign="middle" align="center">
                <a href="${url}">
                  <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="auto" style="border-collapse:separate">
                      <tbody>
                        <tr>
                          <td style="${button}"> 
                            <a href="${url}"> 
                              <span style="color:#ffffff;text-decoration-line:none"> 
                                ${title}
                              </span> 
                            </a> 
                          </td> 
                        </tr> 
                      </tbody> 
                  </table> 
                </a> 
            </td>
          </tr>
        </tbody>
      </table>`
  }
// 
  bodyTemplate({body = "", title=""}: IParamsEmail){

    const attrTD=`style="font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Fira Sans',Ubuntu,Oxygen,'Oxygen Sans',Cantarell,'Droid Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Emoji','Segoe UI Symbol','Lucida Grande',Helvetica,Arial,sans-serif;font-size:16px;padding-top:4px";`
    const attrContainer = `style="margin:0px;width:100%;background-color:#f3f2f0;padding:0px;padding-top:12px; padding-bottom:12px;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Fira Sans',Ubuntu,Oxygen,'Oxygen Sans',Cantarell,'Droid Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Emoji','Segoe UI Symbol','Lucida Grande',Helvetica,Arial,sans-serif"`;
    const attrTable = `role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="512" align="center"  style="margin-left:auto;margin-right:auto;margin-top:0px;width:512px;max-width:512px;background-color:#ffffff;padding:0px"`;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      <div ${attrContainer}>
        <table ${attrTable}>
          <tbody>
            <tr>
                <td style="padding:24px;text-align:center;">
                  <table valign="top" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td ${attrTD}>
                        ${body}
                      </td>
                    </tr>
                  </table>
                </td>
            <tr>
          <tbody>
        </table>
      </div>
    </body>
    </html>`;
    return toSingleLine(html);
  }
}
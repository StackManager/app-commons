export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')     // Reemplaza espacios en blanco con guiones
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos excepto guiones
    .replace(/\-\-+/g, '-')   // Reemplaza múltiples guiones con uno solo
    .replace(/^-+/, '')       // Elimina guiones al principio de la cadena
    .replace(/-+$/, '');      // Elimina guiones al final de la cadena
}


export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str;
  }
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAllWords(text: string) {
  if (text == '' || text == undefined) return ''
  return text.split(' ').map(word => {
    if (word.length > 0) {
      const lowerCaseWord = word.toLowerCase();
      return lowerCaseWord[0].toUpperCase() + lowerCaseWord.slice(1);
    }
    return word;
  }).join(' ');
}

export function capitalizeText(text: string) {
  if (text == '' || text == undefined) return ''
  let newText = text.toLowerCase();
  newText = newText.replace(/(?:^|\.\s+)([a-z])/g, (match, letter) => {
    return letter.toUpperCase();
  });
  return newText;
}

export function upperCaseCharacters(text: string | undefined) {
  if (text == undefined) return ''
  return text.toUpperCase();
}

export function lowerCaseCharacters(text: string | undefined) {
  if (text == undefined) return ''
  return text.toLocaleLowerCase();
}
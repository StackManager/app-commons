export function generateName(minLength: number, maxLength: number): string {
  const characters = 'abcdefgh ijklmnopqr stuvwxyz';
  const trimmedCharacters = characters.trim(); // Eliminar los espacios en blanco al principio y al final

  let name = generateString(minLength, maxLength, trimmedCharacters);

  // Verificar y corregir el primer carácter
  if (name.charAt(0) === ' ') {
    const firstLetter = trimmedCharacters.charAt(
      Math.floor(Math.random() * trimmedCharacters.length)
    );
    name = firstLetter + name.slice(1);
  }

  // Verificar y corregir el último carácter
  if (name.charAt(name.length - 1) === ' ') {
    const lastLetter = trimmedCharacters.charAt(
      Math.floor(Math.random() * trimmedCharacters.length)
    );
    name = name.slice(0, -1) + lastLetter;
  }

  return name;
}

export function generateCode(minLength: number, maxLength: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return generateString(minLength, maxLength, characters);
}


export function generateString(minLength: number, maxLength: number, characters: string): string {
  const charactersLength = characters.length;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let name = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charactersLength);
    name += characters.charAt(index);
  }

  return name.trim();
}


export function generateUniqueStrings(minimum: number, maximum: number, quantity: number) {
  var strings: string[] = [];

  while (strings.length < quantity) {
    var length = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var string = generateRandomString(length);

    if (!strings.includes(string)) {
      strings.push(string.trim());
    }
  }

  return strings;
}

export function generateRandomString(length: number) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var string = '';

  for (var i = 0; i < length; i++) {
    var index = Math.floor(Math.random() * characters.length);
    string += characters.charAt(index);
  }

  return string;
}

function generateSlug(name: string): string {
  // Reemplazar espacios y caracteres especiales con guiones
  const slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
    .replace(/\s+/g, '-')     // Reemplazar espacios con guiones
    .replace(/-+/g, '-');     // Eliminar guiones duplicados

  return slug;
}
export function generateUrl() {
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const urlLength = 10;
  const domainLength = 5;
  let url = '';

  // Genera una cadena aleatoria de caracteres para la URL
  for (let i = 0; i < urlLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    url += characters[randomIndex];
  }

  // Agrega el esquema y el dominio a la URL
  const scheme = 'https://';
  url = scheme + url + '.com';

  return url;
}
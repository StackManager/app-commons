export function generateEmail() {
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const emailLength = 10;
  let email = '';

  // Genera una cadena aleatoria de caracteres
  for (let i = 0; i < emailLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    email += characters[randomIndex];
  }

  // Agrega un dominio de correo electrónico ficticio
  const domain = 'example.com';
  email += `@${domain}`;

  return email;
}
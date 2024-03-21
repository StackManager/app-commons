export function generatePhoneNumber() {
  const countryCode = '+1'; // Código de país, puedes ajustarlo según tus necesidades
  const areaCode = '555'; // Código de área, puedes ajustarlo según tus necesidades
  const phoneNumberLength = 7; // Longitud del número de teléfono (sin contar el código de país ni el código de área)
  let phoneNumber = '';

  // Genera una cadena aleatoria de dígitos
  for (let i = 0; i < phoneNumberLength; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    phoneNumber += randomDigit;
  }
  
  // Combina el número de teléfono con el código de país y el código de área
  const fullPhoneNumber = `${countryCode} ${areaCode} ${phoneNumber}`;

  return fullPhoneNumber;
}
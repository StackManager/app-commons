export function generateRandomToken(items: number): string {
  const characters = '0123456789';
  let token = '';
  
  for (let i = 0; i < items; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  
  return token;
}
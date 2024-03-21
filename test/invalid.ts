export const invalidName = [
  "a", 
  "angel -1", 
  "* angel *", 
  "angel +", 
  "angel /", 
  " angel !", 
  "$$ angel", 
  '1000000', 
  '12345678901234567890abcdef'
];

export const invalidDescription = [
  "Descripción del producto <script>alert('Hola');</script>", // Script malicioso
  "<p>Descripción con etiquetas HTML no permitidas</p>", // Etiquetas HTML no permitidas
  "Descripción con más de 1000 caracteres............................................................................................................................................................................................................................................................................................................", // Excede el límite de caracteres
  "Descripción con emojis 😀👍❤️", // Emojis no permitidos
  "Descripción con caracteres especiales: ~`!@#$%^&*()-_=+[{]}\|;:'\",<.>/?", // Caracteres especiales no permitidos
];
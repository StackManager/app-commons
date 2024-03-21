// import redis, { RedisClient as RedisClientType } from 'redis';
// import mongoose, { Model } from 'mongoose';

// class RedisClient {
//     private client: RedisClientType;

//     constructor() {
//         this.client = redis.createClient();

//         this.client.on('error', (err) => {
//             console.error('Error en Redis:', err);
//         });
//     }

//     public set(key: string, value: object): void {
//         const serializedValue = JSON.stringify(value);
//         this.client.set(key, serializedValue);
//     }

//     public async get(key: string): Promise<string | null> {
//         return new Promise((resolve, reject) => {
//             this.client.get(key, (err, reply) => {
//                 if (err) {
//                     console.error('Error al obtener valor de Redis:', err);
//                     reject(err);
//                 } else {
//                     resolve(reply);
//                 }
//             });
//         });
//     }

//     public async getOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
//         const cachedValue = await this.get(key);
//         if (cachedValue) {
//             return JSON.parse(cachedValue);
//         } else {
//             const freshData = await fetchFn();
//             this.set(key, freshData);
//             return freshData;
//         }
//     }

//     public quit(): void {
//         this.client.quit();
//     }
// }

// export default RedisClient;



// // Instancia de la clase RedisClient
// const redisClient = new RedisClient();

// // Ruta para guardar una persona en MongoDB y Redis
// app.post('/persona', async (req: Request, res: Response) => {
//     const { nombre, edad } = req.body;

//     // Guardar en MongoDB
//     const persona = new PersonaModel({ nombre, edad });
//     await persona.save();

//     // Guardar en Redis
//     redisClient.set(`persona:${persona._id}`, { nombre, edad });

//     res.send('Persona guardada correctamente');
// });

// app.get('/persona/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const fetchPersona = async () => {
//             const persona = await PersonaModel.findById(id);
//             if (!persona) {
//                 throw new Error('Persona no encontrada');
//             }
//             return { nombre: persona.nombre, edad: persona.edad };
//         };

//         const persona = await redisClient.getOrFetch(`persona:${id}`, fetchPersona);
//         res.json(persona);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Error interno del servidor');
//     }
// });
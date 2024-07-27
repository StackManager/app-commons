import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

export class ManagerImageSaver {
  private imagePath: string;

  constructor(imagePath: string) {
    this.imagePath = imagePath;
  }

  async saveImage(base64Image: string, imageName: string): Promise<string> {
    try {
      if (!await validateImage(base64Image)) {
        throw new Error('Imagen inválida');
      }

      await fs.promises.mkdir(this.imagePath, { recursive: true });

      const imageData = Buffer.from(base64Image, 'base64');
      const filePath = path.join(this.imagePath, imageName);

      await fs.promises.writeFile(filePath, imageData);

      return filePath;
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      throw error;
    }
  }
}

async function validateImage(base64Image: string) {
    try {
        await sharp(Buffer.from(base64Image, 'base64')).metadata();
        return true; // Imagen válida
    } catch (error) {
        console.error('Error al validar la imagen:', error);
        return false; // Imagen inválida
    }
}
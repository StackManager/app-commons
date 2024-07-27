import sharp from 'sharp';
import * as fs from 'fs';
import path from 'path';

export class ManagerImageWebPOptimizer {

  private imagePath: string;

  constructor(imagePath: string) {
    this.imagePath = imagePath;
  }

  async optimizeImage(imagePath: string): Promise<false | string[]> {
    try {


      const paths: string[] = []
      const webpPath = path.join(
        path.dirname(imagePath),
        '..',
        this.imagePath,
        path.basename(imagePath, path.extname(imagePath))
      );

      // Comprobar si el archivo WebP ya existe y es más reciente (opcional)
      const stats = await fs.promises.stat(webpPath).catch(() => null);
      if (stats && stats.mtimeMs >= (await fs.promises.stat(imagePath)).mtimeMs) {
        console.log(`Archivo WebP ${webpPath} ya existe y es más reciente.`);
        return false;
      }

      const resizeAndConvert = async (percentage: number) => {
        const outputPath = `${webpPath}_${percentage}.webp`;
        await sharp(imagePath)
          .resize({ width: Math.round(await sharp(imagePath).metadata().then(meta => meta.width! * (percentage / 100))) })
          .webp({ quality: 95, lossless: false })
          .toFile(outputPath);
        paths.push(outputPath);
        console.log(`Convertido ${imagePath} a ${outputPath}`);
      };

      await Promise.all([
        resizeAndConvert(100),
        resizeAndConvert(60),
        resizeAndConvert(30)
      ]);

      return paths
    } catch (error) {
      console.error('Error al optimizar imagen:', error);
      return false
    }
  }
}
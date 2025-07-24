
export class DirectImageLoader {
  private static cache = new Map<string, boolean>();

  static async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onerror = (error) => {

        reject(new Error(`Failed to load image: ${src}`));
      };

      img.onload = () => {
        this.cache.set(src, true);
        resolve(img);
      };

      img.crossOrigin = null;
      img.loading = 'eager';
      img.decoding = 'sync';

      img.src = src;
    });
  }

  static async checkImage(src: string): Promise<boolean> {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    try {
      await this.loadImage(src);
      return true;
    } catch {
      this.cache.set(src, false);
      return false;
    }
  }

  static async preloadImages(sources: string[]): Promise<void> {
    const promises = sources.map(src =>
      this.loadImage(src).catch(error => {

        return null;
      })
    );

    await Promise.allSettled(promises);
  }

  static getDirectUrl(src: string): string {

    if (src.startsWith('/images/')) {

      const url = new URL(src, window.location.origin);
      url.searchParams.set('direct', '1');
      url.searchParams.set('t', Date.now().toString());
      return url.toString();
    }

    return src;
  }

  static createImageElement(src: string, alt: string = ''): HTMLImageElement {
    const img = new Image();
    img.alt = alt;
    img.loading = 'eager';
    img.decoding = 'sync';
    img.crossOrigin = null;

    img.src = this.getDirectUrl(src);

    return img;
  }
}

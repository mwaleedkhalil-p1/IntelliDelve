// Image debugging utility to help diagnose image loading issues

export interface ImageTestResult {
  src: string;
  success: boolean;
  error?: string;
  loadTime?: number;
  naturalWidth?: number;
  naturalHeight?: number;
}

export class ImageDebugger {
  /**
   * Test if a single image can be loaded
   */
  static async testImage(src: string, timeout: number = 5000): Promise<ImageTestResult> {
    const startTime = Date.now();

    return new Promise((resolve) => {
      const img = new Image();
      const timeoutId = setTimeout(() => {
        resolve({
          src,
          success: false,
          error: 'Timeout',
          loadTime: Date.now() - startTime
        });
      }, timeout);

      img.onload = () => {
        clearTimeout(timeoutId);
        resolve({
          src,
          success: true,
          loadTime: Date.now() - startTime,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        });
      };

      img.onerror = (error) => {
        clearTimeout(timeoutId);
        resolve({
          src,
          success: false,
          error: error.toString(),
          loadTime: Date.now() - startTime
        });
      };

      img.src = src;
    });
  }

  /**
   * Test multiple images and return results
   */
  static async testImages(sources: string[]): Promise<ImageTestResult[]> {
    const promises = sources.map(src => this.testImage(src));
    return Promise.all(promises);
  }

  /**
   * Test all critical images used in the app
   */
  static async testCriticalImages(): Promise<ImageTestResult[]> {
    const criticalImages = [
      '/images/downloaded/unsplash-photo-1507003211169-0a1dd7228f2d.jpg',
      '/images/downloaded/unsplash-photo-1677442136019-21780ecad995.jpg',
      '/images/downloaded/unsplash-photo-1519389950473-47ba0277781c.jpg',
      '/images/downloaded/freepik-background-check-illustration.jpg',
      '/Main logo TM.png',
      '/logo.png'
    ];

    return this.testImages(criticalImages);
  }

  /**
   * Log image test results to console
   */
  static logResults(results: ImageTestResult[]): void {
    console.group('🖼️ Image Loading Test Results');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    if (failed.length > 0) {
      console.group('❌ Failed Images');
      failed.forEach(result => {
        console.error(`${result.src}: ${result.error} (${result.loadTime}ms)`);
      });
      console.groupEnd();
    }

    if (successful.length > 0) {
      console.group('✅ Successful Images');
      successful.forEach(result => {
        console.log(`${result.src}: ${result.naturalWidth}x${result.naturalHeight} (${result.loadTime}ms)`);
      });
      console.groupEnd();
    }

    console.groupEnd();
  }

  /**
   * Run a comprehensive image test and log results
   */
  static async runDiagnostics(): Promise<void> {

    try {
      const results = await this.testCriticalImages();
      this.logResults(results);

      // Additional debugging info
      console.group('🔧 Environment Info');

      console.groupEnd();

    } catch (error) {

    }
  }
}

// Export for global access in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).ImageDebugger = ImageDebugger;
}

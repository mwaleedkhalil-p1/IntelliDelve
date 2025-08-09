import { Cloudinary } from 'cloudinary-core';

// Cloudinary configuration from environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dics1cjzg';
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '328634845353555';
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || '0BK46umu1Dy8H9mnDZGnbdTEXnI';

const cloudinary = new Cloudinary({
  cloud_name: CLOUD_NAME,
  secure: true
});

// Cloudinary API configuration
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const CLOUDINARY_API_KEY = API_KEY;
const CLOUDINARY_API_SECRET = API_SECRET;

export interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder?: string;
  original_filename: string;
}

export interface ImageMetadata {
  alt_text?: string;
  caption?: string;
  order?: number;
  content_type?: 'blog' | 'casestudy';
  object_id?: string;
}

export interface CloudinaryImageData {
  id: string;
  url: string;
  secure_url: string;
  public_id: string;
  alt_text?: string;
  caption?: string;
  order?: number;
  file_name: string;
  file_size: number;
  width: number;
  height: number;
  format: string;
  created_at: string;
  content_type?: 'blog' | 'casestudy';
  object_id?: string;
}

class CloudinaryService {
  private async generateSignature(params: Record<string, any>): Promise<string> {
    // In a real implementation, signature generation should be done on the backend
    // for security reasons. This is a simplified version for demonstration.
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    const stringToSign = sortedParams + CLOUDINARY_API_SECRET;
    
    // Use crypto API for proper SHA-1 hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToSign);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  async uploadImage(
    imageFile: File,
    metadata?: ImageMetadata
  ): Promise<CloudinaryImageData> {
    try {
      const formData = new FormData();
      
      // Basic upload parameters
      const timestamp = Math.round(Date.now() / 1000);
      const folder = metadata?.content_type && metadata?.object_id 
        ? `${metadata.content_type}/${metadata.object_id}` 
        : 'general';
      
      // Build context string
      const contextParts: string[] = [];
      if (metadata?.alt_text) {
        contextParts.push(`alt_text=${metadata.alt_text}`);
      }
      if (metadata?.caption) {
        contextParts.push(`caption=${metadata.caption}`);
      }
      if (metadata?.order !== undefined) {
        contextParts.push(`order=${metadata.order}`);
      }
      
      // Upload parameters for signature
      const uploadParams: Record<string, string> = {
        timestamp: timestamp.toString(),
        folder: folder
      };
      
      // Add context to signature params if it exists
      if (contextParts.length > 0) {
        uploadParams.context = contextParts.join('|');
      }
      
      // Generate signature (should be done server-side in production)
      const signature = await this.generateSignature(uploadParams);
      
      // Append parameters to FormData
      formData.append('file', imageFile);
      formData.append('timestamp', uploadParams.timestamp);
      formData.append('folder', uploadParams.folder);
      formData.append('api_key', CLOUDINARY_API_KEY);
      formData.append('signature', signature);
      
      // Add context if it exists
      if (uploadParams.context) {
        formData.append('context', uploadParams.context);
      }
      
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }
      
      const result: CloudinaryUploadResponse = await response.json();
      
      // Transform Cloudinary response to our format
      const imageData: CloudinaryImageData = {
        id: result.public_id,
        url: result.url,
        secure_url: result.secure_url,
        public_id: result.public_id,
        alt_text: metadata?.alt_text,
        caption: metadata?.caption,
        order: metadata?.order,
        file_name: result.original_filename,
        file_size: result.bytes,
        width: result.width,
        height: result.height,
        format: result.format,
        created_at: result.created_at,
        content_type: metadata?.content_type,
        object_id: metadata?.object_id
      };
      
      return imageData;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  }

  async bulkUploadImages(
    imageFiles: File[],
    metadata?: Omit<ImageMetadata, 'order'>
  ): Promise<CloudinaryImageData[]> {
    const uploadPromises = imageFiles.map((file, index) => 
      this.uploadImage(file, { ...metadata, order: index })
    );
    
    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Bulk upload error:', error);
      throw error;
    }
  }

  async deleteImage(publicId: string): Promise<boolean> {
    try {
      // For deletion, we need to use the admin API which requires server-side implementation
      // This is a placeholder - in production, this should call your backend endpoint
      // that handles Cloudinary deletion using the admin API
      
      const timestamp = Math.round(Date.now() / 1000);
      const deleteParams = {
        public_id: publicId,
        timestamp: timestamp.toString(),
        api_key: CLOUDINARY_API_KEY
      };
      
      const signature = await this.generateSignature(deleteParams);
      
      const formData = new FormData();
      formData.append('public_id', publicId);
      formData.append('timestamp', deleteParams.timestamp);
      formData.append('api_key', deleteParams.api_key);
      formData.append('signature', signature);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Delete failed');
      }
      
      const result = await response.json();
      return result.result === 'ok';
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw error;
    }
  }

  async updateImageMetadata(
    publicId: string,
    metadata: Partial<ImageMetadata>
  ): Promise<CloudinaryImageData> {
    try {
      // For updating metadata, we use the context API
      const timestamp = Math.round(Date.now() / 1000);
      
      const context = [];
      if (metadata.alt_text) context.push(`alt_text=${metadata.alt_text}`);
      if (metadata.caption) context.push(`caption=${metadata.caption}`);
      if (metadata.order !== undefined) context.push(`order=${metadata.order}`);
      
      const updateParams = {
        public_id: publicId,
        context: context.join('|'),
        timestamp: timestamp.toString(),
        api_key: CLOUDINARY_API_KEY
      };
      
      const signature = await this.generateSignature(updateParams);
      
      const formData = new FormData();
      formData.append('public_id', publicId);
      formData.append('context', updateParams.context);
      formData.append('timestamp', updateParams.timestamp);
      formData.append('api_key', updateParams.api_key);
      formData.append('signature', signature);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/context`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Update failed');
      }
      
      const result = await response.json();
      
      // Return updated image data
      return {
        id: result.public_id,
        url: result.url || this.getImageUrl(publicId),
        secure_url: result.secure_url || this.getImageUrl(publicId, true),
        public_id: result.public_id,
        alt_text: metadata.alt_text,
        caption: metadata.caption,
        order: metadata.order,
        file_name: result.original_filename || '',
        file_size: result.bytes || 0,
        width: result.width || 0,
        height: result.height || 0,
        format: result.format || '',
        created_at: result.created_at || new Date().toISOString()
      };
    } catch (error) {
      console.error('Cloudinary update error:', error);
      throw error;
    }
  }

  getImageUrl(publicId: string, secure: boolean = true): string {
    return cloudinary.url(publicId, {
      secure,
      quality: 'auto',
      fetch_format: 'auto'
    });
  }

  getOptimizedImageUrl(
    publicId: string,
    options: {
      width?: number;
      height?: number;
      crop?: string;
      quality?: string;
      format?: string;
    } = {}
  ): string {
    return cloudinary.url(publicId, {
      secure: true,
      quality: options.quality || 'auto',
      fetch_format: options.format || 'auto',
      width: options.width,
      height: options.height,
      crop: options.crop || 'fill'
    });
  }

  // Get images for a specific content (this would typically be stored in your database)
  // For now, this is a placeholder that would need to be implemented with your backend
  async getImagesForContent(
    contentType: 'blog' | 'casestudy',
    objectId: string
  ): Promise<CloudinaryImageData[]> {
    // This should be implemented to fetch from your database
    // where you store the mapping between content and Cloudinary public_ids
    console.warn('getImagesForContent should be implemented with your backend database');
    return [];
  }
}

export const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
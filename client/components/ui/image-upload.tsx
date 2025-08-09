import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Card } from './card';
import { cn } from '../../lib/utils';

export interface ImageUploadData {
  id?: string;
  file?: File;
  url?: string;
  alt_text?: string;
  caption?: string;
  order?: number;
  file_name?: string;
  file_size?: number;
  width?: number;
  height?: number;
}

interface ImageUploadProps {
  images: ImageUploadData[];
  onImagesChange: (images: ImageUploadData[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 10,
  maxFileSize = 5,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  className,
  disabled = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Please use: ${acceptedTypes.join(', ')}`;
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }
    
    return null;
  };

  // Process files
  const processFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);
    setUploading(true);
    
    const fileArray = Array.from(files);
    const remainingSlots = maxImages - images.length;
    
    if (fileArray.length > remainingSlots) {
      setError(`Can only upload ${remainingSlots} more image(s). Maximum ${maxImages} images allowed.`);
      setUploading(false);
      return;
    }
    
    const newImages: ImageUploadData[] = [];
    
    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setUploading(false);
        return;
      }
      
      // Create preview URL and get image dimensions
      const url = URL.createObjectURL(file);
      
      try {
        const dimensions = await getImageDimensions(file);
        
        newImages.push({
          file,
          url,
          alt_text: '',
          caption: '',
          order: images.length + newImages.length,
          file_name: file.name,
          file_size: file.size,
          width: dimensions.width,
          height: dimensions.height
        });
      } catch (err) {
        console.error('Error getting image dimensions:', err);
        newImages.push({
          file,
          url,
          alt_text: '',
          caption: '',
          order: images.length + newImages.length,
          file_name: file.name,
          file_size: file.size
        });
      }
    }
    
    onImagesChange([...images, ...newImages]);
    setUploading(false);
  }, [images, maxImages, onImagesChange, acceptedTypes, maxFileSize]);

  // Get image dimensions
  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles, disabled]);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1)[0];
    
    // Revoke object URL to prevent memory leaks
    if (removedImage.url && removedImage.url.startsWith('blob:')) {
      URL.revokeObjectURL(removedImage.url);
    }
    
    // Update order for remaining images
    newImages.forEach((img, idx) => {
      img.order = idx;
    });
    
    onImagesChange(newImages);
  };

  // Update image metadata
  const updateImageMetadata = (index: number, field: 'alt_text' | 'caption', value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    onImagesChange(newImages);
  };

  // Move image
  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    
    // Update order
    newImages.forEach((img, idx) => {
      img.order = idx;
    });
    
    onImagesChange(newImages);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors',
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 dark:border-gray-600',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50',
          images.length >= maxImages && 'opacity-50 cursor-not-allowed'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && images.length < maxImages && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled || images.length >= maxImages}
        />
        
        <div className="text-center">
          {uploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Processing images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {images.length >= maxImages
                  ? `Maximum ${maxImages} images reached`
                  : 'Click to upload or drag and drop'
                }
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxFileSize}MB each
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {images.length}/{maxImages} images uploaded
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="ml-auto h-auto p-1 text-red-500 hover:text-red-700"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Uploaded Images ({images.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="p-4">
                <div className="flex gap-4">
                  {/* Image Preview */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={image.url}
                      alt={image.alt_text || `Image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {/* Image Metadata */}
                  <div className="flex-1 space-y-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {image.file_name} • {image.file_size ? Math.round(image.file_size / 1024) : 0}KB
                      {image.width && image.height && ` • ${image.width}×${image.height}`}
                    </div>
                    
                    <Input
                      placeholder="Alt text (for accessibility)"
                      value={image.alt_text || ''}
                      onChange={(e) => updateImageMetadata(index, 'alt_text', e.target.value)}
                      className="text-xs"
                    />
                    
                    <Input
                      placeholder="Caption (optional)"
                      value={image.caption || ''}
                      onChange={(e) => updateImageMetadata(index, 'caption', e.target.value)}
                      className="text-xs"
                    />
                    
                    {/* Move buttons */}
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveImage(index, Math.max(0, index - 1))}
                        disabled={index === 0}
                        className="h-6 px-2 text-xs"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveImage(index, Math.min(images.length - 1, index + 1))}
                        disabled={index === images.length - 1}
                        className="h-6 px-2 text-xs"
                      >
                        ↓
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
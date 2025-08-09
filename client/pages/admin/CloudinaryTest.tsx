import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { cloudinaryService } from '../../services/cloudinaryService';
import { imageService } from '../../services/apiService';

const CloudinaryTest: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Test direct Cloudinary service
      const directResult = await cloudinaryService.uploadImage(selectedFile, {
        alt_text: altText,
        caption: caption,
        content_type: 'blog',
        object_id: 'test-blog-id'
      });

      console.log('Direct Cloudinary result:', directResult);

      // Test through imageService (API wrapper)
      const apiResult = await imageService.uploadImage(
        'blog',
        'test-blog-id',
        selectedFile,
        {
          alt_text: altText,
          caption: caption,
          order: 0
        }
      );

      console.log('API Service result:', apiResult);

      setUploadResult({
        direct: directResult,
        api: apiResult
      });
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!uploadResult?.direct?.public_id) {
      setError('No image to delete');
      return;
    }

    try {
      const success = await cloudinaryService.deleteImage(uploadResult.direct.public_id);
      if (success) {
        setUploadResult(null);
        setSelectedFile(null);
        alert('Image deleted successfully');
      } else {
        setError('Failed to delete image');
      }
    } catch (err: any) {
      setError(err.message || 'Delete failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Cloudinary Integration Test
        </h1>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Image File
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alt Text
              </label>
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Enter alt text"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Caption
              </label>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Enter caption"
                className="w-full"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="flex-1"
              >
                {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
              </Button>
              
              {uploadResult && (
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="flex-1"
                >
                  Delete Image
                </Button>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </Card>

        {uploadResult && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Results</h2>
            
            <div className="space-y-6">
              {/* Direct Cloudinary Result */}
              <div>
                <h3 className="text-lg font-medium mb-2">Direct Cloudinary Service</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(uploadResult.direct, null, 2)}
                  </pre>
                </div>
                {uploadResult.direct?.secure_url && (
                  <div className="mt-4">
                    <img
                      src={uploadResult.direct.secure_url}
                      alt="Uploaded via direct service"
                      className="max-w-xs h-auto rounded border"
                    />
                  </div>
                )}
              </div>

              {/* API Service Result */}
              <div>
                <h3 className="text-lg font-medium mb-2">API Service Wrapper</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(uploadResult.api, null, 2)}
                  </pre>
                </div>
                {uploadResult.api?.data?.url && (
                  <div className="mt-4">
                    <img
                      src={uploadResult.api.data.url}
                      alt="Uploaded via API service"
                      className="max-w-xs h-auto rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Configuration Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Cloud Name:</strong> {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dics1cjzg'}</p>
            <p><strong>API Key:</strong> {import.meta.env.VITE_CLOUDINARY_API_KEY || '328634845353555'}</p>
            <p><strong>Environment:</strong> {import.meta.env.NODE_ENV}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CloudinaryTest;
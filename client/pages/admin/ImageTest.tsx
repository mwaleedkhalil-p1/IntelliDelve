import React, { useState } from 'react';
import { 
  useUploadSingleImage, 
  useUploadMultipleImages, 
  useImagesForContent,
  useUpdateImageMetadata,
  useDeleteImage 
} from '../../hooks/useApi';
import ImageUpload from '../../components/ui/ImageUpload';
import ImageGallery from '../../components/ui/ImageGallery';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';

const ImageTest: React.FC = () => {
  const [testBlogId, setTestBlogId] = useState('');
  const [showTest, setShowTest] = useState(false);

  // Image hooks
  const uploadSingleMutation = useUploadSingleImage();
  const uploadMultipleMutation = useUploadMultipleImages();
  const updateImageMutation = useUpdateImageMetadata();
  const deleteImageMutation = useDeleteImage();

  // Fetch images for test blog
  const { data: imagesResponse, isLoading: imagesLoading } = useImagesForContent(
    'blog',
    testBlogId,
    showTest && !!testBlogId
  );

  const images = imagesResponse?.success ? imagesResponse.data : [];

  const handleSingleUpload = async (file: File, metadata?: any) => {
    if (!testBlogId) {
      alert('Please enter a blog ID first');
      return;
    }

    try {
      await uploadSingleMutation.mutateAsync({
        contentType: 'blog',
        objectId: testBlogId,
        imageFile: file,
        metadata
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleMultipleUpload = async (files: File[]) => {
    if (!testBlogId) {
      alert('Please enter a blog ID first');
      return;
    }

    try {
      await uploadMultipleMutation.mutateAsync({
        contentType: 'blog',
        objectId: testBlogId,
        imageFiles: files
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleUpdateImage = async (imageId: string, metadata: any) => {
    try {
      await updateImageMutation.mutateAsync({
        imageId,
        metadata
      });
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteImageMutation.mutateAsync(imageId);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Image Management Test
        </h1>

        {/* Test Setup */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Setup</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blog ID (UUID)
              </label>
              <Input
                value={testBlogId}
                onChange={(e) => setTestBlogId(e.target.value)}
                placeholder="Enter a valid blog UUID to test image upload"
                className="w-full"
              />
            </div>
            <Button
              onClick={() => setShowTest(!!testBlogId)}
              disabled={!testBlogId}
            >
              Start Test
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Enter a valid blog UUID from your database to test image upload functionality.
          </p>
        </Card>

        {showTest && testBlogId && (
          <div className="space-y-8">
            {/* Upload Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
              <ImageUpload
                onSingleUpload={handleSingleUpload}
                onMultipleUpload={handleMultipleUpload}
                isUploading={uploadSingleMutation.isPending || uploadMultipleMutation.isPending}
                maxFiles={5}
                maxFileSize={5}
                showMetadataForm={true}
                acceptedTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']}
              />
            </Card>

            {/* Gallery Section */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Existing Images</h2>
              <ImageGallery
                images={images}
                isLoading={imagesLoading}
                onUpdateImage={handleUpdateImage}
                onDeleteImage={handleDeleteImage}
                isUpdating={updateImageMutation.isPending}
                isDeleting={deleteImageMutation.isPending}
                showActions={true}
                columns={3}
              />
            </Card>

            {/* Debug Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
              <div className="space-y-2 text-sm">
                <p><strong>Blog ID:</strong> {testBlogId}</p>
                <p><strong>Images Loading:</strong> {imagesLoading ? 'Yes' : 'No'}</p>
                <p><strong>Images Count:</strong> {images.length}</p>
                <p><strong>Upload Single Pending:</strong> {uploadSingleMutation.isPending ? 'Yes' : 'No'}</p>
                <p><strong>Upload Multiple Pending:</strong> {uploadMultipleMutation.isPending ? 'Yes' : 'No'}</p>
                <p><strong>Update Pending:</strong> {updateImageMutation.isPending ? 'Yes' : 'No'}</p>
                <p><strong>Delete Pending:</strong> {deleteImageMutation.isPending ? 'Yes' : 'No'}</p>
              </div>
              
              {images.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Images Data:</h3>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-xs overflow-auto max-h-64">
                    {JSON.stringify(images, null, 2)}
                  </pre>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageTest;
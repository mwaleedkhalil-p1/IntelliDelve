import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ArrowLeft,
  Loader2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { 
  useBlogs, 
  useCreateBlog, 
  useUploadImage,
  useBulkUploadImages,
  useImages,
  useDeleteImage
} from '../../hooks/useApi';
import { BlogPost, BlogFilters, ImageData } from '../../services/apiService';
import { SEO } from '../../components/SEO';
import RichTextEditor from '../../components/ui/rich-text-editor';
import { processRichTextContent } from '../../utils/contentSanitizer';
import { verifyContentIntegrity, runContentVerificationSuite } from '../../utils/contentVerification';
import ImageUpload, { ImageUploadData } from '../../components/ui/image-upload';

// UI Components
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '../../components/ui/alert-dialog';

const BlogManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [formData, setFormData] = useState<{
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    status: 'draft' | 'published';
  }>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: [],
    status: 'draft'
  });

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
  const [pendingImages, setPendingImages] = useState<ImageUploadData[]>([]);

  // API filters
  const filters: BlogFilters = {
    page: currentPage,
    search: searchQuery.trim() || undefined,
    limit: 10,
  };

  // Fetch blogs from API
  const { 
    data: blogsResponse, 
    isLoading, 
    error, 
    refetch 
  } = useBlogs(filters);

  // Mutations
  const createBlogMutation = useCreateBlog();
  const uploadImageMutation = useUploadImage();
  const bulkUploadImagesMutation = useBulkUploadImages();
  const deleteImageMutation = useDeleteImage();

  // Get blogs from API response and normalize UUID field
  const rawBlogs = blogsResponse?.success ? blogsResponse.data.data : [];
  const blogs = (rawBlogs || []).map((blog: any) => ({
    ...blog,
    uuid: blog.uuid || blog.id, // Ensure we have a uuid field
  }));
  const totalPages = blogsResponse?.success ? Math.ceil(blogsResponse.data.total / (blogsResponse.data.limit || 10)) : 1;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle content changes from rich text editor
  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));
  };

  // Handle tags input (comma separated)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData(prev => ({
      ...prev,
      tags: tagsArray
    }));
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      tags: [],
      status: 'draft'
    });
  };

  // Open create dialog
  const openCreateDialog = () => {
    resetFormData();
    setUploadedImages([]);
    setPendingImages([]);
    setIsCreateDialogOpen(true);
  };



  // Handle create blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim() || !formData.content.trim() || !formData.excerpt.trim() || 
        !formData.author.trim() || !formData.category.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Process content and validate length
    const processedContent = processRichTextContent(formData.content.trim());
    
    // Validate content length (backend requires at least 50 characters)
    if (processedContent.length < 50) {
      alert('Content must be at least 50 characters long. Current length: ' + processedContent.length);
      return;
    }

    // Verify content integrity before saving (development mode)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Verifying content integrity before saving...');
      try {
        await verifyContentIntegrity(formData.content.trim(), 'blog', `create-${formData.title.substring(0, 20)}`);
      } catch (error) {
        console.warn('Content verification failed, but proceeding with save:', error);
      }
    }

    // Prepare data according to API docs
    const blogData = {
      title: formData.title.trim(),
      content: processedContent,
      excerpt: formData.excerpt.trim(),
      author: formData.author.trim(),
      status: formData.status,
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      category: formData.category.trim()
    };

    console.log('Creating blog with data:', blogData);

    try {
      const result = await createBlogMutation.mutateAsync(blogData);
      
      // Upload images if any are pending
      if (result.success && result.data?.id && pendingImages.length > 0) {
        try {
          // Extract File objects from ImageUploadData
          const fileArray = pendingImages
            .filter(img => img.file)
            .map(img => img.file!);
          
          if (fileArray.length > 0) {
            const uploadResult = await bulkUploadImagesMutation.mutateAsync({
              contentType: 'blog',
              objectId: result.data.id,
              imageFiles: fileArray
            });
            
            // Set the first uploaded image as the featured image
            if (uploadResult.success && uploadResult.data && uploadResult.data.length > 0) {
              const firstImageUrl = uploadResult.data[0].url;
              await updateBlogMutation.mutateAsync({
                id: result.data.id,
                blogData: { featured_image: firstImageUrl }
              });
            }
          }
        } catch (imageError) {
          console.error('Error uploading images:', imageError);
          // Don't fail the entire operation if image upload fails
        }
      }
      
      setIsCreateDialogOpen(false);
      resetFormData();
      setUploadedImages([]);
      setPendingImages([]);
      // No need to call refetch() - the mutation handles cache invalidation automatically
    } catch (error: any) {
      console.error('Error creating blog:', error);
      
      // Display specific validation errors from backend
      if (error?.response?.data?.details) {
        const details = error.response.data.details;
        const errorMessages = [];
        
        for (const [field, messages] of Object.entries(details)) {
          if (Array.isArray(messages)) {
            errorMessages.push(`${field}: ${messages.join(', ')}`);
          }
        }
        
        if (errorMessages.length > 0) {
          alert('Validation Error:\n' + errorMessages.join('\n'));
          return;
        }
      }
      
      // Fallback error message
      alert('Error creating blog. Please check your input and try again.');
    }
  };



  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // The useBlogs hook will automatically refetch when filters change due to the dependency array
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Image handling functions
  const handleImagesChange = (images: ImageUploadData[]) => {
    setPendingImages(images);
  };

  const handleImageUpload = async (file: File, metadata?: { alt_text?: string; caption?: string; order?: number }) => {
    if (!selectedBlog?.id) {
      // For new blogs, create ImageUploadData and add to pending images
      const imageUploadData: ImageUploadData = {
        file,
        url: URL.createObjectURL(file),
        alt_text: metadata?.alt_text || '',
        caption: metadata?.caption || '',
        order: metadata?.order || pendingImages.length,
        file_name: file.name,
        file_size: file.size
      };
      setPendingImages(prev => [...prev, imageUploadData]);
      return;
    }

    try {
      const result = await uploadImageMutation.mutateAsync({
        contentType: 'blog',
        objectId: selectedBlog.id,
        imageFile: file,
        metadata
      });
      
      if (result.success && result.data) {
        setUploadedImages(prev => [...prev, result.data!]);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageDelete = async (imageId: string) => {
    try {
      await deleteImageMutation.mutateAsync(imageId);
      setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleImageReorder = (images: ImageData[]) => {
    setUploadedImages(images);
    // You could also implement API calls to update the order on the server
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <SEO
        title="Blog Management | IntelliDelve Admin"
        description="Manage blog posts for IntelliDelve"
        noindex={true}
      />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Blog Management</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => refetch()}
            disabled={isLoading}
            title="Refresh blog list"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              console.log('🧪 Running content verification suite...');
              runContentVerificationSuite().catch(console.error);
            }}
            title="Run content verification tests"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            🔍 Verify Content
          </Button>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" /> New Blog Post
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6 p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </Card>

      {/* Blog Posts Table */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading blog posts...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-8 text-red-500">
            <AlertTriangle className="h-8 w-8 mr-2" />
            <span>Error loading blog posts: {error.message}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Created</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No blog posts found. Create your first blog post!
                    </TableCell>
                  </TableRow>
                ) : (
                  blogs.map((blog) => (
                    <TableRow key={blog.uuid}>
                      <TableCell className="font-medium max-w-xs truncate" title={blog.title}>
                        {blog.title}
                      </TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>{blog.category}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          blog.status === 'published' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        }`}>
                          {blog.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(blog.tags || []).slice(0, 2).map((tag: string, index: number) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800">
                              {tag}
                            </span>
                          ))}
                          {(blog.tags || []).length > 2 && (
                            <span className="text-xs text-gray-500">+{(blog.tags || []).length - 2} more</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 
                         blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                      </TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </Card>

      {/* Create Blog Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Blog Post
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Fill in the details to create a compelling blog post for your audience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter a compelling blog title..."
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Author *
                    </label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      placeholder="Author name"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category *
                    </label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Technology, Business"
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tags
                    </label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags.join(', ')}
                      onChange={handleTagsChange}
                      placeholder="tag1, tag2, tag3"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Content
                </h3>
                <div className="space-y-2">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                    placeholder="Write a compelling excerpt that summarizes your blog post..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Blog Content *
                  </label>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <RichTextEditor
                      value={formData.content}
                      onChange={handleContentChange}
                      placeholder="Write your blog post content here. Use the toolbar above to format your text, add links, images, and more..."
                      height={500}
                      className="editor-enhanced"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Images
                </h3>
                <ImageUpload
                  images={[
                    ...uploadedImages.map(img => ({
                      id: img.id,
                      url: img.url,
                      alt_text: img.alt_text,
                      caption: img.caption,
                      order: img.order,
                      file_name: img.file_name,
                      file_size: img.file_size,
                      width: img.width,
                      height: img.height
                    } as ImageUploadData)),
                    ...pendingImages
                  ]}
                  onImagesChange={handleImagesChange}
                  maxImages={10}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  maxFileSize={5} // 5MB
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2 pt-6 border-t mt-6">
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createBlogMutation.isPending} className="bg-primary hover:bg-primary/90">
                {createBlogMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Save Blog Post'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>





    </div>
  );
};

export default BlogManagement;
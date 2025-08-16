import React from 'react';
import { useSanityBlogsWithFallback } from '../hooks/useSanityWithFallback';

const SanityTest: React.FC = () => {
  const { data: blogsResponse, isLoading, error } = useSanityBlogsWithFallback({ limit: 10 });
  
  const blogs = blogsResponse?.data || [];
  const dataSource = blogsResponse?.source || 'unknown';

  if (isLoading) {
    return <div className="p-8">Loading Sanity blogs...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Sanity Data</h1>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sanity Connection Test</h1>
      
      <div className="mb-4 p-4 bg-blue-100 rounded">
        <p><strong>Data Source:</strong> {dataSource}</p>
        <p><strong>Blog Count:</strong> {blogs.length}</p>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">Author: {blog.author}</p>
            <p className="text-gray-600">Status: {blog.status}</p>
            <p className="text-gray-600">Slug: {blog.slug}</p>
            <p className="text-gray-600">Published: {blog.publishedAt}</p>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="p-4 bg-yellow-100 rounded">
          <p>No blogs found. Make sure you have published blogs in Sanity.</p>
        </div>
      )}
    </div>
  );
};

export default SanityTest;
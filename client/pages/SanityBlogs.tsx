import React from 'react';
import { SanityBlogList } from '../components/sanity';
import { FallbackProvider, FallbackDebugPanel } from '../components/FallbackProvider';

const SanityBlogs: React.FC = () => {
  return (
    <FallbackProvider>
      <SanityBlogList />
      <FallbackDebugPanel />
    </FallbackProvider>
  );
};

export default SanityBlogs;
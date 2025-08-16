import React from 'react';
import { SanityBlogPost } from '../components/sanity';
import { FallbackProvider, FallbackDebugPanel } from '../components/FallbackProvider';

const SanityBlogPostPage: React.FC = () => {
  return (
    <FallbackProvider>
      <SanityBlogPost />
      <FallbackDebugPanel />
    </FallbackProvider>
  );
};

export default SanityBlogPostPage;
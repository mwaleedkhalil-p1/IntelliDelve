import React from 'react';
import { PortableTextComponents } from '@portabletext/react';
import SanityImage from './SanityImage';
import { getImageUrl } from '../../lib/sanity';

// Code block component with syntax highlighting
const CodeBlock: React.FC<{ value: any }> = ({ value }) => {
  const { language = 'text', code } = value;
  
  return (
    <div className="my-6">
      <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
        <span className="text-gray-400 text-sm font-mono">{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          Copy
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

// Image component with caption support
const ImageBlock: React.FC<{ value: any }> = ({ value }) => {
  if (!value?.asset) return null;
  
  return (
    <div className="my-8">
      <SanityImage
        image={value}
        alt={value.alt || ''}
        className="w-full rounded-lg shadow-lg"
        aspectRatio="auto"
      />
      {value.caption && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center italic">
          {value.caption}
        </p>
      )}
    </div>
  );
};

// Callout/Alert component
const CalloutBlock: React.FC<{ value: any }> = ({ value }) => {
  const { type = 'info', title, content } = value;
  
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
  };
  
  return (
    <div className={`my-6 p-4 border-l-4 rounded-r-lg ${styles[type as keyof typeof styles]}`}>
      {title && (
        <h4 className="font-semibold mb-2">{title}</h4>
      )}
      <div className="prose prose-sm max-w-none">
        {content}
      </div>
    </div>
  );
};

// Quote component
const QuoteBlock: React.FC<{ value: any }> = ({ value }) => {
  const { quote, author, position } = value;
  
  return (
    <div className="my-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
        "{quote}"
      </blockquote>
      {author && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">{author}</span>
          {position && <span>, {position}</span>}
        </div>
      )}
    </div>
  );
};

// Video embed component
const VideoBlock: React.FC<{ value: any }> = ({ value }) => {
  const { url, title } = value;
  
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };
  
  const videoId = getYouTubeId(url);
  
  if (!videoId) {
    return (
      <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Video not supported: {url}
        </p>
      </div>
    );
  }
  
  return (
    <div className="my-8">
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'Video'}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {title && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
          {title}
        </p>
      )}
    </div>
  );
};

// Button/CTA component
const ButtonBlock: React.FC<{ value: any }> = ({ value }) => {
  const { text, url, style = 'primary' } = value;
  
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };
  
  return (
    <div className="my-6 text-center">
      <a
        href={url}
        className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${styles[style as keyof typeof styles]}`}
        target={url.startsWith('http') ? '_blank' : undefined}
        rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {text}
      </a>
    </div>
  );
};

// Table component
const TableBlock: React.FC<{ value: any }> = ({ value }) => {
  const { rows } = value;
  
  if (!rows || rows.length === 0) return null;
  
  return (
    <div className="my-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {rows[0].cells.map((cell: string, index: number) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {rows.slice(1).map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {row.cells.map((cell: string, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main portable text components configuration
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ImageBlock,
    code: CodeBlock,
    callout: CalloutBlock,
    quote: QuoteBlock,
    video: VideoBlock,
    button: ButtonBlock,
    table: TableBlock,
  },
  
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-primary dark:text-sky-300 hover:text-primary/80 dark:hover:text-sky-300/80 underline decoration-2 underline-offset-2 hover:decoration-primary/80"
        >
          {children}
        </a>
      );
    },
    
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">
        {children}
      </em>
    ),
    
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    
    highlight: ({ children }) => (
      <mark className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
        {children}
      </mark>
    ),
  },
  
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3 leading-tight">
        {children}
      </h4>
    ),
    
    h5: ({ children }) => (
      <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3 leading-tight">
        {children}
      </h5>
    ),
    
    h6: ({ children }) => (
      <h6 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2 leading-tight">
        {children}
      </h6>
    ),
    
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        {children}
      </blockquote>
    ),
    
    normal: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-base md:text-lg">
        {children}
      </p>
    ),
  },
  
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300 ml-4">
        {children}
      </ul>
    ),
    
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300 ml-4">
        {children}
      </ol>
    ),
  },
  
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    
    number: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
  },
};

export default portableTextComponents;
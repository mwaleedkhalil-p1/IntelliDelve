import React, { useMemo, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { processRichTextContent } from '../../utils/contentSanitizer';

// Simple debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  height?: number | string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className = '',
  readOnly = false,
  theme = 'snow',
  height = 300,
}) => {
  const quillRef = useRef<ReactQuill>(null);

  // Debounced onChange to prevent excessive updates while typing
  const debouncedOnChange = useCallback(
    debounce((content: string) => {
      // Only call onChange if the content actually changed
      if (content !== value) {
        onChange(content);
      }
    }, 500), // Increase debounce to 500ms for better performance
    [onChange, value]
  );

  // Handle content change - use immediate onChange for now to prevent sync issues
  const handleChange = useCallback((content: string) => {
    // For now, directly call onChange to prevent sync issues
    // In the future, we could re-enable debouncing when performance is more important
    onChange(content);
  }, [onChange]);
  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: readOnly ? false : {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video', 'blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        // Custom image handler could be added here
        image: function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = () => {
            const file = input.files?.[0];
            if (file) {
              // For now, we'll create a data URL
              // In production, you'd upload to a CDN and use that URL
              const reader = new FileReader();
              reader.onload = (e) => {
                const range = this.quill.getSelection();
                this.quill.insertEmbed(range.index, 'image', e.target?.result);
              };
              reader.readAsDataURL(file);
            }
          };
        }
      }
    },
    clipboard: {
      // Toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  }), [readOnly]);

  // Quill formats configuration
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'link', 'image', 'video', 'blockquote', 'code-block'
  ];

  return (
    <div className={`rich-text-editor ${className}`}>
      <ReactQuill
        theme={theme}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        modules={modules}
        formats={formats}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          minHeight: '200px',
        }}
      />
      
      {/* Custom styling for dark mode compatibility */}
      <style jsx="true">{`
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-radius: 0.375rem 0.375rem 0 0;
        }
        
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #e5e7eb;
          border-left: 1px solid #e5e7eb;
          border-right: 1px solid #e5e7eb;
          border-radius: 0 0 0.375rem 0.375rem;
        }
        
        .dark .rich-text-editor .ql-toolbar {
          border-color: #4b5563;
          background-color: #374151;
        }
        
        .dark .rich-text-editor .ql-container {
          border-color: #4b5563;
          background-color: #1f2937;
        }
        
        .dark .rich-text-editor .ql-editor {
          color: #f3f4f6;
        }
        
        .dark .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: #9ca3af;
        }
        
        .dark .rich-text-editor .ql-toolbar .ql-fill {
          fill: #9ca3af;
        }
        
        .dark .rich-text-editor .ql-toolbar button:hover .ql-stroke {
          stroke: #f3f4f6;
        }
        
        .dark .rich-text-editor .ql-toolbar button:hover .ql-fill {
          fill: #f3f4f6;
        }
        
        .dark .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: #3b82f6;
        }
        
        .dark .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #3b82f6;
        }
        
        .dark .rich-text-editor .ql-tooltip {
          background-color: #374151;
          border: 1px solid #4b5563;
          color: #f3f4f6;
        }
        
        .dark .rich-text-editor .ql-tooltip input[type=text] {
          background-color: #1f2937;
          border: 1px solid #4b5563;
          color: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

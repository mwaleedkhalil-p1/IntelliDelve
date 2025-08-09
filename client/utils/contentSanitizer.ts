import DOMPurify from 'dompurify';

/**
 * Configuration for HTML sanitization
 */
const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ol', 'ul', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'span', 'div',
    'small', 'sub', 'sup'
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel', 'src', 'alt', 'title',
    'style', 'class',
    'data-*'
  ],
  ALLOW_DATA_ATTR: true,
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
};

/**
 * Quill.js specific class to HTML tag conversions
 */
const QUILL_CLASS_CONVERSIONS: Record<string, { tag: string; attrs?: Record<string, string> }> = {
  'ql-size-huge': { tag: 'h1' },
  'ql-size-large': { tag: 'h2' },
  'ql-size-small': { tag: 'small' },
  'ql-font-serif': { tag: 'span', attrs: { style: 'font-family: serif' } },
  'ql-font-monospace': { tag: 'code' },
  'ql-align-center': { tag: 'div', attrs: { style: 'text-align: center' } },
  'ql-align-right': { tag: 'div', attrs: { style: 'text-align: right' } },
  'ql-align-justify': { tag: 'div', attrs: { style: 'text-align: justify' } },
  'ql-indent-1': { tag: 'div', attrs: { style: 'margin-left: 2em' } },
  'ql-indent-2': { tag: 'div', attrs: { style: 'margin-left: 4em' } },
  'ql-indent-3': { tag: 'div', attrs: { style: 'margin-left: 6em' } }
};

/**
 * Clean and convert Quill.js specific HTML to standard HTML
 */
export function cleanQuillHTML(html: string): string {
  if (!html) return '';

  let cleanedHTML = html;

  // Convert Quill-specific classes to standard HTML
  Object.entries(QUILL_CLASS_CONVERSIONS).forEach(([quillClass, conversion]) => {
    const regex = new RegExp(`<span class="${quillClass}">([^<]*)</span>`, 'g');
    const attrs = conversion.attrs 
      ? Object.entries(conversion.attrs).map(([key, value]) => `${key}="${value}"`).join(' ')
      : '';
    
    cleanedHTML = cleanedHTML.replace(regex, `<${conversion.tag}${attrs ? ' ' + attrs : ''}>$1</${conversion.tag}>`);
  });

  // Remove remaining Quill-specific classes
  cleanedHTML = cleanedHTML.replace(/class="ql-[^"]*"/g, '');

  // Clean up empty class attributes
  cleanedHTML = cleanedHTML.replace(/\s*class=""\s*/g, ' ');

  // Convert Quill line breaks to paragraphs
  cleanedHTML = cleanedHTML.replace(/<div><br><\/div>/g, '<p><br></p>');
  cleanedHTML = cleanedHTML.replace(/<div>([^<]*)<\/div>/g, '<p>$1</p>');

  return cleanedHTML;
}

/**
 * Sanitize HTML content for safe rendering
 */
export function sanitizeHTML(html: string): string {
  if (!html) return '';

  return DOMPurify.sanitize(html, {
    ...SANITIZE_CONFIG,
    USE_PROFILES: { html: true }
  });
}

/**
 * Clean and sanitize HTML content from rich text editor
 * This is the main function to use for content processing
 */
export function processRichTextContent(html: string): string {
  if (!html) return '';

  try {
    // Step 1: Clean Quill-specific HTML
    const cleanedHTML = cleanQuillHTML(html);
    
    // Step 2: Sanitize for security
    const sanitizedHTML = sanitizeHTML(cleanedHTML);
    
    return sanitizedHTML;
  } catch (error) {
    console.error('Error processing rich text content:', error);
    // Fallback: just sanitize the original content
    return sanitizeHTML(html);
  }
}

/**
 * Extract plain text from HTML content (for excerpts, previews, etc.)
 */
export function extractPlainText(html: string, maxLength?: number): string {
  if (!html) return '';

  try {
    // Create a temporary div to extract text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizeHTML(html);
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    if (maxLength && plainText.length > maxLength) {
      return plainText.substring(0, maxLength).trim() + '...';
    }
    
    return plainText.trim();
  } catch (error) {
    console.error('Error extracting plain text:', error);
    return '';
  }
}

/**
 * Check if content contains any HTML tags
 */
export function containsHTML(content: string): boolean {
  if (!content) return false;
  return /<[^>]*>/g.test(content);
}

/**
 * Migrate existing Quill content to clean HTML
 * This function can be used for bulk migration of existing content
 */
export function migrateQuillContent(content: string): string {
  if (!content) return content;

  // Only process if content contains Quill-specific classes
  if (!content.includes('ql-')) {
    return content;
  }

  console.log('Migrating Quill content:', { original: content.substring(0, 100) + '...' });
  
  const processed = processRichTextContent(content);
  
  console.log('Migrated content:', { processed: processed.substring(0, 100) + '...' });
  
  return processed;
}

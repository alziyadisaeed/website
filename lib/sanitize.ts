import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'h4',
      'ul', 'ol', 'li', 'blockquote', 'a', 'span', 'div',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    FORCE_BODY: true,
  });
}

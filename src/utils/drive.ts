/**
 * Converts Google Drive links to direct image links or preview links.
 */
export function formatDriveUrl(url: string, type: 'image' | 'preview' = 'image'): string {
  if (!url || !url.includes('drive.google.com')) {
    return url;
  }

  // Extract file ID
  const fileIdMatch = url.match(/\/file\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
  const fileId = fileIdMatch ? fileIdMatch[1] : null;

  if (!fileId) return url;

  if (type === 'image') {
    // Returns a direct link to the image content
    // Method 1: lh3.googleusercontent.com (Highly reliable for images)
    return `https://lh3.googleusercontent.com/d/${fileId}`;
    
    // Method 2: drive.google.com/uc (Alternative)
    // return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  if (type === 'preview') {
    // Returns a link for embedding in an iframe
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  return url;
}

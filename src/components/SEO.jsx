import { useEffect } from 'react';
import { updateSEO, addStructuredData, organizationStructuredData } from '../utils/seo';

/**
 * SEO Component - Add to any page to set SEO meta tags
 * @param {Object} props - SEO configuration
 */
const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type,
  structuredData,
  canonicalUrl,
}) => {
  useEffect(() => {
    // Update meta tags
    updateSEO({
      title,
      description,
      keywords,
      image,
      url,
      type,
      canonicalUrl,
    });

    // Add organization structured data (always)
    addStructuredData(organizationStructuredData);

    // Add page-specific structured data
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        structuredData.forEach(data => addStructuredData(data));
      } else {
        addStructuredData(structuredData);
      }
    }
  }, [title, description, keywords, image, url, type, structuredData, canonicalUrl]);

  return null; // This component doesn't render anything
};

export default SEO;

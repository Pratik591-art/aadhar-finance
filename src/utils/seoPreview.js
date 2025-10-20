/**
 * SEO Preview Helper
 * Helps visualize how pages will appear in search results and social media
 */

export const getSEOPreview = (seoConfig) => {
  return {
    google: {
      title: seoConfig.title,
      url: seoConfig.url || window.location.href,
      description: seoConfig.description,
    },
    facebook: {
      title: seoConfig.title,
      description: seoConfig.description,
      image: seoConfig.image,
      url: seoConfig.url || window.location.href,
    },
    twitter: {
      title: seoConfig.title,
      description: seoConfig.description,
      image: seoConfig.image,
    },
  };
};

export const validateSEO = (seoConfig) => {
  const issues = [];

  // Title validation
  if (!seoConfig.title) {
    issues.push({ field: 'title', message: 'Title is required' });
  } else if (seoConfig.title.length < 30) {
    issues.push({ field: 'title', message: 'Title is too short (min 30 chars)' });
  } else if (seoConfig.title.length > 60) {
    issues.push({ field: 'title', message: 'Title is too long (max 60 chars)' });
  }

  // Description validation
  if (!seoConfig.description) {
    issues.push({ field: 'description', message: 'Description is required' });
  } else if (seoConfig.description.length < 120) {
    issues.push({ field: 'description', message: 'Description is too short (min 120 chars)' });
  } else if (seoConfig.description.length > 160) {
    issues.push({ field: 'description', message: 'Description is too long (max 160 chars)' });
  }

  // Keywords validation
  if (!seoConfig.keywords) {
    issues.push({ field: 'keywords', message: 'Keywords are recommended' });
  }

  // Image validation
  if (!seoConfig.image) {
    issues.push({ field: 'image', message: 'Social media image is recommended' });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
};

export default { getSEOPreview, validateSEO };

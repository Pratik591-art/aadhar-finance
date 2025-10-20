/**
 * SEO Utility Functions for Aadhar Finance
 * Manages meta tags, structured data, and Open Graph tags
 */

/**
 * Update document meta tags for SEO
 * @param {Object} seoData - SEO configuration object
 */
export const updateSEO = ({
  title = 'Aadhar Finance - Personal & Business Loans | Instant Approval',
  description = 'Get instant personal and business loans with Aadhar Finance. 100% digital process, no collateral required, flexible repayment. Apply now and get approved in 2 minutes!',
  keywords = 'personal loan, business loan, instant loan, digital loan, no collateral loan, fast loan approval, flexible repayment, Aadhar Finance',
  image = '/src/assets/logod.png',
  url = window.location.href,
  type = 'website',
  author = 'Aadhar Finance',
  canonicalUrl = null,
}) => {
  // Update Title
  document.title = title;

  // Meta Tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);
  updateMetaTag('author', author);

  // Open Graph Tags (Facebook, LinkedIn)
  updateMetaTag('og:title', title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:image', image, 'property');
  updateMetaTag('og:url', url, 'property');
  updateMetaTag('og:type', type, 'property');
  updateMetaTag('og:site_name', 'Aadhar Finance', 'property');

  // Twitter Card Tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', title, 'name');
  updateMetaTag('twitter:description', description, 'name');
  updateMetaTag('twitter:image', image, 'name');
  updateMetaTag('twitter:site', '@AadharFinance', 'name');

  // Canonical URL
  if (canonicalUrl) {
    updateCanonicalLink(canonicalUrl);
  }

  // Robots
  updateMetaTag('robots', 'index, follow');
};

/**
 * Helper function to update or create meta tags
 */
const updateMetaTag = (name, content, attribute = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

/**
 * Update canonical link
 */
const updateCanonicalLink = (url) => {
  let link = document.querySelector('link[rel="canonical"]');
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
};

/**
 * Add structured data (JSON-LD) for rich snippets
 */
export const addStructuredData = (data) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  
  // Remove existing structured data with same @type
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((existingScript) => {
    try {
      const existingData = JSON.parse(existingScript.text);
      if (existingData['@type'] === data['@type']) {
        existingScript.remove();
      }
    } catch (e) {
      // Ignore parsing errors
      console.error("Error parsing structured data:", e);
    }
  });
  
  document.head.appendChild(script);
};

/**
 * Predefined SEO configurations for different pages
 */
export const seoConfigs = {
  home: {
    title: 'Aadhar Finance - Personal & Business Loans | Instant Approval',
    description: 'Get instant personal and business loans with Aadhar Finance. 100% digital process, no collateral required, flexible repayment. Apply now and get approved in 2 minutes!',
    keywords: 'personal loan, business loan, instant loan, digital loan, no collateral loan, fast loan approval, flexible repayment, Aadhar Finance, online loan',
  },
  
  personalLoan: {
    title: 'Personal Loan - Apply Online | Instant Approval | Aadhar Finance',
    description: 'Apply for personal loans online with Aadhar Finance. Get ₹50K to ₹50L at attractive interest rates. 100% digital, instant approval, and quick disbursal.',
    keywords: 'personal loan, instant personal loan, online personal loan, quick personal loan, no collateral personal loan',
  },
  
  businessLoan: {
    title: 'Business Loan - Grow Your Business | Aadhar Finance',
    description: 'Get business loans with flexible terms and competitive rates. Fund your business growth with Aadhar Finance. Quick approval and minimal documentation.',
    keywords: 'business loan, SME loan, MSME loan, working capital loan, business finance, entrepreneur loan',
  },
  
  login: {
    title: 'Login - Aadhar Finance',
    description: 'Login to your Aadhar Finance account to manage your loans, track applications, and access exclusive offers.',
    keywords: 'login, customer login, account access, Aadhar Finance login',
  },
  
  signup: {
    title: 'Get Started - Apply for Loan | Aadhar Finance',
    description: 'Start your loan application with Aadhar Finance. Quick registration, instant approval, and hassle-free process. Get funds in 24 hours.',
    keywords: 'apply loan, loan application, register, signup, new customer, get started',
  },
};

/**
 * Organization Structured Data
 */
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  'name': 'Aadhar Finance',
  'description': 'Leading digital lending platform offering personal and business loans with instant approval',
  'url': 'https://aadharfinance.com',
  'logo': 'https://aadharfinance.com/assets/logo.png',
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+91-22-6971-6161',
    'contactType': 'Customer Service',
    'email': 'support@aadharfinance.com',
    'areaServed': 'IN',
    'availableLanguage': ['English', 'Hindi'],
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Mumbai, Maharashtra',
    'addressLocality': 'Mumbai',
    'addressRegion': 'MH',
    'postalCode': '400093',
    'addressCountry': 'IN',
  },
  'sameAs': [
    'https://www.facebook.com/aadharfinance',
    'https://www.twitter.com/aadharfinance',
    'https://www.linkedin.com/company/aadharfinance',
    'https://www.instagram.com/aadharfinance',
  ],
};

/**
 * Product Structured Data Generator
 */
export const createLoanProductStructuredData = ({
  name,
  description,
  minAmount,
  maxAmount,
  interestRate,
  tenure,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  'name': name,
  'description': description,
  'provider': {
    '@type': 'FinancialService',
    'name': 'Aadhar Finance',
  },
  'offers': {
    '@type': 'Offer',
    'price': `${minAmount}-${maxAmount}`,
    'priceCurrency': 'INR',
    'availability': 'https://schema.org/InStock',
  },
  'annualPercentageRate': interestRate,
  'termDuration': tenure,
});

/**
 * FAQ Structured Data Generator
 */
export const createFAQStructuredData = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map((faq) => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer,
    },
  })),
});

/**
 * Breadcrumb Structured Data Generator
 */
export const createBreadcrumbStructuredData = (breadcrumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': crumb.name,
    'item': crumb.url,
  })),
});

export default updateSEO;

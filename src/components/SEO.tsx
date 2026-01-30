import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  structuredData?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
  title = 'AirPets - Справочник по перевозке животных авиакомпаниями',
  description = 'Найдите подходящую авиакомпанию для путешествий с питомцами. Полная информация о правилах перевозки собак, кошек и других животных в салоне, багаже и карго.',
  keywords = 'перевозка животных самолетом, авиакомпании с животными, путешествие с питомцем, перевозка собак, перевозка кошек, салон, багаж, карго',
  ogType = 'website',
  ogImage = '/og-image.jpg',
  canonicalUrl,
  noindex = false,
  structuredData,
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://air-pets.com';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;
  const fullCanonicalUrl = canonicalUrl || currentUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="AirPets" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional Meta */}
      <meta name="author" content="AirPets" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

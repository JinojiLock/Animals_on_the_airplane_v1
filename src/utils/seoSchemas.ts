/**
 * Schema.org structured data generators for SEO
 * https://schema.org/
 */

import type { Airline } from '../types';

/**
 * Organization Schema
 * https://schema.org/Organization
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AirPets',
  url: 'https://air-pets.com',
  logo: 'https://air-pets.com/logo.png',
  description: 'Справочник по перевозке животных авиакомпаниями. Найдите подходящую авиакомпанию для путешествий с питомцами.',
  sameAs: [
    // Добавить соц. сети когда будут
    // 'https://www.facebook.com/airpets',
    // 'https://twitter.com/airpets',
    // 'https://t.me/airpets'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['Russian', 'English']
  }
});

/**
 * WebSite Schema with Search Action
 * https://schema.org/WebSite
 */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AirPets',
  url: 'https://air-pets.com',
  description: 'Справочник по перевозке животных авиакомпаниями',
  inLanguage: ['ru', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://air-pets.com/?search={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
});

/**
 * BreadcrumbList Schema
 * https://schema.org/BreadcrumbList
 */
export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

/**
 * ItemList Schema for Airlines
 * https://schema.org/ItemList
 */
export const getAirlinesListSchema = (airlines: Airline[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Авиакомпании с возможностью перевозки животных',
  description: 'Полный список авиакомпаний с информацией о правилах перевозки домашних животных',
  numberOfItems: airlines.length,
  itemListElement: airlines.map((airline, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Organization',
      name: airline.name,
      url: airline.rulesUrl,
      description: `Правила перевозки животных ${airline.name}. Доступные способы: ${airline.transportMethods.join(', ')}`
    }
  }))
});

/**
 * Article Schema for Airline Detail
 * https://schema.org/Article
 */
export const getAirlineArticleSchema = (airline: Airline) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: `${airline.name} - Правила перевозки животных`,
  description: `Полная информация о перевозке домашних животных в ${airline.name}`,
  author: {
    '@type': 'Organization',
    name: 'AirPets'
  },
  publisher: {
    '@type': 'Organization',
    name: 'AirPets',
    logo: {
      '@type': 'ImageObject',
      url: 'https://air-pets.com/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://air-pets.com/airline/${airline.id}`
  },
  about: {
    '@type': 'Organization',
    name: airline.name,
    url: airline.rulesUrl
  }
});

/**
 * FAQPage Schema
 * https://schema.org/FAQPage
 */
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * AboutPage Schema
 * https://schema.org/AboutPage
 */
export const getAboutPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'О проекте AirPets',
  description: 'AirPets - это справочник по перевозке животных авиакомпаниями, созданный для помощи владельцам домашних животных в путешествиях.',
  mainEntity: {
    '@type': 'Organization',
    name: 'AirPets',
    url: 'https://air-pets.com',
    description: 'Справочник по перевозке животных авиакомпаниями'
  }
});

/**
 * Combine multiple schemas
 */
export const combineSchemas = (...schemas: object[]) => schemas;

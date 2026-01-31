import 'dotenv/config';

/**
 * DeepL Translation Service
 * Translates text from Russian to English using DeepL API
 */

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = process.env.DEEPL_API_URL || 'https://api-free.deepl.com/v2/translate';

export class TranslationService {
  /**
   * Translate text from Russian to English
   */
  static async translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim() === '') {
      return '';
    }

    // Check if API key is configured
    if (!DEEPL_API_KEY) {
      console.warn('⚠️ DeepL API key not configured. Skipping translation.');
      return text; // Return original text if no API key
    }

    try {
      const response = await fetch(DEEPL_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: text,
          source_lang: 'RU',
          target_lang: 'EN',
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('DeepL API error:', response.status, errorData);
        throw new Error(`DeepL API error: ${response.status}`);
      }

      const data = await response.json();
      return data.translations[0].text;
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text');
    }
  }

  /**
   * Translate array of strings
   */
  static async translateArray(items: string[]): Promise<string[]> {
    if (!items || items.length === 0) {
      return [];
    }

    if (!DEEPL_API_KEY) {
      console.warn('⚠️ DeepL API key not configured. Skipping translation.');
      return items;
    }

    try {
      const translations = await Promise.all(
        items.map(item => this.translateToEnglish(item))
      );
      return translations;
    } catch (error) {
      console.error('Array translation error:', error);
      throw new Error('Failed to translate array');
    }
  }

  /**
   * Check if DeepL API is configured and working
   */
  static async checkStatus(): Promise<{ available: boolean; message: string }> {
    if (!DEEPL_API_KEY) {
      return {
        available: false,
        message: 'DeepL API key not configured. Set DEEPL_API_KEY in .env file.',
      };
    }

    try {
      await this.translateToEnglish('test');
      return {
        available: true,
        message: 'DeepL API is working correctly.',
      };
    } catch (error) {
      return {
        available: false,
        message: `DeepL API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }
}

import React from 'react';

/**
 * Utility function to replace literal \n characters with actual line breaks
 * @param text - The text containing \n characters
 * @returns Array of React elements with proper line breaks
 */
export const formatTextWithLineBreaks = (text: string): React.ReactNode[] => {
  if (!text) return [];
  
  const lines = text.split('\\n');
  const result: React.ReactNode[] = [];
  
  lines.forEach((line, index) => {
    result.push(line);
    if (index < lines.length - 1) {
      result.push(React.createElement('br'));
    }
  });
  
  return result;
};

/**
 * Alternative function that returns a string with actual newline characters
 * @param text - The text containing \n characters
 * @returns String with actual newline characters
 */
export const replaceNewlines = (text: string): string => {
  if (!text) return '';
  return text.replace(/\\n/g, '\n');
};
import { PhraseFrequency, WordFrequency } from './types';

export const prepareWordFrequencyData = (
  wordCountSentence: Record<string, number>,
): WordFrequency[] => {
  return Object.entries(wordCountSentence)
    .filter(([word]) => {
      // Filtrar apenas palavras (não frases)
      // Considera palavra: sem espaços e comprimento razoável
      return !word.includes(' ') && word.length > 2 && word.length < 30;
    })
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
};

export const preparePhraseFrequencyData = (
  phraseCountCharacter: Record<string, number>,
): PhraseFrequency[] => {
  return Object.entries(phraseCountCharacter)
    .map(([phrase, count]) => ({
      phrase,
      length: phrase.length,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const getTopWords = (
  wordCountSentence: Record<string, number>,
  limit = 50,
): WordFrequency[] => {
  return prepareWordFrequencyData(wordCountSentence).slice(0, limit);
};

export const getTopPhrases = (
  phraseCountCharacter: Record<string, number>,
  limit = 10,
): PhraseFrequency[] => {
  return preparePhraseFrequencyData(phraseCountCharacter).slice(0, limit);
};

export const calculateDiversity = (
  uniqueWords: number,
  totalWords: number,
): number => {
  return totalWords > 0 ? (uniqueWords / totalWords) * 100 : 0;
};

export const getPhrasesByLength = (
  phraseCountCharacter: Record<string, number>,
): {
  short: number;
  medium: number;
  long: number;
  veryLong: number;
} => {
  const phrases = Object.keys(phraseCountCharacter);
  return {
    short: phrases.filter((p) => p.length <= 50).length,
    medium: phrases.filter((p) => p.length > 50 && p.length <= 150).length,
    long: phrases.filter((p) => p.length > 150 && p.length <= 300).length,
    veryLong: phrases.filter((p) => p.length > 300).length,
  };
};

export const getWordCloudData = (
  wordCountSentence: Record<string, number>,
  limit = 50,
): Array<{ text: string; value: number }> => {
  return prepareWordFrequencyData(wordCountSentence)
    .slice(0, limit)
    .map(({ word, count }) => ({
      text: word,
      value: count,
    }));
};

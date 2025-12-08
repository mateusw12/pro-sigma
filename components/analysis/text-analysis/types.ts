export interface TextAnalysisData {
  totalWordsCount: number;
  uniqueQuantityNotRepeat: number;
  phraseCountCharacter: Record<string, number>;
  wordCountSentence: Record<string, number>;
}

export interface TextAnalysisResultProps {
  data: TextAnalysisData;
  onClose?: () => void;
}

export interface WordFrequency {
  word: string;
  count: number;
}

export interface PhraseFrequency {
  phrase: string;
  length: number;
  count: number;
}

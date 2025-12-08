'use client';

import { Insights } from './Insights';
import { OverviewStats } from './OverviewStats';
import { PhraseAnalysis } from './PhraseAnalysis';
import { PhraseLengthDistribution } from './PhraseLengthDistribution';
import { TextAnalysisResultProps } from './types';
import { getTopPhrases, getTopWords } from './utils';
import { WordCloud } from './WordCloud';
import { WordFrequencyTable } from './WordFrequencyTable';

export const TextAnalysisResult = ({ data }: TextAnalysisResultProps) => {
  const {
    totalWordsCount,
    uniqueQuantityNotRepeat,
    phraseCountCharacter,
    wordCountSentence,
  } = data;

  // Preparar dados
  const topWords = getTopWords(wordCountSentence, 50);
  const topPhrases = getTopPhrases(phraseCountCharacter, 10);
  const phraseCount = Object.keys(phraseCountCharacter).length;

  return (
    <div>
      <OverviewStats
        totalWordsCount={totalWordsCount}
        uniqueQuantityNotRepeat={uniqueQuantityNotRepeat}
      />

      <WordCloud topWords={topWords} />

      <WordFrequencyTable topWords={topWords} />

      <PhraseLengthDistribution phraseCountCharacter={phraseCountCharacter} />

      <PhraseAnalysis topPhrases={topPhrases} />

      <Insights
        totalWordsCount={totalWordsCount}
        uniqueQuantityNotRepeat={uniqueQuantityNotRepeat}
        phraseCount={phraseCount}
      />
    </div>
  );
};

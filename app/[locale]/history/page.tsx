'use client';

import { ProtectedRoute } from '@/components/auth';
import {
  AnalysisHistoryItemWithDetails,
  FileHistoryItem,
} from '@/components/history';
import {
  EmptyState,
  HistoryContainer,
  HistoryTitle,
} from '@/components/history/styled';
import { DashboardLayout } from '@/components/layout';
import { useAnalysisHistory } from '@/hooks';
import { mockHistoryFiles } from '@/lib/data/mockHistory';
import { ExperimentOutlined, FileOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const t = useTranslations('history');
  const { history: analysisHistory, isLoading } = useAnalysisHistory();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = [
    {
      key: 'files',
      label: (
        <>
          <FileOutlined />
          {t('uploadedFiles')}
        </>
      ),
      children: (
        <div>
          {mockHistoryFiles.length > 0 ? (
            mockHistoryFiles.map((file) => (
              <FileHistoryItem key={file.id} file={file} />
            ))
          ) : (
            <EmptyState>
              <FileOutlined />
              <p>{t('noUploadedFiles')}</p>
            </EmptyState>
          )}
        </div>
      ),
    },
    {
      key: 'analyses',
      label: (
        <>
          <ExperimentOutlined />
          {t('performedAnalyses')}
        </>
      ),
      children: (
        <div>
          {analysisHistory.length > 0 ? (
            analysisHistory
              .sort(
                (a: any, b: any) =>
                  new Date(b.executedAt).getTime() -
                  new Date(a.executedAt).getTime(),
              )
              .map((analysis: any) => (
                <AnalysisHistoryItemWithDetails
                  key={analysis.id}
                  analysis={analysis}
                />
              ))
          ) : (
            <EmptyState>
              <ExperimentOutlined />
              <p>{t('noAnalyses')}</p>
            </EmptyState>
          )}
        </div>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <HistoryContainer>
          <HistoryTitle>{t('title')}</HistoryTitle>
          <Tabs items={items} />
        </HistoryContainer>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

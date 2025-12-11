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
import { mockHistoryAnalyses, mockHistoryFiles } from '@/lib/data/mockHistory';
import { ExperimentOutlined, FileOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useTranslations } from 'next-intl';

export default function HistoryPage() {
  const t = useTranslations('history');

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
          {mockHistoryAnalyses.length > 0 ? (
            mockHistoryAnalyses
              .sort(
                (a, b) =>
                  new Date(b.executedAt).getTime() -
                  new Date(a.executedAt).getTime(),
              )
              .map((analysis) => (
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

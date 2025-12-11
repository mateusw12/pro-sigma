'use client';

import { DashboardLayout, ProtectedRoute } from '@/components';
import { renderAnalysisResults } from '@/components/analysis/analysisTypeMapper';
import {
  BackButton,
  ChartContainer,
  DetailContainer,
  DetailHeader,
  DetailSection,
  DetailTitle,
  InfoCard,
  InfoGrid,
  SectionTitle,
} from '@/components/history/details-styled';
import { useAnalysisHistory } from '@/hooks';
import { mockHistoryFiles } from '@/lib/data/mockHistory';
import { HistoryAnalysis, HistoryFile } from '@/types/history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Row,
  Space,
  Statistic,
  Tag,
} from 'antd';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AnalysisDetailPageProps {
  params: Promise<{ analysisId: string }>;
}

export default function AnalysisDetailPage({
  params,
}: AnalysisDetailPageProps) {
  const [param, setParam] = useState<{ analysisId: string } | null>(null);
  const [analysis, setAnalysis] = useState<HistoryAnalysis | null>(null);
  const [file, setFile] = useState<HistoryFile | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const { getAnalysisById } = useAnalysisHistory();

  useEffect(() => {
    params.then((p) => {
      setParam(p);
      const foundAnalysis = getAnalysisById(p.analysisId);
      setAnalysis(foundAnalysis || null);

      if (foundAnalysis) {
        const foundFile = mockHistoryFiles.find(
          (f) => f.id === foundAnalysis.fileId,
        );
        setFile(foundFile || null);
      }
    });
  }, [params, getAnalysisById]);

  if (!analysis) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <DetailContainer>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push(`/${locale}/history`)}
              style={{ marginBottom: '24px' }}
            >
              Voltar
            </Button>
            <Empty description="Análise não encontrada" />
          </DetailContainer>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const executedDate = new Date(analysis.executedAt).toLocaleString('pt-BR');
  const durationMs = analysis.duration;
  const durationSeconds = (durationMs / 1000).toFixed(2);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DetailContainer>
          <DetailHeader>
            <div style={{ flex: 1 }}>
              <BackButton onClick={() => router.push(`/${locale}/history`)}>
                <ArrowLeftOutlined />
                Voltar
              </BackButton>
              <DetailTitle style={{ marginTop: '16px' }}>
                {analysis.name}
              </DetailTitle>
            </div>
            <Tag color={analysis.status === 'completed' ? 'green' : 'red'}>
              {analysis.status === 'completed' ? 'Concluída' : 'Falhou'}
            </Tag>
          </DetailHeader>

          {/* Informações Gerais */}
          <DetailSection>
            <SectionTitle>📋 Informações Gerais</SectionTitle>
            <InfoGrid>
              <InfoCard>
                <dt>Tipo de Análise</dt>
                <dd>{analysis.type}</dd>
              </InfoCard>
              <InfoCard>
                <dt>Arquivo</dt>
                <dd>{analysis.fileName}</dd>
              </InfoCard>
              <InfoCard>
                <dt>Data de Execução</dt>
                <dd>{executedDate}</dd>
              </InfoCard>
              <InfoCard>
                <dt>Duração</dt>
                <dd>
                  {durationSeconds}s ({durationMs}ms)
                </dd>
              </InfoCard>
            </InfoGrid>
          </DetailSection>

          <Divider />

          {/* Informações do Arquivo */}
          {file && (
            <>
              <DetailSection>
                <SectionTitle>📁 Informações do Arquivo</SectionTitle>
                <InfoGrid>
                  <InfoCard>
                    <dt>Nome</dt>
                    <dd>{file.fileName}</dd>
                  </InfoCard>
                  <InfoCard>
                    <dt>Tamanho</dt>
                    <dd>{(file.fileSize / 1024).toFixed(2)} KB</dd>
                  </InfoCard>
                  <InfoCard>
                    <dt>Total de Linhas</dt>
                    <dd>{file.rowCount.toLocaleString()}</dd>
                  </InfoCard>
                  <InfoCard>
                    <dt>Total de Colunas</dt>
                    <dd>{file.columns.length}</dd>
                  </InfoCard>
                </InfoGrid>
                <ChartContainer style={{ marginTop: '16px' }}>
                  <strong>Colunas do Arquivo:</strong>
                  <div
                    style={{
                      marginTop: '12px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {file.columns.map((col) => (
                      <Tag key={col} color="blue">
                        {col}
                      </Tag>
                    ))}
                  </div>
                </ChartContainer>
              </DetailSection>

              <Divider />
            </>
          )}

          {/* Colunas Utilizadas */}
          <DetailSection>
            <SectionTitle>🎯 Colunas Utilizadas na Análise</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {analysis.selectedColumns.map((col) => (
                <Tag key={col} color="cyan">
                  {col}
                </Tag>
              ))}
            </div>
          </DetailSection>

          <Divider />

          {/* Resultados */}
          {analysis.status === 'completed' && analysis.results && (
            <>
              <DetailSection>
                <SectionTitle>📊 Resultados da Análise</SectionTitle>
                {renderAnalysisResults(analysis.type, analysis.results)}
              </DetailSection>

              <Divider />
            </>
          )}

          {/* Resumo */}
          <DetailSection>
            <SectionTitle>📈 Resumo</SectionTitle>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Status"
                    value={
                      analysis.status === 'completed'
                        ? '✅ Concluída'
                        : '❌ Falhou'
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Duração"
                    value={durationSeconds}
                    suffix="s"
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Colunas Usadas"
                    value={analysis.selectedColumns.length}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic
                    title="Linhas do Arquivo"
                    value={file?.rowCount || 0}
                  />
                </Card>
              </Col>
            </Row>
          </DetailSection>

          <Divider />

          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={() => router.push(`/${locale}/history`)}>
              Voltar ao Histórico
            </Button>
            <Button type="primary">Executar Novamente</Button>
          </Space>
        </DetailContainer>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

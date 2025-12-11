'use client';

import { DashboardLayout, ProtectedRoute } from '@/components';
import {
  BackButton,
  ChartContainer,
  DetailContainer,
  DetailHeader,
  DetailSection,
  DetailTitle,
  InfoCard,
  InfoGrid,
  JSONResultsContainer,
  ResultCard,
  ResultsGrid,
  SectionTitle,
} from '@/components/history/details-styled';
import { mockHistoryAnalyses, mockHistoryFiles } from '@/lib/data/mockHistory';
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

  useEffect(() => {
    params.then((p) => {
      setParam(p);
      const foundAnalysis = mockHistoryAnalyses.find(
        (a) => a.id === p.analysisId,
      );
      setAnalysis(foundAnalysis || null);

      if (foundAnalysis) {
        const foundFile = mockHistoryFiles.find(
          (f) => f.id === foundAnalysis.fileId,
        );
        setFile(foundFile || null);
      }
    });
  }, [params]);

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

  const renderResults = () => {
    if (!analysis.results) return null;

    switch (analysis.type) {
      case 'Estatística Descritiva':
        return (
          <ResultsGrid>
            {Object.entries(analysis.results).map(([key, value]) => (
              <ResultCard key={key}>
                <span className="label">{key}</span>
                <span className="value">
                  {typeof value === 'number'
                    ? (value as number).toFixed(2)
                    : String(value as any)}
                </span>
              </ResultCard>
            ))}
          </ResultsGrid>
        );

      case 'Teste de Hipótese':
        return (
          <ResultsGrid>
            <ResultCard
              className={analysis.results.significant ? 'success' : 'warning'}
            >
              <span className="label">T Statistic</span>
              <span className="value">
                {analysis.results.tStatistic?.toFixed(2)}
              </span>
            </ResultCard>
            <ResultCard
              className={analysis.results.pValue < 0.05 ? 'success' : 'warning'}
            >
              <span className="label">P-Value</span>
              <span className="value">
                {analysis.results.pValue?.toFixed(4)}
              </span>
            </ResultCard>
            <ResultCard
              className={analysis.results.significant ? 'success' : 'danger'}
            >
              <span className="label">Significante?</span>
              <span className="value">
                {analysis.results.significant ? 'Sim' : 'Não'}
              </span>
            </ResultCard>
          </ResultsGrid>
        );

      case 'Regressão Simples':
        return (
          <ResultsGrid>
            <ResultCard>
              <span className="label">R² (R-Squared)</span>
              <span className="value">
                {(analysis.results.rSquared * 100).toFixed(1)}%
              </span>
            </ResultCard>
            <ResultCard>
              <span className="label">Slope</span>
              <span className="value">
                {analysis.results.slope?.toFixed(4)}
              </span>
            </ResultCard>
            <ResultCard>
              <span className="label">Intercept</span>
              <span className="value">
                {analysis.results.intercept?.toFixed(2)}
              </span>
            </ResultCard>
          </ResultsGrid>
        );

      case 'Capacidade de Processo':
        return (
          <ResultsGrid>
            <ResultCard
              className={analysis.results.cp > 1.33 ? 'success' : 'warning'}
            >
              <span className="label">Cp</span>
              <span className="value">{analysis.results.cp?.toFixed(2)}</span>
            </ResultCard>
            <ResultCard
              className={analysis.results.cpk > 1.33 ? 'success' : 'warning'}
            >
              <span className="label">Cpk</span>
              <span className="value">{analysis.results.cpk?.toFixed(2)}</span>
            </ResultCard>
            <ResultCard
              className={analysis.results.pp > 1.33 ? 'success' : 'warning'}
            >
              <span className="label">Pp</span>
              <span className="value">{analysis.results.pp?.toFixed(2)}</span>
            </ResultCard>
            <ResultCard
              className={analysis.results.ppk > 1.33 ? 'success' : 'warning'}
            >
              <span className="label">Ppk</span>
              <span className="value">{analysis.results.ppk?.toFixed(2)}</span>
            </ResultCard>
          </ResultsGrid>
        );

      case 'Teste de Normalização':
        return (
          <ResultsGrid>
            <ResultCard>
              <span className="label">Teste</span>
              <span className="value" style={{ fontSize: '14px' }}>
                {analysis.results.testName}
              </span>
            </ResultCard>
            <ResultCard>
              <span className="label">Statistic</span>
              <span className="value">
                {analysis.results.statistic?.toFixed(4)}
              </span>
            </ResultCard>
            <ResultCard
              className={analysis.results.normal ? 'success' : 'warning'}
            >
              <span className="label">Normal?</span>
              <span className="value">
                {analysis.results.normal ? 'Sim' : 'Não'}
              </span>
            </ResultCard>
          </ResultsGrid>
        );

      default:
        return (
          <JSONResultsContainer>
            {JSON.stringify(analysis.results, null, 2)}
          </JSONResultsContainer>
        );
    }
  };

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
                {renderResults()}
                <ChartContainer style={{ marginTop: '24px' }}>
                  <strong>Dados Completos (JSON):</strong>
                  <JSONResultsContainer>
                    {JSON.stringify(analysis.results, null, 2)}
                  </JSONResultsContainer>
                </ChartContainer>
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

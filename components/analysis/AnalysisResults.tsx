'use client';

import { Card, Col, Modal, Row, Statistic } from 'antd';
import {
  AnalysisResultsProps,
  HypothesisTestResult,
  ProcessCapabilityResult,
  RegressionResult,
  VariabilityResult,
} from './analysisResults.interface';
import { ResultSection, StatCard } from './styled';

const AnalysisResults = ({
  visible,
  onClose,
  toolName,
  results,
}: AnalysisResultsProps) => {
  if (!results) return null;

  const renderVariabilityResults = () => {
    const resultsData = results as {
      results?: Record<string, VariabilityResult>;
    };
    const columns = Object.keys(resultsData.results || {});

    return (
      <div>
        {columns.map((col) => {
          const data = resultsData.results?.[col] as VariabilityResult;
          return (
            <ResultSection key={col}>
              <h3>{col}</h3>
              <Row gutter={16}>
                <Col span={6}>
                  <StatCard>
                    <Statistic title="Média" value={data.mean?.toFixed(2)} />
                  </StatCard>
                </Col>
                <Col span={6}>
                  <StatCard>
                    <Statistic
                      title="Desvio Padrão"
                      value={data.std?.toFixed(2)}
                    />
                  </StatCard>
                </Col>
                <Col span={6}>
                  <StatCard>
                    <Statistic
                      title="CV (%)"
                      value={data.cv?.toFixed(2)}
                      suffix="%"
                    />
                  </StatCard>
                </Col>
                <Col span={6}>
                  <StatCard>
                    <Statistic title="Range" value={data.range?.toFixed(2)} />
                  </StatCard>
                </Col>
              </Row>

              <Card title="Quartis" style={{ marginTop: 16 }}>
                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic title="Mínimo" value={data.min?.toFixed(2)} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="Q1" value={data.q1?.toFixed(2)} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="Mediana" value={data.q2?.toFixed(2)} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="Q3" value={data.q3?.toFixed(2)} />
                  </Col>
                </Row>
              </Card>
            </ResultSection>
          );
        })}
      </div>
    );
  };

  const renderProcessCapabilityResults = () => {
    const resultsData = results as {
      results?: Record<string, ProcessCapabilityResult>;
    };
    const data = resultsData.results?.['main'] as
      | ProcessCapabilityResult
      | undefined;

    if (!data) return null;
    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <StatCard>
              <Statistic
                title="Cp"
                value={data.cp?.toFixed(3)}
                valueStyle={{
                  color: (data.cp ?? 0) >= 1.33 ? '#3f8600' : '#cf1322',
                }}
              />
            </StatCard>
          </Col>
          <Col span={6}>
            <StatCard>
              <Statistic
                title="Cpk"
                value={data.cpk?.toFixed(3)}
                valueStyle={{
                  color: (data.cpk ?? 0) >= 1.33 ? '#3f8600' : '#cf1322',
                }}
              />
            </StatCard>
          </Col>
          <Col span={6}>
            <StatCard>
              <Statistic
                title="Pp"
                value={data.pp?.toFixed(3)}
                valueStyle={{
                  color: (data.pp ?? 0) >= 1.33 ? '#3f8600' : '#cf1322',
                }}
              />
            </StatCard>
          </Col>
          <Col span={6}>
            <StatCard>
              <Statistic
                title="Ppk"
                value={data.ppk?.toFixed(3)}
                valueStyle={{
                  color: (data.ppk ?? 0) >= 1.33 ? '#3f8600' : '#cf1322',
                }}
              />
            </StatCard>
          </Col>
        </Row>

        <Card title="Informações do Processo" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="Média do Processo"
                value={data.mean?.toFixed(3)}
              />
            </Col>
            <Col span={8}>
              <Statistic title="Desvio Padrão" value={data.std?.toFixed(3)} />
            </Col>
            <Col span={8}>
              <Statistic
                title="% Dentro da Especificação"
                value={data.within_spec?.toFixed(2)}
                suffix="%"
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  };

  const renderHypothesisTestResults = () => {
    const data = results as HypothesisTestResult | null;

    if (!data) return null;

    return (
      <div>
        <Card title="Resultados do Teste">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Estatística do Teste"
                value={data.statistic?.toFixed(4)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="P-valor"
                value={data.pvalue?.toFixed(4)}
                valueStyle={{
                  color:
                    (data.pvalue ?? 1) < (data.alpha ?? 0.05)
                      ? '#cf1322'
                      : '#3f8600',
                }}
              />
            </Col>
          </Row>

          <Card
            style={{
              marginTop: 16,
              background: data.reject_null ? '#fff2e8' : '#f6ffed',
            }}
          >
            <h3>Conclusão:</h3>
            <p style={{ fontSize: 16, margin: 0 }}>{data.conclusion}</p>
            {data.confidence_interval && (
              <p style={{ marginTop: 8 }}>
                Intervalo de Confiança: [
                {data.confidence_interval[0].toFixed(2)},{' '}
                {data.confidence_interval[1].toFixed(2)}]
              </p>
            )}
          </Card>
        </Card>
      </div>
    );
  };

  const renderRegressionResults = () => {
    const data = results as RegressionResult | null;

    if (!data) return null;

    return (
      <div>
        <Card title="Equação da Regressão">
          <h2 style={{ textAlign: 'center', color: '#1890ff' }}>
            {data.equation}
          </h2>
        </Card>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={8}>
            <StatCard>
              <Statistic
                title="R²"
                value={data.r_squared?.toFixed(4)}
                valueStyle={{
                  color: (data.r_squared ?? 0) >= 0.7 ? '#3f8600' : '#faad14',
                }}
              />
            </StatCard>
          </Col>
          <Col span={8}>
            <StatCard>
              <Statistic title="Inclinação" value={data.slope?.toFixed(4)} />
            </StatCard>
          </Col>
          <Col span={8}>
            <StatCard>
              <Statistic
                title="Intercepto"
                value={data.intercept?.toFixed(4)}
              />
            </StatCard>
          </Col>
        </Row>

        <Card title="Significância" style={{ marginTop: 16 }}>
          <Statistic
            title="P-valor"
            value={data.p_value?.toFixed(6)}
            valueStyle={{
              color: (data.p_value ?? 1) < 0.05 ? '#3f8600' : '#cf1322',
            }}
          />
          <p style={{ marginTop: 8 }}>
            {(data.p_value ?? 1) < 0.05
              ? 'A regressão é estatisticamente significativa'
              : 'A regressão não é estatisticamente significativa'}
          </p>
        </Card>
      </div>
    );
  };

  const renderDefaultResults = () => {
    return (
      <div>
        <pre
          style={{
            background: '#f5f5f5',
            padding: 16,
            borderRadius: 4,
            overflow: 'auto',
          }}
        >
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    );
  };

  const renderContent = () => {
    switch (toolName.toLowerCase()) {
      case 'variability':
        return renderVariabilityResults();
      case 'process-capability':
      case 'capacidade de processo':
        return renderProcessCapabilityResults();
      case 'hypothesis-test':
      case 'teste de hipótese':
        return renderHypothesisTestResults();
      case 'simple-regression':
      case 'multiple-regression':
      case 'regressão simples':
      case 'regressão múltipla':
        return renderRegressionResults();
      default:
        return renderDefaultResults();
    }
  };

  return (
    <Modal
      title={`Resultados: ${toolName}`}
      open={visible}
      onCancel={onClose}
      width={900}
      footer={null}
    >
      {renderContent()}
    </Modal>
  );
};

export default AnalysisResults;

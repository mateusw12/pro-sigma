'use client';

import { SimpleRegressionResult } from '@/components/analysis/simple-regression';
import { ProtectedRoute } from '@/components/auth';
import { DashboardLayout } from '@/components/layout';
import { MOCK_SIMPLE_REGRESSION } from '@/lib/backend-mock/simple-regression';
import { MOCK_STATISTIC_DESCRIPTIVE } from '@/lib/backend-mock/statistic-descriptive';
import { PlanType } from '@/types/plan';
import {
  DeleteOutlined,
  FileExcelOutlined,
  FundOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Select, Table, Tag, Upload } from 'antd';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  DataPreview,
  FileInfo,
  PageContainer,
  Subtitle,
  Title,
  ToolCard,
  ToolsGrid,
  UploadSection,
} from './styles';
import { getTools } from './tools.helper';

interface FileData {
  id: string;
  name: string;
  columns: string[];
  preview: Record<string, unknown>[];
  uploadedAt: Date;
}

interface AnalysisResult {
  tool: string;
  data: typeof MOCK_STATISTIC_DESCRIPTIVE;
  timestamp: Date;
}

const WorkspacePage = () => {
  const { data: session } = useSession();
  const t = useTranslations('workspace');
  const tTools = useTranslations('tools');
  const tCommon = useTranslations('common');
  const [uploadedFile, setUploadedFile] = useState<FileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );

  const userPlan = (session?.user?.plan as PlanType) || PlanType.BASICO;
  const isAdmin = session?.user?.isAdmin;

  const tools = getTools(tTools);

  // Filtrar ferramentas baseado no plano do usuário
  const getAvailableTools = () => {
    if (isAdmin) return tools; // Admin tem acesso a tudo

    const planHierarchy: { [key in PlanType]: string[] } = {
      basico: [PlanType.BASICO],
      intermediario: [PlanType.BASICO, PlanType.INTERMEDIARIO],
      pro: [PlanType.BASICO, PlanType.INTERMEDIARIO, PlanType.PRO],
      admin: [PlanType.BASICO, PlanType.INTERMEDIARIO, PlanType.PRO],
    };

    const allowedPlans = planHierarchy[userPlan] || PlanType.BASICO;
    return tools.filter((tool) => allowedPlans.includes(tool.plan));
  };

  const availableTools = getAvailableTools();

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Usar a rota da API Next.js ao invés de chamar o backend diretamente
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao fazer upload');
      }

      const data = await response.json();

      const fileData: FileData = {
        id: data.id,
        name: file.name,
        columns: data.columns,
        preview: data.preview,
        uploadedAt: new Date(),
      };

      setUploadedFile(fileData);
      message.success(t('fileUploaded'));
    } catch (error) {
      console.error('Erro no upload:', error);
      message.error(error instanceof Error ? error.message : t('uploadError'));
    } finally {
      setLoading(false);
    }

    return false;
  };

  const handleToolClick = (toolKey: string) => {
    // if (!uploadedFile) {
    //   message.warning(t('uploadFileFirst'));
    //   return;
    // }
    if (toolKey === 'descriptive-stats') {
      const allColumns = Object.keys(MOCK_STATISTIC_DESCRIPTIVE.result);
      setSelectedColumns(allColumns);
    } else {
      setSelectedColumns([]);
    }

    setSelectedTool(toolKey);
    setIsModalVisible(true);
  };

  const handleAnalyze = async () => {
    if (selectedColumns.length === 0) {
      message.warning(t('selectColumns'));
      return;
    }

    setLoading(true);
    try {
      // const response = await fetch(`/api/analyze/${selectedTool}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     fileId: uploadedFile?.id,
      //     columns: selectedColumns,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error('Erro na análise');
      // }

      const data = MOCK_STATISTIC_DESCRIPTIVE; //await response.json();

      message.success(t('analysisComplete'));

      // Salvar resultado da análise
      setAnalysisResult({
        tool: selectedTool || '',
        data: data,
        timestamp: new Date(),
      });

      console.log('Resultados:', data);
      setIsModalVisible(false);
    } catch (err) {
      console.error('Erro na análise:', err);
      message.error(t('analysisError'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    message.info(t('fileRemoved'));
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basico':
        return 'green';
      case 'intermediario':
        return 'blue';
      case 'pro':
        return 'gold';
      default:
        return 'default';
    }
  };

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'basico':
        return 'Básico';
      case 'intermediario':
        return 'Intermediário';
      case 'pro':
        return 'Pro';
      default:
        return '';
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageContainer>
          <Title>
            <FundOutlined /> {t('title')}
          </Title>
          <Subtitle>{t('subtitle')}</Subtitle>

          <UploadSection>
            <Upload.Dragger
              name="file"
              accept=".csv,.xlsx,.xls"
              beforeUpload={handleUpload}
              showUploadList={false}
              disabled={loading}
            >
              <p className="ant-upload-drag-icon">
                <FileExcelOutlined style={{ fontSize: 48, color: '#1890ff' }} />
              </p>
              <p className="ant-upload-text">{t('uploadArea')}</p>
              <p className="ant-upload-hint">{t('uploadHint')}</p>
            </Upload.Dragger>

            {uploadedFile && (
              <FileInfo>
                <div>
                  <strong>{uploadedFile.name}</strong>
                  <div style={{ marginTop: 8 }}>
                    <Tag color="blue">
                      {uploadedFile.columns.length} {t('columns')}
                    </Tag>
                    <Tag color="green">
                      {uploadedFile.preview.length} {t('rows')}
                    </Tag>
                  </div>
                </div>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteFile}
                >
                  {t('remove')}
                </Button>
              </FileInfo>
            )}
          </UploadSection>

          {uploadedFile && (
            <DataPreview title={t('dataPreview')}>
              <Table
                dataSource={uploadedFile.preview}
                columns={uploadedFile.columns.map((col) => ({
                  title: col,
                  dataIndex: col,
                  key: col,
                }))}
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
              />
            </DataPreview>
          )}

          <h2 style={{ marginTop: 24, marginBottom: 16, fontSize: 20 }}>
            {t('analysisTools')}
            <Tag color="blue" style={{ marginLeft: 8 }}>
              {availableTools.length} {t('available')}{' '}
              {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}
            </Tag>
          </h2>

          <ToolsGrid>
            {availableTools.map((tool) => (
              <ToolCard
                key={tool.key}
                title={
                  <span>
                    {tool.icon} {tool.name}
                  </span>
                }
                extra={
                  <Tag color={getPlanColor(tool.plan)}>
                    {getPlanLabel(tool.plan)}
                  </Tag>
                }
                onClick={() => handleToolClick(tool.key)}
              >
                <p style={{ color: '#666', margin: 0 }}>{tool.description}</p>
              </ToolCard>
            ))}
          </ToolsGrid>

          {/* Exemplo: Regressão Simples */}
          <div style={{ marginTop: 32 }}>
            <h2 style={{ marginBottom: 16, fontSize: 20 }}>
              Exemplo: Regressão Linear Simples
            </h2>
            <SimpleRegressionResult data={MOCK_SIMPLE_REGRESSION} />
          </div>

          <Modal
            title={`${t('analysis')}: ${availableTools.find((t) => t.key === selectedTool)?.name}`}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={handleAnalyze}
            confirmLoading={loading}
            okText={t('executeAnalysis')}
            cancelText={tCommon('cancel')}
            width={600}
          >
            <div style={{ marginBottom: 16 }}>
              <strong>{t('file')}:</strong> {uploadedFile?.name}
            </div>

            <div>
              <strong>{t('selectColumnsForAnalysis')}</strong>
              <Select
                mode="multiple"
                style={{ width: '100%', marginTop: 8 }}
                placeholder={t('selectOneOrMore')}
                value={selectedColumns}
                onChange={setSelectedColumns}
                options={uploadedFile?.columns.map((col) => ({
                  label: col,
                  value: col,
                }))}
              />
            </div>

            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: '#f0f2f5',
                borderRadius: 4,
              }}
            >
              <small>
                <strong>{t('tip')}:</strong> {t('tipMessage')}
              </small>
            </div>
          </Modal>
        </PageContainer>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default WorkspacePage;

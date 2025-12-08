'use client';

import { ProtectedRoute } from '@/components/auth';
import { DashboardLayout } from '@/components/layout';
import api from '@/lib/api/axios';
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

interface FileData {
  id: string;
  name: string;
  columns: string[];
  preview: any[];
  uploadedAt: Date;
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

  const userPlan = (session?.user?.plan as PlanType) || 'basico';
  const isAdmin = session?.user?.isAdmin;

  const tools = [
    { key: 'variability', name: tTools('variability'), icon: '📊', plan: 'basico', description: tTools('variabilityDesc') },
    { key: 'process-capability', name: tTools('processCapability'), icon: '🎯', plan: 'basico', description: tTools('processCapabilityDesc') },
    { key: 'hypothesis-test', name: tTools('hypothesisTest'), icon: '🔬', plan: 'basico', description: tTools('hypothesisTestDesc') },
    { key: 'distribution-test', name: tTools('distributionTest'), icon: '📈', plan: 'basico', description: tTools('distributionTestDesc') },
    { key: 'descriptive-stats', name: tTools('descriptiveStats'), icon: '📋', plan: 'basico', description: tTools('descriptiveStatsDesc') },
    { key: 'cov-ems', name: tTools('covEms'), icon: '⚡', plan: 'basico', description: tTools('covEmsDesc') },
    { key: 'control-charts', name: tTools('controlCharts'), icon: '📉', plan: 'intermediario', description: tTools('controlChartsDesc') },
    { key: 'normalization-test', name: tTools('normalizationTest'), icon: '🔔', plan: 'intermediario', description: tTools('normalizationTestDesc') },
    { key: 'text-analysis', name: tTools('textAnalysis'), icon: '📝', plan: 'intermediario', description: tTools('textAnalysisDesc') },
    { key: 'monte-carlo', name: tTools('monteCarlo'), icon: '🎲', plan: 'intermediario', description: tTools('monteCarloDesc') },
    { key: 'simple-regression', name: tTools('simpleRegression'), icon: '📐', plan: 'pro', description: tTools('simpleRegressionDesc') },
    { key: 'multiple-regression', name: tTools('multipleRegression'), icon: '📊', plan: 'pro', description: tTools('multipleRegressionDesc') },
    { key: 'multivariate', name: tTools('multivariate'), icon: '🔀', plan: 'pro', description: tTools('multivariateDesc') },
    { key: 'doe', name: tTools('doe'), icon: '🧪', plan: 'pro', description: tTools('doeDesc') },
    { key: 'stackup', name: tTools('stackup'), icon: '📏', plan: 'pro', description: tTools('stackupDesc') },
    { key: 'space-filling', name: tTools('spaceFilling'), icon: '🎯', plan: 'pro', description: tTools('spaceFillingDesc') },
    { key: 'warranty-costs', name: tTools('warrantyCosts'), icon: '💰', plan: 'pro', description: tTools('warrantyCostsDesc') },
  ];

  // Filtrar ferramentas baseado no plano do usuário
  const getAvailableTools = () => {
    if (isAdmin) return tools; // Admin tem acesso a tudo

    const planHierarchy: { [key in PlanType]: string[] } = {
      basico: ['basico'],
      intermediario: ['basico', 'intermediario'],
      pro: ['basico', 'intermediario', 'pro'],
      admin: ['basico', 'intermediario', 'pro'],
    };

    const allowedPlans = planHierarchy[userPlan] || ['basico'];
    return tools.filter(tool => allowedPlans.includes(tool.plan));
  };

  const isToolLocked = (toolPlan: string) => {
    if (isAdmin) return false;

    const planOrder: { [key: string]: number } = {
      basico: 1,
      intermediario: 2,
      pro: 3,
    };

    const userPlanLevel = planOrder[userPlan] || 1;
    const toolPlanLevel = planOrder[toolPlan] || 1;

    return toolPlanLevel > userPlanLevel;
  };

  const availableTools = getAvailableTools();

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileData: FileData = {
        id: response.data.id,
        name: file.name,
        columns: response.data.columns,
        preview: response.data.preview,
        uploadedAt: new Date(),
      };

      setUploadedFile(fileData);
      message.success(t('fileUploaded'));
    } catch (error) {
      message.error(t('uploadError'));
    } finally {
      setLoading(false);
    }

    return false;
  };

  const handleToolClick = (toolKey: string) => {
    if (!uploadedFile) {
      message.warning(t('uploadFileFirst'));
      return;
    }

    setSelectedTool(toolKey);
    setSelectedColumns([]);
    setIsModalVisible(true);
  };

  const handleAnalyze = async () => {
    if (selectedColumns.length === 0) {
      message.warning(t('selectColumns'));
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/api/analyze/${selectedTool}`, {
        fileId: uploadedFile?.id,
        columns: selectedColumns,
      });

      message.success(t('analysisComplete'));
      // Aqui você pode exibir os resultados em um modal ou nova página
      console.log('Resultados:', response.data);
      setIsModalVisible(false);
    } catch (error) {
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
      case 'basico': return 'green';
      case 'intermediario': return 'blue';
      case 'pro': return 'gold';
      default: return 'default';
    }
  };

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'basico': return 'Básico';
      case 'intermediario': return 'Intermediário';
      case 'pro': return 'Pro';
      default: return '';
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageContainer>
          <Title>
            <FundOutlined /> {t('title')}
          </Title>
          <Subtitle>
            {t('subtitle')}
          </Subtitle>

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
              <p className="ant-upload-text">
                {t('uploadArea')}
              </p>
              <p className="ant-upload-hint">
                {t('uploadHint')}
              </p>
            </Upload.Dragger>

            {uploadedFile && (
              <FileInfo>
                <div>
                  <strong>{uploadedFile.name}</strong>
                  <div style={{ marginTop: 8 }}>
                    <Tag color="blue">{uploadedFile.columns.length} {t('columns')}</Tag>
                    <Tag color="green">{uploadedFile.preview.length} {t('rows')}</Tag>
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
                columns={uploadedFile.columns.map(col => ({
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
              {availableTools.length} {t('available')} {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}
            </Tag>
          </h2>

          <ToolsGrid>
            {availableTools.map(tool => (
              <ToolCard
                key={tool.key}
                title={
                  <span>
                    {tool.icon} {tool.name}
                  </span>
                }
                extra={<Tag color={getPlanColor(tool.plan)}>{getPlanLabel(tool.plan)}</Tag>}
                onClick={() => handleToolClick(tool.key)}
              >
                <p style={{ color: '#666', margin: 0 }}>{tool.description}</p>
              </ToolCard>
            ))}
          </ToolsGrid>

          <Modal
            title={`${t('analysis')}: ${availableTools.find(t => t.key === selectedTool)?.name}`}
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
                options={uploadedFile?.columns.map(col => ({
                  label: col,
                  value: col,
                }))}
              />
            </div>

            <div style={{ marginTop: 16, padding: 12, background: '#f0f2f5', borderRadius: 4 }}>
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

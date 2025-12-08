import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getServerSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Obter o FormData da requisição
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 },
      );
    }

    // Validar tipo de arquivo
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não suportado. Use CSV ou Excel.' },
        { status: 400 },
      );
    }

    // Criar FormData para enviar ao backend
    const backendFormData = new FormData();
    backendFormData.append('file', file);

    // Adicionar informações do usuário
    backendFormData.append('userId', session.user.email || '');
    backendFormData.append('userName', session.user.name || '');
    backendFormData.append('userPlan', session.user.plan || 'basico');

    if (session.user.role !== undefined) {
      backendFormData.append('userRole', String(session.user.role));
    } // Enviar para o backend
    const response = await fetch(`${BACKEND_URL}/api/files/upload`, {
      method: 'POST',
      body: backendFormData,
      // Não definir Content-Type, o fetch vai definir automaticamente com boundary
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: 'Erro ao processar arquivo no backend',
          details: errorData,
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      id: data.id || data.file_id,
      columns: data.columns || [],
      preview: data.preview || [],
      rowCount: data.row_count || data.rows || 0,
      fileName: file.name,
      fileSize: file.size,
      uploadedBy: session.user.email,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      {
        error: 'Erro interno no servidor',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 },
    );
  }
}

// Configuração para aceitar arquivos maiores
export const config = {
  api: {
    bodyParser: false,
  },
};

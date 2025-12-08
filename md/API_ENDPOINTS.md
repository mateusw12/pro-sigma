# Backend API - Estrutura de Endpoints

## 📁 Upload e Gerenciamento de Arquivos

### POST /api/files/upload
Upload de arquivo CSV ou Excel

**Request:**
```typescript
FormData {
  file: File (CSV ou Excel)
}
```

**Response:**
```json
{
  "id": "uuid-do-arquivo",
  "name": "dados.xlsx",
  "columns": ["Coluna1", "Coluna2", "Coluna3"],
  "preview": [
    { "Coluna1": 10, "Coluna2": 20, "Coluna3": 30 },
    { "Coluna1": 15, "Coluna2": 25, "Coluna3": 35 }
  ],
  "rows": 1000,
  "uploadedAt": "2025-12-05T10:00:00Z"
}
```

**Implementação Python (FastAPI):**
```python
from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
import uuid
from datetime import datetime

app = FastAPI()

# Armazenamento em memória (substituir por banco de dados)
uploaded_files = {}

@app.post("/api/files/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Verificar extensão
        if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
            raise HTTPException(status_code=400, detail="Formato não suportado")
        
        # Ler arquivo
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file.file)
        else:
            df = pd.read_excel(file.file)
        
        # Gerar ID único
        file_id = str(uuid.uuid4())
        
        # Salvar dados
        uploaded_files[file_id] = {
            'dataframe': df,
            'name': file.filename,
            'uploadedAt': datetime.now()
        }
        
        # Preparar resposta
        return {
            "id": file_id,
            "name": file.filename,
            "columns": df.columns.tolist(),
            "preview": df.head(10).to_dict('records'),
            "rows": len(df),
            "uploadedAt": datetime.now().isoformat()
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### GET /api/files/{file_id}
Obter informações do arquivo

**Response:**
```json
{
  "id": "uuid",
  "name": "dados.xlsx",
  "columns": ["Col1", "Col2"],
  "rows": 1000
}
```

### DELETE /api/files/{file_id}
Deletar arquivo

---

## 🔬 Análises Estatísticas

### POST /api/analyze/variability
Análise de variabilidade

**Request:**
```json
{
  "fileId": "uuid-do-arquivo",
  "columns": ["Coluna1", "Coluna2"]
}
```

**Response:**
```json
{
  "results": {
    "Coluna1": {
      "mean": 10.5,
      "std": 2.3,
      "variance": 5.29,
      "cv": 21.9,
      "min": 5.0,
      "max": 15.0,
      "range": 10.0,
      "q1": 8.0,
      "q2": 10.5,
      "q3": 13.0,
      "iqr": 5.0
    }
  },
  "charts": {
    "boxplot": "base64_image_data",
    "histogram": "base64_image_data"
  }
}
```

**Implementação:**
```python
@app.post("/api/analyze/variability")
async def analyze_variability(request: dict):
    file_id = request['fileId']
    columns = request['columns']
    
    if file_id not in uploaded_files:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")
    
    df = uploaded_files[file_id]['dataframe']
    results = {}
    
    for col in columns:
        if col not in df.columns:
            continue
            
        data = df[col].dropna()
        
        results[col] = {
            "mean": float(data.mean()),
            "std": float(data.std()),
            "variance": float(data.var()),
            "cv": float(data.std() / data.mean() * 100) if data.mean() != 0 else 0,
            "min": float(data.min()),
            "max": float(data.max()),
            "range": float(data.max() - data.min()),
            "q1": float(data.quantile(0.25)),
            "q2": float(data.quantile(0.50)),
            "q3": float(data.quantile(0.75)),
            "iqr": float(data.quantile(0.75) - data.quantile(0.25))
        }
    
    return {"results": results}
```

### POST /api/analyze/process-capability
Índices de Capacidade de Processo

**Request:**
```json
{
  "fileId": "uuid",
  "columns": ["Medida"],
  "usl": 100,
  "lsl": 80,
  "target": 90
}
```

**Response:**
```json
{
  "results": {
    "cp": 1.33,
    "cpk": 1.25,
    "cpu": 1.30,
    "cpl": 1.25,
    "pp": 1.28,
    "ppk": 1.20,
    "mean": 89.5,
    "std": 2.5,
    "within_spec": 99.8
  }
}
```

### POST /api/analyze/hypothesis-test
Teste de Hipótese

**Request:**
```json
{
  "fileId": "uuid",
  "columns": ["Grupo1", "Grupo2"],
  "testType": "t-test",
  "alpha": 0.05,
  "alternative": "two-sided"
}
```

**Response:**
```json
{
  "test": "t-test",
  "statistic": 2.45,
  "pvalue": 0.018,
  "alpha": 0.05,
  "reject_null": true,
  "conclusion": "Há diferença significativa entre os grupos",
  "confidence_interval": [0.5, 3.2]
}
```

### POST /api/analyze/control-chart
Cartas de Controle

**Request:**
```json
{
  "fileId": "uuid",
  "columns": ["Medida"],
  "chartType": "xbar-r",
  "subgroupSize": 5
}
```

**Response:**
```json
{
  "centerLine": 50.0,
  "ucl": 55.0,
  "lcl": 45.0,
  "points": [49, 51, 50, 52, 48],
  "outOfControl": [3, 7],
  "rules": {
    "rule1": "1 ponto além dos limites",
    "rule2": "9 pontos consecutivos de um lado"
  }
}
```

### POST /api/analyze/regression
Regressão

**Request:**
```json
{
  "fileId": "uuid",
  "xColumn": "Temperatura",
  "yColumn": "Rendimento",
  "type": "simple"
}
```

**Response:**
```json
{
  "slope": 1.5,
  "intercept": 10.2,
  "r_squared": 0.85,
  "p_value": 0.001,
  "equation": "y = 1.5x + 10.2",
  "predictions": [15.2, 16.7, 18.2],
  "residuals": [0.5, -0.3, 0.2]
}
```

### POST /api/analyze/monte-carlo
Simulação Monte Carlo

**Request:**
```json
{
  "fileId": "uuid",
  "columns": ["Variavel1", "Variavel2"],
  "iterations": 10000,
  "distributions": {
    "Variavel1": {"type": "normal", "mean": 100, "std": 10},
    "Variavel2": {"type": "uniform", "min": 50, "max": 150}
  },
  "formula": "Variavel1 + Variavel2"
}
```

**Response:**
```json
{
  "mean": 175.5,
  "std": 15.2,
  "percentiles": {
    "5": 150.2,
    "50": 175.5,
    "95": 200.8
  },
  "histogram": "base64_data"
}
```

### POST /api/analyze/doe
Design of Experiments

**Request:**
```json
{
  "factors": [
    {"name": "Temperatura", "low": 150, "high": 200},
    {"name": "Pressão", "low": 10, "high": 20}
  ],
  "design": "factorial",
  "replications": 3
}
```

**Response:**
```json
{
  "design_matrix": [
    {"run": 1, "Temperatura": 150, "Pressão": 10},
    {"run": 2, "Temperatura": 200, "Pressão": 10},
    {"run": 3, "Temperatura": 150, "Pressão": 20},
    {"run": 4, "Temperatura": 200, "Pressão": 20}
  ],
  "total_runs": 12
}
```

---

## 💾 Banco de Dados

### Modelo: File
```python
from sqlalchemy import Column, String, DateTime, Integer, JSON
from database import Base

class File(Base):
    __tablename__ = "files"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    name = Column(String)
    path = Column(String)  # Caminho no storage
    columns = Column(JSON)
    rows = Column(Integer)
    uploaded_at = Column(DateTime)
```

### Modelo: Analysis
```python
class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(String, primary_key=True)
    file_id = Column(String, ForeignKey("files.id"))
    user_id = Column(String, ForeignKey("users.id"))
    tool = Column(String)  # 'variability', 'regression', etc
    columns_used = Column(JSON)
    parameters = Column(JSON)
    results = Column(JSON)
    created_at = Column(DateTime)
```

---

## 🔒 Autenticação

Todos os endpoints requerem autenticação via JWT:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    # Verificar JWT
    # Retornar user_id
    return user_id
```

---

## 📊 Storage de Arquivos

Opções:
1. **Local Storage** (desenvolvimento)
2. **AWS S3** (produção)
3. **Azure Blob Storage**
4. **Google Cloud Storage**

```python
import boto3

s3 = boto3.client('s3')

def upload_to_s3(file, filename):
    s3.upload_fileobj(file, 'bucket-name', filename)
    return f"s3://bucket-name/{filename}"
```

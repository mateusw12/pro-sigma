# Guia de Integração Backend Python

Este documento descreve como integrar o frontend Next.js com o backend Python.

## 🐍 Backend Python - Estrutura Sugerida

```python
# main.py (FastAPI)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
from scipy import stats

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class VariabilityRequest(BaseModel):
    data: list[float]

class HypothesisTestRequest(BaseModel):
    data1: list[float]
    data2: list[float] | None = None
    test_type: str  # 't-test', 'z-test', 'anova', 'chi-square'
    alpha: float = 0.05

# Endpoints
@app.post("/api/analyze/variability")
async def analyze_variability(request: VariabilityRequest):
    data = np.array(request.data)

    return {
        "mean": float(np.mean(data)),
        "std": float(np.std(data)),
        "variance": float(np.var(data)),
        "cv": float(np.std(data) / np.mean(data) * 100),
        "min": float(np.min(data)),
        "max": float(np.max(data)),
        "range": float(np.ptp(data))
    }

@app.post("/api/analyze/hypothesis-test")
async def hypothesis_test(request: HypothesisTestRequest):
    if request.test_type == "t-test":
        if request.data2:
            statistic, pvalue = stats.ttest_ind(request.data1, request.data2)
        else:
            statistic, pvalue = stats.ttest_1samp(request.data1, 0)

    return {
        "statistic": float(statistic),
        "pvalue": float(pvalue),
        "reject_null": pvalue < request.alpha,
        "conclusion": "Rejeitar H0" if pvalue < request.alpha else "Não rejeitar H0"
    }

@app.post("/api/analyze/process-capability")
async def process_capability(request: dict):
    data = np.array(request["data"])
    usl = request["usl"]
    lsl = request["lsl"]
    target = request.get("target", (usl + lsl) / 2)

    mean = np.mean(data)
    std = np.std(data, ddof=1)

    cp = (usl - lsl) / (6 * std)
    cpu = (usl - mean) / (3 * std)
    cpl = (mean - lsl) / (3 * std)
    cpk = min(cpu, cpl)

    return {
        "cp": float(cp),
        "cpk": float(cpk),
        "cpu": float(cpu),
        "cpl": float(cpl),
        "mean": float(mean),
        "std": float(std)
    }

@app.post("/api/analyze/control-chart")
async def control_chart(request: dict):
    data = np.array(request["data"])
    chart_type = request["chart_type"]

    if chart_type == "xbar-r":
        # Implementar lógica X-bar e R
        cl = np.mean(data)
        ucl = cl + 3 * np.std(data)
        lcl = cl - 3 * np.std(data)

    return {
        "center_line": float(cl),
        "ucl": float(ucl),
        "lcl": float(lcl),
        "points": data.tolist()
    }

@app.post("/api/analyze/normalization-test")
async def normalization_test(request: dict):
    data = np.array(request["data"])
    test = request["test"]

    if test == "shapiro-wilk":
        statistic, pvalue = stats.shapiro(data)
    elif test == "kolmogorov-smirnov":
        statistic, pvalue = stats.kstest(data, 'norm')
    elif test == "anderson-darling":
        result = stats.anderson(data)
        statistic = result.statistic
        pvalue = None  # Anderson-Darling não retorna p-value direto

    return {
        "statistic": float(statistic),
        "pvalue": float(pvalue) if pvalue else None,
        "is_normal": pvalue > 0.05 if pvalue else None
    }

@app.post("/api/analyze/monte-carlo")
async def monte_carlo(request: dict):
    iterations = request["iterations"]
    distributions = request["distributions"]

    # Implementar simulação Monte Carlo
    results = []
    for _ in range(iterations):
        sample = np.random.normal(0, 1, 1000)
        results.append(sample)

    return {
        "results": np.array(results).tolist(),
        "statistics": {
            "mean": float(np.mean(results)),
            "std": float(np.std(results))
        }
    }

@app.post("/api/analyze/regression")
async def regression(request: dict):
    x = np.array(request["x"])
    y = np.array(request["y"])

    slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)

    return {
        "slope": float(slope),
        "intercept": float(intercept),
        "r_squared": float(r_value ** 2),
        "p_value": float(p_value),
        "std_err": float(std_err)
    }

# Autenticação
from passlib.context import CryptContext
from jose import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    email: str
    password: str
    name: str
    plan: str

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/api/auth/register")
async def register(user: UserCreate):
    # Implementar lógica de registro
    # Salvar no banco de dados
    return {"message": "Usuário criado com sucesso"}

@app.post("/api/auth/login")
async def login(credentials: UserLogin):
    # Verificar credenciais no banco de dados
    # Retornar token JWT
    return {
        "user": {
            "id": "123",
            "email": credentials.email,
            "plan": "basico"
        },
        "token": "jwt-token-here"
    }
```

## 📦 Dependências Python

```bash
pip install fastapi uvicorn numpy pandas scipy matplotlib seaborn scikit-learn passlib python-jose python-multipart
```

## 🚀 Executar Backend

```bash
uvicorn main:app --reload --port 8000
```

## 🔌 Integração Frontend

### Exemplo: Análise de Variabilidade

```typescript
// app/tools/variability/page.tsx
import { useState } from 'react';
import api from '@/lib/api/axios';

const VariabilityPage = () => {
  const [data, setData] = useState<number[]>([]);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    try {
      const response = await api.post('/api/analyze/variability', {
        data: data
      });
      setResults(response.data);
    } catch (error) {
      console.error('Erro na análise:', error);
    }
  };

  return (
    <div>
      {/* UI components */}
      {results && (
        <div>
          <p>Média: {results.mean}</p>
          <p>Desvio Padrão: {results.std}</p>
          <p>CV: {results.cv}%</p>
        </div>
      )}
    </div>
  );
};
```

### Exemplo: Teste de Hipótese

```typescript
const handleHypothesisTest = async () => {
  try {
    const response = await api.post('/api/analyze/hypothesis-test', {
      data1: sample1,
      data2: sample2,
      test_type: 't-test',
      alpha: 0.05,
    });

    console.log('P-value:', response.data.pvalue);
    console.log('Conclusão:', response.data.conclusion);
  } catch (error) {
    message.error('Erro ao executar teste');
  }
};
```

### Exemplo: Regressão

```typescript
const handleRegression = async () => {
  try {
    const response = await api.post('/api/analyze/regression', {
      x: xData,
      y: yData,
    });

    console.log('R²:', response.data.r_squared);
    console.log(
      'Equação: y =',
      response.data.slope,
      '* x +',
      response.data.intercept,
    );
  } catch (error) {
    message.error('Erro na regressão');
  }
};
```

## 📊 Exemplo com Chart.js

```typescript
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ControlChartComponent = ({ data, ucl, lcl, cl }) => {
  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Valores',
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'UCL',
        data: Array(data.length).fill(ucl),
        borderColor: 'red',
        borderDash: [5, 5],
      },
      {
        label: 'CL',
        data: Array(data.length).fill(cl),
        borderColor: 'green',
      },
      {
        label: 'LCL',
        data: Array(data.length).fill(lcl),
        borderColor: 'red',
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Carta de Controle',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
```

## 🗄️ Banco de Dados (Sugestão)

```python
# models.py
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String)
    plan = Column(String)
    created_at = Column(DateTime)

    analyses = relationship("Analysis", back_populates="user")

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    type = Column(String)
    data = Column(String)  # JSON
    results = Column(String)  # JSON
    created_at = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="analyses")
```

## 🔒 Segurança

- Validar tokens JWT em todas as requisições
- Verificar permissões baseadas no plano do usuário
- Sanitizar inputs para evitar SQL Injection
- Rate limiting para evitar abuso da API

## 📝 Notas

- Backend deve validar o plano do usuário antes de executar análises
- Implementar cache para análises repetidas
- Considerar usar Redis para cache de sessões
- Implementar logging para auditoria

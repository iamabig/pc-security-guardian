# 🗄️ PC Security Guardian - 데이터베이스 스키마 (설계 단계)

이 문서는 Supabase PostgreSQL에 어떤 테이블을 만들지 **설계만 정의**한 문서입니다. 실제 SQL 실행은 나중에 Supabase 대시보드에서 진행하면 됩니다.

## 1. 핵심 테이블 개요

1. `security_checks` – 각 보안 체크 세션
2. `command_results` – 명령어 실행 결과 + AI 분석
3. `detected_threats` – AI가 뽑아낸 위협 목록
4. `checklist_templates` – 체크리스트 템플릿 (관리자용)

## 2. 설계용 SQL (나중에 Supabase에서 실행)

### 2-1. security_checks

```sql
CREATE TABLE security_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(255) UNIQUE,
  pc_type VARCHAR(50),
  check_status VARCHAR(50) DEFAULT 'in_progress',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2-2. command_results

```sql
CREATE TABLE command_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID REFERENCES security_checks(id),
  command_type VARCHAR(100),
  raw_output TEXT,
  ai_analysis JSONB,
  risk_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2-3. detected_threats

```sql
CREATE TABLE detected_threats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID REFERENCES security_checks(id),
  threat_type VARCHAR(100),
  severity VARCHAR(20),
  description TEXT,
  recommendation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2-4. checklist_templates

```sql
CREATE TABLE checklist_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  command TEXT,
  command_type VARCHAR(100),
  os_type VARCHAR(50),
  order_index INTEGER,
  is_active BOOLEAN DEFAULT true
);
```

> ⚠️ 위 SQL은 **최소 설계 버전**이고, 나중에 PHASE 2에서 RLS, 인덱스, 추가 컬럼 등을 확장할 계획입니다.

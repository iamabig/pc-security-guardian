-- PC Security Guardian Database Schema
-- Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. 사용자 보안 체크 세션
CREATE TABLE security_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  pc_type VARCHAR(50) DEFAULT 'public', -- 'public' or 'private'
  check_status VARCHAR(50) DEFAULT 'in_progress', -- 'in_progress', 'completed', 'failed'
  total_risk_score INTEGER DEFAULT 0, -- 0-100
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_ip VARCHAR(100),
  user_agent TEXT
);

-- 2. 명령어 실행 결과
CREATE TABLE command_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID REFERENCES security_checks(id) ON DELETE CASCADE,
  command_type VARCHAR(100) NOT NULL, -- 'net_share', 'defender_status', 'network_connections', etc.
  raw_output TEXT,
  ai_analysis JSONB, -- Gemini AI 분석 결과
  risk_score INTEGER, -- 0-100
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 위협 발견 항목
CREATE TABLE detected_threats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_id UUID REFERENCES security_checks(id) ON DELETE CASCADE,
  threat_type VARCHAR(100) NOT NULL,
  severity VARCHAR(20) NOT NULL, -- 'safe', 'low', 'medium', 'high', 'critical'
  description TEXT,
  recommendation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 체크리스트 템플릿 (관리자용)
CREATE TABLE checklist_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  command TEXT NOT NULL,
  command_type VARCHAR(100) NOT NULL,
  os_type VARCHAR(50) DEFAULT 'windows',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 통계 및 로그
CREATE TABLE system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  log_type VARCHAR(50), -- 'api_call', 'error', 'security_event'
  message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_security_checks_session ON security_checks(session_id);
CREATE INDEX idx_security_checks_created ON security_checks(created_at DESC);
CREATE INDEX idx_command_results_check ON command_results(check_id);
CREATE INDEX idx_command_results_type ON command_results(command_type);
CREATE INDEX idx_detected_threats_check ON detected_threats(check_id);
CREATE INDEX idx_detected_threats_severity ON detected_threats(severity);

-- Row Level Security (RLS) 활성화
ALTER TABLE security_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE command_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE detected_threats ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 읽기 가능, 쓰기는 인증된 사용자만
CREATE POLICY "Anyone can read security checks" ON security_checks
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert security checks" ON security_checks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read command results" ON command_results
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert command results" ON command_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read threats" ON detected_threats
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert threats" ON detected_threats
  FOR INSERT WITH CHECK (true);

-- 기본 체크리스트 템플릿 삽입
INSERT INTO checklist_templates (title, description, command, command_type, order_index) VALUES
  ('공유 폴더 확인', 'Windows 공유 폴더 목록을 확인합니다', 'net share', 'net_share', 1),
  ('Defender 상태', 'Windows Defender 활성화 여부를 확인합니다', 'Get-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled', 'defender_status', 2),
  ('네트워크 연결', '현재 활성화된 네트워크 연결을 확인합니다', 'netstat -ano | findstr ESTABLISHED', 'network_connections', 3),
  ('원격 프로그램', '원격 접속 프로그램 실행 여부를 확인합니다', 'tasklist /v | findstr "TeamViewer\\|AnyDesk\\|Remote"', 'remote_software', 4);

-- 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_security_checks_updated_at
  BEFORE UPDATE ON security_checks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

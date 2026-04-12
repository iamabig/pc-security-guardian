# feat: AI 기반 네트워크 패킷 분석 및 보안 커맨드 센터 구현

## 🎯 주요 변경 사항
- **Security Command Center**: 실시간 네트워크 패킷 모니터링 및 분석 대시보드 구축.
- **AI 분석 엔진 통합**: Gemini Pro 및 Groq(Mixtral) 엔진을 지원하며, 사용자가 직접 API 키를 관리하는 보안 구조.
- **전문가 컨텍스트 (Jules-Level)**: Neon DB에 저장된 보안 전문가 가이드라인을 AI 분석 시 주입하여 고도화된 위협 탐지.
- **임계치 기반 관리**: 100MB, 500MB, 1GB 단위의 데이터 누적 시 사용자 알림 및 스냅샷 저장 기능.
- **다차원 보안 지표**: 외부 진입(IDX/Cloud), AI 오동작, 내부 버그, 데이터 오염 등 사용자가 분석 지표를 직접 선택 가능.

## 🛠️ 기술적 구현 세부사항
1. **Neon DB Schema**:
   - `expert_knowledge`: 보안 위협 패턴 및 전문가 대응 가이드 저장.
   - `diagnostic_tasks`: 자동화된 도스(DOS) 스타일 명령어 템플릿 관리.
2. **Frontend Components**:
   - `PacketMonitor`: 부하 없는 시뮬레이션 및 실제 트래픽 관리 UI.
   - `MetricSelector`: 분석 우선순위 설정을 위한 커스텀 체크리스트.
3. **AI Integration**:
   - `analyzeWithAI`: 프롬프트 엔지니어링을 통해 전문가 지식을 결합한 JSON 분석 결과 반환.

## 🚀 사용 가이드
1. **환경 변수 설정**: `.env.example`을 참고하여 Neon `DATABASE_URL`을 설정합니다.
2. **API 키 입력**: 웹 화면 상단에서 Gemini 또는 Groq API 키를 입력합니다.
3. **분석 실행**:
   - 실시간 모니터링 중 임계치 도달 시 스냅샷을 저장합니다.
   - 'Run Global Analysis' 버튼을 클릭하여 AI 설명을 확인합니다.

## 🛡️ 보안 고려사항
- 모든 개인 API 키는 클라이언트 측 메모리에서만 관리되며, 서버나 DB에 저장되지 않습니다.
- 상용화 가능한 수준의 보안 가이드라인이 모든 분석의 기본 컨텍스트로 주입됩니다.

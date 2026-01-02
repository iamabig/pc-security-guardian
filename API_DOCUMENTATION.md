# 📡 PC Security Guardian - API 명세 (설계 단계)

이 문서는 실제 구현 전에 **어떤 API를 만들지** 정의하는 설계용 스펙입니다.

## 1. 공통 사항

- Base URL: `/api`
- 응답 형식: JSON
- 인증: 추후 Session ID or JWT 추가 예정

## 2. 엔드포인트 목록 (계획)

### 2-1. POST `/api/analyze-command`
- 설명: 명령어 실행 결과를 OpenAI로 분석
- 요청 바디 예시:
```json
{
  "sessionId": "uuid",
  "commandType": "net_share",
  "output": "명령어 결과 텍스트"
}
```
- 응답 개념:
```json
{
  "riskScore": 0,
  "severity": "safe | low | medium | high | critical",
  "threats": [
    { "type": "...", "description": "...", "recommendation": "..." }
  ],
  "summary": "한 줄 요약"
}
```

### 2-2. POST `/api/save-check`
- 설명: 한 세션의 전체 체크를 완료 상태로 저장

### 2-3. GET `/api/get-history`
- 설명: 과거 체크 기록 조회 (페이징)

### 2-4. GET `/api/get-stats`
- 설명: 통계/대시보드용 데이터 반환

### 2-5. GET `/api/health`
- 설명: 헬스 체크 (배포 상태 확인용)

> ⚠️ 이 문서는 **설계 스펙**이고, 실제 구현 시 상세 필드/에러코드는 확장될 예정입니다.

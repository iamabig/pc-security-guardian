# 🏗️ PC Security Guardian - 시스템 아키텍처 (설계 완료 버전)

이 문서는 **코드 구현 전 단계**에서 전체 시스템이 어떻게 구성될지 정의한 설계 문서입니다.

## 1. 전체 구조 개요

- 클라이언트: Next.js + React (App Router)
- 백엔드: Vercel Serverless Functions (`/api/*`)
- 데이터베이스: Supabase (PostgreSQL)
- AI: OpenAI GPT-4 API

## 2. 주요 흐름 (요약)

1. 사용자가 `/check` 페이지에서 체크리스트를 따라 명령어를 실행
2. 결과를 복사해서 웹에 붙여넣음
3. `/api/analyze-command`가 OpenAI로 분석 요청
4. 분석 결과 + 위협 정보 Supabase에 저장
5. `/analyze`, `/history`, `/dashboard`에서 다시 조회 및 시각화

## 3. 폴더 구조 (계획)

```text
pc-security-guardian/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── utils/
│   ├── hooks/
│   ├── types/
│   └── styles/
├── api/
├── tests/
├── public/
├── docs/
└── .github/
```

> ⚠️ 지금은 **이 구조만 정의**되어 있고, 실제 코드/파일은 Phase 1에서 채워질 예정입니다.

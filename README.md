# PC Security Guardian 🛡️

**공용 PC의 보안 상태를 빠르게 진단하고 AI로 분석하는 플랫폼**

## 🎯 프로젝트 목표

- 공용/카페/PC방 사용자가 **5분 내에** PC 보안 상태 진단
- 명령어 복사-붙여넣기로 간단한 실행
- **AI 기반 자동 분석** (OpenAI GPT-4)
- 위험도 스코어링 + 맞춤형 권장사항
- 사용 이력 추적 + 통계 대시보드

## 💡 주요 기능

### 1️⃣ 보안 체크
- Windows Defender 상태 확인
- 공유 폴더 점검
- 네트워크 연결 모니터링
- 의심 원격 쏟근 소프트웨어 탐지

### 2️⃣ AI 분석
- 명령어 실행 결과 자동 분석
- 위협 요소 식별
- 위험도 점수 (0-100)
- 맞춤형 해결 권장사항

### 3️⃣ 히스토리 & 대시보드
- 과거 체크 기록 조회
- 위협 추이 분석
- 통계 및 리포트 생성
- PDF 내보내기

## 🏗️ 기술 스택

| 계층 | 기술 |
|------|------|
| **프론트엔드** | Next.js 14 + React 18 + TailwindCSS |
| **백엔드** | Vercel Serverless Functions |
| **데이터베이스** | Supabase (PostgreSQL) |
| **AI** | OpenAI GPT-4 API |
| **배포** | Vercel |
| **테스트** | Jest + Playwright |

## 📦 프로젝트 구조

```
pc-security-guardian/
├── docs/                    # 문서
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React 컴포넌트
│   ├── lib/               # 유틸리티 라이브러리
│   ├── utils/             # 헬퍼 함수
│   ├── hooks/             # Custom React Hooks
│   ├── types/             # TypeScript 타입
│   └── styles/            # 글로벌 스타일
├── api/                    # Serverless Functions
├── tests/                  # 테스트 스위트
├── public/                 # 정적 자산
└── config files            # 설정 파일들
```

## 🚀 빠른 시작

### 1. 로컬 개발 환경

```bash
# 레포 클론
git clone https://github.com/iamabig/pc-security-guardian.git
cd pc-security-guardian

# 의존성 설치
npm install

# 환경별수 설정
cp .env.example .env.local
# .env.local 파일에서 API 키 입력

# 개발 서버 실행
npm run dev
```

### 2. 환경별수 설정

필요한 API 키:
- Supabase URL & Keys
- OpenAI API Key
- (선택사항) 이메일 알림용 서비스 키

자세한 내용: [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 📚 문서

- [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) - 전체 작업 계획
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 시스템 아키텍처
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - 데이터베이스 설계
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API 명세
- [docs/SETUP.md](./docs/SETUP.md) - 개발 환경 설정 가이드

## 🔄 개발 워크플로우

1. **Feature Branch** 생성: `git checkout -b feature/새기능명`
2. **코딩**: 새 기능 또는 버그 수정
3. **커밋**: `git commit -m "feat: 설명"`
4. **Pull Request** 생성
5. **자동 테스트** 통과 확인
6. **Merge**

## 📊 현재 진행도

- [x] 프로젝트 구조 설계
- [x] GitHub 레포 초기화
- [ ] PHASE 1: 프로젝트 초기화 (Next.js)
- [ ] PHASE 2: 데이터베이스 설계
- [ ] PHASE 3: 백엔드 API
- [ ] PHASE 4: 프론트엔드 UI
- [ ] PHASE 5: AI 분석 엔진
- [ ] PHASE 6-8: 테스트, 배포, 최적화

## 🤝 기여하기

[CONTRIBUTING.md](./CONTRIBUTING.md) 참고

## 📄 라이센스

MIT License - 자유롭게 사용 가능

## 🎓 학습 목표

이 프로젝트는 다음을 배우기 위해 설계되었습니다:
- ✅ Next.js 풀스택 개발
- ✅ Serverless 아키텍처
- ✅ PostgreSQL 데이터베이스 설계
- ✅ OpenAI API 통합
- ✅ 프로덕션 배포 및 모니터링
- ✅ 팀 협업 워크플로우

---

**Created for:** 40대 스타트업 창업자  
**Dreaming of:** Tesla CEO + Meta Founder 수준의 임팩트 🚀

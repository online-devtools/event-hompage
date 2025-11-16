# Christmas 2025 Event Page

React Three Fiber와 Three.js를 사용한 인터랙티브 크리스마스 홈페이지입니다.

## 주요 기능

- **3D 크리스마스 트리**: 반짝이는 장식과 조명이 있는 인터랙티브 3D 트리
- **눈 내리는 효과**: 실시간으로 떨어지는 300개의 눈송이 파티클
- **선물 상자**: 애니메이션이 적용된 귀여운 선물 상자들
- **별이 빛나는 배경**: 5000개의 별로 이루어진 우주 배경
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- **인터랙티브 컨트롤**: 마우스로 드래그하여 화면 회전 가능

## 기술 스택

- React 18
- TypeScript
- Vite
- Three.js
- React Three Fiber (@react-three/fiber)
- React Three Drei (@react-three/drei)

## 시작하기

### 설치

\`\`\`bash
npm install
\`\`\`

### 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 http://localhost:5173 을 열어주세요.

### 빌드

\`\`\`bash
npm run build
\`\`\`

### 프리뷰

\`\`\`bash
npm run preview
\`\`\`

## 컴포넌트 구조

- `ChristmasTree.tsx`: 3D 크리스마스 트리와 장식들
- `Snowfall.tsx`: 눈 내리는 파티클 시스템
- `Gifts.tsx`: 선물 상자 그룹
- `ChristmasScene.tsx`: 전체 3D 씬을 관리하는 메인 컴포넌트
- `App.tsx`: 루트 컴포넌트 (3D 씬 + 오버레이 텍스트)

## 사용 방법

- **마우스 드래그**: 화면을 회전시켜 다양한 각도에서 트리 감상
- **마우스 휠**: 줌 인/아웃 (최소 3, 최대 10 거리)
- **모바일**: 터치로 드래그 및 핀치 줌 가능

## 라이선스

MIT

# [ FEPS 1기 🦁 | 1조 Team477 | 최종 프로젝트]

### Team477 소개

|                            [신은수](https://github.com/Shineun9)                            |                            [윤태현](https://github.com/yoonth95)                            |                            [이보경](https://github.com/ebokyung)                            |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| <img width="250" height="250" src="https://avatars.githubusercontent.com/u/75666099?v=4" /> | <img width="250" height="250" src="https://avatars.githubusercontent.com/u/78673090?v=4" /> | <img width="250" height="250" src="https://avatars.githubusercontent.com/u/90684277?v=4" /> |

<br>
<br>

## 목차

### 1. [목표](#goal)
### 2. [프로젝트 소개](#intro)
- 개발 배경 및 목적, 주요 기능 등
- 개발 기간
- 프로젝트 사용법
### 3. [기술 스택](#tech)
- 기술 선정 이유
### 4. [정보구조도](#feature)
### 5. [화면 구성](#screen)
### 6. [트러블슈팅](#trouble)
### 7. [컨벤션](#convention)
### 8. [디렉토리 구조](#directory)

<br>
<br>

## <span id="goal">1. 목표<span>

- 짧은 프로젝트 기간으로 인한 MVP 개발 및 동작 우선 구현
- 추후 기능 추가 및 성능 최적화

<br>
<br>

## <span id="intro">2. 프로젝트 소개</span>

### [🔗 beta 바로가기](https://beta-beta.net)

<br>

### 예체능 분야 대학생들이 자신의 작품을 효과적으로 소개하고 홍보할 수 있는 중앙 집중형 플랫폼

<img width=800 src='https://github-production-user-asset-6210df.s3.amazonaws.com/90684277/294849424-f01188e1-2b38-48db-abf1-12c801050c7e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240108%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240108T085111Z&X-Amz-Expires=300&X-Amz-Signature=d923f7febfb20a8080fed4f33eecc6e143dd5231059b706cd8f6a7a9547d6ee8&X-Amz-SignedHeaders=host&actor_id=90684277&key_id=0&repo_id=727000793'>

<br>

### 개발 기간

- 1차 개발 : 2023년 12월 2일(월) ~ 2023년 12월 25일(월)<br>
   <img width=500 src='https://github-production-user-asset-6210df.s3.amazonaws.com/90684277/294849252-9ca69518-b563-4a64-885a-5543c29c8926.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240108%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240108T085019Z&X-Amz-Expires=300&X-Amz-Signature=ef5e97d6d8508bc6470b5c00bde6ef8f7bfe9b82cc1f2a0e1ef2b2d98976ac37&X-Amz-SignedHeaders=host&actor_id=90684277&key_id=0&repo_id=727000793'>
- 2차 개발 : 2024년 1월 4일(목) ~ 진행 중

<br>

### 프로젝트 사용법

- 구동법

  ```
  $ git clone https://github.com/FESP-TEAM-1/beta-front.git beta-front
  $ cd beta-front
  $ npm install
  $ npm run dev
  ```

- .env

  ```
  VITE_APP_KAKAOMAP_API_KEY=
  VITE_APP_IMAGE_DOMAIN=

  VITE_APP_TOSS_PAYMENTS_CLIENT_KEY=
  VITE_APP_TOSS_PAYMENTS_SECRET_KEY=

  VITE_APP_API_ENDPOINT=
  ```

<br>
<br>

## <span id='tech'>3. 기술 스택</span>

<table>
<tr>
 <td align="center">Environment</td>
 <td>
  <img alt='Visual Studio Code' src='https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white' />&nbsp 
  <img alt='Git' src='https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white' />&nbsp 
  <img alt='Github' src='https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white' />&nbsp 
 </td>
</tr>
<tr>
 <td align="center">Package Manager</td>
 <td>
  <img alt='npm' src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white' />&nbsp 
 </td>
</tr>
<tr>
 <td align="center">Development</td>
 <td>
  <img alt='Vite' src='https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white' />&nbsp;
<img alt='TypeScript' src='https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white' />&nbsp;
<img alt='React' src='https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white' />&nbsp;
<img alt='React Router' src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' />&nbsp;
<img alt='React Query' src='https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white' />&nbsp;
<img alt='Zustand' src='https://img.shields.io/badge/zustand-black?style=for-the-badge&logo=zustand&logoColor=white' />&nbsp;
<img alt='prettier' src='https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white' />&nbsp;
<img alt='eslint' src='https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white' />&nbsp;
 </td>
</tr>
<tr>
 <td align="center">Communication</td>
 <td>
  <img alt='Discord' src='https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white' />&nbsp 
   <img alt='Notion' src='https://img.shields.io/badge/Notion-white?style=for-the-badge&logo=Notion&logoColor=black' />&nbsp 
 </td>
</tr>
</table>

<br>

### 기술 선정 이유

#### 1. Vite
- **개발 서버 시작 시간**
  - CRA는 Webpack을 사용하여 개발 서버를 시작할 때 모든 모듈을 한 번에 변환하는 반면,
  - Vite는 모듈을 요청할 때마다 동적으로 변환하고 ES 모듈을 사용하여 브라우저에서 직접 로드하기 때문에 서버 시작 시간이 매우 빠름
  - 특히 window 환경에서 빌드 속도가 CRA와 확연하게 차이남

- **환경 설정의 단순화**

  - CRA는 설정이 모두 미리 구성되어 있어 편리하지만, 사용자 정의 설정을 추가하려면 eject 과정을 거쳐야 함
  - 반면 Vite는 최소한의 설정으로 alias, eslint 등 사용자 정의 설정을 쉽게 추가할 수 있음

#### 2. Zustand

- <b>Provider 불필요</b>

  - React의 Context API에 의존하지 않기 때문에 불필요한 리렌더링을 최소화할 수 있고 성능 향상에 기여할 수 있음 또한, 개발 과정을 더욱 간결하게 만들 수 있음

- <b>러닝 커브</b>
  - 짧은 기간 동안 학습하기에 적합함
  - 팀원 모두가 빠르게 적응하고 효율적으로 작업할 수 있음

- <b>단일 스토어 관리</b>
  - 하나의 스토어에서 개별적인 기능 및 상태를 관리할 수 있음
  - 상태 관리의 복잡성을 줄이고 관리의 효율성을 높여줌

- <b>경량화된 라이브러리</b>
  - 매우 작은 크기로 프로젝트의 전체적인 크기를 최소화하며 로딩 시간과 성능에 긍정적인 영향을 미침

- <b>다른 상태 관리 라이브러리</b>
  - Recoil은 업데이트가 드물고 파일 크기가 큼
  - Redux는 다소 복잡한 편
  - Jotai나 Valtio 등은 고려하지 않음

- 결론적으로 짧은 시간 내에 프로젝트를 구현해야 하는 상황과 상태 관리 라이브러리에 대한 팀원들의 경험을 고려하여 간단하면서도 경량화된 Zustand를 선택

#### 3. Tanstack Query

- <b>효율적인 데이터 캐싱</b>
  - 자동적으로 서버에서 받은 데이터를 캐시하기 때문에 API 요청 수를 줄이고 사용자 경험을 개선
    
- <b>쿼리 키를 통한 데이터 관리</b>
  - 각 쿼리는 고유한 키를 가지며 이를 통해 데이터를 쉽게 조회, 업데이트, 무효화할 수 있음

<br>

## <span id='feature'>4. 정보구조도</span>

<img width=800 src='https://github-production-user-asset-6210df.s3.amazonaws.com/90684277/294849036-d476055f-dc8e-4c16-9da1-bed7cabc63a5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240108%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240108T084917Z&X-Amz-Expires=300&X-Amz-Signature=ebd050b4fd6e1a3f50535842455e02da6c13ce0192947da25a188c2eed8850c4&X-Amz-SignedHeaders=host&actor_id=90684277&key_id=0&repo_id=727000793'/>

<br>

## <span id='screen'>5. 화면 구성</span>

### 1) 메인 페이지 <br>

| [메인] | [스토리 업로드] |
| :----: | :-------------: |
|        |                 |

<br>

### 2) 전시/공연/스포츠 페이지 <br>

| [전시] | [공연] | [스포츠] |
| :----: | :----: | :------: |
|        |        |          |

<br>

### 3) 상세 페이지 <br>

| [정보] | [후기/방명록] |
| :----: | :-----------: |
|        |               |

| [좋아요] | [예매 - 구글폼] | [예매 - 예매대행] |
| :------: | :-------------: | :---------------: |
|          |                 |                   |

<br>

### 4) 마이 페이지 - 일반회원 <br>

| [프로필 수정] | [좋아요] | [후기/방명록] |
| :-----------: | :------: | :-----------: |
|               |          |               |

| [예매 관리] | [스토리] |
| :---------: | :------: |
|             |          |

<br>

### 5) 마이 페이지 - 관리자 <br>

| [프로필 수정] | [예매 관리] |
| :-----------: | :---------: |
|               |             |

| [게시글 관리] | [게시글 업로드] | [게시글 수정/삭제] |
| :-----------: | :-------------: | :----------------: |
|               |                 |                    |

<br>

## <span id='trouble'>6. 트러블슈팅</span>

### color-thief 라이브러리

<img width=800 src='https://github-production-user-asset-6210df.s3.amazonaws.com/90684277/294851444-f32779bf-904a-41a9-a1dd-e84aec817dae.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240108%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240108T090126Z&X-Amz-Expires=300&X-Amz-Signature=2cff57bb41f45d71b0fb95b3dd09e51fd33f7dd067601cbcee7b29533ed331f7&X-Amz-SignedHeaders=host&actor_id=90684277&key_id=0&repo_id=727000793' />

### text to base64

<img width=800 src='https://github-production-user-asset-6210df.s3.amazonaws.com/90684277/294851654-ebdffa94-e9bb-4592-99b9-12c359bb1797.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240108%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240108T090143Z&X-Amz-Expires=300&X-Amz-Signature=0029863d43f3322571fbc9418da717e28e2f43b64481723ba021ace66e5e0f4b&X-Amz-SignedHeaders=host&actor_id=90684277&key_id=0&repo_id=727000793'>

### 이미지 최적화

<br>

## <span id='convention'>7. 컨벤션</span>

### [📕 커밋 컨벤션](https://github.com/FESP-TEAM-1/beta-frontend/wiki/%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)

### [📘 코드 컨벤션](https://github.com/FESP-TEAM-1/beta-frontend/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br>

## <span id='directory'>8. 디렉토리 구조</span>

```
📦BETA-FRONTEND
 ┣ 📂public
 ┃ ┗ 📜favicon.ico
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📜deleteCancelShow.ts
 ┃ ┃ ┣  ...
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜arrow.svg
 ┃ ┃ ┣  ...
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂BasicCard
 ┃ ┃ ┃ ┃ ┣ 📜BasicCard.module.css
 ┃ ┃ ┃ ┃ ┗ 📜BasicCard.tsx
 ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂layouts
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┣ 📂mypage
 ┃ ┣ 📂data
 ┃ ┃ ┗ 📜univList.json
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜useAuth.tsx
 ┃ ┃ ┣ 📜useFilterSlide.tsx
 ┃ ┃ ┣ 📜useInputs.tsx
 ┃ ┃ ┗ 📜usePreventScroll.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┣ 📜DetailPage.tsx
 ┃ ┃ ┃ ┗ 📜DetaiPage.module.css
 ┃ ┃ ┣ 📂Error
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┣ 📂MainConcert
 ┃ ┃ ┣ 📂MainExhibition
 ┃ ┃ ┣ 📂Mypage
 ┃ ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┃ ┣ 📂PostManage
 ┃ ┃ ┃ ┃ ┃ ┣ 📜PostManagePage.module.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜PostManagePage.tsx
 ┃ ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┃ ┣ 📂ProfilePage
 ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┣ 📂LikeManage
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LikeManagePage.module.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜LikeManagePage.tsx
 ┃ ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┃ ┣ 📜Mypage.module.css
 ┃ ┃ ┃ ┗ 📜Mypage.tsx
 ┃ ┃ ┣ 📂PayFail
 ┃ ┃ ┣ 📂PaySuccess
 ┃ ┃ ┣ 📂Signup
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂stores
 ┃ ┃ ┣ 📜useCarouselDragStore.ts
 ┃ ┃ ┗ ...
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜addressSearchType.ts
 ┃ ┃ ┣ ...
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜base64ToBytes.ts
 ┃ ┃ ┃ ...
 ┃ ┃ ┗ index.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜global.css
 ┃ ┣ 📜main.tsx
 ┃ ┣ 📜PrivateRoute.tsx
 ┃ ┣ 📜Router.tsx
 ┃ ┣ 📜toast.css
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.env
 ┣ 📜.eslintrc.cjs
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.cjs
 ┣ 📜index.html
 ┣ 📜netlify.toml
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜svg.d.ts
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┗ 📜vite.config.ts
```

<br>

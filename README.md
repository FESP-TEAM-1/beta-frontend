# [ FEPS 1기 🦁 | 1조 Team477 | 최종 프로젝트]

### Team477 소개

|                            [신은수](https://github.com/Shineun9)                            |                            [윤태현](https://github.com/yoonth95)                            |                            [이보경](https://github.com/ebokyung)                            |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/75666099?v=4" /> | <img src="https://avatars.githubusercontent.com/u/78673090?v=4" /> | <img  src="https://avatars.githubusercontent.com/u/90684277?v=4" /> |

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

### 5. [역할분담](#role)

### 6. [화면 구성](#screen)

### 7. [트러블슈팅](#trouble)

### 8. [컨벤션](#convention)

### 9. [디렉토리 구조](#directory)

<br>
<br>

## <span id="goal">1. 목표<span>

- 짧은 프로젝트 기간으로 인한 MVP 개발 및 동작 우선 구현
- 추후 기능 추가 및 성능 최적화

<br>
<br>

## <span id="intro">2. 프로젝트 소개</span>

### [🔗 beta 바로가기](https://beta-beta.net)

#### 테스트 아이디

##### 일반 유저
> - ID : user
> - PW : !user1234

##### 관리자 유저

> - ID : admin
> - PW : !admin1234

<br>

### 예체능 분야 대학생들이 자신의 작품을 효과적으로 소개하고 홍보할 수 있는 중앙 집중형 플랫폼
<p align="center">
<img width="" alt="스크린샷 2024-02-04 225114" src="https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/90e642e3-aab9-4a2d-a9b7-4664c29c1b36">
</p>
<br>

### 개발 기간

- 1차 개발 : 2023년 12월 2일(월) ~ 2023년 12월 25일(월)<br>
<p align="center">
  <img width="90%" align="center" alt="스크린샷 2024-02-04 224423" src="https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/34409a5f-cd9b-4d45-9247-d0da76cedf93">
</p>

- 2차 개발 : 2024년 1월 4일(목) ~ 2024년 2월 3일(토)
  - 버그 수정
  - 리팩터링
  - 최적화

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
  ```

- .env.development

  ```
  VITE_APP_API_ENDPOINT=
  ```

- .env.production

  ```
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
<p align="center">
  <img width="90%" alt="스크린샷 2024-02-04 224654" src="https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/5fa0eafd-3648-4804-87d2-c92962cf61c9">
</p>

<br>

## <span id='role'>5. 역할분담</span>
<p align="center">
<img width="90%" src="https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/57574c58-e06b-488d-9551-304df2d3f3bd"/>
</p>

<br>

## <span id='screen'>6. 화면 구성</span>

### 1) 메인 페이지 <br>

| [메인] | [스토리 업로드] |
| :----: | :-------------: |
| ![메인페이지 (3)](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/c6bcdfc1-4e13-4e07-8d50-137d7e50e71e) |  ![스토리-업로드](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/5a8a3d1e-d140-40a0-a3ef-3c0228b0de50)  |
- 메인페이지
  - 현재 진행중인 공연/전시의 배너(최신순 5개)를 볼 수 있다.
  - 사람들이 업로드한 공연/전시와 관련된 스토리를 확인할 수 있다.
  - 현재 진행 중인 공연/전시를 날짜별로 확인할 수 있다.
- 스토리업로드
  - 일반 회원만 스토리를 업로드 할 수 있다.
  - 사진과 태그를 입력하여 스토리를 업로드 할 수 있다.

<br>

### 2) 전시/공연/스포츠 페이지 <br>

| [전시] | [공연] |
| :----: | :----: |
| ![전시페이지](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/c82c9397-0ab9-4b0f-aeec-0859aadcfb8d)| ![공연페이지](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/dfab295c-fd51-4000-a399-007983f3073f)|
<br>

- 날짜, 지역, 진행상황(진행중, 종료, 예정), 카테고리 등으로 필터링해서 전시/공연 정보를 확인 할 수 있다.

### 3) 상세 페이지 <br>

| [정보] | [후기/방명록] |
| :----: | :-----------: |
|  ![상세페이지 정보 (1)](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/bfaf8f9f-9214-44ec-8383-5bb5a94f4660)  | ![상세페이지-후기방명록](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/27355264-b5ea-4f85-8b89-5e9f7b7d9ebe) |

- 정보 탭: 공연/전시 제목, 주최 대학 및 학과, 기간, 장소, 소개글 등을 확인 할 수 있다.
- 후기/방명록 탭: 공연/전시 감상 후기 및 방명록을 작성할 수 있다.

| [좋아요] | [예매 - 구글폼] | [예매 - 예매대행] |
| :------: | :-------------: | :---------------: |
| ![상세페이지-좋아요](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/d5933a20-ca14-4f86-8b2a-b77ecd7c6cac) | ![예매-구글폼](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/6c1c7d25-2673-4869-ad94-78f5d1272b7f) | ![예매-토스페이먼츠](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/e32a014e-8308-4495-8927-babe990ecbfe) |

- 공연/전시에 좋아요를 누를 수 있다.
- 예매는 구글폼으로 예매하는 것과 본 사이트에서 직접 예매하는 방법이 있다.

<br>

### 4) 마이 페이지 - 일반회원 <br>

| [프로필 수정] | [좋아요] | [후기/방명록] |
| :-----------: | :------: | :-----------: |
|  ![마이페이지 프로필](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/91a62780-8e09-44b5-92bf-a9c035222c25) |  ![마이페이지 - 좋아요](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/78e05764-7d5b-48db-b306-c6b1f77e84c1) | ![마이페이지 후기](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/36ad6cff-0c27-429d-a41b-b8acbce44572) |

- 자신의 프로필을 수정할 수 있다.
- 자신이 좋아요를 누른 공연/전시를 확인할 수 있으며 공연/전시카드를 클릭하면 해당 공연/전시의 상세정보페이지로 이동한다.
- 자신이 남긴 후기/방명록을 확인할 수 있고 이를 삭제할 수 있다. 자신이 남긴 후기/방명록을 클릭 시 해당 공연/전시의 상세정보페이지 후기/방명록 탭으로 이동한다.


| [예매 관리] | [스토리] |
| :---------: | :------: |
|  ![마이페이지 예매내역](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/3050f9e3-3e28-4ef0-9a6a-242237637ee9)  | ![마이페이지 스토리](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/6c0de126-6c31-4fc6-887a-f868beed8fc9) |

- 자신이 예매한 공연/전시 목록을 확인할 수 있다. 이를 클릭 시 해당 공연/전시에 대한 정보가 뜨고 예매를 취소할 수도 있다.
- 자신이 작성한 스토리를 확인할 수 있고 이를 삭제할 수 있다.

<br>

### 5) 마이 페이지 - 관리자 <br>

| [프로필 수정] | [예매 관리] |
| :-----------: | :---------: |
| ![마이페이지 - 관리자 프로필](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/98b219b4-4f3b-4fec-92af-02f39781ecc7) |  ![마이페이지 - 관리자 예매관리](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/8b6917f7-68b6-4658-b5cd-cdc8cc3f0da5) |

- 관리자는 자신의 프로필을 수정할 수 있다.
- 관리자는 자신의 공연/전시를 어떤 회원이 예매했는지 확인할 수 있다.

| [게시글 관리] | [게시글 업로드] | [게시글 수정/삭제] |
| :-----------: | :-------------: | :----------------: |
| ![마이페이지 - 관리자 게시글 관리](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/b3ec6908-dcf7-4dfd-908d-9cab122aa09e)  |   ![마이페이지 - 관리자 게시글 업로드](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/c33dd0ce-db61-42ad-8218-6d2299194e13)  |  ![마이페이지 -게시글 수정삭제](https://github.com/FESP-TEAM-1/beta-frontend/assets/75666099/13a74908-3eea-4ba1-bdfb-3ad2bcd05304)  |
- 관리자는 자신이 어떤 공연/전시 게시글을 적었는지 리스트를 확인할 수 있다. 또한 해당 게시글에 대한 댓글을 확인하고 삭제할 수 있다.
- 관리자는 공연/전시 게시글을 작성할 수 있다. (사진업로드, 공연/전시 대학 및 학과, 공연/전시 기간, 장소, 소개글, 예매 여부, 구글폼 예매/예매대행 등을 작성할 수 있다)
- 관리자는 공연/전시 게시글을 수정하거나 삭제할 수 있다.

<br>

## <span id='trouble'>7. 트러블슈팅</span>

[📍 해결한 트러블슈팅 보러가기](https://github.com/FESP-TEAM-1/beta-frontend/issues?q=label%3A%22%F0%9F%95%B9%EF%B8%8F+%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85%22+is%3Aclosed)

[🕹️ 해결 중인 트러블슈팅 보러가기](https://github.com/FESP-TEAM-1/beta-frontend/labels/%F0%9F%95%B9%EF%B8%8F%20%ED%8A%B8%EB%9F%AC%EB%B8%94%EC%8A%88%ED%8C%85)

<br>

## <span id='convention'>8. 컨벤션</span>

### [📕 커밋 컨벤션](https://github.com/FESP-TEAM-1/beta-frontend/wiki/%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)

### [📘 코드 컨벤션](https://github.com/FESP-TEAM-1/beta-frontend/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br>

## <span id='directory'>9. 디렉토리 구조</span>

```
📦BETA-FRONTEND
 ┣ 📂public
 ┃ ┗ 📜favicon.ico
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📂image
 ┃ ┃ ┃ ┗ 📜getBannerImages.ts
 ┃ ┃ ┣ 📂like
 ┃ ┃ ┃ ┣ 📜deleteLike.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📂reservation
 ┃ ┃ ┃ ┣ 📜deleteReservation.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📂review
 ┃ ┃ ┃ ┣ 📜deleteAdminReview.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📂show
 ┃ ┃ ┃ ┣ 📜deleteAdminShow.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📂story
 ┃ ┃ ┃ ┣ 📜deleteStory.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┣ 📜getDuplicateIdCheck.ts
 ┃ ┃ ┃ ┗ ...
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜arrow.svg
 ┃ ┃ ┗ ...
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂BasicCard
 ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┣ 📂Banner
 ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂layouts
 ┃ ┃ ┃ ┣ 📂ButtonAfterLogin
 ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📂Banner
 ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂mainConcert
 ┃ ┃ ┃ ┣ 📂ConertListSection
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂mainExhibition
 ┃ ┃ ┃ ┣ 📂ExhibitionListSection
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂mypage
 ┃ ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┃ ┣ 📂ImageInputSection
 ┃ ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┣ 📂Profile
 ┃ ┃ ┃ ┃ ┗ 📜Profile.tsx
 ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┣ 📂LikeItem
 ┃ ┃ ┃ ┃ ┃ ┗ 📜LikeItem.tsx
 ┃ ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂data
 ┃ ┃ ┗ 📜univList.json
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useApiError.tsx
 ┃ ┃ ┃ ┃  ...
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┣ 📂Error
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┣ 📂MainConcert
 ┃ ┃ ┣ 📂MainExhibition
 ┃ ┃ ┣ 📂Mypage
 ┃ ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┃ ┣ 📂PostManage
 ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┣ 📂LikeManage
 ┃ ┃ ┃ ┃ ┃ ...
 ┃ ┃ ┃ ┣ 📜Mypage.module.css
 ┃ ┃ ┃ ┗ 📜Mypage.tsx
 ┃ ┃ ┣ 📂PayFail
 ┃ ┃ ┣ 📂PaySuccess
 ┃ ┃ ┗ 📂Signup
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜PrivateRoute.tsx
 ┃ ┃ ┗ 📜Router.tsx
 ┃ ┣ 📂stores
 ┃ ┃ ┣ 📜useShowIdStore.ts
 ┃ ┃ ┃ ...
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜global.css
 ┃ ┃ ┣ 📜payment.css
 ┃ ┃ ┗ 📜toast.css
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜addressSearchType.ts
 ┃ ┃ ┃ ...
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜appendResultToFormData.ts
 ┃ ┃ ┃ ...
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.env
 ┣ 📜.env.development
 ┣ 📜.env.production
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

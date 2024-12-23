# Assignment 4 - 영화 웹 애플리케이션 (with KAKAO Login)

이 프로젝트는 [TMDB API](https://developers.themoviedb.org/3)와 React를 사용하여 영화 정보를 제공하는 웹 애플리케이션입니다. 아래의 페이지들로 구성되어 있습니다.
이존 프로젝트에서 카카오 로그인 기능이 추가되었습니다.
이전 프로젝트는 [Assignment2](https://github.com/youth5427/assignment2)에서 확인할 수 있습니다.

## 목차

- [소개](#소개)
- [기능](#기능)
- [페이지 구성](#페이지-구성)
- [API 키 설정](#api-키-설정)
- [설치 및 실행](#설치-및-실행)

---

## 소개

이 웹 애플리케이션은 사용자가 영화 정보를 탐색, 검색, 위시리스트 저장 등의 기능을 수행할 수 있도록 설계되었습니다. 프로젝트는 [youth5427.github.io/assignment4/](https://youth5427.github.io/assignment4/)에서 확인할 수 있습니다.

---

## 기능

- **영화 탐색**: 인기 영화 및 최신 영화를 확인할 수 있습니다.
- **검색**: 원하는 영화 제목 또는 조건으로 영화를 검색할 수 있습니다.
- **위시리스트**: 영화 썸네일 상단의 북마크 버튼을 통해 관심 있는 영화를 저장하고 확인할 수 있습니다.
- **사용자 인증**: 로그인 및 회원가입을 통해 사용자 맞춤 기능(개별 검색기록 및 위시리스트) 제공.
- **영화 정보 제공**: 영화 썸네일을 길게 눌러 검색 포털에서 해당 영화에 대한 정보를 확인할 수 있습니다.

---

## 페이지 구성

1. **Home (홈 화면)**
   - 주요 영화 배너와 인기 영화, 최신 영화, 액션 영화와 같은 섹션으로 구성되어 있습니다.
   - 관련 파일: `Home.js`
   - 관련 컴포넌트 파일: `Banner.js`, `MovieRow.js`, `Header.js`, `Footer.js`
2. **Popular (인기 영화)**

   - 인기 영화 목록을 테이블 뷰와 무한 스크롤 뷰로 확인할 수 있습니다.
   - 관련 파일: `Popular.js`
   - 관련 컴포넌트 파일: `Header.js`, `tableView.js`, `InfinityScrollView.js`, `Footer.js`

3. **Search (검색)**

   - 영화 제목, 장르, 평점, 기타 기준으로 정렬이 가능합니다.
   - 테이블 뷰와 무한 스크롤 뷰로 확인할 수 있습니다.
   - Header를 통해 검색이 가능합니다.
   - 검색 기능 사용시 정렬 기능은 비활성화 됩니다.
   - 관련 파일: `Search.js`
   - 관련 컴포넌트 파일: `Header.js`, `tableView.js`, `InfinityScrollView.js`, `Footer.js`

4. **Signin (로그인 및 회원가입)**

   - 사용자 인증 및 계정 관리 페이지입니다.
   - 관련 파일: `Signin.js`
   - 관련 컴포넌트 파일: `FooterSignin.js`, `SigninAnimation.js`

5. **Wishlist (위시리스트)**
   - 사용자가 저장한 영화의 목록을 확인할 수 있습니다.
   - 관련 파일: `Wishlist.js`
   - 관련 컴포넌트 파일: `Header.js`, `MovieRow.js`, `Footer.js`

---

## API 키 설정

- API 키는 [TMDB 웹사이트](https://developers.themoviedb.org/3)에서 제공 받을 수 있습니다.
- 배포된 사이트에는 API 키가 숨겨져 있습니다.
- 추후 로컬에서 개발을 하고 싶다면, 해당 프로젝트의 root 디렉토리에 아래와 같이 구성된 .env.development 파일을 추가하십시오.

```bash
  REACT_APP_KAKAO_API_KEY = your_KAKAO_API_KEY
  REACT_APP_API_KEY = your_TMDB_API_KEY
  REACT_APP_KAKAO_LOGOUT_REDIRECT_URI = http://localhost:3000/assignment4/
```

---

## 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone https://github.com/youth5427/assignment4.git
cd assignment4
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm start
```

브라우저에서 http://localhost:3000으로 접속합니다.

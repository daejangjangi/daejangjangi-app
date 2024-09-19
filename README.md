# 대장 항문 질환 일상관리 및 맞춤화된 이커머스 서비스 대장장이
개발 중입니다.

## 개발 컨벤션

### 📝 커밋 컨벤션
```
git commit -m [#11] feat: 홈 컴포넌트 개발
```
| 유형     | 설명                                         |
| -------- | -------------------------------------------- |
| feat     | 새로운 기능 추가                             |
| fix      | 버그 수정                                    |
| chore    | 빌드, 패키지 매니저, 라이브러리 등 기타 설정 |
| docs     | 문서 수정                                    |
| design   | UI 디자인 변경 - CSS                         |
| style    | 코드 스타일 변경                             |
| refactor | 코드 리팩터링                                |
| test     | 테스트 코드, 리팩토링 테스트 코드 추가       |
| rename   | 파일, 폴더명 변경 혹은 이동                  |
| remove   | 파일 삭제                                    |

<br>
    
### ⌨️ 네이밍 규칙

| 파일 유형            | 네이밍 규칙  | 예시               |
| -------------------- | ------------ | ------------------ |
| 컴포넌트 파일        | Pascal Case  | `HomeComponent.tsx`|
| 커스텀 훅 파일        | Camel Case   | `useLogin.tsx`     |
| 스타일 파일          | Camel Case   | `loginStyles.ts`   |
| 이 외 파일 (유틸 등) | Kebab Case   | `date-util.ts`     |

#### 네이밍 규칙 설명
- **Pascal Case**: 각 단어의 첫 글자를 대문자로 사용하며, 공백 없이 연결합니다. (`HomeComponent`)
- **Camel Case**: 첫 단어는 소문자, 이후 단어의 첫 글자를 대문자로 연결합니다. (`useLogin`)
- **Kebab Case**: 모든 문자를 소문자로 작성하고, 단어 사이를 하이픈(`-`)으로 구분합니다. (`date-util.ts`)
  
<br>

### 📁 폴더 구조
```
- app: 앱 내 라우팅을 담당하는 폴더입니다.
- src  
  └ api: 사용하는 api들 모음입니다.  
  └ hooks: 커스텀 훅 모음입니다.  
  └ store: 상태관리 파일 모읍입니다.  
  └ features: 각 스크린별 대표 스크린 파일과 구성되는 컴포넌트 파일을 구분지어 놓습니다.  
    └ (예시)home  
      └ HomeScreen.tsx  
      └ components  
        └ ... HomeScreen 내 사용되는 컴포넌트들 ...  
  └ common: 공통 컴포넌트들입니다.  
  └ utils: 각종 유틸파일 모음입니다.  
```
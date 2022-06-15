# hanghae_homework_02

- 게시글 CRUD
  - 게시글 전체 목록을 조회하는 API를 제외한 모든 API는 auth 미들웨어를 통해서 회원 인증이 된 유저만 가능
    - auth 미들웨어는 jwt 사용
    - GET /api/post 게시글 목록 불러오기
    - GET /api/post/detail/:id 특정 게시글 불러오기
    - POST /api/post 게시글 저장
    - PUT /api/post/:id 게시글 수정
    - DELETE /api/post/:id 게시글 삭제
    - POST /api/post/:id/like 게시글 좋아요 & 좋아요 취소
- 회원관리
  - jwt를 사용해서 유저정보 암호화 및 검증
  - 로그인하면 token을 response

## Used package

- express
- mysql2, sequelize, sequelize-cli
- dotenv
- morgan
- body-parser, cookie-parser
- cors
- swagger-jsdoc, swagger-ui-express
- devDependencies: nodemon
- multer, multer-s3, aws-sdk
- express-validator
- jsonwebtoken

## ERD

<img src="./erd.png">

## Image 저장

<img src="./dra.png">

- 게시글 등록 요청이 오면 auth-middleware를 지나간다
- auth-middleware에서 유저 인증이 검증이 되면 upload middleware를 지나간다
- 업로드 미들웨어에서 S3에 이미지 원본 파일 저장
- 업로드 미들웨어를 빠져나오면 비즈니스 로직 부분에서 이미지를 저장한 S3의 경로를 저장

## Install

```console
$ npm install
```

## Start

```console
$ npm start
```

## Docs(REST API)

```
http://localhost:8080/docs
```

## Response

회원가입

```json
{
  "result": {
    "id": 6,
    "nickname": "fdsafdsafdsafd",
    "email": "fdfd@user.com",
    "role": "user"
  }
}
```

로그인

```json
{
  "result": {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmlja25hbWUiOiJ1ZXNyIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU1MTc1MTMwfQ.ycG69qe6Ry8boDs_6BprXMacFdO6m_mSKypisFATnZ0"
  }
}
```

게시글 목록

```json
{
  "result": [
    {
      "id": 28,
      "title": "fime image upload test",
      "content": "image test image test image test image test image test image test image test image test image test image test image test image test image test image test image test image test image test ",
      "image": null,
      "createdAt": "2022-06-13T13:28:28.000Z",
      "updatedAt": "2022-06-13T13:28:28.000Z",
      "deletedAt": null,
      "userId": 4
    }
  ]
}
```

게시글 등록

```json
{
  "result": {
    "id": 29,
    "title": "test title",
    "content": "test content",
    "userId": 4,
    "updatedAt": "2022-06-14T02:54:35.682Z",
    "createdAt": "2022-06-14T02:54:35.682Z"
  }
}
```

게시글 삭제

```json
{
  "result": {
    "success": true
  }
}
```

게시글 수정

```json
{
  "result": {
    "success": true
  }
}
```

## 예외처리

1. 로그인

- 이미 로그인 한 회원이 로그인 요청을 보낼 경우 예외처리
- 이미 로그인 한 회원이 회원가입 요청을 보낼 경우 예외처리

2. 회원가입

- validation 체크 - 이메일 형식
- 닉네임은 최소 3자 이상이며, 숫자와 대소문자 알파벳으로 구성됨(특수문자 X)
- 닉네임이 들어간 패스워드는 가입할 수 없음

3. 게시글 등록

- 로그인이 되어 있지 않은 상태이면 예외처리
- 게시글 제목과 내용을 필수요구조건

4. 게시글 삭제

- 로그인이 되어 있지 않은 상태이면 예외처리
- 자신의 게시글이 아니면 삭제할 수 없음

5. 게시글 수정

- 로그인이 되어 있지 않은 상태이면 예외처리
- 자신의 게시글이 아니면 수정할 수 없음

6. 좋아요

- 로그인이 되어 있지 않은 상태이면 예외처리
- 게시글의 좋아요를 누른 상태일 때와 좋아요를 하지 않은 상태를 구분

### Notice

- .env파일과 s3.json은 보안의 이유로 gitignore

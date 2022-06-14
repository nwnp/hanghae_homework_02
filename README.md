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
  - 로그인 된 회원이면 로그인 요청을 할 수 없도록 예외처리
  - 로그인 된 회원이면 회원가입 할 수 없도록 예외처리

## Used package

- express
- mysql2, sequelize, sequelize-cli
- dotenv
- morgan
- body-parser, cookie-parser, express-session
- cors
- swagger-jsdoc, swagger-ui-express
- devDependencies: nodemon
- multer, multer-s3, aws-sdk
- express-validator
- jsonwebtoken

## Install

```console
$ npm install
```

## Start

```console
$ npm start
```

## Docs

```
http://localhost:8080/docs
```

### Notice

- .env파일과 s3.json은 보안의 이유로 gitignore

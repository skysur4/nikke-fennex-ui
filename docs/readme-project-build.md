# 프로젝트 빌드 및 실행 가이드
> `git` 클론 후 환경에 따라 설정  
> 경로는 각자 환경에 따라 다름

```shell$
$ cd opt
$ servis@servis:/opt$ git clone https://github.com/78ResearchLab-Dev/BB-Web.git -b development
Cloning into 'BB-Web'...
Username for 'https://github.com': skysur4
Password for 'https://skysur4@github.com':
remote: Enumerating objects: 138, done.
remote: Counting objects: 100% (138/138), done.
remote: Compressing objects: 100% (130/130), done.
remote: Total 138 (delta 21), reused 115 (delta 2), pack-reused 0
Receiving objects: 100% (138/138), 2.24 MiB | 8.48 MiB/s, done.
Resolving deltas: 100% (21/21), done.
```

## 1. 로컬 환경

프로젝트 폴더에서 아래와 같이 실행

#### 1.1 빌드

로컬은 nginx를 사용하여 프록시 하지 않는 이상 빌드할 필요는 없음

#### 1.2 실행

```shell
$ npm install
$ npm start
```

#### 1.3 접속

브라우저에 [localhost:3000](http://localhost:3000)을 입력하여 접속

## 2. 개발 환경

`/opt/BB-Web`에서 아래와 같이 실행

#### 2.1 빌드

프로젝트 폴더에서 아래와 같이 실행

```
$ npm install
$ npm run build:dev
```

#### 2.2 실행

Nginx 설정 시 http root를 빌드 패스에 맞춰 설정이 되어 있으므로 따로 실행할 필요 없음  
`/nginx/reverse.conf` 파일을 참고

#### 2.3 접속
> ![TIP](https://img.shields.io/badge/☀TIP-82B816)  
> 만약 hosts 파일 수정 시 다른 도메인으로 입력했다면 해당 도메인 입력

브라우저에 [dev.bluebears.co.kr](http://dev.bluebears.co.kr)을 입력하여 접속

---

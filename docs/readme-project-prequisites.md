# 개발 환경 설정 가이드

## 1. hosts 파일 수정
#### 1.1 로컬 환경

관리자 모드로 C:\Windows\System32\drivers\etc\hosts 파일 열기

아래 라인 추가

```shell
211.174.53.34 dev.bluebears.co.kr
```

#### 1.2 개발 환경
```shell
$ vi /etc/hosts
```

```vim
# 아래 추가
127.0.0.1 dev.bluebears.co.kr
```

## 2. nodejs 설치

#### 2.1 로컬 환경

[공식 홈페이지](https://nodejs.org/en/)에서 설치 파일 다운로드 후 설치

#### 2.2 개발 환경

[데비안 노드](https://deb.nodesource.com/) 페이지를 참고하여 설치

```shell
$ curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - 
$ sudo apt-get install -y nodejs
```

> 버전 확인

```shell
$ nodejs -v
v20.15.0
```

---

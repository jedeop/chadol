# 차돌 영상 플레이어

Youtube 영상을 항상 위에 고정되어 있는(Always on Top) 작은 팝업으로 재생할 수 있는 플레이어입니다. (윈도우용)

## Screenshot
![chadolscreenshot2](https://user-images.githubusercontent.com/35953764/79685806-73df7e80-8276-11ea-8e2a-e6ff5dfdb5ea.png)

## 영상 조작법
이 플레이어에서는 재생바를 포함한 Youtube UI를 사용 할 수 없기 때문에 단축키로 조작해야 합니다.  
이 곳에서는 많이 쓸만한 단축키만 소개합니다.  
키 | 기능
--- | --- 
S* | 광고 스킵
Q* | 플레이어 닫기
K | 재생/일시정지
왼쪽 화살표, 오른쪽 화살표 | 앞으로 가기, 뒤로 가기
M | 음소거

*\*별표는 이 프로그램의 단축키. 나머지는 Youtube 단축키*

## 글꼴
이 프로그램은 Mapo한아름 글꼴을 사용하고 있습니다.  
(다만, 프로그램에 내장되어 있지는 않습니다. 글꼴이 없어도 사용하실 수 있습니다만, 글꼴을 정상적으로 보실려면 [여기](https://www.mapo.go.kr/site/main/content/mapo04010201)서 다운로드 받으시면 됩니다.)

## 직접 개발/빌드하기
이 프로그램은 Electron 기반으로 만들어졌기 때문에 직접 빌드하실려면 Node.js와 npm(Node.js 설치 시 같이 설치 됨) 혹은 yarn이 필요합니다.
### 의존성 모듈 설치
```bash
yarn
# or
npm install
```
### 개발 시 (핫-리로드)
```bash
yarn electron:serve
# or
npm run electron:serve
```
### 빌드
```bash
yarn electron:build
# or
npm run electron:build
```

## License
이 프로그램은 MIT 라이선스를 따르고 있습니다. [라이선스 파일 보기](https://github.com/DQSR/chadol/blob/master/LICENSE)

이 프로그램은 [Font Awesome](https://fontawesome.com/) 아이콘을 사용하고 있습니다.

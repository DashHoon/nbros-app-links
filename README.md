# App Link Redirect

GitHub Pages 같은 정적 호스팅에 올려서 접속 기기에 따라 App Store 또는 Google Play로 보내는 링크 프로젝트입니다.

## 앱 목록

| 앱 | 경로 | iOS App ID | Android package |
| --- | --- | --- | --- |
| My체크박스 | `/mycheckbox/` | `480677477` | `com.nbros.mycheckbox` |
| 나의 맛집다이어리 | `/myfoodroad/` | `6749283743` | `com.nbros.myfoodroad` |
| Link.zip | `/linkzip/` | `6758574171` | `com.nbros.linkzip` |
| 나의 추억정리기 | `/memorycleaner/` | `6761705119` | 출시 예정 |
| 나의 배경화면 달력 | `/wallpapercalendar/` | `497904004` | 출시 예정 |

## 동작 방식

- iPhone, iPad 접속자는 App Store로 즉시 이동합니다.
- Android 접속자는 Android package가 있는 앱이면 Google Play로 즉시 이동합니다.
- Android package가 없는 앱은 iOS만 출시된 상태로 안내하고 App Store 버튼만 제공합니다.
- 데스크톱 접속자는 자동 이동하지 않고 App Store / Google Play 버튼을 선택할 수 있습니다.

## 블로그 배너 링크

블로그 배너는 앱별 리다이렉트 URL을 `href`로 넣으면 됩니다. GitHub Pages를 쓰면 `https://dashhoon.github.io/저장소명/앱경로/` 형태가 됩니다.

```html
<a href="https://dashhoon.github.io/nbros-app-links/mycheckbox/" target="_blank" rel="noopener">
  <img src="배너이미지주소" alt="My체크박스 앱 받기">
</a>
```

HTML 배너를 직접 넣을 수 있는 블로그라면 이미지 없이도 아래처럼 사용할 수 있습니다.

```html
<a href="https://dashhoon.github.io/nbros-app-links/mycheckbox/" target="_blank" rel="noopener" style="display:block;max-width:720px;padding:22px 24px;border-radius:8px;background:linear-gradient(135deg,#1769e0,#1aa78c);color:#fff;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <strong style="display:block;font-size:24px;line-height:1.25;">My체크박스</strong>
  <span style="display:block;margin-top:6px;color:rgba(255,255,255,.86);font-size:15px;line-height:1.45;">앱스토어 또는 구글플레이로 바로 이동합니다.</span>
</a>
```

앱별 링크는 다음과 같습니다.

```text
https://dashhoon.github.io/nbros-app-links/mycheckbox/
https://dashhoon.github.io/nbros-app-links/myfoodroad/
https://dashhoon.github.io/nbros-app-links/linkzip/
https://dashhoon.github.io/nbros-app-links/memorycleaner/
https://dashhoon.github.io/nbros-app-links/wallpapercalendar/
```

[blog-banners.html](./blog-banners.html)에서 배너 미리보기를 확인할 수 있습니다.

## GitHub Pages 배포

`https://dashhoon.github.io/nbros-privacy/`처럼 저장소 이름이 URL에 들어가는 GitHub Pages 프로젝트 사이트로 배포하면 됩니다.

1. GitHub에서 새 저장소를 만듭니다. 예: `nbros-app-links`
2. 이 프로젝트 파일을 해당 저장소에 올립니다.
3. 저장소의 `Settings` > `Pages`에서 `Deploy from a branch`를 선택합니다.
4. Branch는 `main`, 폴더는 `/root`로 설정합니다.

배포가 끝나면 앱별 링크는 아래처럼 사용합니다.

```text
https://dashhoon.github.io/nbros-app-links/mycheckbox/
https://dashhoon.github.io/nbros-app-links/myfoodroad/
https://dashhoon.github.io/nbros-app-links/linkzip/
https://dashhoon.github.io/nbros-app-links/memorycleaner/
https://dashhoon.github.io/nbros-app-links/wallpapercalendar/
```

저장소 이름을 `nbros-privacy`로 쓰면 `https://dashhoon.github.io/nbros-privacy/mycheckbox/`처럼 됩니다. 루트(`/저장소명/`)로 접속하면 앱 선택 화면이 표시됩니다.

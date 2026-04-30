(function () {
  "use strict";

  const APPS = {
    mycheckbox: {
      name: "My체크박스",
      iosAppId: "480677477",
      androidPackage: "com.nbros.mycheckbox",
      domains: [],
    },
    myfoodroad: {
      name: "나의 맛집다이어리",
      iosAppId: "6749283743",
      androidPackage: "com.nbros.myfoodroad",
      domains: [],
    },
    linkzip: {
      name: "Link.zip",
      iosAppId: "6758574171",
      androidPackage: "com.nbros.linkzip",
      domains: [],
    },
    memorycleaner: {
      name: "나의 추억정리기",
      iosAppId: "6761705119",
      androidPackage: "",
      domains: [],
    },
    wallpapercalendar: {
      name: "나의 배경화면 달력",
      iosAppId: "497904004",
      androidPackage: "",
      domains: [],
    },
  };

  const PUBLIC_BASE_URL = "https://dashhoon.github.io/nbros-app-links/";

  const HOST_APP_MAP = {
    // 앱별 도메인을 확정한 뒤 아래처럼 추가하세요.
    // "mycheckbox.example.com": "mycheckbox",
    // "myfoodroad.example.com": "myfoodroad",
    // "linkzip.example.com": "linkzip",
    // "memorycleaner.example.com": "memorycleaner",
    // "wallpapercalendar.example.com": "wallpapercalendar",
  };

  const APP_ALIASES = {
    "my-checkbox": "mycheckbox",
    checkbox: "mycheckbox",
    "my-food-road": "myfoodroad",
    myfood: "myfoodroad",
    foodroad: "myfoodroad",
    "link-zip": "linkzip",
    "memory-cleaner": "memorycleaner",
    memories: "memorycleaner",
    "wallpaper-calendar": "wallpapercalendar",
    calendar: "wallpapercalendar",
  };

  function normalizeKey(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/^www\./, "")
      .replace(/\.html$/, "");
  }

  function canonicalAppKey(value) {
    const key = normalizeKey(value);
    return APPS[key] ? key : APP_ALIASES[key] || "";
  }

  function appStoreUrl(app) {
    return `https://apps.apple.com/app/id${app.iosAppId}`;
  }

  function playStoreUrl(app) {
    if (!app.androidPackage) return "";
    return `https://play.google.com/store/apps/details?id=${encodeURIComponent(app.androidPackage)}`;
  }

  function detectPlatform(navigatorLike) {
    const nav = navigatorLike || window.navigator || {};
    const userAgent = normalizeKey(nav.userAgent || nav.vendor || "");
    const platform = normalizeKey(nav.userAgentData?.platform || nav.platform || "");
    const maxTouchPoints = Number(nav.maxTouchPoints || 0);

    if (userAgent.includes("android")) return "android";
    if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
    if (platform === "macintel" && maxTouchPoints > 1) return "ios";

    return "desktop";
  }

  function findAppKey(locationLike, explicitKey) {
    const explicit = canonicalAppKey(explicitKey || window.APP_LINK_APP);
    if (explicit) return explicit;

    const location = locationLike || window.location;
    const searchParams = new URLSearchParams(location.search || "");
    const queryApp = canonicalAppKey(searchParams.get("app"));
    if (queryApp) return queryApp;

    const host = normalizeKey(location.hostname);
    if (HOST_APP_MAP[host]) return HOST_APP_MAP[host];

    const matchedDomain = Object.entries(APPS).find(([, app]) =>
      app.domains.some((domain) => normalizeKey(domain) === host),
    );
    if (matchedDomain) return matchedDomain[0];

    const pathSegments = (location.pathname || "").split("/").filter(Boolean);
    const matchedPathKey = pathSegments
      .map((segment) => canonicalAppKey(segment))
      .find(Boolean);

    return matchedPathKey || "";
  }

  function renderShell(content) {
    const root = document.getElementById("app");
    if (!root) return;
    root.innerHTML = `<section class="panel">${content}</section>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderChooser() {
    const items = Object.entries(APPS)
      .map(([key, app]) => {
        const stores = app.androidPackage ? "iOS / Android" : "iOS";
        return `
          <li>
            <a href="./${key}/">
              ${escapeHtml(app.name)}
              <span>${stores}</span>
            </a>
          </li>
        `;
      })
      .join("");

    renderShell(`
      <p class="eyebrow">App Link</p>
      <h1>이동할 앱을 선택하세요</h1>
      <p class="muted">앱별 도메인이 연결되면 이 선택 화면 없이 바로 스토어로 이동합니다.</p>
      <ul class="app-list">${items}</ul>
    `);
  }

  function renderManualLinks(app, platform, appKey) {
    const iosUrl = appStoreUrl(app);
    const androidUrl = playStoreUrl(app);
    const description = platform === "desktop"
      ? "PC 또는 Mac에서는 사용하는 휴대폰에 맞는 스토어를 선택하세요."
      : "자동 이동이 시작되지 않으면 아래 버튼으로 스토어를 선택하세요.";
    const qrBlock = platform === "desktop" ? renderQrBlock(app, appKey) : "";
    const androidButton = androidUrl
      ? `<a class="button secondary" href="${androidUrl}">Google Play로 이동</a>`
      : `<span class="button disabled" aria-disabled="true">Android 출시 예정</span>`;
    const notice = platform === "android" && !androidUrl
      ? `<p class="notice">이 앱은 현재 iOS만 출시되어 있습니다. Android 버전은 추후 출시 예정입니다.</p>`
      : "";

    renderShell(`
      <p class="eyebrow">App Link</p>
      <h1>${escapeHtml(app.name)}</h1>
      <p class="muted">${description}</p>
      ${notice}
      <div class="actions">
        <a class="button" href="${iosUrl}">App Store로 이동</a>
        ${androidButton}
      </div>
      ${qrBlock}
    `);
  }

  function appLinkUrl(appKey) {
    return `${PUBLIC_BASE_URL}?app=${encodeURIComponent(appKey)}`;
  }

  function renderQrBlock(app, appKey) {
    const qrTargetUrl = appLinkUrl(appKey);
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=192x192&margin=10&data=${encodeURIComponent(qrTargetUrl)}`;

    return `
      <div class="qr-panel">
        <img class="qr-code" src="${escapeHtml(qrSrc)}" alt="${escapeHtml(app.name)} 링크 QR 코드" width="136" height="136" loading="lazy" referrerpolicy="no-referrer">
        <div>
          <p class="qr-title">휴대폰으로 바로 열기</p>
          <p class="qr-copy">휴대폰 카메라로 QR 코드를 스캔하면 배포된 앱 링크가 열리고, 기기에 맞는 스토어로 이동합니다.</p>
        </div>
      </div>
    `;
  }

  function redirectTo(url) {
    window.location.replace(url);
  }

  function start(locationLike, navigatorLike, explicitKey) {
    const appKey = findAppKey(locationLike, explicitKey);
    const app = APPS[appKey];
    const platform = detectPlatform(navigatorLike);

    if (!app) {
      renderChooser();
      return;
    }

    renderManualLinks(app, platform, appKey);

    if (platform === "ios") {
      redirectTo(appStoreUrl(app));
      return;
    }

    if (platform === "android" && app.androidPackage) {
      redirectTo(playStoreUrl(app));
    }
  }

  window.AppLinkRedirector = {
    APPS,
    HOST_APP_MAP,
    PUBLIC_BASE_URL,
    appLinkUrl,
    appStoreUrl,
    canonicalAppKey,
    detectPlatform,
    findAppKey,
    playStoreUrl,
    start,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => start());
  } else {
    start();
  }
})();

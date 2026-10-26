# 人格测试（崩铁 × 原神）

一个纯静态、零后端的双游戏同人人格测试站。起始页选择世界：

- **崩坏：星穹铁道**（根目录）：32 位乘员，快速 24 题 / 详细 36 题 / 专业 48 题
- **原神：提瓦特**（`genshin/`）：40 位同路人（含挪德卡莱与至冬），同款三档题库

两个世界的流程一致：答题 → 结果分析（人格画像、四维星图、逐轴解读）→ 人格图鉴收集 → 生成分享卡。所有数据（解锁记录、上次结果、答题进度）只保存在访客自己的浏览器里，不收集任何信息。

## 本地预览

```bash
python3 -m http.server 4173
# 打开 http://127.0.0.1:4173
```

直接双击 `index.html` 也能玩，但「生成分享卡」的导出功能需要 http 环境。

## 目录结构

```
index.html                  起始页（选择崩铁 / 原神）
hsr/index.html              崩铁起始页
test.html / unlocked.html   崩铁版：答题与人格图鉴
genshin/index.html          原神起始页
genshin/test.html 等        原神版：答题与人格图鉴
docs/                       崩铁题库 JSON、schema 与出题规范
genshin/docs/               原神题库（复用崩铁题库，仅情景措辞本地化）
assets/                     起始页与崩铁版的样式、脚本、素材
genshin/assets/             原神版样式、脚本与角色头像
```

改崩铁题目请改 `docs/questions.detailed.json`，改原神题目请改 `genshin/docs/questions.detailed.json`，然后分别重新生成对应目录下的 `assets/js/questions.js`（生成方式见该文件头部注释）。

## 部署

整站就是若干 HTML/JS/CSS/图片，把整个文件夹传到任意静态托管平台即可，无需构建：

| 平台 | 特点 |
|---|---|
| Cloudflare Pages / GitHub Pages / Netlify | 免费、无需备案，国内访问速度不稳定 |
| 腾讯云 COS / 阿里云 OSS 静态托管 | 国内访问快，绑定自定义域名需要 ICP 备案 |

步骤（以 Cloudflare Pages 为例）：把本目录推到 GitHub 仓库 → Pages 里选择该仓库、构建命令留空、输出目录填 `/` → 得到 `xxx.pages.dev` 域名。

### 部署后要做的一件小事

把各 HTML 页面里 `og:image` 的相对路径改成绝对地址（否则部分平台抓不到分享缩略图）：

```html
<meta property="og:image" content="https://你的域名/assets/img/og-cover.jpg" />
```

### 微信内置浏览器说明

- 分享卡「长按图片保存」在微信里可用；「下载图片」按钮在 iOS 微信不可用（webview 限制），安卓端建议引导用系统浏览器打开。
- 微信自定义分享卡片（带缩略图的卡片）需要微信 JS-SDK 签名，需要后端支持；不做的情况下，分享出去默认显示网页标题 + 首图。

## 分享卡二维码

两个版本分享卡底部的「扫码即玩」二维码由 `assets/js/qrcode.min.js`（[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)，MIT 协议）在浏览器本地生成，分别指向 `assets/js/share-card.js`（崩铁）与 `genshin/assets/js/share-card.js`（原神）顶部的 `SITE_URL` 常量——更换部署域名时同步修改即可。

## 版权说明

本项目为粉丝二创作品，与 miHoYo / HoYoverse 无关。页面中的角色头像、背景图等素材版权归 miHoYo / HoYoverse 所有，请勿将本项目用于任何商业用途。

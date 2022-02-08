# My custom Bookmark

- [chrome://extensions/](chrome://extensions/)

- [Getting started - chrome extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

- [Chrome Extension reload](https://github.com/arikw/chrome-extensions-reloader)
  - `Alt-Shift-r or Opt-Shift-r`

- [Injecting](https://developer.chrome.com/docs/extensions/reference/action/#injecting-a-content-script-on-click)

- [create-react-extension](https://github.com/VasilyShelkov/create-react-extension)

- [create-react-app을 사용해서 extension만들기](https://jungpaeng.tistory.com/79ㄴ)

## ContentScript만 특이한게 있다.

- [content script import 오류](https://bloodguy.tistory.com/entry/ChromeExtension-ES6-%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-ES6-module)
  - [stackoverflow 글](https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension)

- [module import 오류](https://blog.logrocket.com/common-typescript-module-problems-and-how-to-solve/)

## Parcel react

- https://parceljs.org/recipes/react/

## ContentScript

- [docs](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
  - "Inject with static declarations" 방식으로 했다.
  - 이거때매 진짜 애를 좀 먹었지

- Tailwind css
  - https://parceljs.org/recipes/react/#tailwind-css

## Iframe 동작

해결이 안되서 우회했다.

- [rendering in an iframe](https://dev.to/graftini/rendering-in-an-iframe-in-a-react-app-2boa)

  - iframe내에 뭔가 넣으려면 무조건 portal을
    써야하나봄:https://stackoverflow.com/questions/34743264/how-to-set-iframe-content-of-a-react-component

  - [css 지정하는 방법](https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39)

- [iframe resizer](https://github.com/davidjbradshaw/iframe-resizer)
  - [react](https://github.com/davidjbradshaw/iframe-resizer-react)

- [react frame component](https://github.com/ryanseddon/react-frame-component)

## Lerna

- [lerna](https://youtu.be/j0FiMekdeOs)

## Bookmark

https://developer.chrome.com/docs/extensions/reference/bookmarks/

## Message

https://developer.chrome.com/docs/extensions/mv3/messaging/

## Ionic icons

https://ionic.io/ionicons

## Intrinsic Elements

https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements

## How to install sibling

- npx lerna add shared-types@1.0.0 --scope=content-scripts --dev
- https://github.com/lerna/lerna/tree/main/commands/add#readme

- I don't understand the difference between lerna boostrap vs lerna link.

## Publish

https://developer.chrome.com/docs/webstore/publish/

## lerna 지우고 yarn workspace 한번 해보자

- https://nuhends.tistory.com/58
- [원티드랩 글](https://medium.com/wantedjobs/lerna%EC%99%80-yarn-workspaces%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%ED%8C%A8%ED%82%A4%EC%A7%80-%EA%B4%80%EB%A6%AC-429d2a685486)

## type만 있는 패키지 만드는 방법???

이건 걍 지워야하려나

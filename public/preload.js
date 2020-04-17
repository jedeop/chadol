// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require('electron')

ipcRenderer.once('ready', () => {
  const video = document.querySelector('video')
  const style = document.createElement('style')
  style.innerHTML = `
    body {
      overflow: hidden !important;
    }
    body * {
      display: none;
    }
    video {
      display: block !important;
      position: fixed !important;
      top: 0px !important;
      left: 0px !important;
      width: 100vw !important;
      height: 100vh !important;
      -webkit-app-region: drag;
    }
    .exitBtn {
      position: fixed;
      right: 20px;
      top: 20px;
      width: 30px;
      height: 30px;
      background-color: hsla(0, 0%, 50%, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      -webkit-app-region: no-drag;
      transition: background-color .3s ease-in-out;
      font-size: 15px;
      cursor: pointer;
    }
    .exitBtn:hover {
      background-color: hsla(0, 0%, 50%, 0.4);
    }
  `
  document.head.appendChild(style)
  document.body.appendChild(video)

  const exitBtn = document.createElement('div')
  exitBtn.innerText = '×'
  exitBtn.classList.add('exitBtn')
  exitBtn.addEventListener('click', () => {
    window.close()
  })
  document.body.appendChild(exitBtn)
  document.addEventListener('keydown', (e) => {
    if (e.key === 's') document.querySelector('.ytp-ad-skip-button').click()
  })
})

const {ipcRenderer, shell} = require('electron')
window.addEventListener('DOMContentLoaded', () => {
    
    const customTitlebar = require('custom-electron-titlebar');
 
    const titlebar = new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#24292e'),
    });
    titlebar.updateTitle('GitApp - ' + require('./package.json').version);
    /*const div = document.getElementsByTagName('header')[0];
    div.setAttribute('style', 'position:fixed!important');
    div.style.top = '10';
    div.style.left = '0';
    div.style.width = '100%';
    div.style.zIndex = '99998';
    const main = document.getElementsByTagName('main')[0];
    const first = main.getElementsByTagName('div')[0];
    first.style.paddingTop = '10%';*/
});

window.onload = function () {
    const bar = document.getElementsByClassName("titlebar")[0];
    bar.innerHTML = bar.innerHTML + `
    <a id="back">
      <img style="width:15px" src="data:image/png;base64,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">
    </a>
    `;
    document.getElementById("back").onclick = function (e) {
        e.preventDefault();
        window.history.back();
    }
}
window.onbeforeunload = function (e) {
    if(!document.activeElement.href.includes('github.')) {
        shell.openExternal(document.activeElement.href);
        return false;
    }; 
}
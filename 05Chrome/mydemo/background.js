// 简单的一次性请求
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if(message.clearAllCache) {
//     console.log("try to clear all cache ...");
//     //console.log(sender.tab ? "来自内容脚本：" + sender.tab.url :"来自扩展程序");
//     chrome.storage.local.clear();
//     sendResponse({succes:true});
//   }
//   else console.log("fail to clear cache...");
// });

// 长时间的连接
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "clearCache");
    port.onMessage.addListener(function(message) {
      console.log(message);
      if (message.clearAllCache) {
        console.log("try to clear all cache ...");
        chrome.storage.local.clear();
        port.postMessage({clearedAllCache:true});
      }
    });
  });
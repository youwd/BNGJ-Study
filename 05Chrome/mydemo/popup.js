var clearCacheBtn = document.getElementById("clearCache");
var waitingForClearAara = document.getElementById("waitingForClear");

// 简单一次性请求
// clearCacheBtn.addEventListener("click", function(e) {
//   waitingForClearAara.innerHTML("Clearing Cache, Please Waiting...");
//   chrome.runtime.sendMessage({'clearAllCache': true}, function(response){
//     waitingForClearAara.innerHTML("Clearing Cache, Please Waiting...");
//   });
// });

// 长时间的连接
clearCacheBtn.addEventListener("click", function(e) {
  waitingForClearAara.innerHTML = "Clearing Cache, Please Waiting...";

  var port = chrome.runtime.connect({name:"clearCache"});
  port.postMessage({clearAllCache:true});
  port.onMessage.addListener(function(response) {
    console.log(response);
    waitingForClearAara.innerHTML =
      (response.clearedAllCache ? "Cleared, Please Refresh Your Page To Load New Contents!" : "Fail To Clear Cache");
  });
});
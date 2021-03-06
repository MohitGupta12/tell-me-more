var context = context || {};
(function() {
  // iframe cannot adjust it's own hoverpane, so it must be done through message passing
  // for security reasons, messages are passed through chrome runtime instead of
  // directly to the original window
  document.getElementById('exit-button').addEventListener('click', function() {
    context.iframeUtils.sendMessageToRuntime({
      action: 'tutorial-intro-not-now'
    });
    // chrome.runtime.sendMessage({action: 'tutorial-intro-not-now'});
  });

  document.getElementById('never').addEventListener('click', function() {
    context.iframeUtils.sendMessageToRuntime({
      action: 'tutorial-intro-never'
    });
  });

  document.getElementById('step1').addEventListener('click', function() {
    context.iframeUtils.sendMessageToRuntime({
      action: 'tutorial-start'
    });
  });
})();

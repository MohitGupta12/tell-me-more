"use strict"

// For URL validation
// Credit to dperini who posted here: https://gist.github.com/dperini/729294
var re_weburl = new RegExp(
  "^" +
    // host name
    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
    // domain name
    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
    // TLD identifier
    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
  "$", "i"
);

// Save user's preference for showing the tutorial
var toggleTutorial = function() {
  var checked = document.getElementById('tutorial').checked;
  chrome.storage.sync.set({
    shouldRunTutorial: checked
  });
};

// Save user's preference for autoshow
// Enable/disable blacklist as a result
var toggleAutoshow = function() {
  var checked = document.getElementById('autoshow').checked;
  if(!checked) {
    var elem = document.getElementById('blacklist-group');
    // If there's an existing class, add new class with a space preceding
    elem.className +=
        elem.className ?
        ' disabled-element' :
        'disabled-element';
  }
  else {
    var elem = document.getElementById('blacklist-group');
    if(elem) {
      // Need to use a regex here in case there was a second class that
      // contained the name 'blacklist-group' (for whatever reason)
      elem.className = elem.className.replace(/\bdisabled-element\b/, '');
    }
  }
  chrome.storage.sync.set({
    autoshow: checked
  });
};


// Add a new URL to autoshow blacklist
var addBlacklistEntry = function() {
  var errorElem = document.getElementById('error');
  errorElem.innerHTML = '';

  var textElem = document.getElementById('new-text');
  var url = textElem.value;
  // domain will be stored without protocol
  // b/c the extension will not discriminate based on those.
  url = url.replace('http://', '');
  url = url.replace('https://', '');
  url = url.split('/', 1)[0];
  // piece together the actual domain
  var domainSplit = url.split('.');
  var domain = domainSplit[domainSplit.length - 2] + '.' +
      domainSplit[domainSplit.length - 1];
  if(!re_weburl.test(domain)){
    errorElem.innerHTML = "Invalid URL format"
  }
  else {
    var option = document.createElement('option');
    option.text = domain;
    document.getElementById('blacklist').add(option);
    textElem.value = '';
    chrome.storage.local.get({
      'blacklist': []
    }, function(results){
      var blacklist = results.blacklist;
      blacklist.push(domain);
      chrome.storage.local.set({blacklist: blacklist});
    });
  }
};

// Remove all the selected entries from the blacklist
var removeBlacklistEntry = function() {
  var entries = document.getElementById('blacklist').options;
  var toRemove = [];
  // To minimize storage calls, we get a list of indices to remove, then
  // remove them all at once
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (entry.selected) {
      toRemove.push(i);
    }
  }
  chrome.storage.local.get({
    'blacklist': []
  }, function(results) {
    var blacklist = results.blacklist;
    var listElem = document.getElementById('blacklist');
    // Iterate through the array in reverse so we can delete items without
    // screwing up the indexes
    for (var j = toRemove.length - 1; j >= 0; j--) {
      blacklist.splice(toRemove[j], 1);
      listElem.remove(toRemove[j]);
    }
    chrome.storage.local.set({blacklist: blacklist});
  });
};

var restoreOptions = function() {
  chrome.storage.sync.get({
    autoshow: true,
    shouldRunTutorial: true
  }, function(results) {
    document.getElementById('tutorial').checked = results.shouldRunTutorial;
    document.getElementById('autoshow').checked = results.autoshow;
    if (!results.autoshow) {
      var elem = document.getElementById('blacklist-group');
      // If there's an existing class, add new class with a space preceding
      elem.className +=
          elem.className ?
          ' disabled-element' :
          'disabled-element';
    }
  });
  chrome.storage.local.get({
    blacklist: []
  }, function(results){
    var blacklist = results.blacklist;
    var listElem = document.getElementById('blacklist');
    for (var i = 0; i < blacklist.length; i++) {
      var option = document.createElement('option');
      option.text = blacklist[i];
      listElem.add(option);
    }
  })
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('tutorial').addEventListener('change', toggleTutorial);
document.getElementById('autoshow').addEventListener('change', toggleAutoshow);
document.getElementById('add').addEventListener('click', addBlacklistEntry);
document.getElementById('remove').addEventListener('click',
    removeBlacklistEntry);

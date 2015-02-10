"use strict";
var layouts = require('log4js').layouts,
  os = require('os'),
  ALY = require('aliyun-sdk');

var _projectName;
var _logStoreName;
var _sls;
var _topic;
/**
 * Sls Appender. Sends log to aliyun sls.
 *
 * @param config object with sls configuration data
 {
      "type": "sls",
      "layout": {
        "type": "pattern",
        "pattern": "%p %c %m"
      },
      "aliyunKey":"key",
      "aliyunSecret":"secret",
      "endpoint":"http://cn-hangzhou.sls.aliyuncs.com",
      "slsProject":"projectName",
      "logStoreName":"logStoreName",
      "topic":"",
      "category": "test"
    }
 */
function slsAppender(config, layout) {

  if (!config.aliyunKey || !config.aliyunSecret || !config.endpoint || !config.slsProject || !config.logStoreName) {
    console.error("aliyun sls config is not ok.");
    return null;
  }
  _topic=config.topic || "";
  layout = layout || layouts.colouredLayout;
  if (!_sls) {
    _projectName = config.slsProject;
    _logStoreName = config.logStoreName;
    _sls = initSls(config.aliyunKey, config.aliyunSecret, config.endpoint);
  }
  return function(loggingEvent) {
    sendLog(_logStoreName, _topic, layout(loggingEvent));
  };
}

function initSls(aliyunKey, aliyunSecret, endpoint) {
  var sls = new ALY.SLS({
    accessKeyId: aliyunKey,
    secretAccessKey: aliyunSecret,
    endpoint: endpoint,
    apiVersion: '2014-11-18'
  });
  return sls;
}

function sendLog(logStoreName, topic, msg) {
  if (!_sls) {
    console.log("sls is null");
    return;
  }
  var msgData = makeSlsData(topic, msg);
  _sls.putLogs({
    projectName: _projectName,
    logStoreName: logStoreName,
    logGroup: {
      logs: msgData,
      topic: topic,
      source: os.hostname()
    }
  }, function(err, data) {
    if (err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);
  });
}

function makeSlsData(topic, msg) {
  var result = [{
    time: Math.floor(new Date().getTime() / 1000),
    contents: [{
      key: topic,
      value: msg
    }]
  }];
  return result;
}


function configure(config) {
  var layout;
  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }
  return slsAppender(config, layout);
}

exports.appender = slsAppender;
exports.configure = configure;
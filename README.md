# log4js-sls-appender
a aliyun sls appender for log4js.

#Installation

    npm install log4js-sls --save

#Configuration

/config/logTest.json

    "appenders": {
      "type": "log4js-sls",
      "layout": {
        "type": "pattern",
        "pattern": "%p %c %m"
      },
      "aliyunKey":"aliyunKey",
      "aliyunSecret":"aliyunSecrect",
      "endpoint":"http://cn-hangzhou.sls.aliyuncs.com",
      "slsProject":"porjectname",
      "logStoreName":"logStoreName",
      "topic":"",
      "category": "test"
    }

#Code example:

    var log4js = require('log4js');
    log4js.configure("./config/logTest.json");
    var logger=log4js.getLogger("test");
    logger.info("hello");

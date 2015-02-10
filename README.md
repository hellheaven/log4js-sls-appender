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
      "aliyunKey":"TKbtY14G3FK4vBpE",
      "aliyunSecret":"dhwYAcQrcDdfcQc5MONddbWOQSiNK0",
      "endpoint":"http://cn-hangzhou.sls.aliyuncs.com",
      "slsProject":"colintest",
      "logStoreName":"logroot",
      "topic":"",
      "category": "test"
    }

#Code example:

    var log4js = require('log4js');
    log4js.configure("./config/logTest.json");
    var logger=log4js.getLogger("test");
    logger.info("hello");

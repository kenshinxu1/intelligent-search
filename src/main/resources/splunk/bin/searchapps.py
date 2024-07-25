# Copyright 2020 Splunk Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import os, sys, hashlib, json
from splunk.persistconn.application import PersistentServerConnectionApplication
import urllib.parse
import urllib.request
import logging, logging.handlers
import splunk


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
log_file_path = os.path.join(os.environ['SPLUNK_HOME'], 'var', 'log', 'splunk', "searchapp.log")
handler = logging.handlers.RotatingFileHandler(log_file_path, maxBytes=5124800, backupCount=4)
formatter = logging.Formatter("%(asctime)s %(levelname)s %(filename)s:%(lineno)d %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)


class SearchApps(PersistentServerConnectionApplication):
    def __init__(self, _command_line, _command_arg):
        super(PersistentServerConnectionApplication, self).__init__()

    # Handle a syncronous from splunkd.
    def handle(self, in_string):
        """
        Called for a simple synchronous request.
        @param in_string: request data passed in
        @rtype: string or dict
        @return: String to return in response.  If a dict was passed in,
                 it will automatically be JSON encoded before being returned.
        """

        logger.info(in_string)
        input = json.loads(in_string)

        url = "https://api.splunkbase.splunk.com/api/v2/apps"
        logger.info("url:" + url)
        params = {
            "query": "",
            "order": "relevance",
            "offset": "0",
            "include": "display_author,icon,categories,support,rating",
            "limit": "8",
        }
        for p in input["query"]:
            params[p[0]] = p[1]
        logger.info(params)

        # 发送HTTP请求并获取响应
        try:
            # 将参数编码并附加到URL中
            encoded_params = urllib.parse.urlencode(params)
            full_url = f"{url}?{encoded_params}"
            logger.info("url:" + full_url)
            with urllib.request.urlopen(full_url) as response:
                # 读取响应内容
                data = response.read().decode("utf-8")
                # 将JSON数据解析为Python对象
                json_data = json.loads(data)
                logger.info(json_data)
                return {"payload": json_data, "status": 200}
        except e:
            logger.info("Failed to retrieve data:", e)
        return {'payload': json_data, 'status': 200}


    def handleStream(self, handle, in_string):
        """
        For future use
        """
        raise NotImplementedError(
            "PersistentServerConnectionApplication.handleStream")

    def done(self):
        """
        Virtual method which can be optionally overridden to receive a
        callback after the request completes.
        """
        pass

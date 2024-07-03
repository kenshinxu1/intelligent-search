#!/usr/bin/env python
# coding=utf-8
#
# Copyright © 2011-2015 Splunk, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"): you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import os, sys, hashlib, json

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "lib"))
from splunklib.searchcommands import dispatch, StreamingCommand, Configuration, Option, validators
import urllib.parse
import urllib.request


@Configuration()
class StreamingTranslate(StreamingCommand):
    """
    The streamingcsc command returns events with a one new field 'fahrenheit'.

    Example:

    ``| makeresults count=5 | eval celsius = random()%100 | streamingcsc``

    returns a records with one new filed 'fahrenheit'.
    """

    def stream(self, records):
        # To connect with Splunk, use the instantiated service object which is created using the server-uri and
        # other meta details and can be accessed as shown below
        # Example:-
        #    service = self.service
        #    info = service.info //access the Splunk Server info


        for record in records:
            if record["input"] != "":
                # 定义请求的URL和参数
                url = "http://api.fanyi.baidu.com/api/trans/vip/translate"
                params = {
                    "q": record["input"],
                    "from": "auto",
                    "to": "en",
                    "appid": "20240514002051752",
                    "salt": "1435660288",
                    "sign": ""
                }
                params["sign"] = hashlib.md5((params["appid"] + params["q"] + params["salt"] + "9n_dmWBxYu6tJ6tJ1SFe").encode('utf-8')).hexdigest()

                # 发送HTTP请求并获取响应
                try:
                    # 将参数编码并附加到URL中
                    encoded_params = urllib.parse.urlencode(params)
                    full_url = f"{url}?{encoded_params}"
                    with urllib.request.urlopen(full_url) as response:
                        # 读取响应内容
                        data = response.read().decode("utf-8")
                        # 将JSON数据解析为Python对象
                        json_data = json.loads(data)
                        record["content"] = json_data["trans_result"][0]["dst"]
                        print("content" + record["content"])
                except urllib.error.URLError as e:
                    print("Failed to retrieve data:", e)
            yield record


dispatch(StreamingTranslate, sys.argv, sys.stdin, sys.stdout, __name__)

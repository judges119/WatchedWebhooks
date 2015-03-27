var xml2js = require('xml2js');
var request = require('request');


module.exports = function newsFeed(url, callback) {
  request({
    uri: url,
    jar: false,
    proxy: false,
    followRedirect: true,
    timeout: 1000 * 30,
    encoding: null,
    rssEncoding: 'UTF-8'
  }, function(err, response, xml) {
    (err) && callback(err, null);
    (xml === null) && callback('Failed to retrieve source!', null);
    if ((typeof response !== "undefined" && response !== null ? response.statusCode : void 0) != null) {
        if (response.statusCode >= 400) {
            callback("Failed to retrieve source! Invalid response code (" + response.statusCode + ")!", null);
        } else {
          (xml.toString().split('<').length < 3) && callback('malformed xml', null);
          var parser = new xml2js.Parser({
            trim: false,
            normalize: true,
            mergeAttrs: true
          });
          parser.addListener('end', function(jsonDOM) {
            (!jsonDOM) && callback("failed to parse xml", null);
            callback(null, jsonDOM.feed);
          });
          parser.addListener("error", function(err) {
            callback(err, null);
          });
          parser.parseString(xml);
        }
    } else {
        callback("Failed to retrieve source! No response code!!", null);
    }
  });
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = require("../../utils/version");
const variable_replacement_1 = require("../../utils/variable-replacement");
const user_agent_1 = require("../../utils/user-agent");
const feedReaders = require("../../../fixtures/regexes/client/feed_readers.json");
class FeedReaderParser {
    constructor(options) {
        this.options = {
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            const result = {
                type: "",
                name: "",
                version: "",
                url: ""
            };
            for (const feedReader of feedReaders) {
                const match = user_agent_1.userAgentParser(feedReader.regex, userAgent);
                if (!match)
                    continue;
                result.type = "feed reader";
                result.name = variable_replacement_1.variableReplacement(feedReader.name, match);
                result.version = version_1.formatVersion(variable_replacement_1.variableReplacement(feedReader.version, match), this.options.versionTruncation);
                result.url = feedReader.url;
                break;
            }
            return result;
        };
        this.options = Object.assign({}, this.options, options);
    }
}
exports.default = FeedReaderParser;

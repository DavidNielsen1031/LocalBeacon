"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.industrySlugs = exports.industryList = exports.industries = void 0;
// Barrel re-export — all industry data lives in ./industry-data/ directory
var index_1 = require("./industry-data/index");
Object.defineProperty(exports, "industries", { enumerable: true, get: function () { return index_1.industries; } });
Object.defineProperty(exports, "industryList", { enumerable: true, get: function () { return index_1.industryList; } });
Object.defineProperty(exports, "industrySlugs", { enumerable: true, get: function () { return index_1.industrySlugs; } });

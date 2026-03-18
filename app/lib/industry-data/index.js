"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.industrySlugs = exports.industryList = exports.industries = void 0;
var home_services_1 = require("./home-services");
var healthcare_1 = require("./healthcare");
var beauty_wellness_1 = require("./beauty-wellness");
var automotive_1 = require("./automotive");
var professional_services_1 = require("./professional-services");
var fitness_recreation_1 = require("./fitness-recreation");
var pet_services_1 = require("./pet-services");
var outdoor_property_1 = require("./outdoor-property");
var events_creative_1 = require("./events-creative");
var food_local_1 = require("./food-local");
var other_local_1 = require("./other-local");
exports.industries = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, home_services_1.homeServices), healthcare_1.healthcare), beauty_wellness_1.beautyWellness), automotive_1.automotive), professional_services_1.professionalServices), fitness_recreation_1.fitnessRecreation), pet_services_1.petServices), outdoor_property_1.outdoorProperty), events_creative_1.eventsCreative), food_local_1.foodLocal), other_local_1.otherLocal);
exports.industryList = Object.values(exports.industries);
exports.industrySlugs = Object.keys(exports.industries);

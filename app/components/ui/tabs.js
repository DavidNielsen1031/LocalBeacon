"use client";
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabsListVariants = void 0;
exports.Tabs = Tabs;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.TabsContent = TabsContent;
var React = require("react");
var class_variance_authority_1 = require("class-variance-authority");
var radix_ui_1 = require("radix-ui");
var utils_1 = require("@/lib/utils");
function Tabs(_a) {
    var className = _a.className, _b = _a.orientation, orientation = _b === void 0 ? "horizontal" : _b, props = __rest(_a, ["className", "orientation"]);
    return (<radix_ui_1.Tabs.Root data-slot="tabs" data-orientation={orientation} orientation={orientation} className={(0, utils_1.cn)("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)} {...props}/>);
}
var tabsListVariants = (0, class_variance_authority_1.cva)("rounded-lg p-[3px] group-data-[orientation=horizontal]/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col", {
    variants: {
        variant: {
            default: "bg-muted",
            line: "gap-1 bg-transparent",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
exports.tabsListVariants = tabsListVariants;
function TabsList(_a) {
    var className = _a.className, _b = _a.variant, variant = _b === void 0 ? "default" : _b, props = __rest(_a, ["className", "variant"]);
    return (<radix_ui_1.Tabs.List data-slot="tabs-list" data-variant={variant} className={(0, utils_1.cn)(tabsListVariants({ variant: variant }), className)} {...props}/>);
}
function TabsTrigger(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<radix_ui_1.Tabs.Trigger data-slot="tabs-trigger" className={(0, utils_1.cn)("focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent", "data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:text-foreground", "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100", className)} {...props}/>);
}
function TabsContent(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<radix_ui_1.Tabs.Content data-slot="tabs-content" className={(0, utils_1.cn)("flex-1 outline-none", className)} {...props}/>);
}

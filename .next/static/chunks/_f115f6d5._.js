(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_f115f6d5._.js", {

"[project]/app/virtual-tryon-result/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const VirtualTryOnResultPage = ()=>{
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const matchingAnalysis = searchParams.get('matchingAnalysis');
    const [formattedAnalysis, setFormattedAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VirtualTryOnResultPage.useEffect": ()=>{
            if (matchingAnalysis) {
                setFormattedAnalysis(formatMatchingAnalysis(matchingAnalysis));
            }
        }
    }["VirtualTryOnResultPage.useEffect"], [
        matchingAnalysis
    ]);
    const formatMatchingAnalysis = (rawString)=>{
        const lines = [];
        const pattern = /\*\*(.*?)\*\*[:：]?\s*([^*]*)/g;
        let match;
        while((match = pattern.exec(rawString)) !== null){
            const rawKey = match[1]?.trim() || '';
            const rawValue = match[2]?.trim() || '';
            const key = rawKey.replace(/[:：]+$/, '');
            const value = rawValue.replace(/^[:：]+/, '');
            if (key && value) {
                if (key === 'Matching Description') {
                    lines.push(`\n${key}: ${value}`);
                } else {
                    lines.push(`${key}: ${value}`);
                }
            }
        }
        return lines.join('\n');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans flex items-center justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "w-full max-w-4xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 whitespace-pre-line",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-blue-300 mb-6 text-center",
                    children: "Fit Analysis"
                }, void 0, false, {
                    fileName: "[project]/app/virtual-tryon-result/page.js",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg text-gray-200",
                    children: formattedAnalysis || 'No analysis available. Please upload your photo and clothing item to generate a fit analysis.'
                }, void 0, false, {
                    fileName: "[project]/app/virtual-tryon-result/page.js",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/virtual-tryon-result/page.js",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/virtual-tryon-result/page.js",
        lineNumber: 41,
        columnNumber: 5
    }, this);
};
_s(VirtualTryOnResultPage, "xSMtoWoc+DCEMSJEz8ee1DV47rI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = VirtualTryOnResultPage;
const __TURBOPACK__default__export__ = VirtualTryOnResultPage;
var _c;
__turbopack_context__.k.register(_c, "VirtualTryOnResultPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_f115f6d5._.js.map
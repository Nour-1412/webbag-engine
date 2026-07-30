/*
========================================
WebBag Configuration
========================================
*/

const WebBagConfig = {

    appName: "WebBag",

    toolName: "Background Remover",

    version: "1.0.0",

    maxFileSize: 10 * 1024 * 1024,

    acceptedTypes: [

        "image/png",

        "image/jpeg",

        "image/jpg",

        "image/webp"

    ],

    downloadFileName: "webbag-background-removed.png",

    debug: false

};

Object.freeze(WebBagConfig);

window.WebBagConfig = WebBagConfig;

console.log(
    "%cWebBag Config Loaded",
    "color:#2563eb;font-weight:bold;"
);
/*
====================================
Preview Cleanup
====================================
*/

window.addEventListener("beforeunload", () => {

    try {

        if (originalPreview.src.startsWith("blob:")) {

            URL.revokeObjectURL(originalPreview.src);

        }

        if (resultPreview.src.startsWith("blob:")) {

            URL.revokeObjectURL(resultPreview.src);

        }

    }

    catch (e) {

        console.warn(e);

    }

});

/*
====================================
Application Ready
====================================
*/

console.log(
    "%cWebBag Background Remover Ready",
    "color:#22c55e;font-size:15px;font-weight:bold;"
);


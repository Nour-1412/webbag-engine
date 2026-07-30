/*
====================================
WebBag Background Engine
Version 1.0
====================================
*/

class BackgroundEngine {

    constructor() {

        this.selectedFile = null;
        this.resultBlob = null;

    }

    setFile(file) {

        this.selectedFile = file;

    }

    hasFile() {

        return this.selectedFile !== null;

    }

    getFile() {

        return this.selectedFile;

    }

    clear() {

        this.selectedFile = null;
        this.resultBlob = null;

    }

}

window.BackgroundEngine = BackgroundEngine;
/*
====================================
Image Validation
====================================
*/

BackgroundEngine.prototype.validateFile = function () {

    if (!this.selectedFile) {

        throw new Error("لم يتم اختيار صورة.");

    }

    if (!this.selectedFile.type.startsWith("image/")) {

        throw new Error("الملف المختار ليس صورة.");

    }

    const maxSize = WebBagConfig.maxFileSize;

    if (this.selectedFile.size > maxSize) {

        throw new Error("حجم الصورة أكبر من 10MB.");

    }

    return true;

};

/*
====================================
Preview
====================================
*/

BackgroundEngine.prototype.createPreview = function () {

    this.validateFile();

    return URL.createObjectURL(this.selectedFile);

};
/*
====================================
Background Removal
====================================
*/

BackgroundEngine.prototype.remove = async function () {

    this.validateFile();

    if (typeof WebBagRemoveBackground === "undefined") {

    throw new Error("محرك إزالة الخلفية غير متوفر.");

    }

    try {

       const result = await WebBagRemoveBackground.process(this.selectedFile);

const outputBlob = result.image; 

        this.resultBlob = outputBlob;

        return outputBlob;

    }

    catch (error) {

        console.error(error);

        throw new Error("حدث خطأ أثناء إزالة الخلفية.");

    }

};

/*
====================================
Download Result
====================================
*/

BackgroundEngine.prototype.download = function (

    fileName = WebBagConfig.downloadFileName

) {

    if (!this.resultBlob) {

        throw new Error("لا توجد صورة جاهزة للتحميل.");

    }

    const url = URL.createObjectURL(this.resultBlob);

    const link = document.createElement("a");

    link.href = url;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

};
/*
====================================
Result Preview
====================================
*/

BackgroundEngine.prototype.getResultPreview = function () {

    if (!this.resultBlob) {

        throw new Error("لا توجد نتيجة متاحة.");

    }

    return URL.createObjectURL(this.resultBlob);

};

/*
====================================
Engine Status
====================================
*/

BackgroundEngine.prototype.isReady = function () {

    return this.selectedFile !== null;

};

BackgroundEngine.prototype.hasResult = function () {

    return this.resultBlob !== null;

};

/*
====================================
Engine Information
====================================
*/

BackgroundEngine.prototype.getInfo = function () {

    return {

        fileName: this.selectedFile
            ? this.selectedFile.name
            : null,

        fileSize: this.selectedFile
            ? this.selectedFile.size
            : 0,

        hasFile: this.hasFile(),

        hasResult: this.hasResult()

    };

};
/*
====================================
Reset Object URLs
====================================
*/

BackgroundEngine.prototype.dispose = function () {

    try {

        if (this.resultBlob) {

            this.resultBlob = null;

        }

        this.selectedFile = null;

    }

    catch (e) {

        console.warn(e);

    }

};

/*
====================================
Export Engine
====================================
*/

window.WebBagBackgroundEngine = BackgroundEngine;

console.log(
    "%cWebBag Background Engine Loaded",
    "color:#2563eb;font-weight:bold;font-size:14px;"
);


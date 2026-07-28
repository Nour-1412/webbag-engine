const imageInput = document.getElementById("imageInput");
const originalPreview = document.getElementById("originalPreview");
const resultPreview = document.getElementById("resultPreview");

const removeBtn = document.getElementById("removeBtn");
const downloadBtn = document.getElementById("downloadBtn");

let resultBlob = null;

/* عرض الصورة الأصلية */

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    originalPreview.src = imageURL;

});

/* إزالة الخلفية */

removeBtn.addEventListener("click", async () => {

    const file = imageInput.files[0];

    if (!file) {

        alert("اختر صورة أولاً");

        return;

    }

    removeBtn.disabled = true;
    removeBtn.textContent = "جارٍ إزالة الخلفية...";

    try {

        const blob = await imglyRemoveBackground(file);

        resultBlob = blob;

        const url = URL.createObjectURL(blob);

        resultPreview.src = url;

    } catch (e) {

        console.error(e);

        alert("حدث خطأ أثناء إزالة الخلفية.");

    }

    removeBtn.disabled = false;
    removeBtn.textContent = "إزالة الخلفية";

});

/* تحميل الصورة */

downloadBtn.addEventListener("click", () => {

    if (!resultBlob) {

        alert("قم بإزالة الخلفية أولاً.");

        return;

    }

    const link = document.createElement("a");

    link.href = URL.createObjectURL(resultBlob);

    link.download = "webbag-background-removed.png";

    link.click();

});

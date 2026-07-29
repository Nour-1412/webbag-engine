const imageInput = document.getElementById("imageInput");
const originalPreview = document.getElementById("originalPreview");
const resultPreview = document.getElementById("resultPreview");

const removeBtn = document.getElementById("removeBtn");
const downloadBtn = document.getElementById("downloadBtn");

let resultBlob = null;
let imageElement = null;

/* ===========================
   اختيار الصورة
=========================== */

imageInput.addEventListener("change", () => {

    const file = imageInput.files[0];

    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    originalPreview.src = imageURL;

    resultPreview.src = "";

    resultBlob = null;

    imageElement = new Image();

    imageElement.src = imageURL;

});

/* ===========================
   إزالة الخلفية
=========================== */

removeBtn.addEventListener("click", async () => {

    if (!imageElement) {

        alert("اختر صورة أولاً");

        return;

    }

    removeBtn.disabled = true;

    removeBtn.textContent = "جارٍ إزالة الخلفية...";

    try {

        await imageElement.decode();

        const blob = await window.removeBackground(imageElement);

        resultBlob = blob;

        const resultURL = URL.createObjectURL(blob);

        resultPreview.src = resultURL;

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

    removeBtn.disabled = false;

    removeBtn.textContent = "إزالة الخلفية";

});

/* ===========================
   تحميل الصورة
=========================== */

downloadBtn.addEventListener("click", () => {

    if (!resultBlob) {

        alert("قم بإزالة الخلفية أولاً.");

        return;

    }

    const link = document.createElement("a");

    link.href = URL.createObjectURL(resultBlob);

    link.download = "background-removed.png";

    link.click();

});

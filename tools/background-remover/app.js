/*
====================================
WebBag Background Remover
====================================
*/

const engine = new WebBagBackgroundEngine();

const imageInput = document.getElementById("imageInput");

const originalPreview = document.getElementById("originalPreview");
const originalPlaceholder = document.getElementById("originalPlaceholder");

const resultPreview = document.getElementById("resultPreview");
const resultPlaceholder = document.getElementById("resultPlaceholder");

const removeBtn = document.getElementById("removeBtn");
const downloadBtn = document.getElementById("downloadBtn");

const loadingSection = document.getElementById("loadingSection");
imageInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    try {

        engine.setFile(file);

        const preview = engine.createPreview();

        originalPreview.src = preview;

        originalPreview.style.display = "block";

        originalPlaceholder.style.display = "none";

    }

    catch (error) {

        alert(error.message);

    }

});
removeBtn.addEventListener("click", async () => {

    if (!engine.hasFile()) {

        alert("الرجاء اختيار صورة أولًا.");

        return;

    }

    try {

        loadingSection.style.display = "block";

        removeBtn.disabled = true;

        downloadBtn.disabled = true;

        await engine.remove();

        const result = engine.getResultPreview();

        resultPreview.src = result;

        resultPreview.style.display = "block";

        resultPlaceholder.style.display = "none";

        downloadBtn.disabled = false;

    }

    catch (error) {

        alert(error.message);

    }

    finally {

        loadingSection.style.display = "none";

        removeBtn.disabled = false;

    }

});
/*
====================================
Download Button
====================================
*/

downloadBtn.addEventListener("click", () => {

    try {

        if (!engine.hasResult()) {

            alert("لا توجد صورة جاهزة للتحميل.");

            return;

        }

        engine.download("webbag-background-removed.png");

    }

    catch (error) {

        alert(error.message);

    }

});
/*
====================================
Reset UI
====================================
*/

function resetResult() {

    resultPreview.src = "";

    resultPreview.style.display = "none";

    resultPlaceholder.style.display = "block";

}

function disableButtons() {

    removeBtn.disabled = true;

    downloadBtn.disabled = true;

}

function enableButtons() {

    removeBtn.disabled = false;

    downloadBtn.disabled = false;

}
/*
====================================
New Image Selection
====================================
*/

imageInput.addEventListener("click", () => {

    resetResult();

});
/*
====================================
Loading UI
====================================
*/

function showLoading() {

    loadingSection.style.display = "block";

}

function hideLoading() {

    loadingSection.style.display = "none";

}

/*
====================================
Image Result
====================================
*/

function showResult(imageURL) {

    resultPreview.src = imageURL;

    resultPreview.style.display = "block";

    resultPlaceholder.style.display = "none";

        }
/*
====================================
Run Engine
====================================
*/

async function processImage() {

    try {

        disableButtons();

        showLoading();

        const result =
            await WebBagRemoveBackground.process(
                engine.getFile()
            );

        const preview =
            engine.getResultPreview();

        showResult(preview);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

    finally {

        hideLoading();

        enableButtons();

    }

                           }
/*
====================================
Remove Button
====================================
*/

removeBtn.addEventListener("click", () => {

    processImage();

});
/*
====================================
Keyboard Shortcuts
====================================
*/

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        if (engine.hasFile()) {

            processImage();

        }

    }

});

/*
====================================
Drag & Drop
====================================
*/

const uploadCard = document.querySelector(".upload-card");

uploadCard.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadCard.classList.add("dragging");

});

uploadCard.addEventListener("dragleave", () => {

    uploadCard.classList.remove("dragging");

});

uploadCard.addEventListener("drop", async (event) => {

    event.preventDefault();

    uploadCard.classList.remove("dragging");

    const file = event.dataTransfer.files[0];

    if (!file) return;

    try {

        engine.setFile(file);

        const preview = engine.createPreview();

        originalPreview.src = preview;

        originalPreview.style.display = "block";

        originalPlaceholder.style.display = "none";

        resetResult();

    }

    catch (error) {

        alert(error.message);

    }

});
/*
====================================
Startup
====================================
*/

disableButtons();

loadingSection.style.display = "none";

imageInput.value = "";
/*
====================================
UI Messages
====================================
*/

function showSuccess(message = "تمت إزالة الخلفية بنجاح.") {

    console.log(message);

}

function showError(message) {

    console.error(message);

    alert(message);

}

/*
====================================
Engine Status Check
====================================
*/

function checkEngine() {

    if (typeof WebBagRemoveBackground === "undefined") {

        console.warn("Remove Background Module Not Loaded");

        return false;

    }

    return true;

}

window.addEventListener("load", () => {

    if (!checkEngine()) {

        showError("تعذر تحميل محرك إزالة الخلفية.");

    }

});



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


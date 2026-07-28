/* ==========================
   WebBag Engine v1.0
========================== */

const tools = [

{
name:"إزالة الخلفية",
description:"إزالة خلفية الصور بالذكاء الاصطناعي.",
icon:"🖼️"
},

{
name:"ضغط الصور",
description:"تقليل حجم الصور مع الحفاظ على الجودة.",
icon:"📦"
},

{
name:"تحويل الصور",
description:"تحويل JPG و PNG و WEBP وغيرها.",
icon:"🔄"
},

{
name:"دمج PDF",
description:"دمج ملفات PDF بسهولة.",
icon:"📄"
},

{
name:"تقسيم PDF",
description:"تقسيم ملفات PDF إلى صفحات.",
icon:"✂️"
},

{
name:"تحويل PDF",
description:"تحويل PDF إلى Word أو صور.",
icon:"📚"
}

];

const container = document.getElementById("toolsContainer");

tools.forEach(tool=>{

const card=document.createElement("div");

card.className="tool-card";

card.innerHTML=`

<h3>${tool.icon} ${tool.name}</h3>

<p>${tool.description}</p>

`;

container.appendChild(card);

});

document.getElementById("startBtn").onclick=()=>{

window.scrollTo({

top:document.querySelector(".tools").offsetTop,

behavior:"smooth"

});

};

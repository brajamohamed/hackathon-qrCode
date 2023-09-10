let contentEl = document.getElementById("content");
let widthEl = document.getElementById("width");
let heightEl = document.getElementById("height");
heightEl.disabled = true;
let qrColorEl = document.getElementById("qrColor");
let bgColorEl = document.getElementById("bgColor");
let formatEl = document.getElementById("format");
let formatDiv = document.getElementById("formatDiv");
let generateQr = document.getElementById("generate");
let downloadQr = document.getElementById("download");
// downloadQr.disabled = true;
let output = document.getElementById("qrImg");
widthEl.addEventListener("input", () => {
  heightEl.value = widthEl.value;
});
document.addEventListener("input", () => {
  //   downloadQr.disabled = true;
});

generateQr.addEventListener("click", () => {
  let color = qrColorEl.value.substring(1);
  let bgcolor = bgColorEl.value.substring(1);
  let content = contentEl.value;
  let height = heightEl.value;
  let width = widthEl.value;
  let format = formatEl.value;
  if (verifyForm()) {
    fetch(
      `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${height}&data=${content}&color=${color}&bgcolor=${bgcolor}&format=${format}`
    ).then((qr) => displayqr(qr.url));
  } else {
    console.log("Form error");
  }
});
async function displayqr(img) {
  await console.log(img);
  await output.setAttribute("src", img);
  downloadQr.disabled = false;
}
function verifyForm() {
  let flag = true;
  if (contentEl.value == "") {
    flag = false;
    contentEl.style.border = "2px solid red";
  } else {
    contentEl.style.border = "1px solid";
  }
  if (widthEl.value == "") {
    flag = false;
    widthEl.style.border = "2px solid red";
  } else {
    widthEl.style.border = "1px solid";
  }
  if (heightEl.value == "") {
    flag = false;
    heightEl.style.border = "2px solid red";
  } else {
    heightEl.style.border = "1px solid";
  }
  if (formatEl.value == "") {
    flag = false;
    format.style.border = "2px solid red";
  } else {
    formatDiv.style.border = "1px solid";
  }
  return flag;
}

downloadQr.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Source link:", output.src);
  let link = document.createElement("a");
  link.href = output.src;
  link.setAttribute("download", "downloaded_qr.jpg");
  link.click();
});

let darkMode = document.getElementById("dark");
let lightMode = document.getElementById("light");
window.onload = () => {
  lightMode.click();
};
let stylesheet = document.getElementById("toggleMode");

let parentContainer = document.getElementById("parent");
let col1 = document.getElementById("col1");
let col2 = document.getElementById("col2");

lightMode.addEventListener("click", () => {
  stylesheet.href = "lightmode.css";
  parentContainer.classList.add("bg-success");
  col1.classList.add("bg-warning");
  col2.classList.add("bg-primary");
});
darkMode.addEventListener("click", () => {
  stylesheet.href = "darkmode.css";
  parentContainer.classList.remove("bg-success");
  col1.classList.remove("bg-warning");
  col2.classList.remove("bg-primary");
});

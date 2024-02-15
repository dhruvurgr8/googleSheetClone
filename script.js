const firstRow = document.querySelector(".first-row");
const body = document.querySelector(".second-column");
let columns = 26;
let rows = 100;
for (let i = 1; i <= 26; i++) {
  const col = document.createElement("div");
  col.className = "col";
  col.innerText = String.fromCharCode(i + 64);
  firstRow.append(col);
}
const firstColumn = document.querySelector(".first-column");
for (let i = 1; i <= rows; i++) {
  const rows = document.createElement("div");
  rows.className = "rows";
  rows.innerText = i;
  firstColumn.append(rows);
}
let currentElement = null;
const state = {};
const defaultData = {
  innerText: "",
  fontSize: 16,
  isBold: false,
  isItalic: false,
  isStrike: false,
  align: "left",
  color: "black",
};

function onFocusCell(e) {
  if (currentElement) {
    currentElement.classList.remove("active-cell");
  }
  currentElement = e.target;
  activeCellElement.innerText = selectedCell.id;
  currentElement.classList.add("active-cell");
  applyCellInfoToForm();
}
for (let i = 1; i <= rows; i++) {
  const finalRow = document.createElement("div");
  finalRow.className = "finalRow";
  for (let j = 1; j <= columns; j++) {
    const finalColumn = document.createElement("div");
    finalColumn.contentEditable = "true";
    finalColumn.className = "finalColumn";
    finalColumn.id = `${String.fromCharCode(j + 64)}${i}`;
    finalColumn.addEventListener("focus", onFocusCell);
    finalColumn.addEventListener("click", (e) => {
      currentElement = e.target;
      finalColumn.addEventListener("input", handleOnChange);
    });
    finalRow.append(finalColumn);
  }
  body.append(finalRow);
}
function handleOnChange() {
  if (state[currentElement.id]) {
    state[currentElement.id].innerText = currentElement.innerText;
  } else {
    state[currentElement.id] = {
      ...defaultData,
      innerText: currentElement.innerText,
    };
  }
}
const form = document.getElementById("form");
form.addEventListener("change", () => {
  const data = {
    fontSize: form.fontsize.value,
    isBold: form.isBold.checked,
    isItalic: form.isItalic.checked,
    isStrike: form.isStrike.checked,
    align: form.align.value,
    color: form.textColor.value,
  };
  currentElement.style.fontSize = data.fontSize + "px";
  currentElement.style.fontWeight = data.isBold ? "bold" : "400";
  (currentElement.style.fontStyle = data.isItalic ? "italic" : "none"),
    (currentElement.style.textAlign = data.align);
  currentElement.style.textDecoration = data.isStrike ? "line-through" : "none";
  currentElement.style.color = data.color;
  console.log(data.color);
});
function applyCellInfoToForm() {
  // this function will sync the options inside form with the actual data of cell.

  if (state[currentElement.id]) {
    // Already edited cell
    const data = state[currentElement.id];
    for (let key in data) {
      // key = "isBold"
      // form["isBold"] => <input type="checkbox" />
      if (form[key].type === "checkbox") {
        form[key].checked = data[key]; // data["isBold"] => true | false
      } else form[key].value = data[key];
    }
  } else {
    // Focused for the first time.
    form.reset();
  }
}

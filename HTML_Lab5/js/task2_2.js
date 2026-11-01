"use strict";

/* ===== Завдання 2.2: редагування комірки таблиці ===== */

function startEdit(cell) {
  if (cell.classList.contains("editing")) {
    return;
  }

  const oldText = cell.textContent;
  cell.classList.add("editing");
  cell.textContent = "";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "cell-input";
  input.value = oldText;
  input.setAttribute("aria-label", "Нове значення комірки");

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "cell-save";
  saveBtn.textContent = "зберегти";

  saveBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    cell.classList.remove("editing");
    cell.textContent = input.value;
  });

  cell.appendChild(input);
  cell.appendChild(saveBtn);
  input.focus();
  input.select();
}

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("edit-table");
  const cells = table.getElementsByTagName("td");

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
      startEdit(this);
    });
  }
});

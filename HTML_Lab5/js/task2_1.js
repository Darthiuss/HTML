"use strict";

/* ===== Завдання 2.1: три крапки в кінці тексту блоків div ===== */

function addDots() {
  const blocks = document.querySelectorAll("#task21 .text-block");

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    if (block.dataset.original === undefined) {
      block.dataset.original = block.textContent.trim();
    }
    block.textContent = block.dataset.original + "...";
  }
}

function resetDots() {
  const blocks = document.querySelectorAll("#task21 .text-block");
  blocks.forEach(function (block) {
    if (block.dataset.original !== undefined) {
      block.textContent = block.dataset.original;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-dots").addEventListener("click", addDots);
  document.getElementById("btn-dots-reset").addEventListener("click", resetDots);
});

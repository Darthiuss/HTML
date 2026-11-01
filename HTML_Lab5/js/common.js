"use strict";

const STUDENT = {
  fullName: "Данилюк Єгор Андрійович",
  group: "АнД-31",
  variant: 5
};

document.addEventListener("DOMContentLoaded", function () {
  const fields = {
    "student-name": STUDENT.fullName,
    "student-group": STUDENT.group,
    "student-variant": String(STUDENT.variant)
  };

  for (const id in fields) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = fields[id];
    }
  }
});

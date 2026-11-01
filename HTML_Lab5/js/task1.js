"use strict";

/* ===== Завдання 1: виставки ===== */

const EXHIBITION_DAYS = 7;
const MS_IN_DAY = 24 * 60 * 60 * 1000;

const exhibitions = [
  { theme: "Сучасне українське мистецтво", place: "Мистецький арсенал, Київ", organizer: "Мистецький арсенал", start: "2026-10-26" },
  { theme: "Робототехніка та штучний інтелект", place: "Експоцентр «Либідь», Київ", organizer: "Асоціація інноваційних технологій", start: "2026-10-29" },
  { theme: "Архітектура Києва: від класики до модерну", place: "Будинок архітекторів, Київ", organizer: "", start: "2026-11-01" },
  { theme: "Незалежні видавці та книговиробники", place: "Український дім, Київ", organizer: "", start: "2026-11-04" },
  { theme: "Фотографія: Карпати у кадрі", place: "Галерея «Світло», Івано-Франківськ", organizer: "Фотоклуб «Об'єктив»", start: "2026-11-10" },
  { theme: "Відновлювана енергетика", place: "КПІ ім. Ігоря Сікорського, Київ", organizer: "Енергетичний кластер України", start: "2026-10-15" }
];

let currentDate = new Date();

let html = "";

/* ---------- допоміжні функції ---------- */

function parseDate(text) {
  const parts = text.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return dd + "." + mm + "." + date.getFullYear();
}

function toInputValue(date) {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + mm + "-" + dd;
}

function plural(n, forms) {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

function daysText(n) {
  return n + " " + plural(n, ["день", "дні", "днів"]);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- основні функції ---------- */

function getDaysDiff(from, to) {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / MS_IN_DAY);
}

function getStatus(item) {
  const startDate = parseDate(item.start);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + EXHIBITION_DAYS - 1);

  const daysToStart = getDaysDiff(currentDate, startDate); // > 0 — ще не відкрилась
  const daysToClose = getDaysDiff(currentDate, endDate);   // 0 — сьогодні останній день

  let state;
  if (daysToStart > 0) {
    state = "upcoming";
  } else if (daysToClose < 0) {
    state = "ended";
  } else if (daysToClose === 0) {
    state = "last";
  } else {
    state = "today";
  }

  return {
    state: state,
    daysToStart: daysToStart,
    daysToClose: daysToClose,
    daysAgo: -daysToClose,
    startDate: startDate,
    endDate: endDate
  };
}

function display(item, i, array) {
  const st = getStatus(item);
  let badge = "";
  let extra = "";

  if (st.state === "upcoming") {
    badge = "До відкриття: " + daysText(st.daysToStart);
    extra = "Після відкриття працюватиме " + daysText(EXHIBITION_DAYS) + ".";
  } else if (st.state === "today") {
    badge = "Проводиться сьогодні";
    extra = "До закриття залишилось: " + daysText(st.daysToClose) + ".";
  } else if (st.state === "last") {
    badge = "Проводиться сьогодні";
    extra = "Сьогодні останній день роботи — до закриття залишилось 0 днів.";
  } else {
    badge = "Виставка завершилась";
    extra = "Закрилась " + daysText(st.daysAgo) + " тому.";
  }

  const organizer = item.organizer
    ? escapeHtml(item.organizer)
    : '<span class="warn">Організатор виставки не вказаний</span>';

  return (
    '<article class="exhibition ' + st.state + '">' +
      '<span class="num">Виставка ' + (i + 1) + " з " + array.length + "</span>" +
      "<h3>" + escapeHtml(item.theme) + "</h3>" +
      "<dl>" +
        "<dt>Місце проведення</dt><dd>" + escapeHtml(item.place) + "</dd>" +
        "<dt>Організатор</dt><dd>" + organizer + "</dd>" +
        "<dt>Період роботи</dt><dd>" + formatDate(st.startDate) + " – " + formatDate(st.endDate) + "</dd>" +
      "</dl>" +
      '<span class="badge">' + badge + "</span>" +
      '<span class="extra">' + extra + "</span>" +
    "</article>"
  );
}

function buildSummary() {
  const names = [];
  exhibitions.forEach(function (item) {
    const state = getStatus(item).state;
    if (state === "today" || state === "last") {
      names.push("«" + escapeHtml(item.theme) + "»");
    }
  });

  if (names.length === 0) {
    return '<div class="summary empty">Станом на ' + formatDate(currentDate) +
      " жодна виставка не проводиться.</div>";
  }
  return '<div class="summary"><strong>Станом на ' + formatDate(currentDate) +
    " проводяться (" + names.length + "):</strong> " + names.join(", ") + ".</div>";
}

function ras() {
  const input = document.getElementById("check-date");
  currentDate = input.value ? parseDate(input.value) : new Date();

  html = buildSummary();
  html += '<div class="exhibitions">';
  exhibitions.forEach(function (item, i, array) {
    html += display(item, i, array);
  });
  html += "</div>";

  document.getElementById("output").innerHTML = html;
}

/* ---------- підключення подій ---------- */
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("check-date");
  input.value = toInputValue(new Date());

  document.getElementById("btn-check").addEventListener("click", ras);
  input.addEventListener("change", ras);
});

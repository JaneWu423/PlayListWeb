"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

const submitBtn = document.querySelector("[data-form-btn]");
const form = document.querySelector("[data-form]");

// form submit functionality
submitBtn.addEventListener("click", function () {
  const song = $('input[name="song"]').val().trim();
  const singer = $('input[name="singer"]').val().trim();
  const tags = $('input[name="tags"]').val().trim();
  const user = $('input[name="user"]').val().trim();
  const sung = $('input[name="sung"]').val();
  const lang = $('select[name="lang"]').val();

  // Check if required fields are empty
  if (!song || !lang || !user || !singer ) {
    alert("Please fill in all required fields.");
    return; // Stop further execution
  }

  const date_added = new Date().toLocaleDateString();
  const like = 1;
  const tagsArray = tags.includes(",") ? tags.split(",") : tags.includes(" ") ? tags.split(" ") : tags.includes("，") ? tags.split("，") : [tags];
  const data = {
    song,
    singer,
    lang,
    user,
    date_added,
    like,
    sung,
    tagsArray,
  };

  fetch("/add_songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const eventSource = new EventSource("/updates");

eventSource.onopen = function (event) {
  console.log("Connection opened");
};

eventSource.onerror = function (error) {
  console.error("Error:", error);
};

eventSource.onmessage = function (event) {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
  // reload the page
  location.reload(true);
};
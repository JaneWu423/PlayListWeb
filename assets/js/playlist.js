$(function () {
    console.log("Fetching items...");
  $.ajax({
    url: "/songs",
    method: "GET",
    dataType: "json",
    success: function (items) {
      const itemsContainer = $(".admin-list");
      const itemsContainer1 = $(".shared-list");
      lang = {}
      $.each(items, function (index, item) {
        if (item.user == "admin") {
          const itemElement = $('<li class="song-item"></li>');
          itemElement.html(
            `<h4 class="h4 song-item-title">${
              item.song
            }</h2><p class="song-text">歌手: ${
              item.singer ? item.singer : "-"
            }, 语言: ${item.lang}</p>`
          );
          itemsContainer.append(itemElement);
        } else {
          const itemElement = $('<li class="song-item"></li>');
          itemElement.html(
            `<h4 class="h4 song-item-title">${item.song}</h2><span>Shared by ${item.user}</span><p class="song-text">歌手: ${item.singer? item.singer : "-" }, 语言: ${item.lang}</p>`
          );
          itemsContainer1.append(itemElement);
        }
        lang[item.lang] = lang[item.lang] + 1 || 1;
      });
      const skillContainer = $(".skills-list.content-card");
        $.each(lang, function (langKind, count) {
            per = count / items.length * 100;
            const langList = $('<li class="skills-item"></li>');
            langList.html(
                `<div class="title-wrapper">
                        <h5 class="h5">${langKind}</h5>
                        <data value="${per}">${per}%</data>
                        </div>

                        <div class="skill-progress-bg">
                        <div
                            class="skill-progress-fill"
                            style="width: ${per}%;"
                        ></div>
                        </div>`
            );
            skillContainer.append(langList);
        });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching items:", error);
    },
  });
});

//    <li class="timeline-item">

//     <h4 class="h4 timeline-item-title">University school of the arts</h4>

//     <span>2007 — 2008</span>

//     <p class="timeline-text">
//         Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et
//         quas molestias
//         exceptur.
//     </p>

// </li>

$(function () {
  console.log("Fetching items...");
  $.ajax({
    url: "/songs",
    method: "GET",
    dataType: "json",
    success: function (items) {
      const itemsContainer = $(".admin-list");
      const itemsContainer1 = $(".shared-list");
      lang = {};
      // sort items based on their number of like
      items.sort((a, b) => b.like - a.like);
      $.each(items, function (index, item) {
        if (item.user == "admin") {
          const itemElement = $('<li class="song-item"></li>');
          itemElement.html(
            `<div class="song-layout"><div><h4 class="h4 song-item-title">${
              item.song
            }</h2><p class="song-text">歌手: ${
              item.singer ? item.singer : "-"
            }, 语言: ${
              item.lang
            }</p></div><div class="symbol-item"><span><ion-icon name="heart-half-outline"></ion-icon>${
              item.like
            } 赞</span><span><button onclick="playSkipForward('${
              item.song
            }', '${item.singer}', '${item.lang}')">
  <ion-icon name="play-skip-forward"></ion-icon>
</button>点过 ${item.sung} 次</span>
            </div>`
          );
          itemsContainer.append(itemElement);
        } else {
          const itemElement = $('<li class="song-item"></li>');
          itemElement.html(
            `<div class="song-layout"><div><h4 class="h4 song-item-title">${
              item.song
            }</h2><span>Shared by ${
              item.user
            }</span><p class="song-text">歌手: ${
              item.singer ? item.singer : "-"
            }, 语言: ${
              item.lang
            }</p></div><div class="symbol-item"><span><ion-icon name="heart-half-outline"></ion-icon>${
              item.like
            } 赞</span><span><button onclick="playSkipForward('${
              item.song
            }', '${item.singer}', '${item.lang}')">
  <ion-icon name="play-skip-forward"></ion-icon>
</button>点过 ${item.sung} 次</span>
            </div>`
          );
          itemsContainer1.append(itemElement);
        }
        lang[item.lang] = lang[item.lang] + 1 || 1;
      });
      const skillContainer = $(".skills-list.content-card");
      $.each(lang, function (langKind, count) {
        per = (count / items.length) * 100;
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


function playSkipForward(song, singer, lang) {
  fetch("/edit_songs", {
    method: "post",
    body: JSON.stringify({song, singer, lang}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      if (res.status === 201) {
        console.log("Post successfully created!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

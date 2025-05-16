const videos = [
  { title: "Ders 1", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Fuv59BhKf_Q?si=RC888BmSoPZzc3u6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 2", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IJC2qxkC0CA?si=JJxBYjXhuaGBs6qg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 3", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/EMlNstwTHfU?si=rlGqm_WglxAuym2C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 4", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/kbvIRAz3L7I?si=vtixwq-yvieAH83X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 5", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MQ4n5Bn6fTY?si=kDru58H_d-EhUngb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }
];

function loadVideo(index) {
  const videoPanel = document.getElementById("videoPanel");
  if (videoPanel) {
    videoPanel.innerHTML = videos[index].iframe;

    const buttons = document.querySelectorAll("#videoButtons .video-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    buttons[index].classList.add("active");
  } else {
    console.error("Video panel bulunamadı!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const videoButtons = document.getElementById("videoButtons");
  if (!videoButtons) {
    console.error("videoButtons elementi bulunamadı!");
    return;
  }

  // 5 ders butonunu ekle
  videos.forEach((video, index) => {
    const button = document.createElement("button");
    button.className = "video-btn";
    button.innerHTML = `<i class="fa-solid fa-play"></i> ${video.title}`;
    button.onclick = () => loadVideo(index);
    videoButtons.appendChild(button);
  });

  // Sorulara göre önerilen videoyu yükle
  const responses = JSON.parse(localStorage.getItem("questionStates")) || [];
  let negativeCount = 0;
  responses.forEach(response => {
    if (response.answer === "hayır") negativeCount++;
  });

  const suggestionIndex = Math.min(negativeCount, videos.length - 1);
  loadVideo(suggestionIndex);

  // Arama çubuğu işlevselliği
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      const searchInput = document.getElementById("search-input");
      if (searchInput) {
        searchInput.classList.toggle("active");
      }
    });
  }
});
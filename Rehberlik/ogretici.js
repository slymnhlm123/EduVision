const videos = [
  { title: "Ders 1", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/o5yMRD_WJyk?si=2BT1C3r1j-BCS7uO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 2", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/oyotfQ7-3-8?si=ykyTxYZuotTWCzd_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 3", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/KVd1XIWC1F8?si=_DWnFW0oWgKwXkML" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 4", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/HUZkN2yLKTs?si=iDiaj5xQNuBqdF3U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
  { title: "Ders 5", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/jQr2cpUWluw?si=wSFTsfSZmjELgMHH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }
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
const videos = {
  kisisel: [
    { title: "Stresle Başa Çıkma", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Fuv59BhKf_Q?si=RC888BmSoPZzc3u6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
    { title: "Özgüven Artırma", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IJC2qxkC0CA?si=JJxBYjXhuaGBs6qg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
    { title: "Zaman Yönetimi", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/EMlNstwTHfU?si=rlGqm_WglxAuym2C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }
  ],
  sosyal: [
    { title: "İletişim Teknikleri", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/kbvIRAz3L7I?si=vtixwq-yvieAH83X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
    { title: "Öz Sevgi", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MQ4n5Bn6fTY?si=kDru58H_d-EhUngb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' },
    { title: "Empati kurma becerileri", iframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/G_Cazi9jYLc?si=lmlU_xxLr2VC-X6g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' }
  ]
};

function loadVideo(category, index) {
  const videoPanel = document.getElementById("videoPanel");
  if (videoPanel) {
    videoPanel.innerHTML = videos[category][index].iframe;

    const buttons = document.querySelectorAll("#videoButtons .video-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    if (buttons[index]) buttons[index].classList.add("active");
  } else {
    console.error("Video panel bulunamadı!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category") || "kisisel"; // Varsayılan kategori: kisisel
  const videoButtons = document.getElementById("videoButtons");
  const videoListTitle = document.getElementById("videoListTitle");
  const videoPlayerTitle = document.getElementById("videoPlayerTitle");

  if (!videoButtons) {
    console.error("videoButtons elementi bulunamadı!");
    return;
  }

  if (category === "kisisel" || category === "sosyal") {
    videoListTitle.textContent = category === "kisisel" ? "Kişisel Gelişim" : "Sosyal Gelişim";
    videoPlayerTitle.textContent = category === "kisisel" ? "Kişisel Gelişim Videosu" : "Sosyal Gelişim Videosu";

    // 3 video butonunu ekle
    videos[category].forEach((video, index) => {
      const button = document.createElement("button");
      button.className = "video-btn";
      button.innerHTML = `<i class="fa-solid fa-play"></i> ${video.title}`;
      button.onclick = () => loadVideo(category, index);
      videoButtons.appendChild(button);
    });

    // İlk videoyu yükle
    loadVideo(category, 0);
  } else {
    console.error("Geçersiz kategori: ", category);
  }

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
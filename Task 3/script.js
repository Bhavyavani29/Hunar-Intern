const translations = {
  en: {
    heading: "Unlimited movies, TV shows and more",
    subheading: "Starts at ₹149. Cancel anytime.",
    description: "Ready to watch? Enter your email to create or restart your membership.",
    getStarted: "Get Started",
    trending: "Trending Now",
    faqTitle: "Frequently Asked Questions",
    faq: [
      "What is Netflix?",
      "How much does Netflix cost?",
      "Where can I watch?",
      "How do I cancel?",
      "What can I watch on Netflix?",
      "Is Netflix good for kids?"
    ]
  },
  hi: {
    heading: "अनलिमिटेड फिल्में, टीवी शो और भी बहुत कुछ",
    subheading: "₹149 से शुरू। कभी भी कैंसल करें।",
    description: "देखने के लिए तैयार हैं? अपनी सदस्यता बनाने या फिर से शुरू करने के लिए अपना ईमेल डालें।",
    getStarted: "शुरू करें",
    trending: "अभी ट्रेंडिंग",
    faqTitle: "अक्सर पूछे जाने वाले सवाल",
    faq: [
      "Netflix क्या है?",
      "Netflix की कीमत कितनी है?",
      "मैं कहां देख सकता हूँ?",
      "मैं कैसे रद्द करूं?",
      "Netflix पर मैं क्या देख सकता हूँ?",
      "क्या Netflix बच्चों के लिए अच्छा है?"
    ]
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  document.getElementById('hero-heading').textContent = t.heading;
  document.getElementById('hero-subheading').textContent = t.subheading;
  document.getElementById('hero-description').textContent = t.description;
  document.getElementById('get-started-btn').textContent = t.getStarted;
  document.getElementById('trending-title').textContent = t.trending;
  document.getElementById('faq-title').textContent = t.faqTitle;

  const faqButtons = document.querySelectorAll('.faq-question .faq-text');
  faqButtons.forEach((el, i) => {
    el.textContent = t.faq[i];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const langSelectors = [
    document.getElementById('languageSelect'),
    document.getElementById('languageSelectFooter')
  ];

  langSelectors.forEach(sel => {
    sel.addEventListener('change', (e) => {
      const lang = e.target.value;
      langSelectors.forEach(s => s.value = lang);
      updateLanguage(lang);
    });
  });

  const getStartedBtn = document.getElementById("get-started-btn");
  const trendingSection = document.querySelector(".trending");

  getStartedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    trendingSection.scrollIntoView({ behavior: "smooth" });
  });

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("trending-container");
      container.innerHTML = "";

      data.trendingMovies.forEach((movie, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${movie.thumbnail}" alt="${movie.title}" />
          <span>${index + 1}</span>
        `;
        card.addEventListener("click", () => showMovieModal(movie));
        container.appendChild(card);
      });
    });

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const answer = btn.nextElementSibling;
      if (btn.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0px";
      }
      const symbol = btn.querySelector('.symbol');
      symbol.textContent = symbol.textContent === '+' ? '-' : '+';
    });
  });
});

function showMovieModal(movie) {
  const modal = document.getElementById("movie-modal");
  const videoContainer = document.getElementById("video-container");
  const modalContent = document.querySelector(".modal-content");
  
  modal.style.display = "flex";
  modalContent.style.width = "800px";
  modalContent.style.height = "auto";
  document.getElementById("modal-image").src = movie.thumbnail;
  document.getElementById("modal-title").textContent = movie.title;
  document.getElementById("modal-tags").textContent = `${movie.releaseYear} | ${movie.ageRating} | ${movie.tags.join(", ")}`;
  document.getElementById("modal-description").textContent = movie.description;
  document.getElementById("modal-image").style.display = "block";
  document.getElementById("modal-title").style.display = "block";
  document.getElementById("modal-tags").style.display = "block";
  document.getElementById("modal-description").style.display = "block";
  document.getElementById("watch-btn").style.display = "inline-block";
  videoContainer.innerHTML = "";

  document.getElementById("watch-btn").onclick = () => {
    let embedURL = "";

    if (movie.youtubeLink.includes("watch?v=")) {
      embedURL = movie.youtubeLink.replace("watch?v=", "embed/");
    } else if (movie.youtubeLink.includes("youtu.be/")) {
      const videoId = movie.youtubeLink.split("youtu.be/")[1].split("?")[0];
      embedURL = `https://www.youtube.com/embed/${videoId}`;
    } else {
      alert("Invalid YouTube link");
      return;
    }
    document.getElementById("modal-image").style.display = "none";
    document.getElementById("modal-title").style.display = "none";
    document.getElementById("modal-tags").style.display = "none";
    document.getElementById("modal-description").style.display = "none";
    document.getElementById("watch-btn").style.display = "none";

    videoContainer.innerHTML = `
      <iframe 
        src="${embedURL}?autoplay=1&rel=0" 
        allow="autoplay; encrypted-media" 
        allowfullscreen
        style="width: 100%; height: 450px; border: none; border-radius: 8px;">
      </iframe>
    `;
  };

  document.getElementById("modal-close").onclick = () => {
    modal.style.display = "none";
    videoContainer.innerHTML = "";
    document.getElementById("modal-image").style.display = "block";
    document.getElementById("modal-title").style.display = "block";
    document.getElementById("modal-tags").style.display = "block";
    document.getElementById("modal-description").style.display = "block";
    document.getElementById("watch-btn").style.display = "inline-block";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      videoContainer.innerHTML = "";
    }
  };
}

function scrollTrending(direction) {
  const container = document.getElementById("trending-container");
  const scrollAmount = 300;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}

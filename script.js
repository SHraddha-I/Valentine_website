/**
 * Valentine's Day - Proposal & Couple Quiz
 * No backend; all logic in JS.
 */

(function () {
  'use strict';

  // ---------- Quiz data: 15 questions, 4 options each, correctIndex 0-based ----------
  const QUIZ_DATA = [
    {
      question: 'Where do you want to go for our dream date? 🌹',
      options: ['Cafe ☕', 'Garden 🌸', 'Lake 🌊', 'Mountains ⛰️'],
      correctIndex: 2
    },
    {
      question: 'When did we first meet? 💫',
      options: ['5 Feb', '7 Feb', '9 Feb', '12 Feb'],
      correctIndex: 2
    },
    {
      question: 'When was the proposal date? 💍',
      options: ['14 Feb', '8 feb', '10 feb', '12 feb'],
      correctIndex: 2
    },
    {
      question: 'Who fell in love first? 😜',
      options: ['Me', 'You', 'Both at same time', 'Secretly both 😄'],
      correctIndex: 3
    },
    {
      question: 'What is our favorite way to spend time together? 📱❤️',
      options: [
        'Video calls with nonstop talking',
        'Watching movies together',
        'Phone call on and we stay silent together 💕',
        'Texting all night'
      ],
      correctIndex: 2
    },
    {
      question: 'What makes me smile instantly? 😊',
      options: [
        'Sweet messages',
        'Cute selfies',
        'When you smile',
        'When he does NOT smile and I kiss his face 😘😂'
      ],
      correctIndex: 3
    },
    {
      question: 'What is my favorite nickname from you? 🥹',
      options: ['Baby', 'Love', 'Buggi 🐞❤️', 'Darling'],
      correctIndex: 2
    },
    {
      question: 'Who gets angry first? 😄',
      options: ['You', 'Me 😤', 'Both at same time', 'No one ever'],
      correctIndex: 1
    },
    {
      question: 'What is our real love language? 💌',
      options: [
        'Gifts',
        'Physical touch',
        'Words',
        'Understanding each other without words 💖'
      ],
      correctIndex: 3
    },
    {
      question: 'What food date suits us best? 🍴❤️',
      options: [
        'Candle light dinner',
        'Cafe date',
        'Street food',
        'He feeds me with his hands 🥹💕'
      ],
      correctIndex: 3
    },
    {
      question: 'What do we miss the most in long distance? 😔',
      options: [
        'Holding hands',
        'Hugs',
        'Seeing each other smile',
        'Everything about each other 💔❤️'
      ],
      correctIndex: 3
    },
    {
      question: 'How do we fix misunderstandings? 💬',
      options: [
        'Ignoring',
        'Fighting',
        'Blocking',
        'Talking calmly until we understand each other 💕'
      ],
      correctIndex: 3
    },
    {
      question: 'What keeps our relationship strong despite distance? 💪❤️',
      options: ['Trust', 'Patience', 'Love', 'All of the above 💖'],
      correctIndex: 3
    },
    {
      question: 'What do we dream of the most? 🌈',
      options: ['Trips', 'Dates', 'Meeting sometimes', 'Closing the distance forever 🥹❤️'],
      correctIndex: 3
    },
    {
      question: 'What does our future look like? 💞',
      options: ['Happy', 'Full of love', 'Growing together', 'All of the above forever 💍❤️'],
      correctIndex: 3
    }
  ];

  // Keep floating background cute everywhere
  const HEARTS = ['💖', '❤️', '💕', '💘', '🌹', '💗'];
  const BOMB_EMOJIS = ['💖', '💕', '💘', '😘', '🌹', '❤️'];
  const TOTAL_QUESTIONS = QUIZ_DATA.length;

  // ---------- DOM refs ----------
  let proposalPage, quizPage, memoryPage;
  let resultOverlay, btnYes, btnNo, btnMemories, quizForm, questionsContainer;
  let sweetOverlay, sweetMessageEl, btnCloseSweet;
  let memoryGrid, sparklesBg, btnSlideshow, btnMusic, musicEl;
  let heartsBg;

  function initRefs() {
    proposalPage = document.getElementById('proposal-page');
    quizPage = document.getElementById('quiz-page');
    memoryPage = document.getElementById('memory-page');
    resultOverlay = document.getElementById('result-overlay');
    btnYes = document.getElementById('btn-yes');
    btnNo = document.getElementById('btn-no');
    btnMemories = document.getElementById('btn-memories');
    quizForm = document.getElementById('quiz-form');
    questionsContainer = document.getElementById('questions-container');
    heartsBg = document.getElementById('heartsBg');

    sweetOverlay = document.getElementById('sweet-overlay');
    sweetMessageEl = document.getElementById('sweet-message');
    btnCloseSweet = document.getElementById('btn-close-sweet');

    memoryGrid = document.getElementById('memory-grid');
    sparklesBg = document.getElementById('sparklesBg');
    btnSlideshow = document.getElementById('btn-slideshow');
    btnMusic = document.getElementById('btn-music');
    musicEl = document.getElementById('memory-music');
  }

  function activatePage(pageEl) {
    [proposalPage, quizPage, memoryPage].forEach(function (p) {
      if (p) p.classList.remove('active');
    });
    if (pageEl) pageEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---------- Floating hearts background ----------
  function createFloatingHearts() {
    if (!heartsBg) return;
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart-float';
      heart.textContent = HEARTS[i % HEARTS.length];
      heart.style.left = (5 + i * 10) + '%';
      heart.style.animationDelay = (i * 0.5) + 's';
      heartsBg.appendChild(heart);
    }
  }

  // ---------- NO button: move randomly (impossible to click) ----------
  function moveNoButton() {
    if (!btnNo) return;
    const rect = btnNo.getBoundingClientRect();
    const pad = 20;
    const maxLeft = Math.max(pad, window.innerWidth - rect.width - pad);
    const maxTop = Math.max(pad, window.innerHeight - rect.height - pad);
    const x = pad + Math.random() * (maxLeft - pad);
    const y = pad + Math.random() * (maxTop - pad);
    btnNo.style.position = 'fixed';
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
    btnNo.style.transform = 'translate(0, 0)';
  }

  function setupNoButton() {
    if (!btnNo) return;
    btnNo.addEventListener('mouseenter', moveNoButton);
    btnNo.addEventListener('click', function (e) {
      e.preventDefault();
      moveNoButton();
    });
    btnNo.setAttribute('title', 'No is not an option 😜');
  }

  // ---------- YES: go to quiz page ----------
  function goToQuiz() {
    activatePage(quizPage);
  }

  function setupYesButton() {
    if (btnYes) btnYes.addEventListener('click', goToQuiz);
  }

  // ---------- Build quiz HTML ----------
  function renderQuiz() {
    if (!questionsContainer) return;
    questionsContainer.innerHTML = QUIZ_DATA.map(function (q, index) {
      const name = 'q' + index;
      const optionsHtml = q.options.map(function (opt, optIndex) {
        const id = name + '_' + optIndex;
        return (
          '<li class="option-item">' +
          '<input type="radio" name="' + name + '" id="' + id + '" value="' + optIndex + '">' +
          '<label for="' + id + '">' + opt + '</label>' +
          '</li>'
        );
      }).join('');
      return (
        '<div class="question-block">' +
        '<p class="question-text">' + (index + 1) + '. ' + q.question + '</p>' +
        '<ul class="options-list">' + optionsHtml + '</ul>' +
        '</div>'
      );
    }).join('');
  }

  // ---------- Submit quiz: score and result ----------
  function getResultMessage(score) {
    if (score >= 13) return 'Perfect Match 💖 You know me by heart!';
    if (score >= 8) return 'So sweet 😍 We\'re doing amazing!';
    return 'Still cute 😘 More memories to make!';
  }

  function showResult(score) {
    const titleEl = document.getElementById('result-title');
    const scoreEl = document.getElementById('result-score');
    const messageEl = document.getElementById('result-message');
    const btnClose = document.getElementById('btn-close-result');
    if (titleEl) titleEl.textContent = 'Your Result 💕';
    if (scoreEl) scoreEl.textContent = score + ' / ' + TOTAL_QUESTIONS;
    if (messageEl) messageEl.textContent = getResultMessage(score);
    if (resultOverlay) resultOverlay.classList.remove('hidden');
    if (btnClose) btnClose.onclick = function () { resultOverlay.classList.add('hidden'); };
  }

  // ---------- Memory Lane: popups, bombs, sparkles, slideshow, music ----------
  function ensureSparkles() {
    if (!sparklesBg) return;
    if (sparklesBg.childElementCount > 0) return;
    for (let i = 0; i < 22; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 2.4) + 's';
      sparklesBg.appendChild(s);
    }
  }

  function showSweet(message) {
    if (sweetMessageEl) sweetMessageEl.textContent = message;
    if (sweetOverlay) sweetOverlay.classList.remove('hidden');
  }

  function hideSweet() {
    if (sweetOverlay) sweetOverlay.classList.add('hidden');
  }

  function popBomb(targetEl, emoji) {
    if (!targetEl) return;
    const bomb = document.createElement('span');
    bomb.className = 'memory-bomb';
    bomb.textContent = emoji || BOMB_EMOJIS[Math.floor(Math.random() * BOMB_EMOJIS.length)];
    bomb.style.left = (10 + Math.random() * 80) + '%';
    bomb.style.top = (10 + Math.random() * 70) + '%';
    targetEl.appendChild(bomb);
    window.setTimeout(function () { bomb.remove(); }, 1200);
  }

  function burstHearts(targetEl) {
    if (!targetEl) return;
    for (let i = 0; i < 7; i++) {
      const e = document.createElement('span');
      e.className = 'memory-explosion';
      e.textContent = BOMB_EMOJIS[Math.floor(Math.random() * BOMB_EMOJIS.length)];
      const dx = Math.round((Math.random() - 0.5) * 120);
      const dy = Math.round((Math.random() - 1.1) * 110);
      e.style.setProperty('--dx', dx + 'px');
      e.style.setProperty('--dy', dy + 'px');
      e.style.left = (35 + Math.random() * 30) + '%';
      e.style.top = (25 + Math.random() * 30) + '%';
      targetEl.appendChild(e);
      window.setTimeout(function () { e.remove(); }, 800);
    }
  }

  let bombingTimer = null;
  let memoryLaneSetupDone = false;
  function startPhotoBombing() {
    if (!memoryGrid || bombingTimer) return;
    const cards = Array.from(memoryGrid.querySelectorAll('.memory-card'));
    if (cards.length === 0) return;
    bombingTimer = window.setInterval(function () {
      const card = cards[Math.floor(Math.random() * cards.length)];
      popBomb(card);
    }, 750);
  }

  let slideshowTimer = null;
  let slideshowIndex = 0;
  function stopSlideshow() {
    if (slideshowTimer) window.clearInterval(slideshowTimer);
    slideshowTimer = null;
    if (btnSlideshow) btnSlideshow.textContent = 'Play Memories ▶️';
    if (memoryGrid) {
      Array.from(memoryGrid.querySelectorAll('.memory-card')).forEach(function (c) {
        c.classList.remove('is-highlight');
      });
    }
  }

  function startSlideshow() {
    if (!memoryGrid) return;
    const cards = Array.from(memoryGrid.querySelectorAll('.memory-card'));
    if (cards.length === 0) return;

    if (btnSlideshow) btnSlideshow.textContent = 'Stop Memories ⏸️';
    const highlight = function (idx) {
      cards.forEach(function (c) { c.classList.remove('is-highlight'); });
      const card = cards[idx % cards.length];
      card.classList.add('is-highlight');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      burstHearts(card);
    };

    highlight(slideshowIndex);
    slideshowTimer = window.setInterval(function () {
      slideshowIndex = (slideshowIndex + 1) % cards.length;
      highlight(slideshowIndex);
    }, 1600);
  }

  function toggleSlideshow() {
    if (slideshowTimer) stopSlideshow();
    else startSlideshow();
  }

  async function toggleMusic() {
    if (!musicEl) return;
    const isOff = musicEl.muted || musicEl.paused;

    if (!isOff) {
      musicEl.muted = true;
      musicEl.pause();
      if (btnMusic) btnMusic.textContent = 'Music: Off 🎵';
      return;
    }

    // Try to play (may fail if the file isn't added yet)
    try {
      musicEl.muted = false;
      await musicEl.play();
      if (btnMusic) btnMusic.textContent = 'Music: On 🎶';
    } catch (err) {
      musicEl.muted = true;
      if (btnMusic) btnMusic.textContent = 'Music: Off 🎵';
      console.log('add mp3: Afeemi.mp3');
      showSweet('Add a romantic MP3 named “Afeemi.mp3” in this folder to enable music 🎶');
    }
  }

  function setupMemoryLane() {
    if (memoryLaneSetupDone) return;
    memoryLaneSetupDone = true;

    if (btnCloseSweet) btnCloseSweet.addEventListener('click', hideSweet);
    if (sweetOverlay) {
      sweetOverlay.addEventListener('click', function (e) {
        if (e.target === sweetOverlay) hideSweet();
      });
    }

    if (btnSlideshow) btnSlideshow.addEventListener('click', toggleSlideshow);
    if (btnMusic) btnMusic.addEventListener('click', function () { void toggleMusic(); });

    if (!memoryGrid) return;
    ensureSparkles();
    startPhotoBombing();

    Array.from(memoryGrid.querySelectorAll('.memory-card')).forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        burstHearts(card);
        popBomb(card);
      });

      card.addEventListener('click', function () {
        const caption = card.querySelector('.memory-caption');
        const captionText = caption ? caption.textContent : 'This moment';
        showSweet(captionText + ' — This moment means everything to me 🥰');
      });
    });
  }

  function goToMemoryLane() {
    if (resultOverlay) resultOverlay.classList.add('hidden');
    activatePage(memoryPage);
    setupMemoryLane();
  }

  function handleSubmit(e) {
    e.preventDefault();
    let score = 0;
    QUIZ_DATA.forEach(function (q, index) {
      const name = 'q' + index;
      const selected = document.querySelector('input[name="' + name + '"]:checked');
      if (selected && parseInt(selected.value, 10) === q.correctIndex) score++;
    });
    showResult(score);
  }

  function setupQuiz() {
    renderQuiz();
    if (quizForm) quizForm.addEventListener('submit', handleSubmit);
  }

  // ---------- Init ----------
  function init() {
    initRefs();
    createFloatingHearts();
    setupNoButton();
    setupYesButton();
    setupQuiz();

    if (btnMemories) btnMemories.addEventListener('click', goToMemoryLane);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

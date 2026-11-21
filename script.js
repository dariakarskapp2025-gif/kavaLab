document.addEventListener('DOMContentLoaded', () => {
  // 1. ПЕРЕМИКАЧ ТЕМИ
  const themeBtn = document.getElementById('theme');
  const themeBtnMobile = document.getElementById('theme-m');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('kl_theme', JSON.stringify(theme));
    } catch (e) {}

    if (themeBtn) {
      themeBtn.innerHTML =
        theme === 'light'
          ? '<i></i>Тема: Oat Latte ☀️'
          : '<i></i>Тема: Espresso Shot 🌙';
    }
    if (themeBtnMobile) {
      themeBtnMobile.textContent = theme === 'light' ? '☀️' : '🌙';
    }
  }

  const savedTheme = (() => {
    try {
      return JSON.parse(localStorage.getItem('kl_theme')) || 'dark';
    } catch (e) {
      return 'dark';
    }
  })();
  applyTheme(savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

  // 2. МОБІЛЬНЕ МЕНЮ
  const burger = document.getElementById('burger');
  const closeDrawer = document.getElementById('close');
  const drawer = document.getElementById('drawer');

  if (burger && drawer) {
    burger.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeDrawer && drawer) {
    closeDrawer.addEventListener('click', () => drawer.classList.remove('open'));
  }
  document.addEventListener('click', (e) => {
    if (
      drawer &&
      drawer.classList.contains('open') &&
      !drawer.contains(e.target) &&
      e.target !== burger
    ) {
      drawer.classList.remove('open');
    }
  });

  // 3. РЕЦЕПТИ НАПОЇВ З МЕНЮ НА СТОРІНЦІ recipes.html
  const MENU_RECIPES = [
    {
      id: 'r1',
      cat: 'Холодні напої',
      time: '3 хв • Ice Craft',
      title: 'Еспресо-тонік з сушеним червоним апельсином',
      desc: 'Освіжаючий цитрусовий баланс подвійного еспресо на мікролоті Колумбія та преміального тоніка.',
      price: '125 ₴',
      ingredients: [
        'Подвійний еспресо (Колумбія Уїла) — 36 мл',
        'Преміальний індійський тонік — 150 мл',
        'Кубики кришталевого льоду — 160 г',
        'Слайс дегідратованого червоного апельсина та гілочка розмарину'
      ],
      steps: [
        'Наповніть високий келих великими кубиками льоду доверху.',
        'Налийте охолоджений тонік, залишивши місце для кави.',
        'Повільно влийте свіжозварений еспресо по ложці, щоб утворилися два красиві шари.',
        'Прикрасьте сушеним червоним апельсином та розмарином.'
      ]
    },
    {
      id: 'r2',
      cat: 'Класика та молоко',
      time: '4 хв • Бестселер',
      title: 'Оксамитовий капучино на фундуковому молоці',
      desc: 'Ніжна шовковиста текстура на крафтовому фундуковому молоці з дескрипторами шоколаду та праліне.',
      price: '105 ₴',
      ingredients: [
        'Еспресо на митій Гватемалі — 30 мл',
        'Фундукове молоко Barista — 140 мл',
        'Дрібка тертого смаженого фундука для подачі'
      ],
      steps: [
        'Зваріть щільний шот еспресо у прогріту керамічну чашку 180 мл.',
        'Збийте фундукове молоко паром до температури 60–62 °C до глянцевої мікропіни.',
        'Влийте молоко в центр еспресо технікою лате-арт та присипте крихтою фундука.'
      ]
    },
    {
      id: 'r3',
      cat: 'Матча та альтернатива',
      time: '3 хв • Ceremonial',
      title: 'Церемоніальна матча з лавандовим екстрактом',
      desc: 'Японський зелений чай сорту Уджі першого збору з натуральним холодним настоєм кримської лаванди.',
      price: '130 ₴',
      ingredients: [
        'Церемоніальна матча Uji — 3 г',
        'Очищена вода (75 °C) — 40 мл',
        'Вівсяне або класичне молоко — 150 мл',
        'Натуральний лавандовий екстракт — 15 мл'
      ],
      steps: [
        'Просійте матчу в чаван, додайте воду 75 °C та збийте вінчиком часен W-подібними рухами до густої пінки.',
        'Змішайте тепле або холодне молоко з лавандовим екстрактом.',
        'Поєднайте молочну основу зі збитою матчею.'
      ]
    },
    {
      id: 'r4',
      cat: 'Матча та альтернатива',
      time: '4 хв • Filter Lab',
      title: 'V60 Пуровер Ефіопія Їргачеффе',
      desc: 'Чиста, квітково-ягідна чашка з нотами жасмину, білого персика та стиглої чорниці.',
      price: '110 ₴',
      ingredients: [
        'Зерно Ефіопія Їргачеффе (світле обсмаження) — 18 г',
        'Ремінералізована вода (75 ppm, 93 °C) — 300 мл'
      ],
      steps: [
        'Змочіть паперовий фільтр у воронці V60 гарячою водою та злийте її.',
        'Засипте каву середнього помелу та зробіть блумінг 50 мл води протягом 35 секунд.',
        'Влийте решту води у два підходи круговими рухами до загального часу екстракції 2:45.'
      ]
    },
    {
      id: 'r5',
      cat: 'Авторські напої',
      time: '5 хв • Signature',
      title: 'Солоний карамельний раф Fleur de Sel',
      desc: 'Вершковий десертний напій на основі еспресо, вершків 10% та домашньої карамелі з морською сіллю.',
      price: '120 ₴',
      ingredients: [
        'Подвійний еспресо — 36 мл',
        'Вершки 10% — 130 мл',
        'Крафтова солона карамель — 20 г',
        'Пластівці морської солі Fleur de Sel'
      ],
      steps: [
        'Поєднайте у пітчері свіжозварений еспресо, вершки та солону карамель.',
        'Збийте суміш паром одночасно з піною до однорідної оксамитової консистенції.',
        'Перелийте у прогріту склянку та додайте кілька кристалів солі зверху.'
      ]
    },
    {
      id: 'r6',
      cat: 'Холодні напої',
      time: '12 год • Cold Brew',
      title: 'Колд Брю Кенія з вишневим кордіалом',
      desc: 'Напій холодного настоювання 14 годин із яскравою ягідною кислотністю та шовковистим післясмаком.',
      price: '115 ₴',
      ingredients: [
        'Концентрат Cold Brew Кенія АА — 120 мл',
        'Домашній вишневий кордіал — 25 мл',
        'Великий куб льоду — 1 шт.'
      ],
      steps: [
        'Покладіть у рокс-келих великий прозорий куб льоду.',
        'Влийте вишневий кордіал та охолоджений концентрат Колд Брю.',
        'Обережно перемішайте барною ложкою 5–7 секунд.'
      ]
    }
  ];

  const recipesPageGrid = document.querySelector('main .rec-grid');
  if (recipesPageGrid && !document.querySelector('.build')) {
    if (recipesPageGrid.children.length === 0) {
      recipesPageGrid.innerHTML = MENU_RECIPES.map(
        (r) => `
        <article class="rec" id="${r.id}" data-cat="${r.cat}">
          <div class="k">${r.time}</div>
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
          <details>
            <summary>Відкрити рецепт та інгредієнти</summary>
            <h4>Інгредієнти:</h4>
            <ul>${r.ingredients.map((i) => `<li>${i}</li>`).join('')}</ul>
            <h4>Приготування:</h4>
            <ol>${r.steps.map((s) => `<li>${s}</li>`).join('')}</ol>
          </details>
          <div class="foot">
            <b>${r.price}</b>
            <a href="constructor.html" class="btn">Зібрати схожий →</a>
          </div>
        </article>
      `
      ).join('');
    }
  }

  // 4. ПОШУК ТА ФІЛЬТРАЦІЯ В МЕНЮ І РЕЦЕПТАХ
  const filterBtns = document.querySelectorAll('.filters button');
  const searchInput = document.querySelector('.search input');
  const countLabel = document.querySelector('.count span');

  function filterCatalog() {
    const cardsToFilter = document.querySelectorAll('.dish, .rec:not(.custom-rec)');
    if (!cardsToFilter.length) return;

    const activeBtn = document.querySelector('.filters button.on');
    const activeCat = activeBtn
      ? (activeBtn.getAttribute('data-cat') || activeBtn.textContent).trim().toLowerCase()
      : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    cardsToFilter.forEach((card) => {
      const cardCat = (card.getAttribute('data-cat') || '').trim().toLowerCase();
      const text = card.textContent.toLowerCase();

      const isAll =
        !activeBtn ||
        activeCat === 'all' ||
        activeCat === 'усі' ||
        activeCat === 'всі' ||
        activeCat === 'усі рецепти' ||
        activeCat === 'усі напої';

      const matchCat = isAll || cardCat === activeCat || cardCat.includes(activeCat);
      const matchSearch = !query || text.includes(query);

      if (matchCat && matchSearch) {
        card.hidden = false;
        card.style.display = '';
        visibleCount++;
      } else {
        card.hidden = true;
        card.style.display = 'none';
      }
    });

    if (countLabel) {
      countLabel.textContent = `Показано позицій: ${visibleCount}`;
    }
  }

  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('on'));
        btn.classList.add('on');
        filterCatalog();
      });
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', filterCatalog);
  }
  filterCatalog();

  // 5. ЗБЕРЕЖЕННЯ ТА ВІДОБРАЖЕННЯ РЕЦЕПТІВ КОРИСТУВАЧА
  const STORAGE_KEY = 'kl_custom_recipes';

  function getSavedRecipes() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveRecipesList(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function renderUserSavedRecipes() {
    const savedHeading = Array.from(document.querySelectorAll('h1, h2, h3')).find((h) =>
      /Мої збережені рецепти/i.test(h.textContent)
    );
    if (!savedHeading) return;

    let container = document.getElementById('user-saved-recipes-grid');
    if (!container) {
      container = document.createElement('div');
      container.id = 'user-saved-recipes-grid';
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
      container.style.gap = '20px';
      container.style.marginTop = '24px';

      const subText = savedHeading.nextElementSibling;
      if (subText && subText.tagName === 'P') {
        subText.insertAdjacentElement('afterend', container);
      } else {
        savedHeading.insertAdjacentElement('afterend', container);
      }
    }

    const list = getSavedRecipes();
    if (!list.length) {
      container.innerHTML =
        '<p style="color: var(--muted); font-size: 14px; grid-column: 1 / -1;">Поки що немає збережених напоїв. Зберіть напій у конструкторі вище та натисніть «Зберегти рецепт у профіль».</p>';
      return;
    }

    container.innerHTML = list
      .map(
        (item, idx) => `
        <article class="rec custom-rec" style="background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 10px;">
          <div class="k">✦ Мій авторський рецепт</div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
            <h3 style="font-family: var(--serif); font-size: 20px; color: var(--accent); margin: 0;">${item.title}</h3>
            <b style="font-family: var(--serif); font-size: 20px; color: var(--green-light); white-space: nowrap;">${item.total} ₴</b>
          </div>
          <p style="font-size: 13px; color: var(--muted); line-height: 1.5; margin: 0;">${item.details.join(' • ')}</p>
          <div class="foot" style="margin-top: auto; padding-top: 12px; display: flex; justify-content: flex-end;">
            <button type="button" data-del-recipe="${idx}" style="background: transparent; border: 1px solid var(--line); color: var(--text); border-radius: 8px; padding: 6px 12px; font-size: 12px; cursor: pointer;">
              ✕ Видалити
            </button>
          </div>
        </article>
      `
      )
      .join('');
  }

  document.addEventListener('click', (e) => {
    const delBtn = e.target.closest('[data-del-recipe]');
    if (!delBtn) return;
    const index = Number(delBtn.getAttribute('data-del-recipe'));
    const updated = getSavedRecipes();
    updated.splice(index, 1);
    saveRecipesList(updated);
    renderUserSavedRecipes();
  });

  // 6. КОНСТРУКТОР НАПОЮ (constructor.html)
  const buildForm = document.querySelector('.build');
  let currentDrink = {
    title: 'Мій Лате (M)',
    details: ['Розмір: M', 'Основа: Лате'],
    total: 85
  };

  if (buildForm) {
    const inputs = buildForm.querySelectorAll('.opt input');
    const cup = buildForm.querySelector('.cup');
    const l1 = buildForm.querySelector('.cup .l1');
    const l2 = buildForm.querySelector('.cup .l2');
    const l3 = buildForm.querySelector('.cup .l3');
    const previewTitle = buildForm.querySelector('.preview h3');
    const sizeBadge = buildForm.querySelector('.preview .hd span:last-child');
    const sumBox = buildForm.querySelector('.sum');
    const saveBtn = buildForm.querySelector('.preview .btn');

    function updateConstructor() {
      let baseName = 'Лате';
      let sizeName = 'M';
      let total = 0;
      const rows = [];
      const toppings = [];
      let hasSyrup = false;

      inputs.forEach((inp) => {
        if (!inp.checked) return;

        const label = inp.closest('.opt');
        const step = inp.closest('.step');
        const stepTitle = step ? step.querySelector('h2')?.textContent || '' : '';
        const name = label.querySelector('b')?.textContent.trim() || inp.value || '';
        const priceText = label.querySelector('em')?.textContent || label.textContent;
        const priceMatch = priceText.match(/(\d+)\s*₴/);
        const price = priceMatch
          ? parseInt(priceMatch[1], 10)
          : Number(inp.dataset.price || 0);

        total += price;

        if (/Розмір/i.test(stepTitle) || /^(S|M|L)$/i.test(name)) {
          sizeName = name.toUpperCase();
        } else if (/основа/i.test(stepTitle)) {
          baseName = name;
          rows.push({ label: 'Основа', val: `${name} (${price} ₴)` });
        } else if (inp.type === 'checkbox' || /Топінги|акценти/i.test(stepTitle)) {
          toppings.push(name);
          if (/сироп|карамель|ваніль/i.test(name)) hasSyrup = true;
        } else {
          const cleanStep = stepTitle.replace(/^\d+\s*/, '').trim();
          rows.push({
            label: cleanStep || 'Параметр',
            val: price > 0 ? `${name} (+${price} ₴)` : name
          });
        }
      });

      if (toppings.length) {
        rows.push({ label: 'Добавки', val: toppings.join(', ') });
      }

      const fullTitle = `Мій ${baseName} (${sizeName})`;
      currentDrink = {
        title: fullTitle,
        details: rows.length
          ? rows.map((r) => `${r.label}: ${r.val}`)
          : [`Розмір: ${sizeName}`, `Основа: ${baseName}`],
        total: total || 85
      };

      if (previewTitle) previewTitle.textContent = fullTitle;
      if (sizeBadge) sizeBadge.textContent = `РОЗМІР: ${sizeName}`;

      if (cup) {
        cup.classList.remove('size-S', 'size-M', 'size-L', 'matcha', 'has-syrup');
        cup.classList.add(`size-${sizeName}`);
        if (/матча/i.test(baseName)) cup.classList.add('matcha');
        if (hasSyrup) cup.classList.add('has-syrup');
      }
      if (l1) l1.textContent = toppings[0] || 'Пінка / Топінг';
      if (l2) {
        const milkRow = rows.find((r) => /молоко/i.test(r.label));
        l2.textContent = milkRow ? milkRow.val.split(' (')[0] : 'Молоко / Вода';
      }
      if (l3) l3.textContent = baseName;

      if (sumBox) {
        const rowsHtml = rows
          .map((r) => `<div><span>${r.label}</span><span>${r.val}</span></div>`)
          .join('');
        sumBox.innerHTML = `
          ${rowsHtml}
          <div class="tot"><span>Разом до сплати</span><b>${currentDrink.total} ₴</b></div>
        `;
      }

      if (saveBtn) {
        saveBtn.innerHTML = `🔖 Зберегти рецепт у профіль • ${currentDrink.total} ₴`;
      }
    }

    inputs.forEach((inp) => inp.addEventListener('change', updateConstructor));
    updateConstructor();
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .btn, a');
    if (!btn || !/Зберегти рецепт/i.test(btn.textContent)) return;

    e.preventDefault();
    const list = getSavedRecipes();
    list.unshift({
      title: currentDrink.title,
      details: [...currentDrink.details],
      total: currentDrink.total
    });
    saveRecipesList(list);
    renderUserSavedRecipes();

    const oldHtml = btn.innerHTML;
    btn.innerHTML = '✓ Рецепт збережено!';
    setTimeout(() => {
      btn.innerHTML = oldHtml;
    }, 1400);

    const savedContainer = document.getElementById('user-saved-recipes-grid');
    if (savedContainer) {
      savedContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  renderUserSavedRecipes();

  // 7. ФОРМА БРОНЮВАННЯ (about.html)
  const bookForm = document.querySelector('.book .form');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✅ Дякуємо! Вашу заявку прийнято. Ми звʼяжемося з вами найближчим часом.');
      bookForm.reset();
    });
  }

  // 8. КАРУСЕЛЬ 1: НАПОЇ З МЕНЮ (images/coffee-1.png .. coffee-6.png + автопарсинг з menu.html)
  const ctaBox = document.querySelector('.constructor .cta-box');
  if (ctaBox && !ctaBox.querySelector('.cta-carousel-wrap')) {
    const defaultMenuDrinks = [
      {
        src: 'images/coffee-1.png',
        tag: 'Класика',
        price: '75 ₴',
        name: 'Еспресо Допіо',
        desc: 'Насичений подвійний шот свіжообсмаженої арабіки з густою крема.'
      },
      {
        src: 'images/coffee-2.png',
        tag: 'Бестселер',
        price: '95 ₴',
        name: 'Оксамитовий Капучино',
        desc: 'Ідеальний баланс еспресо та глянцевої мікропіни фермерського молока.'
      },
      {
        src: 'images/coffee-3.png',
        tag: 'Ніжний',
        price: '105 ₴',
        name: 'Флет Вайт',
        desc: 'Подвійний рістрето з шовковистим молоком та яскравим кавовим профілем.'
      },
      {
        src: 'images/coffee-4.png',
        tag: 'Авторський',
        price: '120 ₴',
        name: 'Солона Карамель Лате',
        desc: 'Ніжний лате з домашньою карамеллю та пластівцями морської солі.'
      },
      {
        src: 'images/coffee-5.png',
        tag: 'Матча',
        price: '130 ₴',
        name: 'Церемоніальна Матча Лате',
        desc: 'Японський зелений чай Uji першого збору з вівсяним або класичним молоком.'
      },
      {
        src: 'images/coffee-6.png',
        tag: 'Ice Craft',
        price: '125 ₴',
        name: 'Еспресо-тонік Цитрус',
        desc: 'Освіжаючий мікс подвійного еспресо, тоніка та сушеного червоного апельсина.'
      }
    ];

    function buildCtaSlides(drinksList) {
      let wrap = ctaBox.querySelector('.cta-carousel-wrap');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'cta-carousel-wrap';
        ctaBox.insertBefore(wrap, ctaBox.firstChild);
      }

      wrap.innerHTML = `
        <div class="swiper cta-swiper">
          <div class="swiper-wrapper">
            ${drinksList
              .map(
                (d) => `
              <div class="swiper-slide">
                <a href="menu.html" class="cta-drink-card">
                  <div class="cta-drink-photo">
                    <img src="${d.src}" alt="${d.name}" loading="lazy">
                    <span class="cta-drink-badge">${d.tag}</span>
                    <span class="cta-drink-price">${d.price}</span>
                  </div>
                  <div class="cta-drink-body">
                    <h4>${d.name}</h4>
                    <p>${d.desc}</p>
                  </div>
                </a>
              </div>
            `
              )
              .join('')}
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
        </div>
      `;

      initAllSwipers();
    }

    // Спочатку малюємо з точними файлами coffee-1..coffee-6
    buildCtaSlides(defaultMenuDrinks);

    // Додатково пробуємо підтягнути актуальні фото/назви/ціни прямо з menu.html
    fetch('menu.html')
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const dishes = Array.from(doc.querySelectorAll('.dish')).slice(0, 8);
        if (!dishes.length) return;

        const parsed = dishes.map((dish, i) => {
          const imgEl = dish.querySelector('img');
          const photoEl = dish.querySelector('.photo');
          let imgSrc = `images/coffee-${(i % 6) + 1}.png`;

          if (imgEl && imgEl.getAttribute('src')) {
            imgSrc = imgEl.getAttribute('src');
          } else if (photoEl && photoEl.getAttribute('style')) {
            const m = photoEl.getAttribute('style').match(/url\(['"]?(.*?)['"]?\)/);
            if (m && m[1]) imgSrc = m[1];
          }

          return {
            src: imgSrc,
            tag: dish.querySelector('.photo span, .k')?.textContent.trim().split(/\s+/)[0] || 'Меню',
            price: dish.querySelector('.foot b')?.textContent.trim() || '110 ₴',
            name: dish.querySelector('h3')?.textContent.trim() || `Напій #${i + 1}`,
            desc: dish.querySelector('p')?.textContent.trim() || ''
          };
        });

        buildCtaSlides(parsed);
      })
      .catch(() => {});
  }

  // 9. КАРУСЕЛЬ 2: ЛОКАЦІЯ НА СТОРІНЦІ ПРО НАС (.where .map)
  const mapBox = document.querySelector('.where .map');
  if (mapBox && !mapBox.querySelector('.map-swiper')) {
    const locationsSlides = [
      {
        src: 'images/card-4.png',
        title: 'Головний зал та еспресо-бар',
        sub: 'Київ, вул. Рейтарська, 15б • La Marzocco KB90'
      },
      {
        src: 'images/hero.png',
        title: 'Ростерія Giesen W15A',
        sub: 'Свіже обсмажування мікролотів щовівторка та пʼятниці'
      },
      {
        src: 'images/card-1.png',
        title: 'Тихий Магнолієвий дворик',
        sub: 'Літня тераса та каппінг-зона у внутрішньому саду'
      },
      {
        src: 'images/card-2.png',
        title: 'Брю-бар альтернативи',
        sub: 'V60, Chemex, Aeropress та вода 75 ppm'
      }
    ];

    const mapSwiperEl = document.createElement('div');
    mapSwiperEl.className = 'swiper map-swiper';
    mapSwiperEl.innerHTML = `
      <div class="swiper-wrapper">
        ${locationsSlides
          .map(
            (s) => `
          <div class="swiper-slide">
            <div class="map-slide">
              <img src="${s.src}" alt="${s.title}">
              <div class="map-slide-caption">
                <b>${s.title}</b>
                <small>${s.sub}</small>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination"></div>
    `;

    mapBox.insertBefore(mapSwiperEl, mapBox.firstChild);
  }
});

// 10. ІНІЦІАЛІЗАЦІЯ УСІХ SWIPER-КАРУСЕЛЕЙ
function initAllSwipers() {
  if (typeof Swiper === 'undefined') return;

  const reviewsEl = document.querySelector('.reviews-swiper');
  if (reviewsEl && !reviewsEl.swiper) {
    new Swiper('.reviews-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 650,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.reviews-swiper .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.reviews-swiper .swiper-button-next',
        prevEl: '.reviews-swiper .swiper-button-prev'
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  const ctaEl = document.querySelector('.cta-swiper');
  if (ctaEl && !ctaEl.swiper) {
    new Swiper('.cta-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 650,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 2400,
        disableOnInteraction: false
      },
      pagination: {
        el: '.cta-swiper .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.cta-swiper .swiper-button-next',
        prevEl: '.cta-swiper .swiper-button-prev'
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  const mapEl = document.querySelector('.map-swiper');
  if (mapEl && !mapEl.swiper) {
    new Swiper('.map-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 750,
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 2800,
        disableOnInteraction: false
      },
      pagination: {
        el: '.map-swiper .swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.map-swiper .swiper-button-next',
        prevEl: '.map-swiper .swiper-button-prev'
      }
    });
  }
}

window.addEventListener('load', () => {
  const typedEl = document.getElementById('typed-slogan');
  if (typedEl && typeof Typed !== 'undefined') {
    typedEl.innerHTML = '';
    new Typed('#typed-slogan', {
      strings: [
        'Свіже обсмажування на ростері Giesen W6A щовівторка.',
        'Авторські рецепти на рослинному та фермерському молоці.',
        'Збери свій унікальний напій у конструкторі за 30 секунд.'
      ],
      typeSpeed: 42,
      backSpeed: 22,
      backDelay: 2200,
      loop: true
    });
  }

  if (typeof Swiper !== 'undefined') {
    initAllSwipers();
  } else if (document.querySelector('.swiper')) {
    const swCss = document.createElement('link');
    swCss.rel = 'stylesheet';
    swCss.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(swCss);

    const swJs = document.createElement('script');
    swJs.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    swJs.onload = initAllSwipers;
    document.head.appendChild(swJs);
  }

  document.querySelectorAll('[data-fancybox]').forEach((el) => {
    const bg = window.getComputedStyle(el).backgroundImage;
    const urlMatch = bg && bg.match(/url\(["']?(.*?)["']?\)/);
    if (urlMatch && urlMatch[1]) {
      el.setAttribute('data-src', urlMatch[1]);
    } else {
      el.removeAttribute('data-fancybox');
      el.removeAttribute('data-src');
    }
  });

  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind('[data-fancybox]', {
      animated: true,
      dragToClose: true
    });
  }
});
/* Menú */
const header = document.querySelector('.header');
const menuButton = document.querySelector('.header-btn__menu');
const closeButton = document.querySelector('.header-btn__close');
const menuPanel = document.querySelector('.header-list');
const menuLinks = document.querySelectorAll('.header-nav__item');

if (header && menuButton && closeButton && menuPanel) {
    const toggleMenu = (shouldOpen) => {
        header.classList.toggle('is-open', shouldOpen);
        document.body.classList.toggle('menu-open', shouldOpen);
        menuButton.setAttribute('aria-expanded', String(shouldOpen));
    };

    menuButton.addEventListener('click', () => toggleMenu(true));
    closeButton.addEventListener('click', () => toggleMenu(false));

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    menuPanel.addEventListener('click', (event) => {
        const clickedMenuItem = event.target.closest('.header-nav__item');
        const clickedCloseButton = event.target.closest('.header-btn__close');

        if (!clickedMenuItem && !clickedCloseButton) {
            toggleMenu(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            toggleMenu(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 780) {
            toggleMenu(false);
        }
    });
}

/*Botón volver arriba*/ 
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    const toggleBackToTop = () => {
        const shouldShow = window.scrollY > 320;
        backToTopButton.classList.toggle('is-visible', shouldShow);
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
}

/*Modo oscuro*/
const themeToggleButton = document.querySelector('.theme-toggle');
const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');

if (themeToggleButton && darkModeStylesheet) {
	const themeIcon = themeToggleButton.querySelector('.theme-toggle__icon');
	const themeText = themeToggleButton.querySelector('.theme-toggle__text');
	const themeStorageKey = '100-imperdibles-theme';

	const applyTheme = (isDarkMode) => {
		darkModeStylesheet.disabled = !isDarkMode;
		themeToggleButton.setAttribute('aria-pressed', String(isDarkMode));
		themeToggleButton.setAttribute('aria-label', isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro');
		themeToggleButton.title = isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

		if (themeIcon) {
			themeIcon.classList.toggle('bi-lightbulb-fill', !isDarkMode);
			themeIcon.classList.toggle('bi-lightbulb-off-fill', isDarkMode);
		}

		if (themeText) {
			themeText.textContent = isDarkMode ? 'Modo claro' : 'Modo oscuro';
		}
	};

	const savedTheme = localStorage.getItem(themeStorageKey);
	applyTheme(savedTheme === 'dark');

	themeToggleButton.addEventListener('click', () => {
		const nextIsDarkMode = darkModeStylesheet.disabled;
		applyTheme(nextIsDarkMode);
		localStorage.setItem(themeStorageKey, nextIsDarkMode ? 'dark' : 'light');
	});
}

/* Mapas */
const cityItems = document.querySelectorAll('.mapas-ciudad');
const categoryContainer = document.querySelector('.ciudad-categorias');
const categoryItems = document.querySelectorAll('.ciudad-categorias__item');
const cityDescriptionText = document.querySelector('.ciudad-description__text');
const cityInfo = document.querySelector('.ciudad-info');
const cityInfoDescription = document.querySelector('.ciudad-info__description');
const cityInfoTitle = document.querySelector('.ciudad-info__title');
const cityInfoText = document.querySelector('.ciudad-info__text');
const cityMapFrame = document.querySelector('.ciudad-mapa iframe');
const cityMapFrameMobile = document.getElementById('city-map-frame-mobile');

const cityContent = {
    cdmx: {
        description: 'Descubre el mapa de CDMX con restaurantes, bares, mercados, monumentos y espacios culturales imperdibles.',
        mapTitle: 'vivo-CDMX'
    },
    mty: {
        description: 'Descubre un mapa interactivo con los mejores lugares de Monterrey para comer, pasear, salir y conocer la ciudad.',
        mapUrl: 'https://view.genially.com/69e2a78d9abc6961c142dba9',
        mapTitle: 'vivo-MTY',
        mapUrlMobile: 'https://view.genially.com/69f3dfc0bf2c3e1be3fe0910'
    },
    gdl: {
        description: 'Explora un mapa interactivo con los lugares imperdibles de Guadalajara para comer, pasear, conocer y disfrutar.',
        mapUrl: 'https://view.genially.com/69e29e2ac8b0136f86b7e088',
        mapTitle: 'vivo-GDL',
        mapUrlMobile: 'https://view.genially.com/69f3d73ea1868f222344bf86'
    }
};

const categoryContent = {
    restaurantes: {
        title: 'Mejores restaurantes en CDMX para visitar en 2026',
        text: 'Restaurantes imperdibles en CDMX: alta cocina, clasicos capitalinos y lugares para comer delicioso.',
        mapUrl: 'https://view.genially.com/69e1352545a4e9fdba4e5b45',
        mapTitle: 'vivo-CDMX restaurantes',
        mapUrlMobile: 'https://view.genially.com/69f4e3b5a1fba34f66c09a3d'
    },
    bares: {
        title: 'Mejores bares en CDMX para salir de noche',
        text: 'Encuentra bares imperdibles en CDMX: speakeasies, cantinas, terrazas y spots para una gran noche.',
        mapUrl: 'https://view.genially.com/69e14ae5e2490ab05e4fe162',
        mapTitle: 'vivo-CDMX bares',
        mapUrlMobile: 'https://view.genially.com/69f3e67a4b8eb0dd107ece83'
    },
    entretenimiento: {
        title: 'Lugares de entretenimiento en CDMX que debes visitar',
        text: 'Explora los espacios de entretenimiento imperdibles en la Ciudad de México.',
        mapUrl: 'https://view.genially.com/69e2575c68d68ee2450ecba4',
        mapTitle: 'vivo-CDMX entretenimiento',
        mapUrlMobile: 'https://view.genially.com/69f3ebe56a2dab02bffc4157'
    },
    mercados: {
        title: 'Mercados imperdibles en CDMX para comer y comprar',
        text: 'Conoce los mercados más icónicos de CDMX para probar antojitos, comprar recuerdos y vivir la ciudad.',
        mapUrl: 'https://view.genially.com/69e25436d815a318b8030fdb',
        mapTitle: 'vivo-CDMX mercados',
        mapUrlMobile: 'https://view.genially.com/69f3cd54a1fba34f668cf667'
    },
    cultura: {
        title: 'Espacios de cultura en CDMX que debes visitar',
        text: 'Explora museos, recintos culturales y los monumentos, edificios históricos y postales urbanas más emblemáticas de la Ciudad de México.',
        mapUrl: 'https://view.genially.com/69e26063bbd98ccbf42b1653',
        mapTitle: 'vivo-CDMX cultura',
        mapUrlMobile: 'https://view.genially.com/69f6b135e6904d3b185f3e5d'
    }
};

if (
    cityItems.length > 0 &&
    categoryContainer &&
    categoryItems.length > 0 &&
    cityDescriptionText &&
    cityInfo &&
    cityInfoDescription &&
    cityInfoTitle &&
    cityInfoText &&
    cityMapFrame &&
    cityMapFrameMobile
) {
    let activeCityId = 'cdmx';
    let activeCategoryId = 'restaurantes';

    const setMapOnlyLayout = (shouldUseMapOnlyLayout) => {
        cityInfo.classList.toggle('ciudad-info--map-only', shouldUseMapOnlyLayout);
        cityInfoDescription.hidden = shouldUseMapOnlyLayout;
    };

    const clearActiveCategory = () => {
        activeCategoryId = 'restaurantes';

        categoryItems.forEach((item) => {
            item.classList.remove('categoria-active');
        });
    };

    const updateMapFrame = (mapUrl, mapTitle, mapUrlMobile) => {
        if (mapUrl && cityMapFrame) {
            cityMapFrame.src = mapUrl;
            if (mapTitle) {
                cityMapFrame.title = mapTitle;
            }
        }
        if (mapUrlMobile && cityMapFrameMobile) {
            cityMapFrameMobile.src = mapUrlMobile;
            if (mapTitle) {
                cityMapFrameMobile.title = mapTitle;
            }
        }
    };

    const updateCategoryContent = (categoryId) => {
        const categoryData = categoryContent[categoryId];

        if (!categoryData) {
            return;
        }

        activeCategoryId = categoryId;
        cityInfoTitle.textContent = categoryData.title;
        cityInfoText.textContent = categoryData.text;
        updateMapFrame(categoryData.mapUrl, categoryData.mapTitle, categoryData.mapUrlMobile);
        setMapOnlyLayout(false);

        categoryItems.forEach((item) => {
            item.classList.toggle('categoria-active', item.id === categoryId);
        });
    };

    const updateCityContent = (cityId) => {
        const cityData = cityContent[cityId];

        if (!cityData) {
            return;
        }

        activeCityId = cityId;
        cityDescriptionText.textContent = cityData.description;

        cityItems.forEach((item) => {
            item.classList.toggle('mapas-ciudad__active', item.id === cityId);
        });

        const isCdmx = cityId === 'cdmx';
        categoryContainer.hidden = !isCdmx;

        if (isCdmx) {
            if (activeCategoryId) {
                updateCategoryContent(activeCategoryId);
            } else {
                updateCategoryContent('restaurantes');
            }
        } else {
            updateMapFrame(cityData.mapUrl, cityData.mapTitle, cityData.mapUrlMobile);
            clearActiveCategory();
            setMapOnlyLayout(true);
        }
    };

    cityItems.forEach((item) => {
        item.addEventListener('click', () => {
            updateCityContent(item.id);
        });
    });

    categoryItems.forEach((item) => {
        item.addEventListener('click', () => {
            if (activeCityId !== 'cdmx') {
                return;
            }

            updateCategoryContent(item.id);
        });
    });

    updateCityContent(activeCityId);
}

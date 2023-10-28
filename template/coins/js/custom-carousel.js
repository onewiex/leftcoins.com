const state = {};
const carouselList = document.querySelector('.team-carousel__list');
const carouselItems = document.querySelectorAll('.team-carousel__item');
const elems = Array.from(carouselItems);
const carouselBtnsPrev = document.querySelectorAll('.team-carousel__btn_prev');
const carouselBtnsNext = document.querySelectorAll('.team-carousel__btn_next');

carouselBtnsPrev.forEach(carouselBtnPrev => {
  carouselBtnPrev.addEventListener('click', function (event) {
    var prev = document.querySelector('[data-pos="-1"]');
    if (prev) {
      update(prev);
    } else {
      update(document.querySelector('[data-pos="3"]'));
    }
  });
});

carouselBtnsNext.forEach(carouselBtnNext => {
  carouselBtnNext.addEventListener('click', function (event) {
    var next = document.querySelector('[data-pos="1"]');
    if (next) {
      update(next);
    } else {
      update(document.querySelector('[data-pos="-3"]'));
    }
  });
});

carouselList.addEventListener('click', function (event) {
  var newActive = event.target;
  var isItem = newActive.closest('.team-carousel__item');

  if (!isItem || newActive.classList.contains('team-carousel__item_active')) {
    return;
  };
  
  update(newActive);
});

const update = function(newActive) {
  newActive.classList.add("pump");
  setTimeout(() => newActive.classList.remove("pump"), 500);
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const firstprev = elems.find((elem) => elem.dataset.pos == -2);
  const firstlast = elems.find((elem) => elem.dataset.pos == 2);
  const first = elems.find((elem) => elem.dataset.pos == -3);
  const last = elems.find((elem) => elem.dataset.pos == 3);
  
  current.classList.remove('team-carousel__item_active');
  
  [current, prev, next, firstprev, firstlast, first, last].forEach(item => {
    var itemPos = item.dataset.pos;

    item.dataset.pos = getPos(itemPos, newActivePos)
  });

  showSlideInfo(newActive.dataset.slide);
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 3) {
    return -current
  }

  return diff;
}

const showSlideInfo = function(id) {
  let allInfos = document.querySelectorAll(".our-team__slide");
  allInfos.forEach(slide => {
    slide.classList.remove('our-team__slide_show');
    slide.classList.remove('active');
  });

  let active = document.getElementById(`team-slide-${id}`);
  active.classList.add('our-team__slide_show');
  setTimeout(() => document.querySelector('.our-team__slide_show').classList.add('active'), 500)
  
}


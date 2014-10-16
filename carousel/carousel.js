$.Carousel = function ($el) {
  this.$el = $el;
  this.$images = $('div.items > img');
  this.$activeIdx = 0;
  this.$transitioning = false;

  $(this.$images[this.$activeIdx]).addClass("active");
  this.bindSlideEvents();
}

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$.Carousel.prototype.bindSlideEvents = function () {
  var carousel = this;

  $('.slide-left').on('click', function() {
    carousel.slideLeft();
  });

  $('.slide-right').on('click', function() {
    carousel.slideRight();
  });
};

$.Carousel.prototype.slide = function (dir) {
  if (this.$transitioning === true) {
    return;
  }

  var $oldImage = this.$images.eq(this.$activeIdx);
  this.$transitioning = true;

  this.$activeIdx += dir;
  if (this.$activeIdx >= this.$images.length) {
    this.$activeIdx = 0;
  } else if (this.$activeIdx < 0) {
    this.$activeIdx = this.$images.length - 1;
  }

  var $newImage = $(this.$images[this.$activeIdx]);

  var newDirection = (dir > 0 ? "right" : "left");
  var oldDirection = (dir > 0 ? "left" : "right");


  $newImage.addClass('active ' +  newDirection);

  setTimeout( function () {
    $oldImage.addClass(oldDirection);
    $newImage.removeClass('right left');
  }, 0);

  var carousel = this;
  $oldImage.one('transitionend', function() {

    $oldImage.removeClass('active left right');
    carousel.$transitioning = false;
  });
};

$.Carousel.prototype.slideLeft = function () {
  this.slide(-1);
};

$.Carousel.prototype.slideRight = function () {
  this.slide(1);
};



$.Thumbnails = function ($el) {
  this.$el = $el;
  this.$images = $('div.gutter-images > img');
  this.$activeImg = this.$images.first();
  this.$gutterImages = [];
  this.gutterIdx = 0;

  this.activate(this.$activeImg);
  this.bindMouseEvents();
  this.fillGutterImages();
}

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
}

$.Thumbnails.prototype.activate = function($img) {
  var $imgCopy = $img.clone();
  $('div.active').html($imgCopy);
};

$.Thumbnails.prototype.bindMouseEvents = function() {
  var thumbs = this;
  $('div.gutter-images').on("click", 'img', function (event) {
    thumbs.activate($(event.currentTarget));
    thumbs.$activeImg = $(event.currentTarget);
  });

  $('div.gutter-images').on("mouseenter", 'img', function (event) {
    thumbs.activate($(event.currentTarget));
  });

  $('div.gutter-images').on("mouseleave", 'img', function () {
    thumbs.activate(thumbs.$activeImg);
  });

  $('a.left').on('click', function() {
    thumbs.gutterIdx -= 1;
    thumbs.fillGutterImages();
  });

  $('a.right').on('click', function() {
    thumbs.gutterIdx += 1;
    thumbs.fillGutterImages();
  })
};

$.Thumbnails.prototype.fillGutterImages = function () {
  this.$gutterImages = [];
  var i = this.gutterIdx;
  var imgCount = this.$images.length
  if (i >= this.$images.length) {
    i = this.gutterIdx % imgCount;
  } else if (i < 0){
    i = imgCount - (Math.abs(this.gutterIdx) % imgCount);
  }

  while (this.$gutterImages.length < 5) {
    this.$gutterImages.push(this.$images[i]);
    i++
    if (i >= imgCount) {
      i = 0;
    }
  };

  $('div.gutter-images').html(this.$gutterImages);
};

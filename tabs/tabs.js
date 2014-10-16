  $.Tabs = function (el) {
    this.$el = $(el);
    this.$contentTabs = $("#" + this.$el.data("content-tabs"));
    this.$activeTab = this.$contentTabs.find('.active');

    this.bindTabClick();
  }
  $.fn.tabs = function () {
    return this.each(function () {
      new $.Tabs(this);
    });
  };

  $.Tabs.prototype.bindTabClick = function() {
    var tabs = this;

    $('ul.tabs').on("click", "a", function(event) {
      event.preventDefault();

      /* set necessary variables */
      var $clickedLink = $(event.currentTarget);
      var dogId = $clickedLink.attr('href');
      var $newActiveTab = $(dogId);

      /* take active class off of previous active tab, set transitioning */
      tabs.$activeTab.addClass('transitioning');
      tabs.$activeTab.removeClass('active');

      tabs.transitionHandler(tabs.$activeTab, $newActiveTab);

      /* adjust active a href */
      $('a').removeClass('active');
      $clickedLink.addClass('active');

    });

  };


  $.Tabs.prototype.transitionHandler = function ($fadeTab, $newTab) {
    var tabs = this;
    $fadeTab.one('transitionend', function() {
      $fadeTab.removeClass('transitioning');

      $newTab.addClass("active transitioning");
      setTimeout( function () {
        $newTab.removeClass('transitioning');
      }, 0);

      tabs.$activeTab = $newTab;
    });
  }


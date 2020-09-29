define([
  'core/js/adapt'
], function (Adapt) {

  var AnimateMenuView = Backbone.View.extend({

    initialize: function () {
      this.listenTo(Adapt, {
        'remove': this.remove,
        'popup:opened': this.notifyOpened,
        'popup:closed': this.notifyClosed
      });

      this.listenToOnce(Adapt, 'menuView:ready', this.render);
      this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
    },

    render: function () {
      this.firstRun = true;
      this.notifyIsOpen = false;
      this.elementIsInView = true;

      // Check if notify is visible
      if ($('body').children('.notify').css('visibility') == 'visible') {
        this.notifyOpened();
      }

      this.modelID = '.menu';
      this.titleEnabled = false;
      this.bodyEnabled = false;
      this.customEnabled = false;
      this.customItems = [];

      // Title
      if (this.model.get('_animate')._title._isEnabled) {
        this.titleEnabled = true;
        this.titleEffect = this.model.get('_animate')._title._effect;
        $(this.modelID).find('.menu__title-inner').addClass('is-animated');
        $(this.modelID).find('.menu__title-inner').addClass('is-animate-hidden');
      }

      // Body
      if (this.model.get('_animate')._body._isEnabled) {
        this.bodyEnabled = true;
        this.bodyEffect = this.model.get('_animate')._body._effect;
        $(this.modelID).find('.menu__body-inner').addClass('is-animated');
        $(this.modelID).find('.menu__body-inner').addClass('is-animate-hidden');
      }

      // Custom
      if (this.model.get('_animate')._custom._isEnabled) {
        this.customEnabled = true;
        this.customElement = this.model.get('_animate')._custom._element;
        this.customEffect = this.model.get('_animate')._custom._effect;
        // Only apply if an element has been specified
        if (this.customElement !='') {
          $(this.modelID).find('.'+this.customElement).addClass('is-animated');
          $(this.modelID).find('.'+this.customElement).addClass('is-animate-hidden');
        }
        // Custom items
        if (this.customItems.length > 0) {
          for (var i = 0, l = this.customItems.length; i < l; i++) {
            $(this.modelID).find('.'+this.customItems[i]._element).addClass('is-animated');
            $(this.modelID).find('.'+this.customItems[i]._element).addClass('is-animate-hidden');
          }
        }
        // Custom items
        if (this.model.has('_animate') && this.model.get('_animate')._isEnabled && this.model.get('_animate')._custom._items) {
          this.customItems = this.model.get('_animate')._custom._items;
        }
      }

      _.defer(function () {
        this.postRender();
      }.bind(this));
    },

    postRender: function () {
      if (!this.notifyIsOpen) {
        this.animateElements();
      }
    },

    notifyOpened: function () {
      this.notifyIsOpen = true;
    },

    notifyClosed: function () {
      this.notifyIsOpen = false;

      if (this.elementIsInView && this.firstRun) {
        _.delay(function () {
          this.animateElements();
        }.bind(this), 400);
      }
    },

    animateElements: function () {
      this.firstRun = false;

      if (this.titleEnabled) {
        var titleDelay = this.model.get('_animate')._title._delay ? this.model.get('_animate')._title._delay : 0;
        _.delay(function () {
          $(this.modelID).find('.menu__title-inner').addClass(this.titleEffect);
          $(this.modelID).find('.menu__title-inner').removeClass('is-animate-hidden');
        }.bind(this), Math.round(titleDelay * 1000));
      }

      if (this.bodyEnabled) {
        var bodyDelay = this.model.get('_animate')._body._delay ? this.model.get('_animate')._body._delay : 0;
        _.delay(function () {
          $(this.modelID).find('.menu__body-inner').addClass(this.bodyEffect);
          $(this.modelID).find('.menu__body-inner').removeClass('is-animate-hidden');
        }.bind(this), Math.round(bodyDelay * 1000));
      }

      if (this.customEnabled) {
        // Only apply if an element has been specified
        if (this.customElement !='') {
          var customDelay = this.model.get('_animate')._custom._delay ? this.model.get('_animate')._custom._delay : 0;
          _.delay(function () {
            $(this.modelID).find('.'+this.customElement).addClass(this.customEffect);
            $(this.modelID).find('.'+this.customElement).removeClass('is-animate-hidden');
          }.bind(this), Math.round(customDelay * 1000));
        }
        // Custom items
        if (this.customItems.length == 0) return;
        for (var i = 0, l = this.customItems.length; i < l; i++) {
          this.animateItem(this.customItems[i]);
        }
      }
    },

    animateItem: function (item) {
      _.delay(function () {
        $(this.modelID).find('.'+item._element).addClass(item._effect);
        $(this.modelID).find('.'+item._element).removeClass('is-animate-hidden');
      }.bind(this), Math.round(item._delay * 1000));
    }

  });

  return AnimateMenuView;

});

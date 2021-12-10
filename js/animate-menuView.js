import Adapt from 'core/js/adapt';

export default class AnimateMenuView extends Backbone.View {

  initialize() {
    this.listenTo(Adapt, {
      'remove': this.remove,
      'popup:opened': this.notifyOpened,
      'popup:closed': this.notifyClosed
    });

    this.listenToOnce(Adapt, 'menuView:ready', this.render);
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
  }

  render() {
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
      this.titleDelay = this.model.get('_animate')._title._delay ? this.model.get('_animate')._title._delay : 0;
      $(this.modelID).find('.menu__title-inner').addClass('is-animated');
      $(this.modelID).find('.menu__title-inner').addClass('is-animate-hidden');
    }

    // Body
    if (this.model.get('_animate')._body._isEnabled) {
      this.bodyEnabled = true;
      this.bodyEffect = this.model.get('_animate')._body._effect;
      this.bodyDelay = this.model.get('_animate')._body._delay ? this.model.get('_animate')._body._delay : 0;
      $(this.modelID).find('.menu__body-inner').addClass('is-animated');
      $(this.modelID).find('.menu__body-inner').addClass('is-animate-hidden');
    }

    // Custom
    if (this.model.get('_animate')._custom._isEnabled) {
      this.customEnabled = true;
      this.customElement = this.model.get('_animate')._custom._element;
      this.customEffect = this.model.get('_animate')._custom._effect;
      this.customDelay = this.model.get('_animate')._custom._delay ? this.model.get('_animate')._custom._delay : 0;
      // Only apply if an element has been specified
      if (this.customElement !='') {
        $(this.modelID).find('.'+this.customElement).addClass('is-animated');
        $(this.modelID).find('.'+this.customElement).addClass('is-animate-hidden');
      }
      // Custom items
      if (this.customItems.length > 0) {
        for (let i = 0, l = this.customItems.length; i < l; i++) {
          $(this.modelID).find('.'+this.customItems[i]._element).addClass('is-animated');
          $(this.modelID).find('.'+this.customItems[i]._element).addClass('is-animate-hidden');
        }
      }
      // Custom items
      if (this.model.has('_animate') && this.model.get('_animate')._isEnabled && this.model.get('_animate')._custom._items) {
        this.customItems = this.model.get('_animate')._custom._items;
      }
    }

    _.defer(() => {
      this.postRender();
    });
  }

  postRender() {
    if (!this.notifyIsOpen) {
      this.animateElements();
    }
  }

  notifyOpened() {
    this.notifyIsOpen = true;
  }

  notifyClosed() {
    this.notifyIsOpen = false;

    if (this.elementIsInView && this.firstRun) {
      _.delay(() => {
        this.animateElements();
      }, 400);
    }
  }

  animateElements() {
    this.firstRun = false;

    if (this.titleEnabled) {
      _.delay(() => {
        $(this.modelID).find('.menu__title-inner').addClass(this.titleEffect);
        $(this.modelID).find('.menu__title-inner').removeClass('is-animate-hidden');
      }, Math.round(this.titleDelay * 1000));
    }

    if (this.bodyEnabled) {
      _.delay(() => {
        $(this.modelID).find('.menu__body-inner').addClass(this.bodyEffect);
        $(this.modelID).find('.menu__body-inner').removeClass('is-animate-hidden');
      }, Math.round(this.bodyDelay * 1000));
    }

    if (this.customEnabled) {
      // Only apply if an element has been specified
      if (this.customElement !='') {
        _.delay(() => {
          $(this.modelID).find('.'+this.customElement).addClass(this.customEffect);
          $(this.modelID).find('.'+this.customElement).removeClass('is-animate-hidden');
        }, Math.round(this.customDelay * 1000));
      }
      // Custom items
      if (this.customItems.length == 0) return;
      for (let i = 0, l = this.customItems.length; i < l; i++) {
        this.animateItem(this.customItems[i]);
      }
    }
  }

  animateItem(item) {
    _.delay(() => {
      $(this.modelID).find('.'+item._element).addClass(item._effect);
      $(this.modelID).find('.'+item._element).removeClass('is-animate-hidden');
    }, Math.round(item._delay * 1000));
  }
}

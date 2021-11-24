import Adapt from 'core/js/adapt';

export default class AnimateComponentView extends Backbone.View {

  initialize() {
    this.listenTo(Adapt, 'remove', this.removeInViewListeners);
    this.listenTo(Adapt, 'popup:closed', this.notifyClosed);

    this.render();
  }

  render() {
    if (!Adapt.course.get('_animate')) return;

    this.firstRun = true;
    this.elementIsInView = false;

    this.modelID = '.'+this.model.get('_id');

    this.completeElementEnabled = false;
    this.completeElementDelay = 0;

    this.titleEnabled = false;
    this.titleDelay = 0;

    this.bodyEnabled = false;
    this.bodyDelay = 0;

    this.instructionEnabled = false;
    this.instructionDelay = 0;

    this.customEnabled = false;
    this.customDelay = 0;
    this.customItems = [];

    // Complete element
    // Check for global config first and set vars accordingly
    if (Adapt.course.get('_animate')._component._completeElement._isEnabled) {
      this.completeElementEnabled = true;
      this.completeElementEffect = Adapt.course.get('_animate')._component._completeElement._effect;
      this.completeElementDelay = Adapt.course.get('_animate')._component._completeElement._delay;
    }
    // Check against component view config
    if (this.model.has('_animate') && this.model.get('_animate')._isEnabled) {
      if (this.model.get('_animate')._completeElement._isEnabled) {
        this.completeElementEnabled = true;
        this.completeElementEffect = this.model.get('_animate')._completeElement._effect;
        this.completeElementDelay = this.model.get('_animate')._completeElement._delay;
      }
    }

    // Title
    // Check for global config first and set vars accordingly
    if (Adapt.course.get('_animate')._component._title._isEnabled) {
      this.titleEnabled = true;
      this.titleEffect = Adapt.course.get('_animate')._component._title._effect;
      this.titleDelay = Adapt.course.get('_animate')._component._title._delay;
    }
    // Check against component view config
    if (this.model.has('_animate') && this.model.get('_animate')._isEnabled) {
      if (this.model.get('_animate')._title._isEnabled) {
        this.titleEnabled = true;
        this.titleEffect = this.model.get('_animate')._title._effect;
        this.titleDelay = this.model.get('_animate')._title._delay;
      }
    }

    // Body
    // Check for global config first and set vars accordingly
    if (Adapt.course.get('_animate')._component._body._isEnabled) {
      this.bodyEnabled = true;
      this.bodyEffect = Adapt.course.get('_animate')._component._body._effect;
      this.bodyDelay = Adapt.course.get('_animate')._component._body._delay;
    }
    // Check against component view config
    if (this.model.has('_animate') && this.model.get('_animate')._isEnabled) {
      if (this.model.get('_animate')._body._isEnabled) {
        this.bodyEnabled = true;
        this.bodyEffect = this.model.get('_animate')._body._effect;
        this.bodyDelay = this.model.get('_animate')._body._delay;
      }
    }

    // Instruction
    // Check for global config first and set vars accordingly
    if (Adapt.course.get('_animate')._component._instruction._isEnabled) {
      this.instructionEnabled = true;
      this.instructionEffect = Adapt.course.get('_animate')._component._instruction._effect;
      this.instructionDelay = Adapt.course.get('_animate')._component._instruction._delay;
    }
    // Check against component view config
    if (this.model.has('_animate') && this.model.get('_animate')._isEnabled) {
      if (this.model.get('_animate')._instruction._isEnabled) {
        this.instructionEnabled = true;
        this.instructionEffect = this.model.get('_animate')._instruction._effect;
        this.instructionDelay = this.model.get('_animate')._instruction._delay;
      }
    }

    // Custom
    // Check for global config first and set vars accordingly
    if (Adapt.course.get('_animate')._component._custom._isEnabled) {
      this.customEnabled = true;
      this.customElement = Adapt.course.get('_animate')._component._custom._element;
      this.customEffect = Adapt.course.get('_animate')._component._custom._effect;
      this.customDelay = Adapt.course.get('_animate')._component._custom._delay;
      // Custom items
      if (Adapt.course.get('_animate')._component._custom._items) {
        for (let i = 0, l = Adapt.course.get('_animate')._component._custom._items.length; i < l; i++) {
          this.customItems.push(Adapt.course.get('_animate')._component._custom._items[i]);
        }
      }
    }
    // Check against component view config
    if (this.model.has('_animate') && this.model.get('_animate')._isEnabled) {
      if (this.model.get('_animate')._custom._isEnabled) {
        this.customEnabled = true;
        this.customElement = this.model.get('_animate')._custom._element;
        this.customEffect = this.model.get('_animate')._custom._effect;
        this.customDelay = this.model.get('_animate')._custom._delay;
        // Custom items
        if (this.model.has('_animate') && this.model.get('_animate')._isEnabled && this.model.get('_animate')._custom._items) {
          for (let i = 0, l = this.model.get('_animate')._custom._items.length; i < l; i++) {
            this.customItems.push(this.model.get('_animate')._custom._items[i]);
          }
        }
      }
    }

    _.defer(() => {
      this.postRender();
    });
  }

  postRender() {
    this.addClasses();
    $(this.modelID).on('inview', this.inview.bind(this));
  }

  addClasses() {
    if (this.completeElementEnabled) {
      $(this.modelID).addClass('is-animated');
      $(this.modelID).addClass('is-animate-hidden');
      this.model.set("_isAnimating", true);
    }

    if (this.titleEnabled) {
      $(this.modelID).find('.component__title-inner').addClass('is-animated');
      $(this.modelID).find('.component__title-inner').addClass('is-animate-hidden');
    }

    if (this.bodyEnabled) {
      $(this.modelID).find('.component__body-inner').addClass('is-animated');
      $(this.modelID).find('.component__body-inner').addClass('is-animate-hidden');
    }

    if (this.instructionEnabled) {
      $(this.modelID).find('.component__instruction-inner').addClass('is-animated');
      $(this.modelID).find('.component__instruction-inner').addClass('is-animate-hidden');
    }

    if (this.customEnabled && this.customElement !='') {
      $(this.modelID).find('.'+this.customElement).addClass('is-animated');
      $(this.modelID).find('.'+this.customElement).addClass('is-animate-hidden');
    }

    // Add classes to all custom items
    if (this.customItems.length > 0) {
      for (let i = 0, l = this.customItems.length; i < l; i++) {
        $(this.modelID).find('.'+this.customItems[i]._element).addClass('is-animated');
        $(this.modelID).find('.'+this.customItems[i]._element).addClass('is-animate-hidden');
      }
    }
  }

  notifyClosed() {
    if (this.elementIsInView && this.firstRun) {
      _.delay(() => {
        this.animateElements();
        this.removeInViewListeners();
      }, 400);
    }
  }

  inview(event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      if (visiblePartY === 'top') {
        this._isVisibleTop = true;
      } else if (visiblePartY === 'bottom') {
        this._isVisibleBottom = true;
      } else {
        this._isVisibleTop = true;
        this._isVisibleBottom = true;
      }
      // Check if element comes into view
      if (this._isVisibleTop || this._isVisibleBottom && Adapt.animate.notifyIsOpen == false) {
        this.elementIsInView = true;
        if (!Adapt.animate.notifyIsOpen) {
          this.animateElements();
          this.removeInViewListeners();
        }
      } else {
        this.elementIsInView = false;
      }
    }
  }

  animateElements() {
    this.firstRun = false;

    if (this.completeElementEnabled) {
      _.delay(() => {
        $(this.modelID).addClass(this.completeElementEffect);
        $(this.modelID).removeClass('is-animate-hidden');
        this.model.set("_isAnimating", false);
      }, Math.round(this.completeElementDelay * 1000));
    }

    if (this.titleEnabled) {
      _.delay(() => {
        $(this.modelID).find('.component__title-inner').addClass(this.titleEffect);
        $(this.modelID).find('.component__title-inner').removeClass('is-animate-hidden');
      }, Math.round(this.titleDelay * 1000));
    }

    if (this.bodyEnabled) {
      _.delay(() => {
        $(this.modelID).find('.component__body-inner').addClass(this.bodyEffect);
        $(this.modelID).find('.component__body-inner').removeClass('is-animate-hidden');
      }, Math.round(this.bodyDelay * 1000));
    }

    if (this.instructionEnabled) {
      _.delay(() => {
        $(this.modelID).find('.component__instruction-inner').addClass(this.instructionEffect);
        $(this.modelID).find('.component__instruction-inner').removeClass('is-animate-hidden');
      }, Math.round(this.instructionDelay * 1000));
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

  removeInViewListeners() {
    $(this.modelID).off('inview');
  }
}

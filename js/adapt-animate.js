import Adapt from 'core/js/adapt';
import AnimateMenuView from './animate-menuView';
import AnimateArticleView from './animate-articleView';
import AnimateBlockView from './animate-blockView';
import AnimateComponentView from './animate-componentView';

class Animate extends Backbone.Controller {

  initialize() {
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  onAppDataReady() {
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

    if (!Adapt.course.get('_animate')) return;

    if (Adapt.course.get('_animate')._isEnabled) {
      this.setupAnimate();
      this.setupListeners();
    }
  }

  onLangChange() {
    this.removeListeners();
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  setupListeners() {
    this.listenTo(Adapt, {
      'popup:opened': this.notifyOpened,
      'popup:closed': this.notifyClosed,
      'menuView:postRender': this.onMenuReady,
      'articleView:postRender': this.onArticleReady,
      'blockView:postRender': this.onBlockReady,
      'componentView:postRender': this.onComponentReady
    });
  }

  removeListeners() {
    this.stopListening(Adapt, {
      'popup:opened': this.notifyOpened,
      'popup:closed': this.notifyClosed,
      'menuView:postRender': this.onMenuReady,
      'articleView:postRender': this.onArticleReady,
      'blockView:postRender': this.onBlockReady,
      'componentView:postRender': this.onComponentReady
    });
    this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
  }

  notifyOpened() {
    Adapt.animate.notifyIsOpen = true;
  }

  notifyClosed() {
    Adapt.animate.notifyIsOpen = false;
  }

  setupAnimate() {
    Adapt.animate.notifyIsOpen = false;
    // Check for global config
    // Article
    if (Adapt.course.get('_animate')._article._isEnabled) {
      Adapt.animate.animateArticleEnabled = Adapt.course.get('_animate')._article._isEnabled;
    } else {
      Adapt.animate.animateArticleEnabled = false;
    }
    // Block
    if (Adapt.course.get('_animate')._block._isEnabled) {
      Adapt.animate.animateBlockEnabled = Adapt.course.get('_animate')._block._isEnabled;
    } else {
      Adapt.animate.animateBlockEnabled = false;
    }
    // Component
    if (Adapt.course.get('_animate')._component._isEnabled) {
      Adapt.animate.animateComponentEnabled = Adapt.course.get('_animate')._component._isEnabled;
    } else {
      Adapt.animate.animateComponentEnabled = false;
    }
  }

  onMenuReady(view) {
    if (view.model.get('_type') == 'menu' && view.model && view.model.get('_animate') && view.model.get('_animate')._isEnabled){
      new AnimateMenuView({model:view.model});
    }
  }

  onArticleReady(view) {
    // Check for global first
    if (view.model && Adapt.animate.animateArticleEnabled) {
      new AnimateArticleView({model:view.model});
    } else if (view.model && view.model.get('_animate') && view.model.get('_animate')._isEnabled){
      new AnimateArticleView({model:view.model});
    }
  }

  onBlockReady(view) {
    // Check for global first
    if (view.model && Adapt.animate.animateBlockEnabled) {
      new AnimateBlockView({model:view.model});
    } else if (view.model && view.model.get('_animate') && view.model.get('_animate')._isEnabled){
      new AnimateBlockView({model:view.model});
    }
  }

  onComponentReady(view) {
    // Check for global first
    if (view.model && Adapt.animate.animateComponentEnabled) {
      new AnimateComponentView({model:view.model});
    } else if (view.model && view.model.get('_animate') && view.model.get('_animate')._isEnabled){
      new AnimateComponentView({model:view.model});
    }
  }
}

export default Adapt.animate = new Animate();

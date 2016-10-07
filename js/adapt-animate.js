define([
    'coreJS/adapt',
    './animate-articleView',
    './animate-blockView',
    './animate-componentView'
], function(Adapt, AnimateArticleView, AnimateBlockView, AnimateComponentView) {

    Adapt.animate = _.extend({

      initialize: function() {
          this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
      },

      onDataReady: function() {
        this.setupEventListeners();
        this.setupAnimate();
      },

      setupEventListeners: function() {
        this.listenTo(Adapt, "articleView:postRender", this.onArticleReady);
        this.listenTo(Adapt, "blockView:postRender", this.onBlockReady);
        this.listenTo(Adapt, "componentView:postRender", this.onComponentReady);
      },

      setupAnimate: function() {
        // Check if animation can be used based on browser
        this._disableAnimations = false;
        this._disableAnimations = $('html').is(".ie8");
        // Check for main config
        if (Adapt.course.get("_animate") && Adapt.course.get("_animate")._isEnabled && this._disableAnimations == false) {
          this.animateEnabled = Adapt.course.get("_animate")._isEnabled;
        } else {
          this.animateEnabled = false;
        }
        // Check for global config
        // Article
        if (this.animateEnabled && Adapt.course.get("_animate")._article._isEnabled) {
          Adapt.animate.animateArticleEnabled = Adapt.course.get("_animate")._article._isEnabled;
        } else {
          Adapt.animate.animateArticleEnabled = false;
        }
        // Block
        if (this.animateEnabled && Adapt.course.get("_animate")._block._isEnabled) {
          Adapt.animate.animateBlockEnabled = Adapt.course.get("_animate")._block._isEnabled;
        } else {
          Adapt.animate.animateBlockEnabled = false;
        }
        // Component
        if (this.animateEnabled && Adapt.course.get("_animate")._component._isEnabled) {
          Adapt.animate.animateComponentEnabled = Adapt.course.get("_animate")._component._isEnabled;
        } else {
          Adapt.animate.animateComponentEnabled = false;
        }

      },

      onArticleReady: function(view) {
        // Check for global first
        if (this.animateEnabled && view.model && Adapt.animate.animateArticleEnabled) {
          new AnimateArticleView({model:view.model});
        } else if (this.animateEnabled && view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateArticleView({model:view.model});
        }
      },

      onBlockReady: function(view) {
        // Check for global first
        if (this.animateEnabled && view.model && Adapt.animate.animateBlockEnabled) {
          new AnimateBlockView({model:view.model});
        } else if (this.animateEnabled && view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateBlockView({model:view.model});
        }
      },

      onComponentReady: function(view) {
        // Check for global first
        if (this.animateEnabled && view.model && Adapt.animate.animateComponentEnabled) {
          new AnimateComponentView({model:view.model});
        } else if (this.animateEnabled && view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateComponentView({model:view.model});
        }
      }

    }, Backbone.Events);

    Adapt.animate.initialize();

    return Adapt.animate;

});

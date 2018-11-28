define([
    'coreJS/adapt',
    './animate-menuView',
    './animate-articleView',
    './animate-blockView',
    './animate-componentView'
], function(Adapt, AnimateMenuView, AnimateArticleView, AnimateBlockView, AnimateComponentView) {

    Adapt.animate = _.extend({

      initialize: function() {
          this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
      },

      onDataReady: function() {
        if (Adapt.course.get("_animate") && Adapt.course.get("_animate")._isEnabled) {
          this.setupAnimate();
          this.setupEventListeners();
        }
      },

      setupEventListeners: function() {
        this.listenTo(Adapt, "menuView:postRender", this.onMenuReady);
        this.listenTo(Adapt, "articleView:postRender", this.onArticleReady);
        this.listenTo(Adapt, "blockView:postRender", this.onBlockReady);
        this.listenTo(Adapt, "componentView:postRender", this.onComponentReady);
      },

      setupAnimate: function() {
        // Check for global config
        // Article
        if (Adapt.course.get("_animate")._article._isEnabled) {
          Adapt.animate.animateArticleEnabled = Adapt.course.get("_animate")._article._isEnabled;
        } else {
          Adapt.animate.animateArticleEnabled = false;
        }
        // Block
        if (Adapt.course.get("_animate")._block._isEnabled) {
          Adapt.animate.animateBlockEnabled = Adapt.course.get("_animate")._block._isEnabled;
        } else {
          Adapt.animate.animateBlockEnabled = false;
        }
        // Component
        if (Adapt.course.get("_animate")._component._isEnabled) {
          Adapt.animate.animateComponentEnabled = Adapt.course.get("_animate")._component._isEnabled;
        } else {
          Adapt.animate.animateComponentEnabled = false;
        }
      },

      onMenuReady: function(view) {
        if (view.model.get('_type') == "menu" && view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateMenuView({model:view.model});
        }
      },

      onArticleReady: function(view) {
        // Check for global first
        if (view.model && Adapt.animate.animateArticleEnabled) {
          new AnimateArticleView({model:view.model});
        } else if (view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateArticleView({model:view.model});
        }
      },

      onBlockReady: function(view) {
        // Check for global first
        if (view.model && Adapt.animate.animateBlockEnabled) {
          new AnimateBlockView({model:view.model});
        } else if (view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateBlockView({model:view.model});
        }
      },

      onComponentReady: function(view) {
        // Check for global first
        if (view.model && Adapt.animate.animateComponentEnabled) {
          new AnimateComponentView({model:view.model});
        } else if (view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateComponentView({model:view.model});
        }
      }

    }, Backbone.Events);

    Adapt.animate.initialize();

    return Adapt.animate;

});

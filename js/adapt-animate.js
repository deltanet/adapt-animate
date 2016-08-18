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
        // Titles
        if (this.animateEnabled && Adapt.course.get("_animate")._globalTitle._isEnabled) {
          Adapt.animate.animateTitleEnabled = Adapt.course.get("_animate")._globalTitle._isEnabled;
        } else {
          Adapt.animate.animateTitleEnabled = false;
        }
        // Body
        if (this.animateEnabled && Adapt.course.get("_animate")._globalBody._isEnabled) {
          Adapt.animate.animateBodyEnabled = Adapt.course.get("_animate")._globalBody._isEnabled;
        } else {
          Adapt.animate.animateBodyEnabled = false;
        }
        // Instruction
        if (this.animateEnabled && Adapt.course.get("_animate")._globalInstruction._isEnabled) {
          Adapt.animate.animateInstructionEnabled = Adapt.course.get("_animate")._globalInstruction._isEnabled;
        } else {
          Adapt.animate.animateInstructionEnabled = false;
        }
        // Article
        if (this.animateEnabled && Adapt.course.get("_animate")._globalArticle._isEnabled) {
          Adapt.animate.animateArticleEnabled = Adapt.course.get("_animate")._globalArticle._isEnabled;
        } else {
          Adapt.animate.animateArticleEnabled = false;
        }
        // Block
        if (this.animateEnabled && Adapt.course.get("_animate")._globalBlock._isEnabled) {
          Adapt.animate.animateBlockEnabled = Adapt.course.get("_animate")._globalBlock._isEnabled;
        } else {
          Adapt.animate.animateBlockEnabled = false;
        }
        // Component
        if (this.animateEnabled && Adapt.course.get("_animate")._globalComponent._isEnabled) {
          Adapt.animate.animateComponentEnabled = Adapt.course.get("_animate")._globalComponent._isEnabled;
        } else {
          Adapt.animate.animateComponentEnabled = false;
        }

      },

      onArticleReady: function(view) {
        if (this.animateEnabled && view.model && Adapt.animate.animateArticleEnabled) {
          new AnimateArticleView({model:view.model});
        } else if (this.animateEnabled && view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateArticleView({model:view.model});
        }
      },

      onBlockReady: function(view) {
        if (this.animateEnabled && view.model && Adapt.animate.animateBlockEnabled) {
          new AnimateBlockView({model:view.model});
        } else if (this.animateEnabled && view.model && view.model.get("_animate") && view.model.get("_animate")._isEnabled){
          new AnimateBlockView({model:view.model});
        }
      },

      onComponentReady: function(view) {
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

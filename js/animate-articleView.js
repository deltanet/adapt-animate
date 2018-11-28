define([
    'coreJS/adapt'
], function(Adapt) {

    var AnimateArticleView = Backbone.View.extend({

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenToOnce(Adapt, "remove", this.removeInViewListeners);
            this.listenToOnce(Adapt, 'pageView:ready', this.render);
        },

        render: function () {
            this.modelID = '.'+this.model.get('_id');
            this.titleEnabled = false;
            this.bodyEnabled = false;
            this.instructionEnabled = false;
            this.customEnabled = false;
            this.customItems = this.model.get("_animate")._custom._items ? this.model.get("_animate")._custom._items : [];

            // Title
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._article._title._isEnabled) {
              this.titleEnabled = true;
              this.titleEffect = Adapt.course.get("_animate")._article._title._effect;
              $(this.modelID).find(".article-title-inner").addClass("animated");
              $(this.modelID).find(".article-title-inner").addClass("element-hidden");
            }
            // Check var against article view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._title._isEnabled) {
                this.titleEnabled = true;
                this.titleEffect = this.model.get("_animate")._title._effect;
                $(this.modelID).find(".article-title-inner").addClass("animated");
                $(this.modelID).find(".article-title-inner").addClass("element-hidden");
              }
            }

            // Body
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._article._body._isEnabled) {
              this.bodyEnabled = true;
              this.bodyEffect = Adapt.course.get("_animate")._article._body._effect;
              $(this.modelID).find(".article-body-inner").addClass("animated");
              $(this.modelID).find(".article-body-inner").addClass("element-hidden");
            }
            // Check var against article view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._body._isEnabled) {
                this.bodyEnabled = true;
                this.bodyEffect = this.model.get("_animate")._body._effect;
                $(this.modelID).find(".article-body-inner").addClass("animated");
                $(this.modelID).find(".article-body-inner").addClass("element-hidden");
              }
            }

            // Instruction
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._article._instruction._isEnabled) {
              this.instructionEnabled = true;
              this.instructionEffect = Adapt.course.get("_animate")._article._instruction._effect;
              $(this.modelID).find(".article-instruction-inner").addClass("animated");
              $(this.modelID).find(".article-instruction-inner").addClass("element-hidden");
            }
            // Check var against article view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._instruction._isEnabled) {
                this.instructionEnabled = true;
                this.instructionEffect = this.model.get("_animate")._instruction._effect;
                $(this.modelID).find(".article-instruction-inner").addClass("animated");
                $(this.modelID).find(".article-instruction-inner").addClass("element-hidden");
              }
            }

            // Custom
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._article._custom._isEnabled) {
              this.customEnabled = true;
              this.customElement = Adapt.course.get("_animate")._article._custom._element;
              this.customEffect = Adapt.course.get("_animate")._article._custom._effect;
              $(this.modelID).find('.'+this.customElement).addClass("animated");
              $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._custom._isEnabled) {
                this.customEnabled = true;
                this.customElement = this.model.get("_animate")._custom._element;
                this.customEffect = this.model.get("_animate")._custom._effect;
                // Only apply if an element has been specified
                if (this.customElement !="") {
                  $(this.modelID).find('.'+this.customElement).addClass("animated");
                  $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
                }
                // Custom items
                if (this.customItems.length > 0) {
                  for (var i = 0, l = this.customItems.length; i < l; i++) {
                    $(this.modelID).find('.'+this.customItems[i]._element).addClass("animated");
                    $(this.modelID).find('.'+this.customItems[i]._element).addClass("element-hidden");
                  }
                }
              }
            }

            _.defer(_.bind(function() {
                this.postRender();
            }, this));
        },

        postRender: function() {
          $(this.modelID).on('inview', _.bind(this.inview, this));
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }
                // Check if element come into view on screen
                if (this._isVisibleTop || this._isVisibleBottom) {
                  this.animateElements();
                }
            }
        },

        animateElements: function () {
          if (this.titleEnabled) {
            var titleDelay = this.model.get("_animate")._title._delay ? this.model.get("_animate")._title._delay : 0;
            _.delay(_.bind(function() {
              $(this.modelID).find(".article-title-inner").addClass(this.titleEffect);
              $(this.modelID).find(".article-title-inner").removeClass("element-hidden");
            }, this), Math.round(titleDelay * 1000));
          }
          if (this.bodyEnabled) {
            var bodyDelay = this.model.get("_animate")._body._delay ? this.model.get("_animate")._body._delay : 0;
            _.delay(_.bind(function() {
              $(this.modelID).find(".article-body-inner").addClass(this.bodyEffect);
              $(this.modelID).find(".article-body-inner").removeClass("element-hidden");
            }, this), Math.round(bodyDelay * 1000));
          }
          if (this.instructionEnabled) {
            var instructionDelay = this.model.get("_animate")._instruction._delay ? this.model.get("_animate")._instruction._delay : 0;
            _.delay(_.bind(function() {
              $(this.modelID).find(".article-instruction-inner").addClass(this.instructionEffect);
              $(this.modelID).find(".article-instruction-inner").removeClass("element-hidden");
            }, this), Math.round(instructionDelay * 1000));
          }
          if (this.customEnabled) {
            // Only apply if an element has been specified
            if (this.customElement !="") {
              var customDelay = this.model.get("_animate")._custom._delay ? this.model.get("_animate")._custom._delay : 0;
              _.delay(_.bind(function() {
                $(this.modelID).find('.'+this.customElement).addClass(this.customEffect);
                $(this.modelID).find('.'+this.customElement).removeClass("element-hidden");
              }, this), Math.round(customDelay * 1000));
            }
            // Custom items
            if (this.customItems.length == 0) return;
            for (var i = 0, l = this.customItems.length; i < l; i++) {
              this.animateItem(this.customItems[i]);
            }
          }
        },

        animateItem: function (item) {
          _.delay(_.bind(function() {
            $(this.modelID).find('.'+item._element).addClass(item._effect);
            $(this.modelID).find('.'+item._element).removeClass("element-hidden");
          }, this), Math.round(item._delay * 1000));
        },

        removeInViewListeners: function () {
          $(this.modelID).off('inview');
        }

    });

    return AnimateArticleView;

});

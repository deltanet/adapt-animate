define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var AnimateComponentView = Backbone.View.extend({

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenToOnce(Adapt, "remove", this.removeInViewListeners);
            this.preRender();
            this.render();
        },

        events: {},

        preRender: function() {
        },

        render: function () {
            this.modelID = '.'+this.model.get('_id');
            this.completeElementEnabled = false;
            this.titleEnabled = false;
            this.bodyEnabled = false;
            this.instructionEnabled = false;
            this.customEnabled = false;

            // Complete element
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._completeElement._isEnabled) {
              this.completeElementEnabled = true;
              this.completeElementEffect = Adapt.course.get("_animate")._component._completeElement._effect;
              $(this.modelID).addClass("animated");
              $(this.modelID).addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._completeElement._isEnabled) {
                this.completeElementEnabled = true;
                this.completeElementEffect = this.model.get("_animate")._completeElement._effect;
                $(this.modelID).addClass("animated");
                $(this.modelID).addClass("element-hidden");
              }
            }

            // Title
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._title._isEnabled) {
              this.titleEnabled = true;
              this.titleEffect = Adapt.course.get("_animate")._component._title._effect;
              $(this.modelID).find(".component-title-inner").addClass("animated");
              $(this.modelID).find(".component-title-inner").addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._title._isEnabled) {
                this.titleEnabled = true;
                this.titleEffect = this.model.get("_animate")._title._effect;
                $(this.modelID).find(".component-title-inner").addClass("animated");
                $(this.modelID).find(".component-title-inner").addClass("element-hidden");
              }
            }

            // Body
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._body._isEnabled) {
              this.bodyEnabled = true;
              this.bodyEffect = Adapt.course.get("_animate")._component._body._effect;
              $(this.modelID).find(".component-body-inner").addClass("animated");
              $(this.modelID).find(".component-body-inner").addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._body._isEnabled) {
                this.bodyEnabled = true;
                this.bodyEffect = this.model.get("_animate")._body._effect;
                $(this.modelID).find(".component-body-inner").addClass("animated");
                $(this.modelID).find(".component-body-inner").addClass("element-hidden");
              }
            }

            // Instruction
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._instruction._isEnabled) {
              this.instructionEnabled = true;
              this.instructionEffect = Adapt.course.get("_animate")._component._instruction._effect;
              $(this.modelID).find(".component-instruction-inner").addClass("animated");
              $(this.modelID).find(".component-instruction-inner").addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._instruction._isEnabled) {
                this.instructionEnabled = true;
                this.instructionEffect = this.model.get("_animate")._instruction._effect;
                $(this.modelID).find(".component-instruction-inner").addClass("animated");
                $(this.modelID).find(".component-instruction-inner").addClass("element-hidden");
              }
            }

            // Custom
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._custom._isEnabled) {
              this.customEnabled = true;
              this.customElement = Adapt.course.get("_animate")._component._custom._element;
              this.customEffect = Adapt.course.get("_animate")._component._custom._effect;
              $(this.modelID).find('.'+this.customElement).addClass("animated");
              $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._custom._isEnabled) {
                this.customEnabled = true;
                this.customElement = this.model.get("_animate")._custom._element;
                this.customEffect = this.model.get("_animate")._custom._effect;
                $(this.modelID).find('.'+this.customElement).addClass("animated");
                $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
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
          if(this.completeElementEnabled) {
            $(this.modelID).addClass(this.completeElementEffect);
            $(this.modelID).removeClass("element-hidden");
          }
          if(this.titleEnabled) {
            $(this.modelID).find(".component-title-inner").addClass(this.titleEffect);
            $(this.modelID).find(".component-title-inner").removeClass("element-hidden");
          }
          if(this.bodyEnabled) {
            $(this.modelID).find(".component-body-inner").addClass(this.bodyEffect);
            $(this.modelID).find(".component-body-inner").removeClass("element-hidden");
          }
          if(this.instructionEnabled) {
            $(this.modelID).find(".component-instruction-inner").addClass(this.instructionEffect);
            $(this.modelID).find(".component-instruction-inner").removeClass("element-hidden");
          }
          if(this.customEnabled) {
            $(this.modelID).find('.'+this.customElement).addClass(this.customEffect);
            $(this.modelID).find('.'+this.customElement).removeClass("element-hidden");
          }
        },

        removeInViewListeners: function () {
          $(this.modelID).off('inview');
        }

    });

    return AnimateComponentView;

});

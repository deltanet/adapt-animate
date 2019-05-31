define([
    'coreJS/adapt'
], function(Adapt) {

    var AnimateComponentView = Backbone.View.extend({

        initialize: function () {
            this.listenTo(Adapt, "remove", this.removeInViewListeners);
            this.listenTo(Adapt, 'animate:notifyClosed', this.notifyClosed);

            this.render();
        },

        render: function () {
            if (!Adapt.course.get("_animate")) return;

            this.firstRun = true;
            this.elementIsInView = false;

            // Set vars
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
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._completeElement._isEnabled) {
              this.completeElementEnabled = true;
              this.completeElementEffect = Adapt.course.get("_animate")._component._completeElement._effect;
              this.completeElementDelay = Adapt.course.get("_animate")._component._completeElement._delay;
              $(this.modelID).addClass("animated");
              $(this.modelID).addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._completeElement._isEnabled) {
                this.completeElementEnabled = true;
                this.completeElementEffect = this.model.get("_animate")._completeElement._effect;
                this.completeElementDelay = this.model.get("_animate")._completeElement._delay;
                $(this.modelID).addClass("animated");
                $(this.modelID).addClass("element-hidden");
              }
            }

            // Title
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._title._isEnabled) {
              this.titleEnabled = true;
              this.titleEffect = Adapt.course.get("_animate")._component._title._effect;
              this.titleDelay = Adapt.course.get("_animate")._component._title._delay;
              $(this.modelID).find(".component-title-inner").addClass("animated");
              $(this.modelID).find(".component-title-inner").addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._title._isEnabled) {
                this.titleEnabled = true;
                this.titleEffect = this.model.get("_animate")._title._effect;
                this.titleDelay = this.model.get("_animate")._title._delay;
                $(this.modelID).find(".component-title-inner").addClass("animated");
                $(this.modelID).find(".component-title-inner").addClass("element-hidden");
              }
            }

            // Body
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._body._isEnabled) {
              this.bodyEnabled = true;
              this.bodyEffect = Adapt.course.get("_animate")._component._body._effect;
              this.bodyDelay = Adapt.course.get("_animate")._component._body._delay;
              $(this.modelID).find(".component-body-inner").addClass("animated");
              $(this.modelID).find(".component-body-inner").addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._body._isEnabled) {
                this.bodyEnabled = true;
                this.bodyEffect = this.model.get("_animate")._body._effect;
                this.bodyDelay = this.model.get("_animate")._body._delay;
                $(this.modelID).find(".component-body-inner").addClass("animated");
                $(this.modelID).find(".component-body-inner").addClass("element-hidden");
              }
            }

            // Instruction
            // Check for global config first and set var accordingly
            if (Adapt.course.get("_animate")._component._instruction._isEnabled) {
              this.instructionEnabled = true;
              this.instructionEffect = Adapt.course.get("_animate")._component._instruction._effect;
              this.instructionDelay = Adapt.course.get("_animate")._component._instruction._delay;
              $(this.modelID).find(".component-instruction-inner").addClass("animated");
              $(this.modelID).find(".component-instruction-inner").addClass("element-hidden");
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._instruction._isEnabled) {
                this.instructionEnabled = true;
                this.instructionEffect = this.model.get("_animate")._instruction._effect;
                this.instructionDelay = this.model.get("_animate")._instruction._delay;
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
              this.customDelay = Adapt.course.get("_animate")._component._custom._delay;
              // Only apply if an element has been specified
              if (this.customElement !="") {
                $(this.modelID).find('.'+this.customElement).addClass("animated");
                $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
              }
              // Custom items
              if (Adapt.course.get("_animate")._component._custom._items) {
                this.customItems = Adapt.course.get("_animate")._component._custom._items;
                if (this.customItems.length > 0) {
                  for (var i = 0, l = this.customItems.length; i < l; i++) {
                    $(this.modelID).find('.'+this.customItems[i]._element).addClass("animated");
                    $(this.modelID).find('.'+this.customItems[i]._element).addClass("element-hidden");
                  }
                }
              }
            }
            // Check var against component view config
            if (this.model.has("_animate") && this.model.get("_animate")._isEnabled) {
              if (this.model.get("_animate")._custom._isEnabled) {
                this.customEnabled = true;
                this.customElement = this.model.get("_animate")._custom._element;
                this.customEffect = this.model.get("_animate")._custom._effect;
                this.customDelay = this.model.get("_animate")._custom._delay;
                // Only apply if an element has been specified
                if (this.customElement !="") {
                  $(this.modelID).find('.'+this.customElement).addClass("animated");
                  $(this.modelID).find('.'+this.customElement).addClass("element-hidden");
                }
                // Custom items
                if (this.model.has("_animate") && this.model.get("_animate")._isEnabled && this.model.get("_animate")._custom._items) {
                  this.customItems = this.model.get("_animate")._custom._items;
                  if (this.customItems.length > 0) {
                    for (var i = 0, l = this.customItems.length; i < l; i++) {
                      $(this.modelID).find('.'+this.customItems[i]._element).addClass("animated");
                      $(this.modelID).find('.'+this.customItems[i]._element).addClass("element-hidden");
                    }
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

        notifyClosed: function() {
          if (this.elementIsInView == true && this.firstRun) {
            _.delay(_.bind(function() {
              this.animateElements();
              this.removeInViewListeners();
            }, this), 400);
          }
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
        },

        animateElements: function () {
          this.firstRun = false;

          if (this.completeElementEnabled) {
            var completeDelay = this.completeElementDelay;
            _.delay(_.bind(function() {
              $(this.modelID).addClass(this.completeElementEffect);
              $(this.modelID).removeClass("element-hidden");
            }, this), Math.round(completeDelay * 1000));
          }
          if (this.titleEnabled) {
            var titleDelay = this.titleDelay;
            _.delay(_.bind(function() {
              $(this.modelID).find(".component-title-inner").addClass(this.titleEffect);
              $(this.modelID).find(".component-title-inner").removeClass("element-hidden");
            }, this), Math.round(titleDelay * 1000));
          }
          if (this.bodyEnabled) {
            var bodyDelay = this.bodyDelay;
            _.delay(_.bind(function() {
              $(this.modelID).find(".component-body-inner").addClass(this.bodyEffect);
              $(this.modelID).find(".component-body-inner").removeClass("element-hidden");
            }, this), Math.round(bodyDelay * 1000));
          }
          if (this.instructionEnabled) {
            var instructionDelay = this.instructionDelay;
            _.delay(_.bind(function() {
              $(this.modelID).find(".component-instruction-inner").addClass(this.instructionEffect);
              $(this.modelID).find(".component-instruction-inner").removeClass("element-hidden");
            }, this), Math.round(instructionDelay * 1000));
          }
          if (this.customEnabled) {
            // Only apply if an element has been specified
            if (this.customElement !="") {
              var customDelay = this.customDelay;
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

    return AnimateComponentView;

});

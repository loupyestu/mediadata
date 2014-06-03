// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'text!templates/modules/clock.html'], function($, _, Backbone, tplClock) {
    'use strict';
    var ClockView;
    return ClockView = (function(_super) {
      __extends(ClockView, _super);

      function ClockView() {
        return ClockView.__super__.constructor.apply(this, arguments);
      }

      ClockView.prototype.el = '.module.clock';

      ClockView.prototype.template = _.template(tplClock);

      ClockView.prototype.initialize = function() {};

      ClockView.prototype.render = function(data) {
        console.log('CLOCK', data);
        this.$el.html(this.template());
        return this;
      };

      return ClockView;

    })(Backbone.View);
  });

}).call(this);

// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'text!templates/search-bar.html'], function($, _, Backbone, tplSearchbar) {
    'use strict';
    var SearchbarView;
    return SearchbarView = (function(_super) {
      __extends(SearchbarView, _super);

      function SearchbarView() {
        return SearchbarView.__super__.constructor.apply(this, arguments);
      }

      SearchbarView.prototype.el = '#search-bar';

      SearchbarView.prototype.collection = null;

      SearchbarView.prototype.template = _.template(tplSearchbar);

      SearchbarView.prototype.initialize = function() {};

      SearchbarView.prototype.render = function() {
        this.$el.html(this.template());
        this.bind();
        return this;
      };

      SearchbarView.prototype.events = {
        'click .compare': 'compare',
        'click h1.person button.edit': 'edit',
        'blur form.search input': 'stopEditing',
        'click .delete': 'delete'
      };

      SearchbarView.prototype.bind = function() {
        var _this;
        _this = this;
        return $(window).on('resize', _this.onResize);
      };

      SearchbarView.prototype.compare = function(evt) {
        $(evt.target).removeClass('visible');
        $('h1.other-person').addClass('visible').find('form.search').addClass('visible').find('input').focus();
        return $('h1.person').addClass('half');
      };

      SearchbarView.prototype["delete"] = function(evt) {
        console.log(evt);
        $(evt.currentTarget).parent().removeClass('visible');
        if (!$(evt.currentTarget).parent().hasClass('other-person')) {
          $('h1.other-person').removeClass('other-person');
          $(evt.currentTarget).parent().addClass('other-person');
        }
        $('h1.person').removeClass('half');
        return $('button.compare').addClass('visible');
      };

      SearchbarView.prototype.edit = function(evt) {
        $(evt.target).parent().find('form.search').addClass('visible').find('input').focus();
        return $(this).parent().find('form.search').addClass('visible').find('input').focus();
      };

      SearchbarView.prototype.stopEditing = function(evt) {
        return $(evt.target).parent().removeClass('visible');
      };

      SearchbarView.prototype.onResize = function() {};

      return SearchbarView;

    })(Backbone.View);
  });

}).call(this);

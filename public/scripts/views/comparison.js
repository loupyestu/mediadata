// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'mediadata', '../collections/persons', '../models/person', 'text!templates/comparison.html', '../views/modules/top-5', '../views/modules/timeline', '../views/modules/clock'], function($, _, Backbone, md, PersonsCollection, PersonModel, tplComparison, Top5View, TimelineView, ClockView) {
    'use strict';
    var ComparisonView;
    return ComparisonView = (function(_super) {
      __extends(ComparisonView, _super);

      function ComparisonView() {
        return ComparisonView.__super__.constructor.apply(this, arguments);
      }

      ComparisonView.prototype.el = '#main';

      ComparisonView.prototype.collections = {};

      ComparisonView.prototype.name = {};

      ComparisonView.prototype.template = _.template(tplComparison);

      ComparisonView.prototype.initialize = function(options) {
        md.Router.showLoader();
        this.name.person1 = options.name1;
        this.name.person2 = options.name2;
        this.collections.person1 = new PersonsCollection(this.name.person1);
        this.collections.person2 = new PersonsCollection(this.name.person2);
        return this.render(options);
      };

      ComparisonView.prototype.initializeModules = function(data) {
        this.top51 = new Top5View({
          el: '.module.top-5.person1'
        });
        this.top52 = new Top5View({
          el: '.module.top-5.person2'
        });
        this.timeline = new TimelineView();
        this.clock1 = new ClockView({
          el: '.module.clock.person1'
        });
        this.clock2 = new ClockView({
          el: '.module.clock.person2'
        });
        return this.renderModules(data);
      };

      ComparisonView.prototype.bind = function() {
        $(window).on('scroll', this.stickFilters);
        return $(window).on('resize', this.onResize);
      };

      ComparisonView.prototype.unbind = function() {
        $(window).off('scroll', this.stickFilters);
        return $(window).off('resize', this.onResize);
      };

      ComparisonView.prototype.destroy = function() {
        return this.unbind();
      };

      ComparisonView.prototype.render = function(options) {
        md.Status['currentView'] = 'comparison';
        ga('send', 'pageview', '/' + this.name.person1.slug + '/' + this.name.person2.slug);
        $('div.loader').removeClass('loading', 'complete');
        $('div.loader.topic1').addClass('loading');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        return this.collections.person1.fetch({
          success: (function(_this) {
            return function() {
              $('div.loader.topic1').addClass('complete');
              $('div.loader.topic2').addClass('loading');
              _this.collections.person1 = _this.collections.person1.models[0].attributes;
              _this.collections.person2.fetch({
                success: function() {
                  $('div.loader.topic2').addClass('complete');
                  _this.collections.person2 = _this.collections.person2.models[0].attributes;
                  _this.$el.html(_this.template(_this.collections));
                  _this.initializeModules(_this.collections);
                  md.Router.getFilters();
                  _this.bind();
                  _this.onResize();
                  return md.Router.hideLoader();
                }
              });
              return _this;
            };
          })(this)
        });
      };

      ComparisonView.prototype.renderModules = function(data) {
        this.top51.render({
          popularChannels: data.person1.popularChannels,
          popularShows: data.person1.popularShows,
          totalMentions: data.person1.timelineMentions,
          person: 'person1'
        });
        this.top52.render({
          popularChannels: data.person2.popularChannels,
          popularShows: data.person2.popularShows,
          totalMentions: data.person2.timelineMentions,
          person: 'person2'
        });
        this.timeline.render({
          person1: {
            name: data.person1.person.name,
            timelineMentions: data.person1.timelineMentions
          },
          person2: {
            name: data.person2.person.name,
            timelineMentions: data.person2.timelineMentions
          }
        });
        this.getStackedData(data);
        this.clock1.render({
          broadcastHoursByDay: data.person1.broadcastHoursByDay
        });
        return this.clock2.render({
          broadcastHoursByDay: data.person2.broadcastHoursByDay
        });
      };

      ComparisonView.prototype.rerender = function() {
        md.Router.showLoader();
        this.collections.person1 = new PersonsCollection(this.name.person1);
        this.collections.person2 = new PersonsCollection(this.name.person2);
        return this.collections.person1.fetch({
          success: (function(_this) {
            return function() {
              _this.collections.person1 = _this.collections.person1.models[0].attributes;
              return _this.collections.person2.fetch({
                success: function() {
                  _this.collections.person2 = _this.collections.person2.models[0].attributes;
                  _this.renderModules(_this.collections);
                  return md.Router.hideLoader();
                }
              });
            };
          })(this)
        });
      };

      ComparisonView.prototype.stickFilters = function() {
        if ($(window).scrollTop() > $('header.header').outerHeight()) {
          return $('#filters').addClass('fixed');
        } else {
          return $('#filters').removeClass('fixed');
        }
      };

      ComparisonView.prototype.onResize = function() {
        return $('#filters').width($(window).width() - 80);
      };

      ComparisonView.prototype.getStackedData = function(data) {
        var channels, i;
        channels = {
          channelMap: [data.person1.person.name, data.person2.person.name],
          channelDatas: []
        };
        i = 0;
        while (i < data.person1.channels.length) {
          channels.channelDatas.push({});
          i++;
        }
        _.each(data.person1.channels, function(channel, i) {
          channels.channelDatas[i]['channelName'] = channel.channelName;
          return channels.channelDatas[i]['person1'] = channel.channelCount;
        });
        _.each(data.person2.channels, function(channel, i) {
          return channels.channelDatas[i]['person2'] = channel.channelCount;
        });
        return channels;
      };

      return ComparisonView;

    })(Backbone.View);
  });

}).call(this);

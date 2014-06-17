// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'd3', 'text!templates/modules/bar.html'], function($, _, Backbone, d3, tplBar) {
    'use strict';
    var BarView;
    return BarView = (function(_super) {
      var height, margin, width, x, y, yAxis;

      __extends(BarView, _super);

      function BarView() {
        return BarView.__super__.constructor.apply(this, arguments);
      }

      BarView.prototype.el = '.module.bar';

      BarView.prototype.template = _.template(tplBar);

      margin = {
        top: 60,
        right: 20,
        bottom: 60,
        left: 40
      };

      width = 1020;

      height = 355;

      x = d3.scale.ordinal().rangeRoundBands([0, width], .1);

      y = d3.scale.linear().range([height, 0]);

      BarView.prototype.svg = function() {
        return d3.selectAll(this.$el).append('svg').attr('id', 'barchart').attr('width', width).attr('height', height + margin.top + margin.bottom);
      };

      yAxis = d3.svg.axis().scale(y).orient('left').ticks(4).tickSize(-width, 0, 0);

      BarView.prototype.getScale = function(data) {
        var d, i, _i, _len, _ref;
        _ref = data.channels;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          d = _ref[i];
          d.channelCount = +d.channelCount;
        }
        x.domain(data.channels.map(function(d) {
          return d.channelName;
        }));
        return y.domain([
          0, d3.max(data.channels, function(d) {
            return d.channelCount;
          })
        ]);
      };

      BarView.prototype.getTotals = function(data) {
        var d, i, total, _i, _len, _ref;
        total = 0;
        _ref = data.channels;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          d = _ref[i];
          d.channelCount = +d.channelCount;
          total += d.channelCount;
        }
        $('.module.bar h4').html(data.name);
        return $('.module.bar h3:first-of-type span').html(total.toLocaleString());
      };

      BarView.prototype.drawContent = function(data) {
        d3.select('#barchart').append('g').attr('class', 'grid').attr("transform", "translate(0,60)").call(yAxis);
        d3.select('#barchart').selectAll('g.bar-g').data(data.channels).enter().append('g').attr('class', 'bar-g').attr('transform', 'translate(0,' + margin.bottom + ')').append('rect').attr('class', 'bar').attr('x', function(d, i) {
          return x(d.channelName) + 27;
        }).attr('width', 35).attr('y', function(d) {
          return y(d.channelCount);
        }).attr('height', function(d, i) {
          return height - y(d.channelCount);
        });
        return d3.select('#barchart').selectAll('g.bar-g').data(data.channels).append('image').attr('xlink:href', function(d) {
          return d.channelPicture;
        }).attr('height', 34).attr('width', 62).attr('x', function(d, i) {
          return x(d.channelName) + 10;
        }).attr('y', height + 15);
      };

      BarView.prototype.drawTooltip = function(data) {
        d3.select('#barchart').append('filter').attr('id', 'f1').attr('width', '150%').attr('height', '150%').append('feOffset').attr('result', 'offOut').attr('in', 'SourceAlpha').attr('dx', 0).attr('dy', 3);
        d3.select('#barchart').select('filter').append('feGaussianBlur').attr('stdDeviation', 1).attr('result', 'blur');
        d3.select('#barchart').selectAll('g.bar-g').append('rect').attr('class', 'tooltip shadow').attr('height', 45).attr('width', 100).attr('filter', 'url(' + Backbone.history.fragment + '#f1)').data(data.channels).attr('x', function(d, i) {
          return x(d.channelName) - 8;
        }).attr('y', function(d) {
          return y(d.channelCount) - 55;
        }).attr('rx', 20).attr('ry', 25);
        d3.select('#barchart').selectAll('g.bar-g').append('rect').data(data.channels).attr('class', 'tooltip').attr('height', 45).attr('width', 100).attr('x', function(d, i) {
          return x(d.channelName) - 8;
        }).attr('y', function(d) {
          return y(d.channelCount) - 55;
        }).attr('rx', 20).attr('ry', 25);
        d3.select('#barchart').selectAll('g.bar-g').append('text').data(data.channels).attr('text-anchor', 'middle').attr('class', 'tooltip name').attr('x', function(d, i) {
          return x(d.channelName) + 42;
        }).attr('y', function(d) {
          return y(d.channelCount) - 33;
        }).text(function(d) {
          return d.channelName;
        });
        return d3.select('#barchart').selectAll('g.bar-g').append('text').data(data.channels).attr('text-anchor', 'middle').attr('class', 'tooltip count').attr('x', function(d, i) {
          return x(d.channelName) + 42;
        }).attr('y', function(d) {
          return y(d.channelCount) - 18;
        }).html(function(d) {
          return d.channelCount;
        });
      };

      BarView.prototype.render = function(data) {
        this.$el.html(this.template());
        this.svg();
        this.getScale(data);
        this.drawContent(data);
        this.drawTooltip(data);
        this.getTotals(data);
        if (data.channels.length <= 0) {
          $('.module.bar').empty().append('<div class="no-data"></div>');
          return $('.module.bar .no-data').append('<p><i class="icon-heart_broken"></i>Aucune donnée disponible</p>');
        }
      };

      return BarView;

    })(Backbone.View);
  });

}).call(this);

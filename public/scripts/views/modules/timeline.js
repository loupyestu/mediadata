// Generated by CoffeeScript 1.7.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'backbone', 'd3', 'text!templates/modules/timeline.html'], function($, _, Backbone, d3, tplTimeline) {
    'use strict';
    var TimelineView;
    return TimelineView = (function(_super) {
      var area, height, margin, parseDate, valueline, width, xAxis, xScale, yAxis, yGrid, yScale;

      __extends(TimelineView, _super);

      function TimelineView() {
        return TimelineView.__super__.constructor.apply(this, arguments);
      }

      TimelineView.prototype.el = '.module.timeline';

      TimelineView.prototype.template = _.template(tplTimeline);

      margin = {
        top: 30,
        right: 50,
        bottom: 50,
        left: 50
      };

      width = 920;

      height = 300;

      xScale = d3.time.scale().range([0, width]);

      yScale = d3.scale.linear().range([height, 0]);

      xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(8);

      yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5);

      yGrid = function() {
        return d3.svg.axis().scale(yScale).orient('left').ticks(5);
      };

      area = d3.svg.area().x(function(d) {
        if (d) {
          return xScale(d.mentionDate);
        }
      }).y0(height).y1(function(d) {
        if (d) {
          return yScale(d.mentionCount);
        }
      });

      valueline = d3.svg.line().x(function(d) {
        if (d) {
          return xScale(d.mentionDate);
        }
      }).y(function(d) {
        if (d) {
          return yScale(d.mentionCount);
        }
      });

      parseDate = d3.time.format('%Y-%m').parse;

      TimelineView.prototype.svg = function() {
        return d3.selectAll(this.$el).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('class', 'thetimeline');
      };

      TimelineView.prototype.translate = function() {
        var i, monthsEN, monthsFR, shortMonthsEN, shortMonthsFR, _i, _results;
        monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        monthsFR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        shortMonthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        shortMonthsFR = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juill', 'août', 'sept', 'oct', 'nov', 'déc'];
        _results = [];
        for (i = _i = 0; _i <= 12; i = ++_i) {
          _results.push($('g.tick text:contains(' + monthsEN[i] + ')').html(monthsFR[i]));
        }
        return _results;
      };


      /* HEADER INFOS */

      TimelineView.prototype.getTotals = function(data) {
        var d, i, total, widthFirstBloc, _i, _j, _len, _len1, _ref, _ref1;
        total = 0;
        _ref = data.person1.timelineMentions;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          d = _ref[i];
          d.mentionCount = +d.mentionCount;
          total += d.mentionCount;
        }
        $('.module.timeline h4:first-of-type').html(data.person1.name);
        $('.module.timeline h3:first-of-type span').html(total.toLocaleString());
        widthFirstBloc = $('.module.timeline h4:first-of-type').width();
        if (widthFirstBloc > $('.module.timeline h3:first-of-type').width()) {
          $('.module.timeline h3:first-of-type').width(widthFirstBloc + 2);
        }
        if (data.person2) {
          total = 0;
          _ref1 = data.person2.timelineMentions;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            d = _ref1[i];
            d.mentionCount = +d.mentionCount;
            total += d.mentionCount;
          }
          $('.module.timeline h4:last-of-type').html(data.person2.name);
          return $('.module.timeline h3:last-of-type span').html(total.toLocaleString());
        } else {
          $('.module.timeline h3:last-of-type').hide();
          return $('.module.timeline h4:last-of-type').hide();
        }
      };


      /* FILTER */

      TimelineView.prototype.getYears = function(data, comparison) {
        var d, getYears, i, j, years, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _this;
        _this = this;
        years = [];
        getYears = [];
        getYears = JSON.parse(JSON.stringify(data));
        _ref = getYears.person1.timelineMentions;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          d = _ref[i];
          d.mentionRawDate = d.mentionDate;
          d.year = d.mentionRawDate.substring(0, 4);
          d.year = +d.year;
        }
        if (comparison === true) {
          _ref1 = getYears.person2.timelineMentions;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            d = _ref1[i];
            d.mentionRawDate = d.mentionDate;
            d.year = d.mentionRawDate.substring(0, 4);
            d.year = +d.year;
          }
        }
        _ref2 = getYears.person1.timelineMentions;
        for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
          d = _ref2[i];
          if (years.indexOf(d.year) < 0) {
            years.push(d.year);
          }
        }
        if (comparison === true) {
          _ref3 = getYears.person2.timelineMentions;
          for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
            d = _ref3[i];
            if (years.indexOf(d.year) < 0) {
              years.push(d.year);
            }
          }
        }
        years.sort();
        for (i = _m = 0, _len4 = years.length; _m < _len4; i = ++_m) {
          d = years[i];
          if (this.getCount(getYears, years[i], comparison === true ? true : false) < 3) {
            j = years.indexOf(years[i]);
            if (j > -1) {
              years.splice(j, 1);
            }
          }
        }
        return this.drawFilter(years, data, comparison === true ? true : false);
      };

      TimelineView.prototype.getDataYear = function(data, year, comparison) {
        var d, dataYear, i, tmpArray, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        dataYear = [];
        dataYear = JSON.parse(JSON.stringify(data));
        _ref = dataYear.person1.timelineMentions;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          d = _ref[i];
          d.mentionRawDate = d.mentionDate;
          d.mentionDate = parseDate(d.mentionDate);
          d.year = d.mentionRawDate.substring(0, 4);
          d.year = +d.year;
        }
        if (comparison === true) {
          _ref1 = dataYear.person2.timelineMentions;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            d = _ref1[i];
            d.mentionRawDate = d.mentionDate;
            d.mentionDate = parseDate(d.mentionDate);
            d.year = d.mentionRawDate.substring(0, 4);
            d.year = +d.year;
          }
        }
        if (year) {
          _ref2 = dataYear.person1.timelineMentions;
          for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
            d = _ref2[i];
            if (dataYear.person1.timelineMentions[i].year) {
              if (dataYear.person1.timelineMentions[i].year !== year) {
                delete dataYear.person1.timelineMentions[i];
              }
            }
          }
          if (comparison === true) {
            _ref3 = dataYear.person2.timelineMentions;
            for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
              d = _ref3[i];
              if (dataYear.person2.timelineMentions[i].year) {
                if (dataYear.person2.timelineMentions[i].year !== year) {
                  delete dataYear.person2.timelineMentions[i];
                }
              }
            }
          }
          tmpArray = [];
          _ref4 = dataYear.person1.timelineMentions;
          for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
            d = _ref4[_m];
            if (d) {
              tmpArray.push(d);
            }
          }
          dataYear.person1.timelineMentions = tmpArray;
          if (comparison === true) {
            tmpArray = [];
            _ref5 = dataYear.person2.timelineMentions;
            for (_n = 0, _len5 = _ref5.length; _n < _len5; _n++) {
              d = _ref5[_n];
              if (d) {
                tmpArray.push(d);
              }
            }
            dataYear.person2.timelineMentions = tmpArray;
          }
        }
        return dataYear;
      };

      TimelineView.prototype.getCount = function(data, year, comparison, total) {
        var count, count2, d, i, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        if (total) {
          count = 0;
          _ref = data.person1.timelineMentions;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            d = _ref[i];
            if (+d.mentionCount) {
              count++;
            }
          }
          if (comparison === true) {
            count2 = 0;
            _ref1 = data.person2.timelineMentions;
            for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
              d = _ref1[i];
              if (+d.mentionCount) {
                count2++;
              }
            }
            return [count, count2];
          } else {
            return count;
          }
        } else {
          count = 0;
          _ref2 = data.person1.timelineMentions;
          for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
            d = _ref2[i];
            if (+d.year === year) {
              count++;
            }
          }
          if (comparison === true) {
            _ref3 = data.person2.timelineMentions;
            for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
              d = _ref3[i];
              if (+d.year === year) {
                count++;
              }
            }
          }
          return count;
        }
      };

      TimelineView.prototype.getMaxYValuesYear = function(data, comparison) {
        var maxYValuesYear;
        maxYValuesYear = 0;
        maxYValuesYear = [];
        maxYValuesYear.push(d3.max(data.person1.timelineMentions, function(d) {
          return d.mentionCount;
        }));
        if (comparison === true) {
          maxYValuesYear.push(d3.max(data.person2.timelineMentions, function(d) {
            return d.mentionCount;
          }));
        }
        return maxYValuesYear;
      };

      TimelineView.prototype.drawFilter = function(years, data, comparison) {
        var iArrow, _this;
        _this = this;
        iArrow = 0;
        $('#filter > ul ul li').html('Par années (' + years[0] + '-' + years[years.length - 1] + ')');
        $('#filter > ul').on('click', function() {
          return $(this).toggleClass('active');
        });
        $('#filter > ul ul li').on('click', function() {
          var dataAll, dataYear, maxYValuesAll, maxYValuesYear;
          iArrow = years.length - 1;
          $(this).siblings().remove();
          if ($(this).hasClass('get-all')) {
            $(this).parent().parent().find('>:first-child').html($(this).html());
            $(this).html('Par années (' + years[0] + '-' + years[years.length - 1] + ')');
            $('.arrow').removeClass('enabled').addClass('disabled');
            $(this).toggleClass('get-all');
            if (comparison === true) {
              dataAll = _this.getDataYear(data, null, true);
              maxYValuesAll = _this.getMaxYValuesYear(dataAll, true);
              if (maxYValuesAll[0] < maxYValuesAll[1]) {
                _this.redraw(dataAll, null, 2, d3.max(maxYValuesAll));
                return _this.redraw(dataAll, null, 1, d3.max(maxYValuesAll));
              } else {
                _this.redraw(dataAll, null, 1, d3.max(maxYValuesAll));
                return _this.redraw(dataAll, null, 2, d3.max(maxYValuesAll));
              }
            } else {
              dataAll = _this.getDataYear(data, null, false);
              maxYValuesAll = _this.getMaxYValuesYear(dataAll, false);
              return _this.redraw(dataAll, null, 1, d3.max(maxYValuesAll));
            }
          } else {
            $(this).parent().parent().find('>:first-child').html('Année ' + years[years.length - 1]);
            $('.arrow:first-child').toggleClass('enabled disabled');
            $(this).html('Toutes les mentions').toggleClass('get-all');
            if (comparison === true) {
              dataYear = _this.getDataYear(data, years[years.length - 1], true);
              maxYValuesYear = _this.getMaxYValuesYear(dataYear, true);
              if (maxYValuesYear[0] < maxYValuesYear[1]) {
                _this.redraw(dataYear, years[years.length - 1], 2, d3.max(maxYValuesYear));
                return _this.redraw(dataYear, years[years.length - 1], 1, d3.max(maxYValuesYear));
              } else {
                _this.redraw(dataYear, years[years.length - 1], 1, d3.max(maxYValuesYear));
                return _this.redraw(dataYear, years[years.length - 1], 2, d3.max(maxYValuesYear));
              }
            } else {
              dataYear = _this.getDataYear(data, years[years.length - 1], false);
              maxYValuesYear = _this.getMaxYValuesYear(dataYear, false);
              return _this.redraw(dataYear, years[years.length - 1], 1, maxYValuesYear[0]);
            }
          }
        });
        return $('.arrow').on('click', function() {
          var dataYear, maxYValuesYear;
          if ($(this).hasClass('enabled')) {
            if ($(this).hasClass('next')) {
              iArrow++;
              if (comparison === true) {
                dataYear = [];
                maxYValuesYear = [];
                dataYear = _this.getDataYear(data, years[iArrow], true);
                maxYValuesYear = _this.getMaxYValuesYear(dataYear, true);
                if (maxYValuesYear[0] < maxYValuesYear[1]) {
                  _this.redraw(dataYear, years[iArrow], 2, d3.max(maxYValuesYear));
                  _this.redraw(dataYear, years[iArrow], 1, d3.max(maxYValuesYear));
                } else {
                  _this.redraw(dataYear, years[iArrow], 1, d3.max(maxYValuesYear));
                  _this.redraw(dataYear, years[iArrow], 2, d3.max(maxYValuesYear));
                }
              } else {
                dataYear = [];
                maxYValuesYear = [];
                dataYear = _this.getDataYear(data, years[iArrow], false);
                maxYValuesYear = _this.getMaxYValuesYear(dataYear, false);
                _this.redraw(dataYear, years[iArrow], 1, d3.max(maxYValuesYear));
              }
              if (years[iArrow]) {
                $('#filter > ul > li').html('Année ' + years[iArrow]);
                $('.arrow:first-child').removeClass('disabled').addClass('enabled');
              }
              if (!years[iArrow + 1]) {
                return $('.arrow:last-child').toggleClass('enabled disabled');
              }
            } else if ($(this).hasClass('prev')) {
              iArrow--;
              if (comparison === true) {
                dataYear = [];
                maxYValuesYear = [];
                dataYear = _this.getDataYear(data, years[iArrow], true);
                maxYValuesYear = _this.getMaxYValuesYear(dataYear, true);
                if (maxYValuesYear[0] < maxYValuesYear[1]) {
                  _this.redraw(dataYear, years[iArrow], 2, d3.max(maxYValuesYear));
                  _this.redraw(dataYear, years[iArrow], 1, d3.max(maxYValuesYear));
                } else {
                  _this.redraw(dataYear, years[iArrow], 1, d3.max(maxYValuesYear));
                  _this.redraw(dataYear, years[iArrow], 2, d3.max(maxYValuesYear));
                }
              } else {
                dataYear = [];
                maxYValuesYear = [];
                dataYear = _this.getDataYear(data, years[iArrow], false);
                maxYValuesYear = _this.getMaxYValuesYear(dataYear, false);
                _this.redraw(dataYear, years[iArrow], 1, d3.max(maxYValuesYear));
              }
              if (years[iArrow]) {
                $('#filter > ul > li').html('Année ' + years[iArrow]);
                $('.arrow:last-child').removeClass('disabled').addClass('enabled');
              }
              if (!years[iArrow - 1]) {
                return $('.arrow:first-child').toggleClass('enabled disabled');
              }
            }
          }
        });
      };


      /* CHART (draw/redraw) */

      TimelineView.prototype.scanData = function(data, comparison) {
        var count, d, i, maxXValue, maxXValues, maxYValue, maxYValues, minMaxX, minMaxY, minXValue, minXValues, minYValue, minYValues, showDots, _i, _j, _len, _len1, _ref, _ref1;
        _ref = data.person1.timelineMentions;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          d = _ref[i];
          d.mentionRawDate = d.mentionDate;
          d.mentionDate = parseDate(d.mentionDate);
          d.mentionCount = +d.mentionCount;
        }
        if (comparison) {
          _ref1 = data.person2.timelineMentions;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            d = _ref1[i];
            d.mentionRawDate = d.mentionDate;
            d.mentionDate = parseDate(d.mentionDate);
            d.mentionCount = +d.mentionCount;
          }
        }
        minXValues = [];
        minYValues = [];
        maxXValues = [];
        maxYValues = [];
        minMaxX = [];
        minMaxY = [];
        minXValues.push(d3.min(data.person1.timelineMentions, function(d) {
          return d.mentionDate;
        }));
        maxXValues.push(d3.max(data.person1.timelineMentions, function(d) {
          return d.mentionDate;
        }));
        minYValues.push(d3.min(data.person1.timelineMentions, function(d) {
          return d.mentionCount;
        }));
        maxYValues.push(d3.max(data.person1.timelineMentions, function(d) {
          return d.mentionCount;
        }));
        if (comparison) {
          minXValues.push(d3.min(data.person2.timelineMentions, function(d) {
            return d.mentionDate;
          }));
          maxXValues.push(d3.max(data.person2.timelineMentions, function(d) {
            return d.mentionDate;
          }));
          minYValues.push(d3.min(data.person2.timelineMentions, function(d) {
            return d.mentionCount;
          }));
          maxYValues.push(d3.max(data.person2.timelineMentions, function(d) {
            return d.mentionCount;
          }));
        }
        minXValue = d3.min(minXValues);
        maxXValue = d3.max(maxXValues);
        minMaxX.push(minXValue, maxXValue);
        minYValue = d3.max(minYValues);
        maxYValue = d3.max(maxYValues);
        minMaxY.push(minYValue, maxYValue);
        xScale.domain(minMaxX);
        yScale.domain(minMaxY);
        showDots = false;
        count = this.getCount(data, null, comparison, true);
        if (comparison) {
          if (count[0] <= 35 && count[1] <= 35) {
            showDots = true;
          }
        } else {
          if (count <= 35) {
            showDots = true;
          }
        }
        if (comparison) {
          if (maxYValues[0] < maxYValues[1]) {
            this.draw(data.person2.timelineMentions, 2, true, showDots);
            return this.draw(data.person1.timelineMentions, 1, false, showDots);
          } else {
            this.draw(data.person1.timelineMentions, 1, true, showDots);
            return this.draw(data.person2.timelineMentions, 2, false, showDots);
          }
        } else {
          return this.draw(data.person1.timelineMentions, 1, true, showDots);
        }
      };

      TimelineView.prototype.draw = function(data, datasetnumber, drawGrid, showDots) {
        var path;
        if (drawGrid === true) {
          d3.select('g.thetimeline').append('g').attr('class', 'grid').call(yGrid().tickSize(-width, 0, 0).tickFormat(''));
        }
        path = d3.select('g.thetimeline').append('path').datum(data).attr('class', 'line' + datasetnumber).attr('d', valueline);
        d3.select('g.thetimeline').append('path').datum(data).attr('class', 'area' + datasetnumber).transition().duration(1500).ease('sin-in-out').style('opacity', 1).attr('d', area);
        d3.select('g.thetimeline').selectAll('circle' + datasetnumber).data(data).enter().append('circle').attr('class', 'dot' + datasetnumber).attr('r', 3.5).attr('cx', function(d) {
          return xScale(d.mentionDate);
        }).attr('cy', function(d) {
          return yScale(d.mentionCount);
        });
        if (showDots === true) {
          d3.select('g.thetimeline').selectAll('.dot' + datasetnumber).style('opacity', '1');
        }
        if (datasetnumber === 1) {
          d3.select('g.thetimeline').append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis);
          d3.select('g.thetimeline').append('g').attr('class', 'y axis').call(yAxis).append('text').datum(data).attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end');
        }
        return this.translate();
      };

      TimelineView.prototype.redraw = function(data, year, personNumber, maxYValueYear) {
        xScale.domain(d3.extent(data['person' + personNumber].timelineMentions, function(d) {
          return d.mentionDate;
        }));
        yScale.domain([0, maxYValueYear]);
        d3.select('g.grid').transition().duration(1500).ease('sin-in-out').call(yGrid().tickSize(-width, 0, 0).tickFormat(''));
        d3.select('g.thetimeline').select('g.x').transition().duration(1500).ease('sin-in-out').call(xAxis);
        d3.select('g.thetimeline').select('g.y').transition().duration(1500).ease('sin-in-out').call(yAxis);
        d3.select('g.thetimeline').select('path.line' + personNumber).remove();
        d3.select('g.thetimeline').append('path').attr('class', 'line' + personNumber).datum(data['person' + personNumber].timelineMentions).transition().duration(1500).ease('sin-in-out').attr('d', valueline);
        d3.select('g.thetimeline').select('path.area' + personNumber).remove();
        d3.select('g.thetimeline').append('path').attr('class', 'area' + personNumber).datum(data['person' + personNumber].timelineMentions).transition().duration(1500).ease('sin-in-out').attr('d', area).style('opacity', 1);
        if (year) {
          if (data['person2']) {
            d3.selectAll(this.$el).selectAll('circle:not(.stay)').remove();
          } else {
            d3.selectAll('circle.dot' + personNumber).remove();
          }
          d3.selectAll('circle.stay').classed('stay', false);
          d3.select('g.thetimeline').selectAll('circle' + personNumber).data(data['person' + personNumber].timelineMentions).enter().append('circle').attr('class', 'dot' + personNumber).classed('stay', true).attr('r', 3.5).attr('cx', function(d) {
            return xScale(d.mentionDate);
          }).attr('cy', function(d) {
            return yScale(d.mentionCount);
          }).transition().delay(1300).style('opacity', 1);
        } else {
          if (data['person2']) {
            d3.selectAll('circle.dot1').remove();
            d3.selectAll('circle.dot2').remove();
          } else {
            d3.selectAll('circle.dot1').remove();
          }
        }
        return this.translate();
      };


      /* EXEC */

      TimelineView.prototype.render = function(data) {
        var originalData;
        if ((!data.person2 && data.person1.timelineMentions.length <= 2) || (data.person2 && (data.person1.timelineMentions.length + data.person2.timelineMentions.length) <= 2)) {
          $('.module.timeline').empty().append('<div class="no-data"></div>');
          return $('.module.timeline .no-data').append('<p><i class="icon-heart_broken"></i>Aucune donnée disponible</p>');
        } else {
          originalData = JSON.parse(JSON.stringify(data));
          this.$el.html(this.template());
          this.svg();
          this.getTotals(originalData);
          if (data.person2) {
            this.scanData(data, true);
            return this.getYears(originalData, true);
          } else {
            this.scanData(data, false);
            return this.getYears(originalData);
          }
        }
      };

      return TimelineView;

    })(Backbone.View);
  });

}).call(this);

// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  require.config({
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      }
    },
    paths: {
      jquery: 'vendors/jquery-2.1.1.min',
      backbone: 'vendors/backbone.min',
      underscore: 'vendors/underscore.min',
      text: 'vendors/require-text'
    }
  });

  define(['mediadata'], function(md) {
    return md.initialize();
  });

}).call(this);

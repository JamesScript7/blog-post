'use strict';

module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define('posts', {
    title: {
      type: DataTypes.TEXT,
      required: true
    },
    body: {
      type: DataTypes.TEXT,
      required: true
    }
  });

  return Posts;
}

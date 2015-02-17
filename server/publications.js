Meteor.publish('times', function() {
  return Times.find();
});
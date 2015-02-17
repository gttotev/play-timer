Times = new Mongo.Collection('times');

/*Times.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});*/

Meteor.methods({
  timeInsert: function(timeDoc) {
    _.extend(timeDoc, {
      user: Meteor.user().username,
      start: new Date(),
      stop: new Date()
    });
    return [Times.insert(timeDoc), timeDoc.start];
  },
  timeUpdate: function(start) {
    var stop = new Date();
    var timeDiff = stop.getTime() - start.getTime();
    var hrs = Math.floor(timeDiff / 3600000);
    var mins = Math.floor(timeDiff / 60000) - hrs*60;
    var secs = Math.ceil(timeDiff / 1000) - mins*60;
    
    return [hrs, mins, secs];
  },
  timeStop: function(id) {
    var start = Times.findOne(id).start;
    var stop = new Date();
    var timeDiff = stop.getTime() - start.getTime();
    var hrs = Math.floor(timeDiff / 3600000);
    var mins = Math.floor(timeDiff / 60000) - hrs*60;
    var secs = Math.ceil(timeDiff / 1000) - mins*60;
    var timeStr = hrs + " hours, " + mins + " minutes, " + secs + " seconds";
    
    Times.update(id, {$set: {on: false, stop: new Date(), totalTime: timeStr}});
    return timeStr;
  }
});
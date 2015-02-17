Template.timer.helpers({
  startDis: function() { return (Session.get('activeId') ? "disabled" : ""); },
  stopDis: function() { return (Session.get('activeId') ? "" : "disabled"); },
  secs: function() { return (Session.get('activeTimer') ? Session.get('activeTimer').secs : 0); },
  mins: function() { return (Session.get('activeTimer') ? Session.get('activeTimer').mins : 0); },
  hrs: function() { return (Session.get('activeTimer') ? Session.get('activeTimer').hrs : 0); }
});
Template.timer.events({
  "submit form": function(e) {
    e.preventDefault();
    document.getElementById('stop').disabled = false;
    e.target.start.disabled = true;

    var timeDoc = {
      //user: e.target.user.value,
      type: e.target.type.value,
      on: true,
    };
    Meteor.call('timeInsert', timeDoc, function (err, res) { 
      if (err) throw err;
      Session.set('activeId', res[0]);
      Session.set('activeTimer', {start: res[1], hrs: 0, mins: 0, secs: 0});
      Session.set('timerFunc', setInterval(function() {
        var start = Session.get('activeTimer').start;
        Meteor.call('timeUpdate', start, function(err, res) {
          if (err) throw err;
          Session.set('activeTimer', {start: start, hrs: res[0], mins: res[1], secs: res[2]});
        });
      }, 1000));
    });
  },
  "click #stop": function(e) {
    e.preventDefault();
    e.target.disabled = true;
    document.getElementById('start').disabled = false;
    
    Meteor.call('timeStop', Session.get('activeId'), function(err, res) {
      alert('You played for ' + res);
    });
    Session.set('activeId', null);
    Session.set('activeTimer', null);
    clearInterval(Session.get('timerFunc'));
    Session.set('timerFunc', null);
  }
});
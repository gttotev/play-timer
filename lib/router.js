Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'page404',
  waitOn: function() { return Meteor.subscribe('times'); }
});

Router.route('/', {name: 'view'});
Router.route('/timer', {name: 'timer'});

var requireLogin = function() { 
  if (!Meteor.user())
    this.render('page401');
  else
    this.next();
}
Router.onBeforeAction(requireLogin, {only: 'timer'});
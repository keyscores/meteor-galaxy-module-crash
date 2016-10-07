import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';


Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Meteor.call('runSandbox', function(err, res){
      if ( res ){
        var array = Session.get('methodResponse', res) || []
        array.push( res )
        Session.set('methodResponse', array)
      }else{
          Session.set('methodResponse', {message: 'Galaxy Crashed'})
      }

    })
  },
});

Template.hello.helpers({
  methodResponse: function(){
    return JSON.stringify( Session.get('methodResponse') );

  }
});

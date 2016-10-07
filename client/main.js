import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Meteor.call('runSandbox')
  },
});

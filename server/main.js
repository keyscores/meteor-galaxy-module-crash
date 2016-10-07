import { Meteor } from 'meteor/meteor';
const SANDBOX = require('vQMgArq1o4U1').sandbox;


Meteor.startup(() => {
  // code to run on server at startup
});


Meteor.methods({
  runSandbox :function(){

    sandboxed_code = 'function botFunction(){ return "a"}; RESULT = botFunction()'
    SANDBOX( sandboxed_code , [] , {} , function(err, res ){
      if (err ){
        console.log('err: ', err);

      }else{
        console.log('res: ', res);
      }
    })
  }
});

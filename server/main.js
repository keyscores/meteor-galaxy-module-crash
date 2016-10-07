import { Meteor } from 'meteor/meteor';
import Future from 'fibers/future';


const SANDBOX = require('vQMgArq1o4U1').sandbox;
const startCluster = require('vQMgArq1o4U1').startCluster
const sendScriptJob = require('vQMgArq1o4U1').sendScriptJob



Meteor.startup(() => {
  // code to run on server at startup
  startCluster(function(){
    console.log('cluster started');
  })
});


Meteor.methods({
  runLegacy :function(){

    var fut = new Future();


    sandboxed_code = 'function botFunction(){ return "a"}; RESULT = botFunction()'
    SANDBOX( sandboxed_code , [] , {} , function(err, res ){
      if (err ){
        console.log('err: ', err);
        fut.return(err);


      }else{
        console.log('res: ', res);
        fut.return(res);

      }
    })

    return fut.wait();

  },
  runSandbox: function(){
    sandboxed_code = 'function botFunction(){ return "a"}; RESULT = botFunction()'

    var scriptObj = {
      script : sandboxed_code,
      libs: [],
      context: {}
    }

    // sendScriptJob( {  script : 'wrapper=function(){ return 1+8 }; RESULT = wrapper()'}, function(err, res ){})
    var fut = new Future();

    sendScriptJob( scriptObj, function(err, res ){
      if (err){
        console.log('err: ', err);
        fut.return(err);

      }
      if (res){
        console.log('res: ', res);
        fut.return(res);

      }
    });

    return fut.wait();
  }
});

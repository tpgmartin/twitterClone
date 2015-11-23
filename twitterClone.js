Tweets = new Meteor.Collection('tweets');

if (Meteor.isClient) {
  // set initial character count to zero
  Template.tweetBox.onRendered(function () {
    Session.set('numChars', 0);
  });

  // update character count on typing
  Template.tweetBox.events({
    'input #tweetText': function () {
      Session.set('numChars', $('#tweetText').val().length);
    },

    'click button': function () {
      var tweet = $('#tweetText').val();
      $('#tweetText').val('');
      Session.set('numChars', 0);
      Tweets.insert({message: tweet});
    }
  });

  // push session variable changes to HTML
  Template.tweetBox.helpers({
    charCount: function () {
      return 140 - session.get('numChars');
    },

    charClass: function () {
      if (Session.get('numChars') > 140) {
        return 'errCharCount';
      } else {
        return 'charCount';
      }
    },

    disableButton: function () {
      if (Session.get('numChars') <= 0 || Session.get('numChars') > 140) {
        return 'disabled';
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

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
      Tweets.insert({message: tweet, user: Meteor.user().username});
    }
  });

  //  create new user entry on signup
  Template.userManagement.events({
    'click #signup': function () {
      var user = {
        username: $('#signup-username').val(),
        password: $('#signup-password').val(),
        profile: {
          fullname: $('#signup-fullname').val(),
        }
      };

      Accounts.createUser(user, function (error) {
        if (error) alert(error);
      });
    },

    'click #login': function () {
        username: $('#login-username').val();
        password: $('#login-password').val();

        Meteor.loginWithPassword(username, password, function (error) {
          if (error) alert(error);
        });
      },

      'click #logout': function () {
        Meteor.logout();
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
      if (Session.get('numChars') <= 0 || Session.get('numChars') > 140 || !Meteor.user()) {
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

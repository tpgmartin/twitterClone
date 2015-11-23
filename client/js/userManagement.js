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

Meteor.publish('tweets', function () {
  if (this.userId) {
    var username = Meteor.users.findOne({_id: this.userId}).username;
    var currentFollowings = UserUtils.findFollowings(username);

    return Tweets.find({user: { $in: currentFollowings }});
  }
});

Meteor.publishComposite('tweets', function (username) {
  return {
    find: function () {
      // Find the current user's following users
      return Relationships.find({ follower: username });
    },
    children: [{
      find: function (relationship) {
        // Find tweets from followed users
        return Tweets.find({ users: relationship.following });
      }
    }]
  }
});

Meteor.publish('ownTweets', function (username) {
  return Tweets.find({ user: username });
});

// List of all usernames
Meteor.publish('users', function (username) {
  return Meteor.users.find({}, {
    fields: { 'username': 1 },
    limit: 100
  });
});

// List of usernames the current user is following
Meteor.publish('followings', function (username) {
  return Relationships.find({ follower: username });
});

Meteor.publish('followers', function (username) {
  return Relationships.find({ following: username });
});

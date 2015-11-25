Template.tweetFeed.onCreated(function () {
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);  
  }
});

Template.tweetFeed.helpers({
  'tweetMessage': function () {
    return Tweets.find({}, {
      sort: {timestamp: -1},
      limit: 10
    });
  }
});

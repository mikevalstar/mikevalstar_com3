var React = require('react');
var Moment = require('moment');

var PostShort = React.createClass({
  render: function() {

    var post = this.props.post;
    var formattedDate = Moment(post.pubDate).format("MMM D YYYY");

    return (
      <div className="post_short">
          <h2><a href={"/post/" + post.link}>{post.title}</a></h2>
          <div className="meta">
              <time pubdate dateTime={post.pubDate}>{formattedDate}</time> - <span className="author"><a rel="author" href={"mailto:" + post.author.email}>{post.author.name}</a></span>
          </div>
          <article dangerouslySetInnerHTML={{__html: post.excerpt}}></article>
      </div>
    );

  }
});

module.exports = PostShort;

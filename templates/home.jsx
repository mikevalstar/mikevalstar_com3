var React = require('react');

//Templates
var PostShort = require('./partials/postShort');
var Layout = require('./partials/layout');

var Page = React.createClass({
  render: function() {

    var shortPosts = this.props.collections.post.map(function(item){
      return <PostShort post={item} />
    });

    return (
      <Layout page={this.props}>
        <div className="container">
          <div className="row">
            <div id="home" className="col-xs-12">
              {shortPosts}
            </div>
          </div>
        </div>
      </Layout>
    );

  }
});

module.exports = Page;

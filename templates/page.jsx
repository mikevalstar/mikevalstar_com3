var React = require('react');

//Templates
var Layout = require('./partials/layout');

var Page = React.createClass({
  render: function() {
    return (
      <Layout page={this.props}>
        <div className="container">
          <div className="row">
            <div id="page" className="col-xs-12">
                <h1>{this.props.title}</h1>
                <article dangerouslySetInnerHTML={{__html: this.props.contents}}></article>
            </div>
          </div>
        </div>
      </Layout>
    );

  }
});

module.exports = Page;

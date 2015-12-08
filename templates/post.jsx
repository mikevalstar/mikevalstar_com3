
'use strict';

var React = require('react');
var Moment = require('moment');

// Templates
var Layout = require('./partials/layout');

var Post = React.createClass({

  render: function() {

    var formattedDate = Moment(this.props.pubDate).format('LLL');

    return (
      <Layout page={this.props}>
        <div className='container'>
          <div className='row'>
            <div id='post' className='col-xs-12'>
              <h2>{this.props.title}</h2>
              <article>
                <div dangerouslySetInnerHTML={{__html: this.props.contents}}></div>

                <section id='post-author' className='thin'>
                <p>
                    <span className='author'>By <a rel='author' href={'mailto:' + this.props.author.email}>{this.props.author.name}</a></span>
                    <span> on </span>
                    <time pubdate dateTime={this.props.pubDate}>{formattedDate}</time>
                </p>
                </section>

                <div id='disqus_thread'></div>
                <script dangerouslySetInnerHTML={{ __html: 'var disqus_config = function () { this.page.identifier = "' + this.props.link + '" }' }} />
                <script src="/disqus.js"></script>

              </article>
            </div>
          </div>
        </div>
      </Layout>
    );

  },

});

module.exports = Post;

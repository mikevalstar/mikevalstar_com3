var React = require('react');

var Layout = React.createClass({



  render: function() {

    var page = this.props.page;

    var meta = [];

    if(page.meta){
      // Overall Meta
      if(page.meta.description){
        meta.push( <meta name="description" content={page.meta.description} /> );
      }
      if(page.meta.shorturl){
        meta.push( <link rel="shorturl" href={page.meta.shorturl} /> );
      }

      // Schema.org markup for Google+
      meta.push( <meta itemProp="name" content={page.title} /> );
      if(page.meta.description){
        meta.push( <meta itemProp="description" content={page.meta.description} /> );
      }
      if(page.meta.image){
        meta.push( <meta itemProp="image" content={page.meta.image} /> );
      }

      // Twitter Card data
      meta.push( <meta name="twitter:card" content="summary" /> );
      if(page.meta.twitterhandle){
        <meta name="twitter:site" content="@mikevalstar" />
      }
      meta.push( <meta name="twitter:title" content={page.title} /> );
      if(page.meta.description){
        meta.push( <meta name="twitter:description" content={page.meta.description} /> );
      }
      if(page.meta.twitterhandle){
        meta.push( <meta name="twitter:creator" content={page.meta.twitterhandle} /> );
      }
      if(page.meta.image){
        meta.push( <meta name="twitter:image" content={page.meta.image} /> );
      }

      // Open Graph data
      meta.push( <meta property="og:title" content="{{title}}" /> );
      meta.push( <meta property="og:type" content="article" /> );
      meta.push( <meta property="og:url" content="http://mikevalstar.com/{{this.path}}/" /> );
      if(page.meta.description){
        meta.push( <meta property="og:description" content={page.meta.description} /> );
      }
      meta.push( <meta property="og:site_name" content="Mike Valstar Blog" /> );
      if(page.meta.image){
        meta.push( <meta property="og:image" content={page.meta.image} /> );
      }

    }

    return (
      <html>
      <head lang="en">
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Mike Valstar - {page.title}</title>

          {meta}

          <link rel="alternate" type="application/rss+xml" title="Mike Valstar Blog RSS" href="http://mikevalstar.com/rss.xml" />

          <link rel="stylesheet" href="/css/main2.css" />
          <link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css" />

          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

          <link rel="icon" href="/img/apple_logo_512.png" sizes="256x256" type="image/png" />
          <link rel="shortcut icon" href="/img/favicon.png" />
          <link rel="apple-touch-icon" href="/img/apple_logo_512.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="/img/apple_logo_57.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/img/apple_logo_72.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/img/apple_logo_114.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/img/apple_logo_144.png" />
          <link rel="apple-touch-icon" sizes="256x256" href="/img/apple_logo_256.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="/img/apple_logo_512.png" />
      </head>
      <body>

      <header id="header">
          <div className="container">
              <div className="row">
                  <div className="col-xs-12 col-sm-6">
                      <h1><a href="/">Mike Valstar - A Blog</a></h1>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                      <div className="pull-right">
                        <a href="/page/about/">About</a>
                      </div>
                  </div>
              </div>
          </div>
      </header>

      <div id="content">
        {this.props.children}
      </div>

      <script src="/goog.js"></script>

      </body>
      </html>
    );

  }
});

module.exports = Layout;

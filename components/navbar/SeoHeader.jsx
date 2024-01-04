/* 
    <SeoHeader
        title={data.title}
        description={data.overview}
        type="webapp"
        name={(data.author) && `${data.author.user.first_name} ${data.author.user.last_name}`}
        thumbnail={data.thumbnail}
        url={window.location.href}
      />
*/

import Head from 'next/head'

const SeoHeader = (props) => {
  
  const defaultURL = "https://instincthub.com"
  let image = (props.thumbnail ? props.thumbnail : '/favicon.png');

  // attach default link protocol
  if(!image.includes('http')){
    image = defaultURL+image
  }

  const defaults = {
    title:'Instasaw - Learning Made Easy',
    description: "Experience the convenience of a central database where you can easily store and share your measurements and styles with a simple click. Simplify your life and find the perfect designer or tailor for you with Instasew.&quot;",
    name: "Instasaw",
    type: "webapp",
    favicon: "/favicon.png"
  }

  return (
    <Head>
      <title>{props.title ? props.title : defaults.title}</title>
      <meta name="description" content={props.description ? props.description : defaults.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="https://instincthub.com/favicon.png" />
      <meta property="og:type" content={props.type ? props.type : defaults.type} />
      <meta property="og:title" content={props.title ? props.title : defaults.title} />
      <meta property="og:description" content={props.description ? props.description : defaults.description} />
      <meta property="og:image" content={image ? image : defaults.favicon} />
      <meta property="og:url" content={defaultURL} />
      <meta name="twitter:creator" content={props.name ? props.name : defaults.name} />
      <meta name="twitter:card" content={props.type ? props.type : defaults.type} />
      <meta name="twitter:title" content={props.title ? props.title : defaults.title} />
      <meta name="twitter:description" content={props.description ? props.description : defaults.description} />
    </Head>
  );
};

export default SeoHeader;
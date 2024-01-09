/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
	  styledComponents: true,
	},
	images: {
	  domains: ["127.0.0.1", '54.211.229.147', "instasaw.optimalinfographics.com"],
	  unoptimized: true,
	},
	// Define the node property and set fs to empty
	node: {
	  fs: "empty",
	},
  };
  
  module.exports = (phase, { defaultConfig }) => {
	return {
	  ...nextConfig,
	  webpack: (config, { isServer }) => {
		if (!isServer) {
		  // Add a rule to handle "node:" URIs
		  config.module.rules.push({
			test: /node_modules[\\/](@web5[\\/]api)[\\/].+\.js$/,
			use: config.module.rules[0].use, // Use the same Babel loader as the default one
		  });
		}
  
		// Ensure to set fallbacks for certain Node.js modules
		config.resolve.fallback = {
		  ...config.resolve.fallback,
		  fs: false,
		  path: false,
		  os: false,
		};
  
		return config;
	  },
	};
  };
  
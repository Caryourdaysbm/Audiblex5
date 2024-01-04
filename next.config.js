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

// if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
// 	nextConfig["env"] = {

// 	};
// } else {
// 	nextConfig["env"] = {

// 	};
// }

// module.exports = nextConfig;

module.exports = (phase, { defaultConfig }) => {
	return {
		...nextConfig,

		webpack: (config) => {
			config.resolve = {
				...config.resolve,
				fallback: {
					fs: false,
					path: false,
					os: false,
				},
			};
			return config;
		},
	};
};

module.exports = function(api) {
  api.cache(false);
  
  // Determine which .env file to use based on environment
  const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: envFile,
        allowUndefined: false,
        safe: false,
      }],
    ],
  };
};

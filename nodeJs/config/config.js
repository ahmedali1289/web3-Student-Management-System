const config = {
    production: {
      SECRET: process.env.SECRET,
      MONGODB_URI: process.env.MONGODB_URI
    },
    default: {
      SECRET: 'mysecretkey',
      MONGODB_URI: 'mongodb+srv://ahmed:2463@cluster0.cbgf0hm.mongodb.net/?retryWrites=true&w=majority'
    }
  }
  
  exports.get = function get(env) {
    return config[env] || config.default
  }
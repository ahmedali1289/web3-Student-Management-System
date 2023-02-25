const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb+srv://ahmed:2463@cluster0.cbgf0hm.mongodb.net/?retryWrites=true&w=majority'
    }
}


exports.get = function get(env){
    return config[env] || config.default
}
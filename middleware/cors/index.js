const cors = require ('cors');

const corsOption = {
    origin: ['*', 'https://hardcore-newton-f6704f.netlify.app'],
    optionsSuccessStatus: 200
};


module.exports = cors(corsOption);


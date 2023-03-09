const fs = require('fs-extra')

try {
    fs.copySync('./config/config.env', './config/config.env')
    console.log('Environment file created successfully.')
} catch (err) {
    console.error(err)
}

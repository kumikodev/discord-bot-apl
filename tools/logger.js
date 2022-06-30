const chalk = require('chalk');



class Logger {
    constructor()
    {

    }
    warning(message)
    {
        console.log(chalk.yellow(message));
    }
    error(message)
    {
        console.log(chalk.red(message));
    }
    success(message)
    {
        console.log(chalk.green(message));
    }
    debug(message)
    {
        console.log(chalk.blue(message));
    }

}


module.exports = Logger;
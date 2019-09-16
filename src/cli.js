const arg = require('arg');

function parseArgs(rawArgs) {
    const args = arg(
        {
            '--dbUrl': Boolean,
            '-url': '--dbUrl',
        },
        {
            argv: rawArgs.splice(2),
        }
    );
    return {
        completeDbURL: args['--dbUrl'] || false,
    };
}

module.exports = {
    cli(args) {
        let options = parseArgs(args);
        console.log(options);
    }
}
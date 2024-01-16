import {logErrorExit} from '@k03mad/simple-log';

import {codeText, errorText} from './app/helpers/colors.js';

const TOKEN_ENV_NAME = 'YA_IOT_API_TOKEN';
const TOKEN_NPM_PARAM_NAME = 'token';

const env = {
    server: {
        port: process.env.npm_config_port
        || process.env.YA_IOT_EXPORTER_PORT
        || 11_010,
    },
    iot: {
        token: process.env[TOKEN_ENV_NAME]
        || process.env[`npm_config_${TOKEN_NPM_PARAM_NAME}`],
    },
    debug: process.env.DEBUG,
};

if (!env.iot.token) {
    logErrorExit([
        errorText(' Yandex IoT API token is not specified '),
        `> use env variable: ${codeText(TOKEN_ENV_NAME)}`,
        `> or npm parameter: ${codeText(`--${TOKEN_NPM_PARAM_NAME}`)}`,
        '> see readme',
    ]);
}

export default env;

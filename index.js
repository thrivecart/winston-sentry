const _ = require('lodash');
const Transport = require('winston-transport');

const normalizeMessage = (msg, meta) => {
  let message = msg;

  if (_.isError(msg)) {
    message = msg.message;
  }

  if (_.isError(meta) && !_.isString(message)) {
      message = meta.message;
  }

  return message;
}

module.exports = class SentryTransport extends Transport {
  constructor(options) {
    options = options || {};
    options = _.defaultsDeep(options, {
      name: 'SentryTransport',
      silent: false,
      level: 'error',
      levelsMap: {
        silly: 'debug',
        verbose: 'debug',
        info: 'info',
        debug: 'debug',
        warn: 'warning',
        error: 'error'
      }
    });

    super(_.omit(options, [
      'Sentry',
      'levelsMap'
    ]));

    this._sentry = options.Sentry;
    this._silent = options.silent;
    this._levelsMap = options.levelsMap;
  }

  log(info, next) {
    console.log(info);
    if (this.silent) return next(null, true);
    if (!(level in this._levelsMap)) return next(null, true);

    // const message = normalizeMessage(msg, meta);
    // const context = _.isObject(meta) ? meta : {};

    // this._sentry.withScope(scope => {
    //   scope.setLevel(this._levelsMap[level]);
    //   scope.setExtra('context', context);
    //   this._sentry.captureMessage(message);
    //   next(null, true);
    // });
  }
}

import pino from 'pino';

const logger = pino({
  level: 'info',
  formatters: {
    level(label) {
      return { level: label };
    },
  },
});

export default logger;

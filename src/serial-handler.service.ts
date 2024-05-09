const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport');
const fs = require('fs');

const SerialHandlerService = () => {
  SerialPort.list()
    .then((ports) => {
      ports.forEach((portInfo) => {
        const port = new SerialPort(portInfo.path, {
          baudRate: 9600,
          dataBits: 8,
          stopBits: 1,
          parity: 'none',
        });

        const parser = new Readline({ delimiter: '\r\n' });
        port.pipe(parser);

        port.on('open', () => {
          console.info(`Port ${portInfo.path} opened`);
        });

        parser.on('data', (data) => {
          console.log(`Data received from ${portInfo.path}: ${data}`);
        });

        port.on('error', (err) => {
          console.error(`Error opening port ${portInfo.path}:`, err);
        });
      });
    })
    .catch((err) => {
      console.error('Error listing serial ports:', err);
    });
};

SerialHandlerService();

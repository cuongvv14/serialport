// const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport');
export const SerialHandlerService = () => {
  // new SerialPort()
  // const port = new SerialPort(
  //   'COM3',
  //   {
  //     baudRate: 9600,
  //     dataBits: 8,
  //     stopBits: 1,
  //     parity: 'none',
  //   },
  //   (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log('Success: Serial port opened');
  //     }
  //   },
  // );

  // const parser = new Readline({ delimiter: '\r\n' });
  // port.pipe(parser);

  // port.on('open', () => {
  //   console.info('Port opened');
  // });

  // parser.on('data', (data) => {
  //   console.log(data);
  // });
  // const SerialPort = require('serialport');
  // SerialPort.list().then(
  //   (ports) => ports.forEach(console.log),
  //   (err) => console.error(err),
  // );

  const SerialPort = require('serialport');

  SerialPort.list()
    .then((ports) => {
      ports.forEach((port) => {
        console.log('Serial port:', port.path);
      });
    })
    .catch((err) => {
      console.error('Error listing serial ports:', err);
    });
};

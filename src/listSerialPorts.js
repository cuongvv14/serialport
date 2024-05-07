var SerialPort = require('serialport');

SerialPort.list()
  .then(function (ports) {
    ports.forEach(function (port) {
      console.log('Serial port:', port.path);
    });
  })
  .catch(function (err) {
    console.error('Error listing serial ports:', err);
  });

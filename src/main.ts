import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const connectToSerialPort = () => {
    SerialPort.list()
      .then((ports) => {
        const suitablePort = ports.find((port) => {
          return port.path.includes('COM');
        });

        if (suitablePort) {
          const port = new SerialPort({
            path: suitablePort.path,
            baudRate: 9600,
            dataBits: 8,
            stopBits: 1,
            parity: 'none',
          });

          const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
          parser.on('data', console.log);

          port.on('open', () => {
            console.info('Port opened');
            port.write(
              'AT+QR_DISPLAY=100,00020101021138570010A00000072701270006970436011305510003253210208QRIBFTTA53037045802VN6304AF96\r\n',
            );
          });

          parser.on('data', (data) => {
            console.log(data);
          });
        } else {
          console.error('No suitable serial port found.');
        }
      })
      .catch((err) => {
        console.error('Error listing serial ports:', err);
      });
  };

  connectToSerialPort();
}

bootstrap();

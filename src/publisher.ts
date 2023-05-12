import { connect, StringCodec } from 'nats';

const servers = process.env.NATS_URL || 'nats://localhost:4222';

connect({
  servers: servers.split(','),
}).then((nc) => {
  console.log('Successfully connect')
  const sc = StringCodec();
  nc.publish('greet.bob', sc.encode('hello'));
  nc.publish("greet.joe", sc.encode("hello"));
  nc.publish("greet.pam", sc.encode("hello"));
  nc.publish("greet.sue", sc.encode("hello"));


}).catch((error) => {
  console.log(error)
});

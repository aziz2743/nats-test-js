import { connect, StringCodec } from 'nats';

const servers = process.env.NATS_URL || 'nats://localhost:4222';
var i = 0;
const do_pub = () => {
  connect({
    servers: servers.split(','),
  }).then((nc) => {
    console.clear();
    console.log('Successfully connect, iteration: ', i++)
    const sc = StringCodec();
    nc.publish('greet.bob', sc.encode('hello-' + i));
    nc.publish("greet.joe", sc.encode("hello"));
    nc.publish("greet.pam", sc.encode("hello"));
    nc.publish("greet.sue", sc.encode("hello"));
    nc.drain();
  }).catch((error) => {
    console.log(error)
  });
};

setInterval(() => {
  do_pub();
}, 2000);
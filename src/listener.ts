import { connect, StringCodec } from "nats";
const servers = process.env.NATS_URL || "nats://localhost:4222";
var i = 0;
const do_listen = () => {
  connect({
    servers: servers.split(','),
  }).then(async (nc) => {
    console.clear();
    console.log('Successfully connect, iteration:', i++);
    const sc = StringCodec();
    const sub = nc.subscribe("greet.*", { max: 100 });
    for await (const msg of sub) {
      console.log(`${sc.decode(msg.data)} on subject ${msg.subject}`);
    }
    nc.drain();
  }).catch((error) => {
    console.log(error)
  });
};

setInterval(() => {
  do_listen();
}, 5000);
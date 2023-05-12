import { connect, StringCodec } from "nats";
const servers = process.env.NATS_URL || "nats://localhost:4222";

// const listener = async () => {
//   const nc = await connect({
//     servers: servers.split(","),
//   });
//   const sc = StringCodec();
//   let sub = nc.subscribe("greet.*", { max: 3 });
//   for await (const msg of sub) {
//     console.log(`${sc.decode(msg.data)} on subject ${msg.subject}`);
//   }
//   await nc.drain();

// }

// listener();
connect({
  servers: servers.split(','),
}).then(async (nc) => {
  console.log('Successfully connect')
  const sc = StringCodec();
  const sub = nc.subscribe("greet.*", { max: 3 });
  for await (const msg of sub) {
    console.log(`${sc.decode(msg.data)} on subject ${msg.subject}`);
  }
  // nc.drain();
}).catch((error) => {
  console.log(error)
});


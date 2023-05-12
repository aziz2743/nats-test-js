import { connect, StringCodec } from "nats";

// Get the passed NATS_URL or fallback to the default. This can be
// a comma-separated string.
const servers = process.env.NATS_URL || "nats://localhost:4222";

const nc = null;
connect({
  servers: servers.split(','),
}).then((nc) => {
  console.log('Successfully connect')
  const sc = StringCodec();
  let sub = nc.subscribe("greet.*", { max: 3 });
  console.log(`${sc.decode(msg.data)} on subject ${msg.subject}`);
}).catch((error) => {
  console.log(error)
});
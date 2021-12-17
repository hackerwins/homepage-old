const Connected = 'connected';
const Disconnected = 'disconnected';

async function createPeerAwareness(client, div) {
  const doc = yorkie.createDocument('examples', `peerawareness-${getYYYYMMDD()}`);
  await client.attach(doc);
  let peers = {};

  client.subscribe((event) => {
    if (event.type === 'peers-changed') {
      const changedPeers = event.value[doc.getKey()];

      for (const clientID of Object.keys(peers)) {
        if (!changedPeers[clientID]) {
          peers[clientID].status = Disconnected;
        }
      }

      for (const [clientID, metadata] of Object.entries(changedPeers)) {
        if (!peers[clientID] || peers[clientID].status === Disconnected) {
          const peer = {
            id: clientID,
            status: Connected,
            metadata,
          };
          peers[clientID] = peer;
        }
      }
    }
    
/*
      const peer_count = Object.entries(peers).length;
      let msg = 'No user found.'; // Should not be shown.

      if (peer_count == 1) {
        msg = "You're alone here.";
      } else if (peer_count > 1) {
        msg = `${peer_count} users online.`;
      }
      
      div.innerText = msg;
      console.log(msg);
      */
  });
}

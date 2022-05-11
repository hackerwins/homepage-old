const Connected = 'connected';
const Disconnected = 'disconnected';

async function createPeerAwareness(client, doc, div) {
  let peers = {};

  function updateMessage(count) {
    let msg = 'No user found.'; // Should not be shown.

    if (count == 1) {
      msg = "You're alone here.";
    } else if (count > 1) {
      msg = `${count} users online.`;
    }
    div.innerText = msg;
  }

  client.subscribe((event) => {
    if (event.type === 'peers-changed') {
      const changedPeers = event.value[doc.getKey()];

      for (const clientID of Object.keys(peers)) {
        if (!changedPeers[clientID]) {
          peers[clientID].status = Disconnected;
        }
      }

      for (const [clientID, presence] of Object.entries(changedPeers)) {
        if (!peers[clientID] || peers[clientID].status === Disconnected) {
          const peer = {
            id: clientID,
            status: Connected,
            presence,
          };
          peers[clientID] = peer;
        }
      }
      
      const peer_count = Object.entries(peers).filter(
        peer => peer[1]['status'] === Connected).length;

      updateMessage(peer_count);
    }
  });
}

---
layout: default
---

<section class="hero">
  <div class="wrapper">
    <img class="logo" src="./images/yorkie-photo.png" alt="A photo of Yorkie" />
    <div class="title">
      <h1>Yorkie</h1>
      <h2>Framework for building collaborative editing applications.</h2>
    </div>
  </div>
  <div class="clear"></div>
</section>
<section class="content">
  <div class="wrapper">
    <h2>
    Yorkie does
    </h2>
    <ul class="card-list">
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Real world modeling</h3>
            <h4>Client-Server vs Peer-to-peer</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/network.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            Peer-to-peer systems can be deployed without any concerns but also need a lot of tedious work to adapt it to the production-level services. <span class="brand">Yorkie</span> provides the SDK, Server, and Database to eliminate the tedious work can be operational and can use the services just out-of-box. Yorkie will take care of the collaborative features while you focus on your direct services.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Easy integration</h3>
            <h4>Builtin JSON-like document</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/easy.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            Some open source CRDT libraries only support basic datatypes. It's very difficult to express complex models of the application only with basic datatypes. <span class="brand">Yorkie</span> provides a general purpose JSON-like documents to unleash the limitation.
          </p>
          <p>
          For more integrations with other libraries: <a href="/demo">Live demo</a>
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Manageable warehouse</h3>
            <h4>Support MongoDB Query</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/warehouse.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            <span class="brand">Yorkie</span> snapshots are stored as plain documents in MongoDB collections. You can use enormous MongoDB queries and features to browse stored documents and supervise data warehouse easily with MongoDB management services.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Size matters</h3>
            <h4>Lamport timestamp vs Vector clock</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/size.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            CRDT uses a logical clock to sync documents between each client. <a href="https://en.wikipedia.org/wiki/Vector_clock">Vector clock</a> needs clocks per every client and it leads to large space for snapshots. <span class="brand">Yorkie</span> uses <a href="https://en.wikipedia.org/wiki/Lamport_timestamps">Lamport timestamp</a> to keep smaller document sizes. Lamport clocks cannot distinguish the concurrency and causality relations but in the server-client architecture, we only need to determine the total order within the system - therefore, there are no problems with implementing the real world application.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Proofed reliability</h3>
            <h4>CRDT is better than OT</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/reliability.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            <a href="https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type">CRDT</a>(Conflict-free Replicated Data Type) is formed solid and clean architecture, much better than <a href="https://en.wikipedia.org/wiki/Operational_transformation">OT</a>(Operational Transformation). Complexity leads to a higher probability of bugs on operations. It has been known that some OT algorithms are more complex than CRDT and cannot satisfy the convergence after publication. which would be difficult to use. <span class="brand">Yorkie</span> uses the well-proven CRDT algorithm to achieve reliable services for customers.
          </p>
        </div>
      </li>
      <li class="card">
        <div class="card-header">
          <div class="card-header-title">
            <h3>Secure</h3>
            <h4>TLS with optional client authentication</h4>
          </div>
          <div class="card-header-img">
            <img src="./images/secure.svg" />
          </div>
        </div>
        <div class="card-body">
          <p>
            <span class="brand">Yorkie</span> uses <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">TLS</a> between clients and server communication. You can connect custom authentication systems with <span class="brand">Yorkie</span> via authentication hooks.
          </p>
        </div>
      </li>
    </ul>
  </div>
</section>
<section class="contact">
  <div class="wrapper">
    <h2>Need help?</h2>
    <p>If you have any questions along the way, please don’t hesitate to ask us in our <a href="https://dev-yorkie.slack.com/">Slack channel</a>. You can sign up for our <a href="https://communityinviter.com/apps/dev-yorkie/yorkie-framework">Slack here</a>.</p>
  </div>
</section>

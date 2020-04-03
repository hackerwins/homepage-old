const defaultLists = [
  {
    title: 'Todo',
    cards: [
      'Pruning document',
      'Clean up codes'
    ]
  },
  {
    title: 'Doing',
    cards: [
      'Array operations',
    ]
  },
  {
    title: 'Done',
    cards: [
      'Create a sample page',
      'Launch demo site'
    ]
  },
]

async function createKanbanExample(client, board) {
  const doc = yorkie.createDocument('examples', `kanban-board-${getYYYYMMDD()}`);
  await client.attach(doc);

  var app = new Vue({
    el: board,
    data: {
      lists: [],
    },
    methods: {
      addCard(listIdx) {
        var title = prompt("Enter card title");

        doc.update((root) => {
          var i = 0;
          for (list of root.lists) {
            if (i === listIdx) {
              list.cards.push(title);
            }
            i += 1;
          }
        }, `add new card by ${client.getID()}`);
      },

      deleteCard(listIdx, cardIdx) {
        doc.update((root) => {
          var i = 0;
          for (list of root.lists) {
            if (i === listIdx) {
              delete list.cards[cardIdx];
            }
            i += 1;
          }
        }, `delete a card by ${client.getID()}`);
      },

      addList() {
        var title = prompt("Enter list title");

        doc.update((root) => {
          root.lists.push({
            title: title,
            cards: [],
          });
        }, `add new list by ${client.getID()}`);
      },

      deleteList(listIdx) {
        doc.update((root) => {
          delete root.lists[listIdx];
        }, `delete a list by ${client.getID()}`);
      },
    },
  });

  doc.update((root) => {
    if (!root['lists']) {
      root['lists'] = defaultLists;
    }
  }, 'create default list if not exists');

  doc.subscribe((event) => {
    app.lists = doc.getRootObject().lists;
  });
  await client.sync();

  app.lists = doc.getRootObject().lists;
}

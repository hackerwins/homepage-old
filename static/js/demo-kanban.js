const defaultLists = [
  {
    title: 'Todo',
    cards: [
      {
        title: 'Pruning document',
      },
      {
        title: 'Clean up codes'
      }
    ]
  },
  {
    title: 'Doing',
    cards: [
      {
        title: 'Array operations',
      }
    ]
  },
  {
    title: 'Done',
    cards: [
      {
        title: 'Create a sample page',
      },
      {
        title: 'Launch demo site'
      }
    ]
  },
];

async function createKanbanExample(client, board) {
  const doc = yorkie.createDocument('examples', `kanban-board-${getYYYYMMDD()}`);
  await client.attach(doc);

  var app = new Vue({
    el: board,
    data: {
      lists: [],
      title: '',
      opened: null,
    },
    methods: {
      isOpened(item) {
        return this.opened === item;
      },

      openForm(item, $event) {
        this.opened = item;
      },

      closeForm(item) {
        this.opened = null;
      },

      addCard(list) {
        if (this.title === '') return;

        doc.update((root) => {
          root.lists.getElementByID(list.getID()).cards.push({
            title: this.title,
          });
          this.title = '';
        }, `add new card by ${client.getID()}`);
      },

      deleteCard(list, card) {
        doc.update((root) => {
          delete root.lists.getElementByID(list.getID()).cards.removeByID(card.getID());
        }, `delete a card by ${client.getID()}`);
      },

      addList() {
        if (this.title === '') return;

        doc.update((root) => {
          root.lists.push({
            title: this.title,
            cards: [],
          });
          this.title = '';
        }, `add new list by ${client.getID()}`);
      },

      deleteList(list) {
        doc.update((root) => {
          delete root.lists.removeByID(list.getID());
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

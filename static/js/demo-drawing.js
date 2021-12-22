function paintCanvas(drawingPanel, shapes) {
  // TODO Now repainting the whole thing. Only changed parts should be drawn.
  const context = drawingPanel.getContext('2d');
  context.clearRect(0, 0, drawingPanel.offsetWidth, drawingPanel.offsetHeight);

  for (const shape of shapes) {
    context.beginPath();
    let isMoved = false;
    for (const p of shape.points) {
      if (isMoved === false) {
        isMoved = true;
        context.moveTo(p.x, p.y);
      } else {
        context.lineTo(p.x, p.y);
      }
    }

    context.stroke();
  }
}

function getPoint(drawingPanel, e) {
  if (!!e.touches) {
    return {
      x: parseInt(e.touches[0].clientX - drawingPanel.offsetLeft + window.scrollX),
      y: parseInt(e.touches[0].clientY - drawingPanel.offsetTop + window.scrollY)
    };
  } else {
    return {
      x: e.clientX - drawingPanel.offsetLeft + window.scrollX,
      y: e.clientY - drawingPanel.offsetTop + window.scrollY
    };
  }
}

async function createDrawingExample(client, doc, drawingPanel) {
  doc.update((root) => {
    if (!root.shapes) {
      root.shapes = [];
    }
  }, 'create points if not exists');

  doc.subscribe((event) => {
    paintCanvas(drawingPanel, doc.getRoot().shapes);
  });
  await client.sync();

  const handlers = {
    'begin': (e) => {
      const point = getPoint(drawingPanel, e);
      if (point.x < 0 || point.y < 0 ||
          point.x > drawingPanel.offsetWidth || point.y > drawingPanel.offsetHeight) {
        return;
      }

      window.isStartDragging = true;
      doc.update((root) => {
        root.shapes.push({
          points: [point]
        });
        window.currentID = root.shapes.getLast().getID();
      }, `update content by ${client.getID()}`);
    },

    'move': (e) => {
      if (!window.isStartDragging) {
        return;
      }

      const point = getPoint(drawingPanel, e);
      if (point.x < 0 || point.y < 0 ||
          point.x > drawingPanel.offsetWidth || point.y > drawingPanel.offsetHeight) {
        e.preventDefault();
        return;
      }

      doc.update((root) => {
        const shape = root.shapes.getElementByID(window.currentID);
        shape.points.push(point);
        paintCanvas(drawingPanel, root.shapes);
      }, `update content by ${client.getID()}`);
    },

    'end': (e) => {
      if (window.isStartDragging) {
        window.isStartDragging = false;
      }
    },
  };

  // for desktop
  document.addEventListener('mousedown', handlers['begin']);
  document.addEventListener('mousemove', handlers['move']);
  document.addEventListener('mouseup', handlers['end']);

  // for touch devices
  document.addEventListener('touchstart', handlers['begin']);
  document.addEventListener('touchmove', handlers['move']);
  document.addEventListener('touchend', handlers['end']);

  // 05. set initial value.
  paintCanvas(drawingPanel, doc.getRoot().shapes);
}

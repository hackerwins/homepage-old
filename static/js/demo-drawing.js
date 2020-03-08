function paintCanvas(drawingPanel, shapes) {
  // TODO Now repainting the whole thing. Only changed parts should be drawn.
  const context = drawingPanel.getContext('2d');
  context.clearRect(0, 0, 500, 300);

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
  return {
    x: e.clientX - drawingPanel.offsetLeft + window.scrollX,
    y: e.clientY - drawingPanel.offsetTop + window.scrollY
  };
}

async function createDrawingExample(client, drawingPanel) {
  // 02. create a document then attach it into the client.
  const doc = yorkie.createDocument('examples', `drawing-panel-${getYYYYMMDD()}`);
  await client.attach(doc);

  doc.update((root) => {
    if (!root['shapes']) {
      root['shapes'] = [];
    }
  }, 'create points if not exists');

  doc.subscribe((event) => {
    paintCanvas(drawingPanel, doc.getRootObject().shapes);
  });
  await client.sync();

  document.addEventListener('mousedown', (e) => {
    if (!window.isMouseDown) {
      window.isMouseDown = true;

      const point = getPoint(drawingPanel, e);
      if (point.x < 0 || point.y < 0 ||
        point.x > 500 || point.y > 300) {
        return;
      }

      doc.update((root) => {
        const shape = root.shapes.push({
          points: [point]
        });
        window.currentID = shape.getID();
      }, `update content by ${client.getID()}`);
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (window.isMouseDown) {
      const point = getPoint(drawingPanel, e);
      if (point.x < 0 || point.y < 0 ||
        point.x > 500 || point.y > 300) {
        return;
      }

      doc.update((root) => {
        const shape = root.shapes.getElementByID(window.currentID);
        shape.points.push(point);
        paintCanvas(drawingPanel, root.shapes);
      }, `update content by ${client.getID()}`);
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (window.isMouseDown) {
      window.isMouseDown = false;
    }
  });

  // 05. set initial value.
  paintCanvas(drawingPanel, doc.getRootObject().shapes);
}

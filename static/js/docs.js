const headers = document.querySelectorAll('h2[id], h3[id], h4[id]');
for(var i = 0; i < headers.length; i++) {
  const node = headers[i];
  const anchor = document.createElement("a");
  anchor.className = "pilcrow";
  anchor.text = "\xb6";
  anchor.href = "#" + node.id;
  node.appendChild(anchor);
};

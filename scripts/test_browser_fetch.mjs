import http from 'http';

const req = http.request('http://127.0.0.1:9222/json', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', async () => {
    const tabs = JSON.parse(d);
    const target = tabs.find(t => t.url.includes('8080') && !t.url.includes('inspect'));
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    ws.onopen = async () => {
      let id = 1;
      const send = (m, p={}) => new Promise(res => {
        const myId = id++;
        const handler = (e) => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) {
            ws.removeEventListener('message', handler);
            res(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: myId, method: m, params: p }));
      });
      await send('Runtime.enable');
      const res = await send('Runtime.evaluate', {
        expression: `
          fetch('data/grammar.json')
            .then(r => r.json())
            .then(j => ({
              cena: !!j.moduli[0].lezioni[0].cena,
              teoria: !!j.moduli[0].lezioni[0].teoria,
              title: j.moduli[0].lezioni[0].titulo
            }))
        `,
        awaitPromise: true,
        returnByValue: true
      });
      console.log('Browser fetch result:', res.result.value);
      process.exit(0);
    };
  });
});
req.end();

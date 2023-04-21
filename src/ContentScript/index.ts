import { requestUser } from 'lib/messages';
import injectScript from './injectScript';

injectScript();

window.addEventListener('message', (event) => {
  if (event.data.action !== 'requestUser') return;
  if (window.location.origin !== event.origin) return null;

  requestUser().then((data) => {
    if (!data.profile) return null;
    window.postMessage(
      {
        application: 'LUNCH_MONEY',
        action: 'profile',
        payload: data,
      },
      '*'
    );
  });
});

export {};

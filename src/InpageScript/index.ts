import { ProfileType } from '../Background/actions';

class LunchMoney {
  constructor() {
    window.addEventListener(
      'message',
      (
        event: MessageEvent<{
          application: string;
          action: string;
          payload: { profile: ProfileType };
        }>
      ) => {
        if (
          event.data.application !== 'LUNCH_MONEY' ||
          event.data.action !== 'profile'
        )
          return;
        this.profile = event.data.payload.profile;
      }
    );
  }

  profile?: ProfileType;

  getProfile = () => {
    window.postMessage(
      {
        application: 'LUNCH_MONEY',
        action: 'requestUser',
      },
      '*'
    );
  };
}

if (document.currentScript) {
  // @ts-ignore
  (window as any).LunchMoney = new LunchMoney();
}

export {};

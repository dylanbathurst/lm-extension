import { ProfileType } from 'Background/actions';

class LunchMoney {
  constructor() {
    window.addEventListener(
      'message',
      (
        event: MessageEvent<{
          application: string;
          action: string;
          payload: { profile: ProfileType; payment_request: string };
        }>
      ) => {
        if (
          event.data.application !== 'LUNCH_MONEY' ||
          event.data.action !== 'profile'
        )
          return;

        this.profile = event.data.payload.profile;
        this.payment_request = event.data.payload.payment_request;
      }
    );
  }

  profile?: ProfileType;
  payment_request?: string;

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

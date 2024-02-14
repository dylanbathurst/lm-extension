import LunchMoneyProvider from '../App/Provider/LunchMoneyProvider'

if (document) {
  ;(window as any).LunchMoney = new LunchMoneyProvider()
}

export {}

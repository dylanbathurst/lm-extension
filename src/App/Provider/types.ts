import { ProfileType } from 'Background/userProfileSlice'

export type PAYMENT_REQUEST = string

export interface SendPaymentResponse {
  success: boolean
}

export type RequestModel = {
  [Property in keyof ProfileType]?: boolean
}

export interface LunchMoneyProvider {
  createInfoRequest(userData: RequestModel): void
  userInfo: Partial<ProfileType | undefined>
}

import { ProfileType } from 'Background/userProfileSlice'

export type PAYMENT_REQUEST = string

export interface SendPaymentResponse {
  success: boolean
}

export type RequestInfo = Record<keyof ProfileType, boolean>

export interface LunchMoneyProvider {
  createInfoRequest(userData: RequestInfo): void
  userInfo: Partial<ProfileType | undefined>
}

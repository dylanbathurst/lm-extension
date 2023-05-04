export interface AuthContextType {
  user: any
  signin: (callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
  loading: boolean
}

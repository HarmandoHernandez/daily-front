export interface Error {
  error: string
  param: string
}

export interface SuccessFormat {
  uid: string
  name: string
  token: string
}

export interface GeneralFormat {
  status: string
  message: SuccessFormat | Error[]
}

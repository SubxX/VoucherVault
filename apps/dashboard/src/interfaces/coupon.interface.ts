export interface ICoupon {
  _id: string
  code: string,
  validUpto: string
  expiresIn?: number
  type: 'PERCENT' | 'AMOUNT' | string
  title: string
  description: string
  bidAmount: number
  isVerified?: boolean,
  categories: string[],
  link: string
  brand: string
  media?: any
}
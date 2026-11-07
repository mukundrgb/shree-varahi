// Shared CMOTS response envelope: success, data, message.

export interface CmotsResponse<T> {
  success: boolean
  data: T[] | null
  message: string
}

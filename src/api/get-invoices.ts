import { api } from '@/lib/axios'

export interface GetInvoicesResponse {
  invoices: {
    id: string
    name: string
    taxId: string
    amount: number
    status: 'created' | 'paid' | 'voided' | 'overdue' | 'expired' | 'canceled'
  }[]
}

export async function getInvoices() {
  const response = await api.get<GetInvoicesResponse>('/invoice')
  console.log(response)
  return response.data
}

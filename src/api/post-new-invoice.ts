import { api } from '@/lib/axios'

export interface CreateNewInvoice {
  name: string
  taxId: string
  amount: number
}

export async function createNewInvoice({
  amount,
  name,
  taxId,
}: CreateNewInvoice) {
  await api.post('/invoice', { amount, name, taxId })
}

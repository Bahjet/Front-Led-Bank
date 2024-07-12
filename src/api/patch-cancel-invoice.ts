import { api } from '@/lib/axios'

export interface CancelInvoiceParams {
  id: string
}

// prestar atenção no dado que esta recebendo
export async function cancelInvoice({ id }: CancelInvoiceParams) {
  await api.patch(`/invoices/${id}/cancel`)
  // prestar atenção no método que está esperando no back
}

import { api } from '@/lib/axios'

export interface ApproveInvoiceParams {
  id: string
}

// prestar atenção no dado que esta recebendo
export async function paidInvoice({ id }: ApproveInvoiceParams) {
  await api.patch(`/invoices/${id}/paid`)
  // prestar atenção no método que está esperando no back
}

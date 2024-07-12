import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, X } from 'lucide-react'

import { GetInvoicesResponse } from '@/api/get-invoices'
import { cancelInvoice } from '@/api/patch-cancel-invoice'
import { paidInvoice } from '@/api/patch-paid-invoice'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

import { InvoiceStatus } from '../../components/invoice-status'

export interface InvoiceTableRowProps {
  invoice: {
    id: string
    name: string
    taxId: string
    amount: number
    status: 'created' | 'paid' | 'voided' | 'overdue' | 'expired' | 'canceled'
  }
}

export function InvoiceTableRow({ invoice }: InvoiceTableRowProps) {
  const queryClient = useQueryClient()

  // alterar os status da fatura no cache
  function updateInvoicesStatusOnCache(id: string, status: InvoiceStatus) {
    const invoiceListCache = queryClient.getQueriesData<GetInvoicesResponse>({
      queryKey: ['invoices'],
    })

    invoiceListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetInvoicesResponse>(cacheKey, {
        ...cacheData,
        invoices: cacheData.invoices.map((invoice) => {
          if (invoice.id === id) {
            return { ...invoice, status }
          }
          return invoice
        }),
      })
    })
  }

  // alterar os status da fatura para cancelado
  const { mutateAsync: cancelInvoiceFn, isPending: isCancelingInvoice } =
    useMutation({
      mutationFn: cancelInvoice,
      async onSuccess(_, { id }) {
        updateInvoicesStatusOnCache(id, 'canceled')
      },
    })

  // alterar os status da fatura para pago
  const { mutateAsync: paidInvoiceFn, isPending: isPayingInvoice } =
    useMutation({
      mutationFn: paidInvoice,
      async onSuccess(_, { id }) {
        updateInvoicesStatusOnCache(id, 'paid')
      },
    })

  // 'created' | 'paid' | 'voided' | 'overdue' | 'expired' | 'canceled'

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {invoice.id}
      </TableCell>
      <TableCell className="text-muted-foreground">{invoice.taxId}</TableCell>
      <TableCell>
        <InvoiceStatus status={invoice.status} />
      </TableCell>
      <TableCell className="font-medium">{invoice.name}</TableCell>
      <TableCell className="font-medium">
        {(invoice.amount / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {invoice.status === 'created' && (
          <Button
            onClick={() => paidInvoiceFn({ id: invoice.id })}
            disabled={isPayingInvoice}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Foi Pago
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={!['created'].includes(invoice.status) || isCancelingInvoice}
          onClick={() => cancelInvoiceFn({ id: invoice.id })}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}

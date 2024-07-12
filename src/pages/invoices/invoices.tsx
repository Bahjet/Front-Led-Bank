import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getInvoices } from '@/api/get-invoices'
import { DialogCreateNewInvoice } from '@/components/create-new-invoice-dialog'
import { Header } from '@/components/header'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { InvoiceTableRow } from './invoice-table-row'
import { InvoiceTableSkeleton } from './invoice-table-skeleton'

export function Invoices() {
  const { data: result, isLoading: isLoadingInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => getInvoices(),
  })
  console.log(result)

  return (
    <>
      <div className="flex min-h-screen flex-col antialiased">
        <Header />

        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Helmet title="Faturas" />
          <div className="flex flex-col gap-4">
            <div className="flex gap-5">
              <h1 className="text-3xl font-bold tracking-tight">Faturas</h1>
              <DialogCreateNewInvoice />
            </div>
            <div className="space-y-2.5">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[64px]"></TableHead>
                      <TableHead className="w-[140px]">Identificador</TableHead>
                      <TableHead className="w-[180px]">Documento</TableHead>
                      <TableHead className="w-[140px]">Status</TableHead>
                      <TableHead>nome</TableHead>
                      <TableHead className="w-[140px]">
                        Total do pedido
                      </TableHead>
                      <TableHead className="w-[164px]"></TableHead>
                      <TableHead className="w-[132px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingInvoices ? (
                      <InvoiceTableSkeleton />
                    ) : (
                      result?.invoices.map((invoice) => {
                        return (
                          <InvoiceTableRow key={invoice.id} invoice={invoice} />
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

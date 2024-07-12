export type InvoiceStatus =
  | 'created'
  | 'paid'
  | 'voided'
  | 'overdue'
  | 'expired'
  | 'canceled'

interface InvoiceStatusProps {
  status: InvoiceStatus
}

const invoiceStatusMap: Record<InvoiceStatus, string> = {
  created: 'Criado',
  paid: 'Pago',
  voided: 'Anulado',
  overdue: 'Atrasado',
  expired: 'Expirado',
  canceled: 'Cancelado',
}

export function InvoiceStatus({ status }: InvoiceStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'created' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-slate-400"
        />
      )}

      {['canceled', 'expired'].includes(status) && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-rose-500"
        />
      )}

      {status === 'paid' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-emerald-500"
        />
      )}

      {['voided', 'overdue'].includes(status) && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-amber-500"
        />
      )}

      <span className="font-medium text-muted-foreground">
        {invoiceStatusMap[status]}
      </span>
    </div>
  )
}

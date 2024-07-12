import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createNewInvoice } from '@/api/post-new-invoice'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const createNewInvoiceSchema = z.object({
  name: z.string(),
  taxId: z.string(), // recebe em string e converte para number
  amount: z.coerce.number(),
})

type CreateNewInvoiceSchema = z.infer<typeof createNewInvoiceSchema>

export function DialogCreateNewInvoice() {
  // hook form padrão
  const { register, handleSubmit } = useForm<CreateNewInvoiceSchema>({
    resolver: zodResolver(createNewInvoiceSchema),
  })
  // lincando mutate async ao metodo post
  const { mutateAsync: createNewInvoiceFn } = useMutation({
    mutationFn: createNewInvoice,
  })
  // mandando pro metodo post os dados
  async function handleCreateNewInvoice(data: CreateNewInvoiceSchema) {
    try {
      await createNewInvoiceFn({
        amount: data.amount,
        name: data.name,
        taxId: data.taxId,
      })
      toast.success('Empresa cadastrado com sucesso!')
    } catch {
      toast.error('Erro ao criar nova fatura.')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-lime-800 hover:bg-lime-600">
          Adicionar Fatura
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Fatura</DialogTitle>
          <DialogDescription>Adicione uma nova fatura.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <form
            onSubmit={handleSubmit(handleCreateNewInvoice)}
            className="grid flex-1 gap-2"
          >
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} />
            <Label htmlFor="amount">Valor</Label>
            <Input id="amount" {...register('amount')} />
            <Label htmlFor="taxId">Documento</Label>
            <Input id="taxId" {...register('taxId')} />

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit" className="bg-lime-800 hover:bg-lime-600">
                  Adicionar
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" className="bg-red-800 hover:bg-red-600">
                  Fechar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

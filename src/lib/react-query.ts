import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()
// react query salva requisições em cache evitando redundancia nas requisições

import { useMemo } from 'react'
import { injectedConnection } from '../connection'

export function useOrderedConnections() {
    return useMemo(() => {
        return [injectedConnection]
    })
}
import { ReactNode } from "react"
import { useCan } from "../../hooks/useCan"

type CanProps = {
    children: ReactNode,
    permissions?: string[],
    roles?: string[],
}

export function Can({ children, permissions, roles }: CanProps) {

    const userCanSeeComponents = useCan({ permissions, roles })

    if(!userCanSeeComponents) {
        return null
    }

    return (
        <>
            {
                children
            }
        </>
    )
}
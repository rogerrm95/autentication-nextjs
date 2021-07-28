import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import decode from 'jwt-decode'

import { AuthTokenError } from "../erros/AuthTokenError"
import { validateUserPermissions } from "./validadeUserPermissions"
import { redirect } from "next/dist/next-server/server/api-utils"

type WithSSRAuthOptions = {
    permissions?: string[],
    roles?: string[]
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
    // Sempre passar o contexto //
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)
        const token = cookies['petmania.token']

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        if (options) {
            const user = decode<{ permissions: string[], roles: string[] }>(token)
            const { permissions, roles } = options

            const userHasValidPermissions = validateUserPermissions({
                user,
                permissions,
                roles
            })

            if (!userHasValidPermissions) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false
                        //notFound: true
                    }
                }
            }
        }

        try {
            return await fn(ctx)
        } catch (error) {
            if (error instanceof AuthTokenError) {
                destroyCookie(ctx, 'petmania.token')
                destroyCookie(ctx, 'petmania.refreshToken')

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}
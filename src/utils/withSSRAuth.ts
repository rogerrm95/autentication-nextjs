import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "../erros/AuthTokenError"



export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
    // Sempre passar o contexto //
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        if (!cookies['petmania.token']) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
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
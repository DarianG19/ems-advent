import {cookies} from "next/headers";

export async function isAuthenticaed(): Promise<boolean> {
    const cookieStore = cookies();
    const token = cookieStore.get('_vercel_jwt')?.value;

    console.log("Cookie Store: ",cookieStore);

    console.log("In isAuthenticated function, token is: ", token !== undefined);

    if (!token) {
        return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: token ? `jwt=${token}` : '',
        },
        credentials: 'include',
        cache: 'no-store',
    });

    return response.ok;
}
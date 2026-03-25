import { findUser } from "@/redux/type";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Response {
    ok: boolean;
    id?: string,
    email?: string;
    userName?: string;
    role?: string;
    msg: string;
    token?: string
}
export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const body = await req.json();
    const {email, password} = body;
    console.log(email, password)
    const token = "iuiyuiyuyuyuyujyuy"

    const user = {
        _id: 'hhiuiu',
        email: 'abasskola',
        userName: 'abassgold',
        role: 'user'
    };
    return NextResponse.json(
        {
            ok: true,
            msg: 'Registration successful',
            user,
            token
        },
        { status: 200 }
    );

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data: Response = await res.json();

    if (!res.ok) return NextResponse.json({
        ok: data.ok,
        msg: data.msg
    }, { status: res.status });

    if (!data.ok) {
        return NextResponse.json({
            ok: data.ok,
            msg: data.msg,
        }, { status: 200 });
    }

    cookieStore.set('accessToken', data.token || token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30
    });

    // const user = {
    //     _id: data.id,
    //     email: data.email,
    //     userName: data.userName,
    //     role: data.role
    // };
// const user = {
//         _id: 'hhiuiu',
//         email: 'abasskola',
//         userName: 'abassgold',
//         role: 'user'
//     };
    return NextResponse.json(
        {
            ok: true,
            msg: 'Registration successful',
            user,
            token
        },
        { status: 200 }
    );
}
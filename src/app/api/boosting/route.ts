import { getServices } from "@/fetchApi/Boosting";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
console.log('request coming')
    const services = await getServices();
    console.log('the server service is', services)
    return NextResponse.json(services);
}
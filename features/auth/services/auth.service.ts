import API_CLIENT from "@/lib/api";
import { 
    LoginDetailSchema,
    RegisterDonorDetailSchema,
    RegisterShelterDetailSchema,
    RegisterDonorSchema,
    RegisterShelterSchema,
    VerificationCodeToSendSchema
 } from "../schemas/auth.schema";
import { z } from "zod";

export async function loginUser(data: z.infer<typeof LoginDetailSchema>) {
    const response = await API_CLIENT.post("/auth/login", data);
    return response.data;
}

export async function registerDonorUser(data: z.infer<typeof RegisterDonorSchema>) {
    const response = await API_CLIENT.post("/auth/register/donante", data);
    return response.data;
}

export async function registerReceiverUser(data: z.infer<typeof RegisterShelterSchema>) {
    const response = await API_CLIENT.post("/auth/register/refugio", data);
    return response.data;
}

export async function myInformation() {
    const response = await API_CLIENT.get("/user/header-data");
    return response.data;
}


export async function verificationCode (data: z.infer<typeof VerificationCodeToSendSchema>, reset: string = "login") {
    const response = await API_CLIENT.post("/auth/verify-email", data, {
        params: {
            reset
        }
    });
    return response.data;
}

import { useState } from "react";
import { useRouter } from "next/navigation";
import useEmailStore from "@/store/email.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginDetailSchema } from "../schemas/auth.schema";
import { useUserStore } from "@/store/user.store";
import { loginUser, myInformation } from "../services/auth.service";

export default function useLoginForm({
    redirectTo = "/dashboard/donor",
} : {
    redirectTo?: string;
} = {}) {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [messageLogin, setMessageLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const router = useRouter();
    const { setEmail } = useEmailStore.getState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginDetailSchema>>({
        resolver: zodResolver(LoginDetailSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const setUserInfo = useUserStore((state) => state.setUserInfo);

    const onSubmit = async (data: z.infer<typeof LoginDetailSchema>) => {
        try{
            setLoadingLogin(true);
            setLoginError("");

            const fetchLogin = await loginUser(data);

            if(fetchLogin.status === "success" || fetchLogin.status === 200){
                setMessageLogin("Login exitoso");
                try{
                    const informationUser = await myInformation();
                    setUserInfo(informationUser.data);
                }catch(error){
                    console.log(error);
                }
                router.push(redirectTo);
            }

        }catch(error: any){
            console.log(error);
            setLoginError(error?.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.");
        }finally{
            setLoadingLogin(false);
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        loadingLogin,
        messageLogin,
        loginError,
        handleLoginForSubmit: handleSubmit(onSubmit),
    };
}
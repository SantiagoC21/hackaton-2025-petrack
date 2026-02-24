
import { useState } from "react";
import { useRouter } from "next/navigation";
import useEmailStore from "@/store/email.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginDetailSchema } from "../schemas/auth.schema";
import { useUserStore } from "@/store/user.store";
import { loginUser } from "../services/auth.service";

export default function useLoginForm({
    setShowSocialUserModal,
    setShowUnverifiedUserModal,
} : {
    setShowSocialUserModal: (show: boolean) => void;
    setShowUnverifiedUserModal: (show: boolean) => void;
}) {
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [messageLogin, setMessageLogin] = useState("");
    const router = useRouter();
    const { setEmail } = useEmailStore.getState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginDetailSchema>>({
        resolver: zodResolver(LoginDetailSchema),
        mode: "onChange",
    });

    const setUserInfo = useUserStore((state) => state.setUserInfo);

    const onSubmit = async (data: z.infer<typeof LoginDetailSchema>) => {
        try{
            setLoadingLogin(true);

            const fetchLogin = await loginUser(data);

            if(fetchLogin.status === 200){
                setMessageLogin("Login exitoso");
                try{
                    const infr
                }

            }

        }catch(error){
            console.log(error);
        }finally{
            setLoadingLogin(false);
        }
    }

}
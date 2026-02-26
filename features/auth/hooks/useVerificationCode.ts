import { useState } from "react";
import useNotificationStore from "@/store/notification.store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VerificationCodeSchema,
    VerificationCodeToSendSchema
 } from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import { AxiosError } from "axios";
import { verificationCode, myInformation } from "../services/auth.service";

export function useVerificationCode({
    email,
    setShowVerificationCodeModal,
    typeOfProcessing = "login",
    redirectTo = "/dashboard/donor",
}: {
    email: string;
    setShowVerificationCodeModal: (show: boolean) => void;
    typeOfProcessing?: "login" | "register" | "reset";
    redirectTo?: string;
}) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoadingVerificationCode, setIsLoadingVerificationCode] = useState<boolean>(false);
    const showNotification = useNotificationStore((state) => state.showNotification);
    const hideNotification = useNotificationStore((state) => state.hideNotification);

    const { register, setValue, handleSubmit, reset } = useForm<z.infer<typeof VerificationCodeSchema>>({
        resolver: zodResolver(VerificationCodeSchema),
    });

    const router = useRouter();
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    const onSubmit = async (data: z.infer<typeof VerificationCodeSchema>) => {
        try {
            setIsLoadingVerificationCode(true);

            const dataToSend: z.infer<typeof VerificationCodeToSendSchema> = {
                email,
                code: `${data.frist_digit}${data.second_digit}${data.third_digit}${data.fourth_digit}${data.fifth_digit}${data.sixth_digit}`,
            };

            const fetchVerificationCode = await verificationCode(dataToSend, typeOfProcessing);
            if (fetchVerificationCode?.status === "success") {
                setErrorMessage("");
                reset();
                setShowVerificationCodeModal(false);

                showNotification(true, "Accediendo a tu cuenta");
                const informationUser = await myInformation();
                setUserInfo(informationUser);

                setTimeout(() => {
                    hideNotification();
                }, 2000);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.message);
            }
        } finally {
            setIsLoadingVerificationCode(false);
            setTimeout(() => {
                setErrorMessage("");
            }, 2500);
        }
    };

    const verifyCode = async (code: string) => {
        try {
            setIsLoadingVerificationCode(true);

            const dataToSend: z.infer<typeof VerificationCodeToSendSchema> = {
                email,
                code,
            };

            const fetchVerificationCode = await verificationCode(dataToSend, typeOfProcessing);
            if (fetchVerificationCode?.status === "success") {
                setErrorMessage("");
                reset();
                setShowVerificationCodeModal(false);

                showNotification(true, "Accediendo a tu cuenta");
                const informationUser = await myInformation();
                setUserInfo(informationUser);

                setTimeout(() => {
                    hideNotification();
                    router.push(redirectTo);
                }, 1500);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(error.response?.data.message || "Código inválido");
            }
        } finally {
            setIsLoadingVerificationCode(false);
        }
    };

    const handleFormSubmit = handleSubmit(onSubmit, () => {
        setErrorMessage("Por favor ingrese el código completo de 6 dígitos");
        setTimeout(() => {
            setErrorMessage("");
        }, 2500);
    });

    return {
        errorMessage,
        isLoadingVerificationCode,
        setIsLoadingVerificationCode,
        register,
        setValue,
        handleFormSubmit,
        reset,
        verifyCode,
    };
}
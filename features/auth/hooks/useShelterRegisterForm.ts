
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterShelterDetailSchema } from "../schemas/auth.schema";
import * as z from "zod";
import useLoadingStore from "@/store/loading.store";
import { registerReceiverUser } from "../services/auth.service";
import useNotificationStore from "@/store/notification.store";

export default function useShelterRegisterForm({
    setShowVerificationCodeModal,
    setEmail,
}: {
    setShowVerificationCodeModal: (show: boolean) => void;
    setEmail: (email: string) => void;
}) {

    const [passwordValue, setPasswordValue] = useState("");
    const [passwordStrength, setPasswordStrength] = useState({
        label: "",
        score: 0
    });
    const { showLoading, hideLoading } = useLoadingStore.getState();
    const showNotification = useNotificationStore(
        (state) => state.showNotification
    );

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<z.infer<typeof RegisterShelterDetailSchema>>({
        resolver: zodResolver(RegisterShelterDetailSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            phone_number: "",
        },
    });

    function getPasswordStrength(password: string): { label: string; score: number } {
        if (password.length < 6) {
            return {
                label: "Muy debil",
                score: 1
            }
        }

        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score += 2;
        if (/[0-9]/.test(password)) score += 2;
        if (/[!@#$%^&*]/.test(password)) score += 4;

        return {
            label: "Muy debil",
            score: 1
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPass = e.target.value;
        setPasswordValue(newPass);
        setPasswordStrength(getPasswordStrength(newPass));
    };

    const onSubmit = async (data: z.infer<typeof RegisterShelterDetailSchema>) => {
        try {
            showLoading("Registrando refugio");

            const dataToRegister = {
                name: data.name.trim(),
                ubicacion: data.address.trim(),
                email: data.email.trim(),
                password: data.password.trim(),
                phone_number: data.phone_number?.trim() || "",
            };

            const fetchRegisterUser = await registerReceiverUser(dataToRegister);

            if (fetchRegisterUser.status === "success") {
                showNotification(true, "Refugio registrado exitosamente");
                setTimeout(() => {
                    setEmail(data.email.trim());
                    setShowVerificationCodeModal(true);
                }, 3250);
                reset();
                setPasswordValue("");
                setPasswordStrength({ label: "", score: 0 });
            }

        } catch (error) {
            if (error instanceof Error) {
                showNotification(false, error.message);
            } else {
                showNotification(false, "Error al registrar refugio");
            }
        } finally {
            hideLoading();
        }
    };

    const handleRegisterForSubmit = handleSubmit(onSubmit);

    return {
        passwordValue,
        passwordStrength,
        handleRegisterForSubmit,
        register,
        control,
        errors,
        handlePasswordChange
    }
}

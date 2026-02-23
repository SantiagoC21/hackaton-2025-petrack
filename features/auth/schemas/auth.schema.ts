import z from "zod";

export const LoginDetailSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email("Ingresa un email valido"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).refine(
        (value) => value.length >= 6, {
            message: "Password must be at least 6 characters long",
        }
    ),
})


export const RegisterShelterSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(3, "Name must be at least 3 characters long"),
    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
    }),
    email: z.string({
        required_error: "Email is required"
    }).email("Ingresa un email valido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/\d/, "La contraseña debe contener al menos un número"),
    phone_number: z.string(
        {
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string",
        }
    ).min(10, "El numero de telefono debe tener al menos 10 caracteres"),
    
})

export const RegisterShelterDetailSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(3, "Name must be at least 3 characters long"),
    email: z.string({
        required_error: "Email is required"
    }).email("Ingresa un email valido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/\d/, "La contraseña debe contener al menos un número"),
    confirmPassword: z.string({
        required_error: "Confirm password is required",
        invalid_type_error: "Confirm password must be a string",
    }),
    address: z.string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
    }),
    phone_number: z.string(
        {
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string",
        }
    ).min(10, "El numero de telefono debe tener al menos 10 caracteres"),
    

}).refine(
    (data) => data.confirmPassword === data.password, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    }
)

export const RegisterDonorSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(3, "Name must be at least 3 characters long"),
    lastname: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
    }).min(3, "Last name must be at least 3 characters long"),
    email: z.string({
        required_error: "Email is required"
    }).email("Ingresa un email valido"),
    password: z.string({
        required_error: "Password is required"
    }).min(8, "La contraseña debe tener al menos 8 caracteres"),
    phone_number: z.string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
    }).min(10, "El numero de telefono debe tener al menos 10 caracteres"),
    
})


export const RegisterDonorDetailSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(3, "Name must be at least 3 characters long"),
    paternal_last_name: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
    }).min(3, "Last name must be at least 3 characters long"),
    maternal_last_name: z.string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
    }).min(3, "Last name must be at least 3 characters long"),
    email: z.string({
        required_error: "Email is required"
    }).email("Ingresa un email valido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/\d/, "La contraseña debe contener al menos un número"),
    confirmPassword: z.string({
        required_error: "Confirm password is required",
        invalid_type_error: "Confirm password must be a string",
    }),
    phone_number: z.string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
    }).min(7, "El numero de telefono no es valido"),
    

}).refine(
    (data) => data.confirmPassword === data.password, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    }
)



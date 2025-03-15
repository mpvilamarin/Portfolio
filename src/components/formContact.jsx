'use client'
import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import {
    validateName,
    validateEmail,
    validatePhone,
    validateMessage,
} from "./validations";

export const FormContact = () => {
    const form = useRef();

    const [formData, setFormData] = useState({
        user_name: "",
        user_workType: "empresa", // Valor por defecto
        user_email: "",
        user_phone: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        user_name: "",
        user_email: "",
        user_phone: "",
        message: "",
    });

    // Para saber si un campo fue visitado y así mostrar el error
    const [touched, setTouched] = useState({
        user_name: false,
        user_email: false,
        user_phone: false,
        message: false,
    });

    // Error de envío si faltan campos obligatorios
    const [formSubmissionError, setFormSubmissionError] = useState("");
    // Mensaje de éxito al enviar el formulario
    const [formSuccess, setFormSuccess] = useState("");

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validateField(field, formData[field]);
    };

    const validateField = (field, value) => {
        let error = "";
        switch (field) {
            case "user_name":
                error = validateName(value);
                break;
            case "user_email":
                error = validateEmail(value);
                break;
            case "user_phone":
                error = validatePhone(value);
                break;
            case "message":
                error = validateMessage(value);
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar que no hayan campos vacíos (todos son obligatorios)
        if (
            !formData.user_name.trim() ||
            !formData.user_email.trim() ||
            !formData.user_phone.trim() ||
            !formData.message.trim()
        ) {
            setFormSubmissionError("Faltan campos obligatorios");
            return;
        }
        setFormSubmissionError("");

        const nameError = validateName(formData.user_name);
        const emailError = validateEmail(formData.user_email);
        const phoneError = validatePhone(formData.user_phone);
        const messageError = validateMessage(formData.message);

        setErrors({
            user_name: nameError,
            user_email: emailError,
            user_phone: phoneError,
            message: messageError,
        });

        if (nameError || emailError || phoneError || messageError) {
            return;
        }

        // Envío del formulario mediante EmailJS usando variables de entorno
        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
            (result) => {
                console.log("Email enviado:", result.text);
                setFormSuccess("Mensaje enviado correctamente.");
                // Reiniciar el formulario
                setFormData({
                    user_name: "",
                    user_workType: "empresa",
                    user_email: "",
                    user_phone: "",
                    message: "",
                });
                setTouched({});
                // Ocultar el mensaje de éxito después de 3 segundos
                setTimeout(() => {
                    setFormSuccess("");
                }, 3000);
            },
            (error) => {
                console.error("Error al enviar email:", error.text);
            }
        );
    };

    const inputStyle = (field) => {
        if (touched[field]) {
            return errors[field]
                ? "border-red-500"
                : "border-green-500";
        }
        return "border-whiteCream";
    };

    return (
        <form ref={form} onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            {/* Nombre */}
            <div className="mb-4">
                <label className="block text-green font-robotoMono text-sm">Nombre</label>
                <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("user_name")}
                    className={`w-full h-8 p-2 border ${inputStyle("user_name")} rounded bg-transparent`}
                />
                {errors.user_name && touched.user_name && (
                    <p className="text-red-500 font-robotoMono text-xs">{errors.user_name}</p>
                )}
            </div>

            {/* Radio: Empresa / Freelance */}
            <div className="mb-4">
                <label className="block text-green font-robotoMono text-sm mb-2">Tipo de trabajo</label>
                <div className="flex items-center">
                    <label className="mr-4">
                        <input
                            type="radio"
                            name="user_workType"
                            value="empresa"
                            checked={formData.user_workType === "empresa"}
                            onChange={handleChange}
                            className="mr-1"
                        />
                        Empresa
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="user_workType"
                            value="freelance"
                            checked={formData.user_workType === "freelance"}
                            onChange={handleChange}
                            className="mr-1"
                        />
                        Freelance
                    </label>
                </div>
            </div>

            {/* Correo electrónico */}
            <div className="mb-4">
                <label className="block text-green font-robotoMono text-sm">Correo electrónico</label>
                <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("user_email")}
                    className={`w-full h-8 p-2 border ${inputStyle("user_email")} rounded bg-transparent`}
                />
                {errors.user_email && touched.user_email && (
                    <p className="text-red-500 font-robotoMono text-xs">{errors.user_email}</p>
                )}
            </div>

            {/* Número telefónico */}
            <div className="mb-4">
                <label className="block text-green font-robotoMono text-sm">Número telefónico</label>
                <input
                    type="tel"
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("user_phone")}
                    className={`w-full h-8 p-2 border ${inputStyle("user_phone")} rounded bg-transparent`}
                />
                {errors.user_phone && touched.user_phone && (
                    <p className="text-red-500 font-robotoMono text-xs">{errors.user_phone}</p>
                )}
            </div>

            {/* Mensaje */}
            <div className="mb-4">
                <label className="block text-green font-robotoMono text-sm">Mensaje</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    className={`w-full h-20 p-2 border ${inputStyle("message")} rounded bg-transparent`}
                    rows="5"
                />
                {errors.message && touched.message && (
                    <p className="text-red-500 font-robotoMono text-xs">{errors.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-green text-blackLight rounded-md px-6 py-2 text-1xl text-[600] font-robotoMono hover:bg-transparent hover:border-solid hover:border-green hover:border-2 hover:text-whiteCream transition ease-in-out duration-300"
            >
                Enviar
            </button>
            {formSubmissionError && (
                <p className="text-red-500 font-robotoMono text-xs mt-2">
                    {formSubmissionError}
                </p>
            )}
            {formSuccess && (
                <p className="text-green-500 font-robotoMono text-xs mt-2">
                    {formSuccess}
                </p>
            )}
        </form>
    );
}
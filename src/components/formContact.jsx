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
        name: "",
        workType: "empresa", // Valor por defecto
        email: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    // Para saber si un campo fue visitado y así mostrar el error
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        phone: false,
        message: false,
    });

    // Error de envío si faltan campos obligatorios
    const [formSubmissionError, setFormSubmissionError] = useState("");

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
        validateField(field, formData[field]);
    };

    const validateField = (field, value) => {
        let error = "";
        switch (field) {
            case "name":
                error = validateName(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "phone":
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
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.phone.trim() ||
            !formData.message.trim()
        ) {
            setFormSubmissionError("Faltan campos obligatorios");
            return;
        }
        setFormSubmissionError("");

        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);
        const messageError = validateMessage(formData.message);

        setErrors({
            name: nameError,
            email: emailError,
            phone: phoneError,
            message: messageError,
        });

        if (nameError || emailError || phoneError || messageError) {
            return;
        }

        // Envío del formulario mediante EmailJS
        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    console.log("Email enviado:", result.text);

                    // Reiniciar el formulario
                    setFormData({
                        name: "",
                        workType: "empresa",
                        email: "",
                        phone: "",
                        message: "",
                    });
                    setTouched({});
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
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    className={`w-full h-8 p-2 border ${inputStyle("name")} rounded bg-transparent`}
                />
                {errors.name && touched.name && (
                    <p className="text-red-500 font-robotoMono text-xs">{errors.name}</p>
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
                            checked={formData.workType === "empresa"}
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
                            checked={formData.workType === "freelance"}
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
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    className={`w-full h-8 p-2 border ${inputStyle("email")} rounded bg-transparent`}
                />
                {errors.email && touched.email && (
                    <p className="text-red-500 font-robotoMono text-xs">{errors.email}</p>
                )}
            </div>

            {/* Número telefónico */}
            <div className="mb-4">
                <label className="block text-green font-robotoMono text-sm">Número telefónico</label>
                <input
                    type="tel"
                    name="user_phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phone")}
                    className={`w-full h-8 p-2 border ${inputStyle("phone")} rounded bg-transparent`}
                />
                {errors.phone && touched.phone && (
                    <p className="text-red-500 font-robotoMono text-xs">{errors.phone}</p>
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
                className="w-full bg-green text-blackLight rounded-md px-6 py-2 text-1xl text-[600] font-robotoMono hover:bg-transparent hover:border-solid hover:border-green hover:border-2 hover:text-whiteCream transition ease-in-out duration-500"
            >
                Enviar
            </button>
            {formSubmissionError && (
                <p className="text-red-500 font-robotoMono text-xs mt-2">
                    {formSubmissionError}
                </p>
            )}
        </form>
    );
}

'use client';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
} from './validations';
import { useLanguage } from '@/context/LanguageContext';
import { tr } from '@/lib/translations';

export const FormContact = () => {
  const form = useRef();
  const { lang } = useLanguage();
  const tx = tr[lang].contact.form;

  const [formData, setFormData] = useState({
    user_name: '',
    user_workType: '',
    user_email: '',
    user_phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    user_name: false,
    user_email: false,
    user_phone: false,
    message: false,
  });

  const [submissionError, setSubmissionError] = useState('');
  const [successMsg, setSuccessMsg]           = useState('');
  const [sending, setSending]                 = useState(false);

  const validateField = (field, value) => {
    const map = {
      user_name:  validateName,
      user_email: validateEmail,
      user_phone: validatePhone,
      message:    validateMessage,
    };
    const error = map[field]?.(value) ?? '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ['user_name', 'user_email', 'user_phone', 'message'];

    // Marcar todos como tocados
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));

    const hasEmpty = fields.some((f) => !formData[f].trim());
    if (hasEmpty) { setSubmissionError(tx.required); return; }

    const fieldErrors = Object.fromEntries(
      fields.map((f) => [f, validateField(f, formData[f])])
    );
    if (Object.values(fieldErrors).some(Boolean)) return;

    setSubmissionError('');
    setSending(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setSuccessMsg(tx.success);
      setFormData({ user_name: '', user_workType: '', user_email: '', user_phone: '', message: '' });
      setTouched({});
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      setSubmissionError(tx.error);
    } finally {
      setSending(false);
    }
  };

  /* Clases del input según estado */
  const fieldClass = (field) => {
    const base =
      'w-full bg-transparent border-b py-3 font-mono text-xs text-white placeholder-muted/30 focus:outline-none transition-colors duration-300';
    if (touched[field] && errors[field])  return `${base} border-red-500`;
    if (touched[field] && !errors[field]) return `${base} border-accent/60`;
    return `${base} border-line focus:border-muted`;
  };

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto space-y-6"
      noValidate
    >
      {/* Nombre */}
      <div>
        <label className="block font-mono text-[10px] text-accent tracking-[3px] uppercase mb-1">
          {tx.name}
        </label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          onBlur={() => handleBlur('user_name')}
          placeholder={tx.namePlaceholder}
          className={fieldClass('user_name')}
        />
        {touched.user_name && errors.user_name && (
          <p className="font-mono text-[10px] text-red-400 mt-1">{errors.user_name}</p>
        )}
      </div>

      {/* Tipo de trabajo */}
      <div>
        <label className="block font-mono text-[10px] text-accent tracking-[3px] uppercase mb-3">
          {tx.workType}
        </label>
        <div className="flex gap-6">
          {tx.workTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-none">
              <div className="relative">
                <input
                  type="radio"
                  name="user_workType"
                  value={type}
                  checked={formData.user_workType === type}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border transition-colors duration-200
                  ${formData.user_workType === type
                    ? 'border-accent bg-accent'
                    : 'border-line bg-transparent'
                  }`}
                />
              </div>
              <span className="font-mono text-xs text-muted capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block font-mono text-[10px] text-accent tracking-[3px] uppercase mb-1">
          {tx.email}
        </label>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          onBlur={() => handleBlur('user_email')}
          placeholder={tx.emailPlaceholder}
          className={fieldClass('user_email')}
        />
        {touched.user_email && errors.user_email && (
          <p className="font-mono text-[10px] text-red-400 mt-1">{errors.user_email}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block font-mono text-[10px] text-accent tracking-[3px] uppercase mb-1">
          {tx.phone}
        </label>
        <input
          type="tel"
          name="user_phone"
          value={formData.user_phone}
          onChange={handleChange}
          onBlur={() => handleBlur('user_phone')}
          placeholder={tx.phonePlaceholder}
          className={fieldClass('user_phone')}
        />
        {touched.user_phone && errors.user_phone && (
          <p className="font-mono text-[10px] text-red-400 mt-1">{errors.user_phone}</p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label className="block font-mono text-[10px] text-accent tracking-[3px] uppercase mb-1">
          {tx.message}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          placeholder={tx.msgPlaceholder}
          rows={4}
          className={`${fieldClass('message')} resize-none`}
        />
        {touched.message && errors.message && (
          <p className="font-mono text-[10px] text-red-400 mt-1">{errors.message}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={sending}
        className="group relative w-full font-mono text-[11px] tracking-[3px] uppercase
          border border-accent text-white py-4 rounded overflow-hidden
          hover:text-base disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-300"
      >
        <span className="relative z-10">
          {sending ? tx.sending : tx.send}
        </span>
        <span className="absolute inset-0 bg-accent translate-x-[-101%]
          group-hover:translate-x-0 transition-transform duration-300 ease-out
          group-disabled:translate-x-[-101%]" />
      </button>

      {/* Mensajes de estado */}
      {submissionError && (
        <p className="font-mono text-[11px] text-red-400 text-center">{submissionError}</p>
      )}
      {successMsg && (
        <p className="font-mono text-[11px] text-accent text-center">{successMsg}</p>
      )}
    </form>
  );
};
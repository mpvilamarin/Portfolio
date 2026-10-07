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
import { trackEvent } from '@/lib/analytics';

const REQUIRED = ['user_name', 'user_email', 'message'];
const LABEL = 'block font-mono text-xs text-accent tracking-[2px] uppercase mb-1';
const ERROR = 'font-mono text-xs text-red-400 mt-1.5';

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
      // El teléfono es opcional: solo se valida si se completó
      user_phone: (v) => (v.trim() ? validatePhone(v) : ''),
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
    const fields = [...REQUIRED, 'user_phone'];

    // Marcar todos como tocados
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));

    const hasEmpty = REQUIRED.some((f) => !formData[f].trim());
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
      trackEvent('contact_submit', { status: 'success', workType: formData.user_workType || 'none' });
      setFormData({ user_name: '', user_workType: '', user_email: '', user_phone: '', message: '' });
      setTouched({});
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      setSubmissionError(tx.error);
      trackEvent('contact_submit', { status: 'error' });
    } finally {
      setSending(false);
    }
  };

  /* Clases del input según estado */
  const fieldClass = (field) => {
    const base =
      'w-full bg-transparent border-b py-3 font-montserrat text-[1rem]/6 text-white placeholder-muted/70 focus:outline-none transition-colors duration-300';
    if (touched[field] && errors[field])  return `${base} border-red-500`;
    if (touched[field] && !errors[field]) return `${base} border-accent/60`;
    return `${base} border-line focus:border-accent/70`;
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
        <label htmlFor="user_name" className={LABEL}>
          {tx.name}
        </label>
        <input
          id="user_name"
          type="text"
          name="user_name"
          autoComplete="name"
          value={formData.user_name}
          onChange={handleChange}
          onBlur={() => handleBlur('user_name')}
          placeholder={tx.namePlaceholder}
          required
          aria-required="true"
          aria-invalid={Boolean(touched.user_name && errors.user_name)}
          aria-describedby={touched.user_name && errors.user_name ? 'user_name-error' : undefined}
          className={fieldClass('user_name')}
        />
        {touched.user_name && errors.user_name && (
          <p id="user_name-error" role="alert" className={ERROR}>{errors.user_name}</p>
        )}
      </div>

      {/* Tipo de trabajo */}
      <fieldset>
        <legend className={`${LABEL} mb-3`}>{tx.workType}</legend>
        <div className="flex gap-6">
          {tx.workTypes.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="user_workType"
                value={type}
                checked={formData.user_workType === type}
                onChange={handleChange}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={`w-4 h-4 rounded-full border transition-colors duration-200
                  peer-focus-visible:ring-2 peer-focus-visible:ring-accent/60
                  ${formData.user_workType === type
                    ? 'border-accent bg-accent'
                    : 'border-muted/60 bg-transparent'
                  }`}
              />
              <span className="font-montserrat text-[1rem]/6 text-muted capitalize">{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Email */}
      <div>
        <label htmlFor="user_email" className={LABEL}>
          {tx.email}
        </label>
        <input
          id="user_email"
          type="email"
          name="user_email"
          autoComplete="email"
          value={formData.user_email}
          onChange={handleChange}
          onBlur={() => handleBlur('user_email')}
          placeholder={tx.emailPlaceholder}
          required
          aria-required="true"
          aria-invalid={Boolean(touched.user_email && errors.user_email)}
          aria-describedby={touched.user_email && errors.user_email ? 'user_email-error' : undefined}
          className={fieldClass('user_email')}
        />
        {touched.user_email && errors.user_email && (
          <p id="user_email-error" role="alert" className={ERROR}>{errors.user_email}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="user_phone" className={LABEL}>
          {tx.phone}
        </label>
        <input
          id="user_phone"
          type="tel"
          name="user_phone"
          autoComplete="tel"
          value={formData.user_phone}
          onChange={handleChange}
          onBlur={() => handleBlur('user_phone')}
          placeholder={tx.phonePlaceholder}
          aria-invalid={Boolean(touched.user_phone && errors.user_phone)}
          aria-describedby={touched.user_phone && errors.user_phone ? 'user_phone-error' : undefined}
          className={fieldClass('user_phone')}
        />
        {touched.user_phone && errors.user_phone && (
          <p id="user_phone-error" role="alert" className={ERROR}>{errors.user_phone}</p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className={LABEL}>
          {tx.message}
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          placeholder={tx.msgPlaceholder}
          required
          aria-required="true"
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
          rows={4}
          className={`${fieldClass('message')} resize-none`}
        />
        {touched.message && errors.message && (
          <p id="message-error" role="alert" className={ERROR}>{errors.message}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={sending}
        className="group relative w-full font-mono text-xs tracking-[2px] uppercase
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
        <p role="alert" className="font-mono text-sm text-red-400 text-center">{submissionError}</p>
      )}
      {successMsg && (
        <p role="status" className="font-mono text-sm text-accent text-center">{successMsg}</p>
      )}
    </form>
  );
};
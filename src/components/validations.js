// validations.js
export function validateName(name) {
    if (!name || name.trim().length < 4) {
      return "El nombre debe tener al menos 4 letras.";
    }
    // Permite letras (incluyendo acentos) y espacios
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!regex.test(name)) {
      return "El nombre solo puede contener letras y espacios.";
    }
    return "";
  }

  export function validateEmail(email) {
    // Regex básico para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "El correo electrónico debe tener un formato válido.";
    }
    return "";
  }
  
  export function validatePhone(phone) {
    // Solo números y al menos 6 dígitos
    const regex = /^\d{6,}$/;
    if (!regex.test(phone)) {
      return "El número telefónico debe contener solo números y tener al menos 6 dígitos.";
    }
    return "";
  }
  
  export function validateMessage(message) {
    // Contar palabras (filtrando espacios vacíos)
    const words = message.trim().split(/\s+/);
    if (words.length < 5) {
      return "El mensaje debe tener al menos 5 palabras.";
    }
    return "";
  }
  
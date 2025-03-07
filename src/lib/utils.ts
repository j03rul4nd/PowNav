/**
 * Combina múltiples clases de Tailwind en una sola cadena de manera eficiente.
 * 
 * 🔹 Filtra valores falsy (`false`, `undefined`, `null`) para evitar errores.
 * 🔹 Útil para manejar clases condicionales sin escribir código redundante.
 * 🔹 Funciona como `clsx` o `classnames`, pero en una versión ligera y personalizada.
 *
 * @param classes - Lista de clases CSS como strings, booleanos o valores nulos.
 * @returns Una cadena de clases CSS limpia y optimizada.
 *
 * 📌 Ejemplo de uso:
 * ```tsx
 * const isActive = true;
 * const buttonClass = cn(
 *   "px-4 py-2 rounded-lg",
 *   isActive && "bg-blue-500 text-white",  // Solo se añade si isActive es true
 *   !isActive && "bg-gray-300 text-gray-700" // Solo si isActive es false
 * );
 * console.log(buttonClass); // "px-4 py-2 rounded-lg bg-blue-500 text-white"
 * ```
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(" ");
  }
  
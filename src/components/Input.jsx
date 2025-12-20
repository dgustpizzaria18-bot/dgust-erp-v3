// =============================================
// INPUT COMPONENT — D'GUST ERP
// Input padronizado com estados e validação
// =============================================

export default function Input({
  label,
  error,
  helperText,
  required = false,
  icon,
  className = '',
  containerClassName = '',
  ...props
}) {
  // Classes base do input
  const baseClasses = `
    w-full px-3 py-2 
    border rounded-lg 
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:bg-neutral-100 disabled:cursor-not-allowed
    ${error 
      ? 'border-danger-500 focus:ring-danger-300 focus:border-danger-500' 
      : 'border-neutral-300 focus:ring-primary-300 focus:border-primary-500'
    }
    ${icon ? 'pl-10' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={`${containerClassName}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}

      {/* Input com ícone */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </div>
        )}
        
        <input
          className={baseClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
      </div>

      {/* Mensagem de erro ou helper */}
      {error && (
        <p id={`${props.id}-error`} className="mt-1 text-sm text-danger-600">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="mt-1 text-xs text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

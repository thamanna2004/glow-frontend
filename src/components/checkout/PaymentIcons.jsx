function IconWrapper({ children, className = "" }) {
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ice-50 text-navy-900 ${className}`}
    >
      {children}
    </span>
  );
}

export function PaymentMethodIcon({ type, className = "" }) {
  switch (type) {
    case "cod":
      return (
        <IconWrapper className={className}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 8c-2.5 0-4.5 1.6-4.5 3.6S9.5 15.2 12 15.2s4.5-1.6 4.5-3.6S14.5 8 12 8Z" />
            <path d="M6 11.6C6 14.8 8.8 18 12 18s6-3.2 6-6.4" />
            <path d="M4 7.5h16M7 4.5h10" />
          </svg>
        </IconWrapper>
      );
    case "card":
      return (
        <IconWrapper className={className}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </IconWrapper>
      );
    case "upi":
      return (
        <IconWrapper className={className}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 7h10v10H7z" />
            <path d="M9 12h6M12 9v6" />
          </svg>
        </IconWrapper>
      );
    case "bank":
      return (
        <IconWrapper className={className}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 10h18M5 10V18M9 10V18M15 10V18M19 10V18M2 18h20M12 4l9 6H3l9-6Z" />
          </svg>
        </IconWrapper>
      );
    case "wallet":
      return (
        <IconWrapper className={className}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7h15a3 3 0 0 1 3 3v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
            <path d="M18 12h3v3h-3a1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </IconWrapper>
      );
    default:
      return null;
  }
}

export function CardBrandIcon({ brand }) {
  if (!brand) return null;

  const labels = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
    rupay: "RuPay",
  };

  return (
    <span className="rounded-lg bg-ice-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-900">
      {labels[brand] || brand}
    </span>
  );
}

export function LockIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

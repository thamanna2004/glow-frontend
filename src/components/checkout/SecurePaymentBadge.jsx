import { LockIcon } from "./PaymentIcons";

export default function SecurePaymentBadge() {
  return (
    <div className="flex items-start gap-3 rounded-[18px] border border-ice-100 bg-ice-50/60 px-4 py-3">
      <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-navy-900" />
      <div>
        <p className="text-sm font-medium text-navy-900">Secure payment</p>
        <p className="text-xs text-slate-500">Your payment information is encrypted</p>
      </div>
    </div>
  );
}

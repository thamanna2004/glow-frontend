import { paymentMethods } from "../../data/paymentOptions";
import { PaymentMethodIcon } from "./PaymentIcons";

export default function PaymentMethodSelector({ selected, onChange }) {
  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => {
        const active = selected === method.id;

        return (
          <label
            key={method.id}
            className={`flex cursor-pointer items-start gap-4 rounded-[20px] border p-4 transition-all duration-300 ${
              active
                ? "border-navy-900 bg-ice-50/80 shadow-[0_8px_24px_-12px_rgba(26,43,74,0.2)]"
                : "border-ice-200 bg-white hover:border-ice-300 hover:bg-ice-50/40"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={active}
              onChange={() => onChange(method.id)}
              className="mt-1 h-4 w-4 accent-navy-900"
            />
            <PaymentMethodIcon type={method.icon} />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-navy-900">{method.label}</p>
              <p className="mt-0.5 text-sm text-slate-500">{method.description}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}

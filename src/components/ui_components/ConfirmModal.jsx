import { useEffect, useRef } from "react";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

function ConfirmModal({
  open,
  amount,
  newBalance,
  payment,
  rechargeType,
  onConfirm,
  onCancel,
  loading,
  error,
}) {
  const modalRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // Save & restore focus
  useEffect(() => {
    if (open) {
      lastFocusedElement.current = document.activeElement;
      confirmBtnRef.current?.focus();
    } else {
      lastFocusedElement.current?.focus();
    }
  }, [open]);

  // ESC key + focus trap
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();

      if (e.key === "Tab") {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 animate-fadeIn"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm bg-white rounded-xl p-6 shadow-lg
                   animate-scaleIn space-y-4"
      >
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Confirm Recharge
        </h2>

        <div className="space-y-2 text-sm">
          <InfoRow label="Recharge Type" value={rechargeType} />
          <InfoRow label="Payment Method" value={payment} />
          <InfoRow
            label="Amount"
            value={`₹${amount}`}
            highlight
          />
          <InfoRow
            label="New Balance"
            value={`₹${newBalance.toFixed(2)}`}
            border
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <FiAlertCircle />
            {error}
          </div>
        )}

        <button
          ref={confirmBtnRef}
          onClick={onConfirm}
          disabled={loading}
          className={`w-full h-12 rounded-lg flex items-center justify-center gap-2 transition
            ${
              loading
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {loading ? (
            <>
              <Spinner />
              Processing...
            </>
          ) : (
            <>
              <FiCheckCircle />
              Confirm Recharge
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight, border }) {
  return (
    <div className={`flex justify-between ${border && "border-t pt-2"}`}>
      <span className="text-gray-500">{label}</span>
      <span
        className={`font-medium ${
          highlight && "text-blue-600 font-semibold"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Spinner() {
  return (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}

export default ConfirmModal;

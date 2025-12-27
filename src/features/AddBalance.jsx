import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import ConfirmModal from "../components/ui_components/ConfirmModal";

function AddBalance({ user }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            rechargeType: "recharge",
            payment: "upi",
            rechargeAmount: "",
        },
        shouldUnregister: false,
    });

    const [isConfirming, setIsConfirming] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [submitError, setSubmitError] = useState("");


    const quickAmounts = [100, 200, 500, 1000];

    const amount = watch("rechargeAmount");
    const numericAmount = parseFloat(amount) || 0;
    const isValidAmount = numericAmount > 0;
    const newBalance = user.balance + numericAmount;

    const handleQuickAmount = (value) => {
        setValue(
            "rechargeAmount",
            (parseFloat(amount) || 0) + value,
            { shouldValidate: true, shouldDirty: true }
        );
    };

    const onSubmit = (data) => {
        setIsConfirming(true);
        setShowConfirm(true);
        console.log(data);

        setTimeout(() => {
            setIsConfirming(false);
        }, 600);
    };
    const handleFinalConfirm = async () => {
        setIsConfirming(true);
        setSubmitError("");

        try {
            // await apiCall()
            await new Promise((r) => setTimeout(r, 800));

            setShowConfirm(false);
        } catch {
            setSubmitError("Recharge failed. Please try again.");
        } finally {
            setIsConfirming(false);
        }
    };


    return (
        <div className="w-full max-w-md space-y-2.5">
            {/* Balance Summary */}
            {!isValidAmount ? (
                <div className="card-container">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Current Balance</span>
                        <span className="text-gray-900">
                            ₹{user.balance.toFixed(2)}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex justify-between items-center">
                        <span className="text-blue-900">New Balance</span>
                        <span className="text-blue-600 text-xl">
                            ₹{newBalance.toFixed(2)}
                        </span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="card-container space-y-3">
                {/* Recharge Type */}
                <div className="flex items-center justify-between">
                    <label className="block text-gray-700">Choose recharge type</label>
                    <div className="flex justify-between">
                        <label className="flex gap-2 items-center">
                            <input
                                type="radio"
                                value="cover"
                                {...register("rechargeType", { required: true })}
                            />
                            Cover
                        </label>
                    </div>

                    <label className="flex gap-2 items-center">
                        <input
                            type="radio"
                            value="recharge"
                            {...register("rechargeType", { required: true })}
                        />
                        Recharge
                    </label>
                </div>

                <ErrorMessage
                    errors={errors}
                    name="rechargeType"
                    render={({ message }) => (
                        <span className="text-red-500 text-sm">{message}</span>
                    )}
                />

                {/* Recharge Amount */}
                <label className="block text-gray-700">
                    Enter recharge amount
                    <ErrorMessage
                        errors={errors}
                        name="rechargeAmount"
                        render={({ message }) => (
                            <span className="text-red-500 text-sm">{message}</span>
                        )}
                    />
                </label>

                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">
                        ₹
                    </span>
                    <input
                        type="number"
                        step="1"
                        min="0"
                        inputMode="numeric"
                        placeholder="0"
                        className="w-full h-14 pl-10 pr-4 text-2xl bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        {...register("rechargeAmount", {
                            required: " required",
                            min: { value: 1, message: "Enter a valid amount" },
                        })}
                    />
                </div>

                {/* Payment Options */}
                <div className={`grid grid-cols-3 gap-2 ${!isValidAmount && "opacity-50"}`}>
                    {["Cash", "UPI", "Card"].map((method) => (
                        <label key={method} className="flex gap-2 items-center justify-center">
                            <input
                                type="radio"
                                value={method}
                                disabled={!isValidAmount}
                                {...register("payment", { required: true, message: " required" })}
                            />
                            {method}
                        </label>
                    ))}
                </div>

                <ErrorMessage
                    errors={errors}
                    name="payment"
                    render={({ message }) => (
                        <span className="text-red-500 text-sm">{message}</span>
                    )}
                />

                {/* Quick Amounts */}
                <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => handleQuickAmount(value)}
                            className="h-10 bg-gray-100 hover:bg-gray-200 rounded-lg"
                        >
                            + ₹{value}
                        </button>
                    ))}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isValidAmount || isConfirming}
                    className={`w-full h-14 rounded-lg flex justify-center items-center gap-2 transition
            ${isConfirming
                            ? "bg-green-600 text-white"
                            : isValidAmount
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    {isConfirming ? (
                        <>
                            <FiCheckCircle className="size-5" />
                            Confirmed!
                        </>
                    ) : (
                        "Confirm Recharge"
                    )}
                </button>
            </form>
            <ConfirmModal
                open={showConfirm}
                amount={numericAmount}
                newBalance={newBalance}
                payment={watch("payment")}
                rechargeType={watch("rechargeType")}
                loading={isConfirming}
                error={submitError}
                onConfirm={handleFinalConfirm}
                onCancel={() => setShowConfirm(false)}
            />

        </div>
    );
}

export default AddBalance;

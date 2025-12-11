import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

function RechargePage() {
    const [amount, setAmount] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);

    const user = {
        id: '1',
        name: 'Luv Agrawal',
        phone: '+91 93020 31272',
        cardNumber: 'NC-8472-1093',
        balance: 145.50,
    }

    const quickAmounts = [100, 200, 500, 1000];

    const handleQuickAmount = (value) => {
        setAmount(value.toString());
    };

    const handleConfirm = () => {
        setIsConfirming(true);
        setTimeout(() => {
            setIsConfirming(false);
        }, 600);
    };

    const isValidAmount = amount && parseFloat(amount) > 0;
    const newBalance = user.balance + (parseFloat(amount) || 0);

    return (
        <div className="w-full max-w-md space-y-6">
            {/* Card Summary */}
            <div className="card-container">
                <div className="flex justify-between">
                    <span className="text-gray-600">Current Balance</span>
                    <span className="text-gray-900">₹{user?.balance?.toFixed(2)}</span>
                </div>
            </div>

            {/* New Balance Preview */}
            {isValidAmount && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex justify-between items-center">
                        <span className="text-blue-900">New Balance</span>
                        <span className="text-blue-600 text-xl">₹{newBalance.toFixed(2)}</span>
                    </div>
                </div>
            )}

            {/* Recharge Amount Input */}
            <div className="card-container">
                <label htmlFor="recharge-amount" className="block text-gray-700 mb-3">
                    Enter recharge amount
                </label>
                <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">₹</span>
                    <input
                        id="recharge-amount"
                        type="number"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-16 pl-10 pr-4 text-2xl bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        step="100"
                        min="0"
                    />
                </div>

                {/* Payment Options */}
                <div className="grid grid-cols-3 justify-center items-center gap-2 mb-4">
                    <div className='flex items-center justify-center gap-2'>
                        <input type="radio" id="payment1" name="payment" value="cash" />
                        <label for="payment1">  Cash</label>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <input type="radio" id="payment2" name="payment" value="upi" />
                        <label for="payment2"> UPI</label>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <input type="radio" id="payment3" name="payment" value="card" />
                        <label for="payment3"> Card</label>
                    </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((value) => (
                        <button
                            key={value}
                            onClick={() => handleQuickAmount(value)}
                            className="h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        >
                            ₹{value}
                        </button>
                    ))}
                </div>
            </div>

            {/* Confirm Button */}
            <button
                onClick={handleConfirm}
                disabled={!isValidAmount || isConfirming}
                className={`w-full h-14 rounded-lg transition-all flex items-center justify-center gap-2
              ${isValidAmount && !isConfirming
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
              ${isConfirming ? 'bg-green-600' : ''}
            `}
            >
                {isConfirming ? (
                    <>
                        <FiCheckCircle className="size-5" />
                        <span>Confirmed!</span>
                    </>
                ) : (
                    <span>Confirm Recharge</span>
                )}
            </button>

        </div>
    );
}

export default RechargePage
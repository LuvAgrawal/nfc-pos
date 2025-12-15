import { useState } from "react";
import { BiCreditCard, BiShoppingBag } from "react-icons/bi"
import Modal from "../components/ui_components/Modal";
import AddBalance from "../features/AddBalance";

const CustomerPage = () => {
    const user = {
        id: '1',
        name: 'Luv Agrawal',
        phone: '+91 93020 31272',
        cardNumber: 'NC-8472-1093',
        balance: 145.50,
    }
    const ledger = [
        { id: '1', date: new Date('2025-12-11T22:15:00'), activity: 'Order', amount: -25.50 },
        { id: '2', date: new Date('2025-12-03T21:45:00'), activity: 'Recharge', amount: 100.00 },
        { id: '3', date: new Date('2025-12-03T20:30:00'), activity: 'Order', amount: -18.00 },
        { id: '4', date: new Date('2025-12-02T23:20:00'), activity: 'Order', amount: -32.00 },
        { id: '5', date: new Date('2025-12-02T22:00:00'), activity: 'Recharge', amount: 150.00 },
        { id: '6', date: new Date('2025-12-02T21:15:00'), activity: 'Order', amount: -15.50 },
    ];

    // Modal States
    const [rechargeModal, setRechargeModal] = useState(false)
    const closeRechargeModal = () => setRechargeModal(false)

    const formatDate = (date) => {
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        const timeStr = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        if (isToday) {
            return `Today, ${timeStr}`;
        }

        const dateStr = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        return `${dateStr}, ${timeStr}`;
    };
    const formatAmount = (activity, amount) => {
        const absAmount = Math.abs(amount);
        const sign = activity === 'Recharge' ? '+' : '-';
        return `${sign}₹${absAmount.toFixed(2)}`;
    };

    return (<>
        {/* Main Content */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: User & Card Info + Actions */}
            <div className="lg:col-span-1 space-y-4">
                {/* User Information Card */}
                <div className="card-container">
                    <h2 className="text-gray-500 text-sm mb-4">Customer Details</h2>
                    <div className="space-y-3">
                        <div>
                            <p className="text-gray-900">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">{user.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Card Details */}
                <div className="card-container">
                    <h2 className="text-gray-500 text-sm mb-4">Card Information</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Card Number</p>
                            <p className="text-gray-900">{user.cardNumber}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm mb-1">Current Balance</p>
                            <p className="text-blue-600 text-3xl">₹{user.balance.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        className="w-full h-12 flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        onClick={() => setRechargeModal(true)}
                    >
                        <BiCreditCard className="size-5" />
                        <span>Recharge</span>
                    </button>

                    <button
                        className="w-full h-12 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <BiShoppingBag className="size-5" />
                        <span>Create Order</span>
                    </button>
                </div>
            </div>

            {/* Right Column: Ledger */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-gray-900">Recent Activity</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-gray-700 text-sm">Activity</th>
                                    <th className="px-6 py-3 text-right text-gray-700 text-sm">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {ledger.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-600">
                                            {formatDate(entry.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`
                            inline-flex items-center px-3 py-1 rounded-full text-sm
                            ${entry.activity === 'Recharge'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }
                          `}>
                                                {entry.activity}
                                            </span>
                                        </td>
                                        <td className={`
                          px-6 py-4 text-right
                          ${entry.activity === 'Recharge' ? 'text-green-600' : 'text-gray-900'}
                        `}>
                                            {formatAmount(entry.activity, entry.amount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Recharge Modal */}
        {rechargeModal && <Modal closeModal={closeRechargeModal}><AddBalance user={user} /></Modal>}
    </>)
}

export default CustomerPage
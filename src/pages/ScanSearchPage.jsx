import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { LuNfc } from 'react-icons/lu';

const ScanSearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [nfcState, setNFCState] = useState('normal');

    const handleNFCScan = () => {
        setNFCState('scanning');

        setTimeout(() => {
            const success = Math.random() > 0.3;
            if (success) {
                setNFCState('normal');
            } else {
                setNFCState('invalid');
                setTimeout(() => setNFCState('normal'), 2000);
            }
        }, 800);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="card-container w-full max-w-md space-y-8">
            {/* NFC Scanner */}
            <div className="flex flex-col items-center space-y-4">
                <button
                    onClick={handleNFCScan}
                    disabled={nfcState === 'scanning'}
                    className={`
                                relative w-40 h-40 rounded-full flex items-center justify-center transition-all
                                ${nfcState === 'normal' ? 'bg-blue-50 hover:bg-blue-100 border-2 border-blue-200' : ''}
                                ${nfcState === 'scanning' ? 'bg-blue-100 border-2 border-blue-400 animate-pulse' : ''}
                                ${nfcState === 'invalid' ? 'bg-red-50 border-2 border-red-500' : ''}
                            `}
                >
                    <LuNfc
                        className={`
                                    size-16
                                    ${nfcState === 'normal' ? 'text-blue-600' : ''}
                                    ${nfcState === 'scanning' ? 'text-blue-700' : ''}
                                    ${nfcState === 'invalid' ? 'text-red-600' : ''}
                                `}
                    />
                </button>

                {/* NFC Labels */}
                {nfcState === 'normal' && (
                    <p className="text-gray-600">Tap card to scanner</p>
                )}
                {nfcState === 'scanning' && (
                    <p className="text-blue-600">Scanning...</p>
                )}
                {nfcState === 'invalid' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                        <FiAlertCircle className="size-5" />
                        <p>Invalid card. Try again.</p>
                    </div>
                )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, phone, or card number"
                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-lg
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </form>
        </div>
    );
};

export default ScanSearchPage;

import Image from 'next/image';
import Link from 'next/link';

interface CustomerProfileProps {
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    status: string;
    last_sign_in_at: string;
    groups: string[];
    passport_number: string;
    passport_expiry: string; // ISO date string
    date_of_birth: string; // ISO date string
    loyalty_tier: string; // silver, gold, platinum
    loyalty_points: number;
    miles_points: number;
    wallet_balance: number;
  };
}

export default function CustomerProfile({ user }: CustomerProfileProps) {
  const tierColors: Record<string, string> = {
    silver: '#c0c0c0',
    gold: '#ffd700',
    platinum: '#e5e4e2',
  };

  const tierColor = tierColors[user.loyalty_tier.toLowerCase()] || '#c0c0c0';

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <Image
            src="/default-avatar.png"
            alt={`${user.full_name} avatar`}
            width="200"
            height="200"
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user.full_name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${tierColor}33`, color: tierColor }}>
              {user.loyalty_tier.toUpperCase()}
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">{user.role}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Travel Details</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Passport Number:</span>
              <span className="font-medium">{user.passport_number}</span>
            </div>
            <div className="flex justify-between">
              <span>Passport Expiry:</span>
              <span className="font-medium">{formatDate(user.passport_expiry)}</span>
            </div>
            <div className="flex justify-between">
              <span>Date of Birth:</span>
              <span className="font-medium">{formatDate(user.date_of_birth)}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Loyalty & Wallet</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Loyalty Points:</span>
              <span className="font-medium">{user.loyalty_points.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Miles Points:</span>
              <span className="font-medium">{user.miles_points.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Wallet Balance:</span>
              <span className="font-medium text-green-600">${user.wallet_balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-4">Activity Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="text-center">
            <p className="text-xs font-medium">Trips Booked</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium">Total Spent</p>
            <p className="text-2xl font-bold">$1,240.50</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium">Upcoming Trips</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
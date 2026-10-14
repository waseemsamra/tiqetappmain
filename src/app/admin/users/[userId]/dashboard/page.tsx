import { getUserById } from '@/lib/user-service';
import CustomerProfile from '@/app/components/customer/profile-card';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Refetch data on every request

export default async function CustomerDashboardPage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUserById(params.userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Customer Dashboard
        </h1>
        <p className="text-gray-600">
          Viewing dashboard for {user.full_name}
        </p>
      </div>
      <CustomerProfile user={user} />
    </div>
  );
}
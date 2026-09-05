import { cookies } from 'next/headers';
import CheckoutPage from './CheckoutPage';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { getUser } from '@/lib/actions/getUser';
import { notFound } from 'next/navigation';

export default async function CheckoutPageContainer() {
  const session = await getServerSession(authOptions);
  const userResult = await getUser(session?.user?.id || '');

  if(!userResult.success) {
    return notFound();
  }

  return <CheckoutPage user={userResult.user} />;
}

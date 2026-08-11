'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

const GitHubAuthBtn = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p className="text-sm">Loading...</p>;

  if (session) {
    return (
      <div className="flex">
        <p className="text-terracotta mr-3 text-sm">{session.user?.email}</p>
        <button className="text-pine hover:text-terracotta text-sm" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button className="text-pine hover:text-terracotta text-sm" onClick={() => signIn('github')}>
      Sign in with GitHub
    </button>
  );
};

export default GitHubAuthBtn;

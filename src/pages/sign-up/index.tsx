import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty, isEqual } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { signUp } from '@/api/calls/auth';
import logo from '@/public/assets/images/maxresdefault.png';
import { useAuthStore } from '@/store/auth';

const Index = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState(false);

  const handleSubmit = async () => {
    if (!isEqual(retryPassword, password)) {
      setError('Password and retry password must be the same');
      return;
    }
    setLoad(true);
    const response = await signUp(email, username, password);
    setLoad(false);
    setError(response?.error || '');
  };

  useEffect(() => {
    if (!isEmpty(user)) {
      router.push('/');
    }
  }, [user]);

  return (
    <div className="grid h-screen w-screen">
      <div className="container m-auto w-full max-w-[500px] px-12">
        <Link href={'/'} className="flex justify-center">
          <img src={logo.src} alt="Byte5 Logo" className="mb-12 h-32" />
        </Link>

        <div className="grid gap-4">
          {!isEmpty(error) && (
            <div className="rounded-md border border-red-700 bg-red-400 py-3 px-2 text-white">
              {error}
            </div>
          )}
          <input
            className="rounded-md border bg-gray-100 py-3 px-2"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="rounded-md border bg-gray-100 py-3 px-2"
            type="text"
            placeholder="E-Mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="rounded-md border bg-gray-100 py-3 px-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="rounded-md border bg-gray-100 py-3 px-2"
            placeholder="Retry  Password"
            onChange={(e) => setRetryPassword(e.target.value)}
          />
          <button
            className="cursor-pointer rounded-md bg-blue-default py-3 font-bold text-white transition-all ease-in-out active:mx-1 active:bg-blue-dark disabled:cursor-not-allowed disabled:select-none disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={load}
          >
            {load ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : (
              'Sign Up'
            )}
          </button>
          <Link href="/" className="text-center text-blue-default">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

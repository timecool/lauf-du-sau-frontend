import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';

import { signIn } from '@/api/calls/auth';
import logo from '@/public/assets/images/maxresdefault.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState(false);
  const handleSubmit = async () => {
    setLoad(true);
    const response = await signIn(email, password);
    setLoad(false);
    setError(response?.error || '');
  };
  return (
    <div className="grid h-screen w-screen">
      <div className="container m-auto w-full max-w-[500px] px-12">
        <div className="flex justify-center">
          <img src={logo.src} alt="Byte5 Logo" className="mb-12 h-32" />
        </div>

        <div className="grid gap-4">
          {!isEmpty(error) && (
            <div className="rounded-md border border-red-700 bg-red-400 py-3 px-2 text-white">
              {error}
            </div>
          )}
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
          <button
            className="cursor-pointer rounded-md bg-blue-default py-3 font-bold text-white transition-all ease-in-out active:mx-1 active:bg-blue-dark disabled:cursor-not-allowed disabled:select-none disabled:bg-gray-400"
            onClick={handleSubmit}
            disabled={load}
          >
            {load ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : (
              'Sign In'
            )}
          </button>
          <Link href="/sign-up" className="text-center text-blue-default">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

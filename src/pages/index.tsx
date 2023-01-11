import isEmpty from 'lodash/isEmpty';

import SignIn from '@/components/sign-in';
import { useAuthStore } from '@/store/auth';

const Index = () => {
  const user = useAuthStore((state) => state.user);
  if (isEmpty(user)) return <SignIn />;
  return (
    <>
      <div className="container mx-auto grid px-2 md:px-0">
        {user.username} {user.email}
      </div>
    </>
  );
};

export default Index;

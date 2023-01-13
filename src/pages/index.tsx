import isEmpty from 'lodash/isEmpty';

import Home from '@/components/templates/home';
import SignIn from '@/components/templates/sign-in';
import { useAuthStore } from '@/store/auth';

const Index = () => {
  const user = useAuthStore((state) => state.user);

  if (isEmpty(user)) return <SignIn />;
  return <Home />;
};

export default Index;

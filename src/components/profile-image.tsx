import { useAuthStore } from '@/store/auth';

interface IProps {
  className: string;
}

const ProfileImage = (props: IProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <img
      {...props}
      src={
        user?.image_url || `https://api.multiavatar.com/${user?.username}.svg`
      }
    />
  );
};

export default ProfileImage;

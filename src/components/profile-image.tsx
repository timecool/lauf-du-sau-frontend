interface IProps {
  className: string;
  name: string;
  src?: string;
}

const ProfileImage = (props: IProps) => {
  const { className, name, src } = props;

  return (
    <img
      className={`${className} aspect-square object-cover`}
      src={src || `https://api.multiavatar.com/${name}.svg`}
      alt={`Profile Image ${name}`}
    />
  );
};

export default ProfileImage;

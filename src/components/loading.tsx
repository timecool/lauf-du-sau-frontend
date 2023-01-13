import styles from '@/styles/loading.module.scss';

const Loading = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden ">
      <div id={styles.load}>
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
};
export default Loading;

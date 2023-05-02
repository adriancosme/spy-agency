export default function () {
  return (
    <>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

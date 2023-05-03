export default function LogoutPage() {
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

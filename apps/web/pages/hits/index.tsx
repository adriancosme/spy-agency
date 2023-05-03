import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AllHits from "../../components/AllHits";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { getToken } from "next-auth/jwt";
import { IHit } from "../../interfaces/hit.interface";
import { UserRole } from "../../interfaces/user.interface";
import MyHits from "../../components/MyHits";
import LackeyHits from "../../components/LackeyHits";
import { useRouter } from "next/router";

export default function HitsPage({
  allHits,
  managerHits,
  myHits,
  userRole,
}: {
  allHits: IHit[];
  myHits: IHit[];
  managerHits: IHit[];
  userRole: UserRole;
}) {
  const router = useRouter();
  if(userRole == null) {
    router.push('/404')
  }
  const isBoss = userRole === UserRole.BOSS;
  const isManager = userRole === UserRole.MANAGER;
  const isHitman = userRole === UserRole.HITMAN;
  if (isBoss) {
    return (
      <AuthLayout title="BOSS - HITS">
        <AllHits hits={allHits} />
      </AuthLayout>
    );
  }

  if (isManager) {
    return (
      <AuthLayout title="MANAGER - HITS">
        <MyHits hits={myHits} />
        <LackeyHits hits={managerHits} />
      </AuthLayout>
    );
  }

  if (isHitman) {
    return (
      <AuthLayout title="HITMAN - HITS">
        <MyHits hits={myHits} />
      </AuthLayout>
    );
  }

  return <div>Theres an error, check your role</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const ALL_HITS_ENDPOINT = "/hits/all";
  const MANAGER_HITS_ENDPOINT = "/hits/manager";
  const ASSIGNED_HITS_ENDPOINT = "/hits/assigned";
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const token = session?.user?.accessToken;
  const userId = session?.user?.id;
  const userRole = session?.user?.role;
  const resAllHits = await fetch(
    `${process.env.BASE_URL}${ALL_HITS_ENDPOINT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  const allHits = await resAllHits.json();

  const resMyHits = await fetch(
    `${process.env.BASE_URL}${ASSIGNED_HITS_ENDPOINT}/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  const myHits = await resMyHits.json();

  const resManagerHits = await fetch(
    `${process.env.BASE_URL}${MANAGER_HITS_ENDPOINT}/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  const managerHits = await resManagerHits.json();

  return {
    props: {
      allHits: allHits || [],
      myHits: myHits || [],
      managerHits: managerHits || [],
      userRole,
    },
  };
};

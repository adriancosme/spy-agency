import { useContext, useEffect, useState } from "react";
import AllHits from "../../components/AllHits";
import LackeyHits from "../../components/LackeyHits";
import MyHits from "../../components/MyHits";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { AuthContext } from "../../contexts/Auth";
import { UserRole } from "../../interfaces/user.interface";
import _ from "lodash";



export default function ({}) {
  const { user } = useContext(AuthContext);
  const [isManager, setIsManager] = useState<boolean>(false)
  const [isBoss, setIsBoss] = useState<boolean>(false)
  const [isHitman, setIsHitman] = useState<boolean>(false)
  useEffect(() => {
    if(user == null) return;
    setIsManager(user?.user?.role === UserRole.MANAGER);
    setIsBoss(user?.user?.role === UserRole.BOSS);
    setIsHitman(user?.user?.role === UserRole.HITMAN);
  }, [user])
  if (isBoss) {
    return (
      <AuthLayout title={"Hits"}>
        <AllHits hits={[]} />
      </AuthLayout>
    );
  }

  if (isManager) {
    return (
      <AuthLayout title={"Hits"}>
        <MyHits hits={[]} />
        <LackeyHits hits={[]} />
      </AuthLayout>
    );
  }
  return (
    <AuthLayout title={"Hits"}>{isHitman && <MyHits hits={[]} />}</AuthLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

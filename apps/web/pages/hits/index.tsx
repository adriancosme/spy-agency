import { useContext, useEffect, useState } from "react";
import AllHits from "../../components/AllHits";
import LackeyHits from "../../components/LackeyHits";
import MyHits from "../../components/MyHits";
import { AuthLayout } from "../../components/layouts/AuthLayout";
import { AuthContext } from "../../contexts/Auth";
import { UserRole } from "../../interfaces/user.interface";
import _ from "lodash";
import useHits from "../../hooks/useHits";
import { toast } from "react-hot-toast";



export default function HitsPage({}) {
  const { user } = useContext(AuthContext);
  const [isManager, setIsManager] = useState<boolean>(false)
  const [isBoss, setIsBoss] = useState<boolean>(false)
  const [isHitman, setIsHitman] = useState<boolean>(false)



  useEffect(() => {
    if(user == null) return;
    setIsManager(user?.role === UserRole.MANAGER);
    setIsBoss(user?.role === UserRole.BOSS);
    setIsHitman(user?.role === UserRole.HITMAN);
  }, [user])
  if (isBoss) {
    return (
      <AuthLayout title={"Hits"}>
        <AllHits hits={[]} />
      </AuthLayout>
    );
  }

  if (isManager) {
    const {hits: myHits, isLoading: isLoadingMyHits} = useHits(`/hits/assignedTo/${user?.id}`);
    const {hits: managerHits, isLoading: isLoadingManagerHits} = useHits(`/hits/${user?.id}`);
    if(isLoadingMyHits) {
      toast.loading("Loading your hits...")
    }
    if(isLoadingManagerHits) {
      toast.loading("Loading your hits...")
    }
    return (
      <AuthLayout title={"Hits"}>
        <MyHits hits={myHits} />
        <LackeyHits hits={managerHits} />
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

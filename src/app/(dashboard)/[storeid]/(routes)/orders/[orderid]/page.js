import Link from "next/link";
import { Button } from "@/components/ui/button";
import getSession from "@/utils/getSession";

const OrderById = async () => {
  const session = await getSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[36rem] mx-auto">
        <Button asChild>
          <Link href="/login">Login First</Link>
        </Button>
      </div>
    );
  }

  return <div>OrderById</div>;
};

export default OrderById;

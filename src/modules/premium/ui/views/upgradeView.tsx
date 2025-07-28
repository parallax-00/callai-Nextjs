"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const UpgradeView = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="p-4">Coming Soon</p>
      <Button><Link href="/meetings" >
      Back to Meetings
      </Link></Button>
    </div>
  );
};

export default UpgradeView;

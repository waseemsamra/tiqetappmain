import { Button } from "@/components/ui/button";
import { Link } from "next/link";

export default function CreateGroupPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create Group</h1>
      <p className="mt-4">Create group form will be implemented here.</p>
      <Link href="/admin/groups">
        <Button>Back to Groups</Button>
      </Link>
    </div>
  );
}
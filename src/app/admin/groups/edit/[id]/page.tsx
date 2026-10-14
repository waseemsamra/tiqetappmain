import { Button } from "@/components/ui/button";
import { Link } from "next/link";

export default function EditGroupPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Group</h1>
      <p className="mt-4">Edit group form will be implemented here.</p>
      <Link href="/admin/groups">
        <Button>Back to Groups</Button>
      </Link>
    </div>
  );
}